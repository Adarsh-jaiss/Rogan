export const getActiveTab = (): Promise<chrome.tabs.Tab[]> => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, resolve)
    })
}