import { handleGeminiRequest } from "@/lib/background/message-handler";

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({
        openPanelOnActionClick: true
    })
})


interface ExtensionMessage {
    type: string;
    prompt?: string;
}

const onMessageReceived = (message: ExtensionMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
    switch (message.type) {
        case "FETCH_KEYWORD_FROM_PROMPT":
            handleGeminiRequest(message, sendResponse);
            return true; // Tells Chrome: "Don't close the channel yet, I'm working!"

        default:
            console.warn("Unknown message type:", message.type);
            return false;
    }
}


chrome.runtime.onMessage.addListener(onMessageReceived)