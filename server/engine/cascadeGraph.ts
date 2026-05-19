import { AgentStep, FaultedStep, CascadeResult } from '../types';

export function buildCascadeGraph(pipeline: AgentStep[]): Record<string, string[]> {
  const graph: Record<string, string[]> = {};
  
  // Initialize nodes
  pipeline.forEach(step => {
    graph[step.id] = [];
  });

  // Populate graph edges based on dependencies
  pipeline.forEach(step => {
    step.dependencies.forEach(depId => {
      if (graph[depId]) {
        graph[depId].push(step.id);
      }
    });
  });

  return graph;
}

export function computeCascade(
  graph: Record<string, string[]>,
  faultedSteps: FaultedStep[],
  faultOriginId: string
): CascadeResult {
  const affectedSteps: string[] = [];
  const visited = new Set<string>();
  const queue: string[] = [faultOriginId];
  
  let maxDepth = 0;
  const depths: Record<string, number> = { [faultOriginId]: 0 };

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);

    if (current !== faultOriginId) {
      affectedSteps.push(current);
    }

    const neighbors = graph[current] || [];
    const currentDepth = depths[current];

    neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) {
        depths[neighbor] = currentDepth + 1;
        maxDepth = Math.max(maxDepth, currentDepth + 1);
        queue.push(neighbor);
      }
    });
  }

  const totalSteps = Object.keys(graph).length;
  // Blast radius includes the origin + all cascading steps
  const blastRadius = totalSteps > 0 ? (affectedSteps.length + 1) / totalSteps : 0;

  return {
    graph,
    faultOrigin: faultOriginId,
    affectedSteps,
    blastRadius,
    cascadeDepth: maxDepth
  };
}
