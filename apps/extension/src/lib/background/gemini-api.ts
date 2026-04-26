interface GeminiConfig {
    endpoint: string;
    model: string;
    apiKey: string;
}

async function fetchAPIKey():Promise<string> {
    return ""
}

/**
 * Calls the Gemini API from a background service worker.
 */
export async function callGeminiAPI(prompt: string): Promise<string> {
    const apiKey = await fetchAPIKey()
    if (!apiKey) {
        throw new Error('API key is required');
    }

    const config: GeminiConfig = {
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/',
        model: 'gemini-flash-latest', 
        apiKey: apiKey
    };

    const url = `${config.endpoint}${config.model}:generateContent?key=${config.apiKey}`;

    const payload = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini Error ${response.status}: ${errorData.error?.message || 'Unknown Error'}`);
    }

    const result = await response.json();

    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
        throw new Error('API returned an empty response');
    }

    return generatedText;
}