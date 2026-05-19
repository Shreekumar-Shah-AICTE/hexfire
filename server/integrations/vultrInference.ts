import fetch from 'node-fetch';

const VULTR_ENDPOINT = 'https://api.vultrinference.com/v1/chat/completions';

export async function callVultrAgent(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  tools?: any[]
): Promise<any> {
  const apiKey = process.env.VULTR_INFERENCE_API_KEY;
  if (!apiKey || apiKey.startsWith('your_')) {
    // Graceful fallback if not configured
    console.warn("Vultr Inference API key not configured. Using mocked response.");
    return {
      choices: [{
        message: {
          content: "Mocked Vultr Inference Agent Response: Completed step actions without downstream failure."
        }
      }]
    };
  }

  const model = process.env.VULTR_INFERENCE_MODEL || 'kimi-k2-instruct';

  try {
    const response = await fetch(VULTR_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        tools,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vultr API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err: any) {
    console.error("Vultr Inference API call failed:", err.message);
    return {
      choices: [{
        message: {
          content: `Vultr Agent fallback recovery activated. Error: ${err.message}`
        }
      }]
    };
  }
}
