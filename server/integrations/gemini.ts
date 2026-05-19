import { GoogleGenAI } from '@google/genai';
import { ChaosTestResult, ResilienceScore } from '../types';

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

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are HEXFIRE, a chaos engineering analysis engine for AI agents.
    
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
Format the output as clean, clean markdown without any enclosing backticks \`\`\`markdown or similar wrappers. Start directly with the first header.`,
    });

    return response.text || 'Failed to extract text from Gemini response.';
  } catch (err: any) {
    console.error("Gemini API call failed:", err);
    return `## Analysis Error
An error occurred while calling the Gemini API: ${err.message}. 
Resilience Score: ${score.total}/100. Grade: ${score.grade}.`;
  }
}
