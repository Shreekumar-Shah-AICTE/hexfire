import { GoogleGenAI } from '@google/genai';
import { ChaosTestResult, ResilienceScore } from '../types';

// Fallback model chain — if primary is overloaded, try the next one
const MODEL_CHAIN = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

function buildPrompt(testResult: ChaosTestResult, score: ResilienceScore): string {
  return `You are HEXFIRE, a chaos engineering analysis engine for AI agents.
    
Analyze the following chaos test results and generate a professional, high-fidelity resilience report.

## Test Results
${JSON.stringify(testResult, null, 2)}

## Resilience Score
${JSON.stringify(score, null, 2)}

Generate a detailed report with these precise sections:
1. **Executive Summary** — One paragraph overview of the agent's resilience posture.
2. **Fault Analysis** — For each injected fault, explain exactly what happened, why the node failed or survived, and its severity.
3. **Cascade Impact** — Detail how failures propagated downstream and describe the blast radius.
4. **Critical Vulnerabilities** — Highlight the top 2-3 design weaknesses found.
5. **Recommendations** — Specific architectural or engineering fixes to improve this agent's resilience (e.g. adding fallbacks, retry logic, timeout configurations, validation guardrails).

Use professional, technical language. Be specific about step names and fault types.
Format the output as clean, clean markdown without any enclosing backticks \`\`\`markdown or similar wrappers. Start directly with the first header.`;
}

async function tryModel(ai: GoogleGenAI, model: string, prompt: string): Promise<string> {
  console.log(`[Gemini] Attempting model: ${model}`);
  const response = await ai.models.generateContent({ model, contents: prompt });
  return response.text || 'Failed to extract text from Gemini response.';
}

export async function generateResilienceReport(
  testResult: ChaosTestResult,
  score: ResilienceScore
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith('your_')) {
    return `## ⚠️ Configuration Missing
Gemini API key is not configured in the host environment. Here is a local analysis:

*   **Resilience Score:** ${score.total}/100
*   **Grade:** ${score.grade}
*   **Star Rating:** ${'★'.repeat(score.stars)}${'☆'.repeat(5 - score.stars)}
*   **Test Timestamp:** ${testResult.timestamp}

Please configure \`GEMINI_API_KEY\` in your \`.env\` file to unlock full generative AI analysis and engineering remediation strategies.`;
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = buildPrompt(testResult, score);

  // Try each model in the fallback chain
  for (let i = 0; i < MODEL_CHAIN.length; i++) {
    const model = MODEL_CHAIN[i];
    try {
      return await tryModel(ai, model, prompt);
    } catch (err: any) {
      const is503 = err?.message?.includes('503') || err?.message?.includes('UNAVAILABLE') || err?.message?.includes('high demand');
      const isLast = i === MODEL_CHAIN.length - 1;

      if (is503 && !isLast) {
        console.warn(`[Gemini] Model ${model} returned 503 (overloaded). Retrying with next model in 2s...`);
        await new Promise(r => setTimeout(r, 2000));
        continue; // try next model
      }

      // Final model also failed or non-503 error
      console.error(`[Gemini] All models exhausted or non-recoverable error:`, err.message);
      return `## Analysis Error
An error occurred while calling the Gemini API: ${err.message}. 
Resilience Score: ${score.total}/100. Grade: ${score.grade}.`;
    }
  }

  return `## Analysis Error\nAll Gemini models are currently unavailable. Please try again later.\nResilience Score: ${score.total}/100. Grade: ${score.grade}.`;
}
