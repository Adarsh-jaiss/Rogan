import { callGeminiAPI } from "./gemini-api";

export async function handleGeminiRequest(message: any, sendResponse: (response: any) => void) {
    try {
        if (message.type == "FETCH_KEYWORD_FROM_PROMPT") {
           const searchQuery = await fetchKeywordFromPrompt(message.prompt)
            sendResponse({ success: true, data: searchQuery });
        }
      
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        console.error("Rogan AI Request Failed:", msg);
        sendResponse({ success: false, error: msg });
    }
}

async function fetchKeywordFromPrompt(user_prompt :string):Promise<string> {
    const promptTemplate = `You are helping me search for LinkedIn connections. Based on this prompt, give me a short and effective LinkedIn search query:
        "${user_prompt}"
        Make your response just 3-5 words that would be most effective to find these people on LinkedIn.
        Do not format as JSON. Do not use complex search operators like AND, OR, etc.
        Just give a simple short phrase that LinkedIn search would understand.
    `;

    console.log("Calling Rogan AI API with prompt template to fetch the keyword");
    const searchQuery = await callGeminiAPI(promptTemplate);
    if (!searchQuery) {
        throw new Error('fetchKeywordFromPrompt -> Empty response from Rogan AI API');
    }

    return searchQuery.trim()
}