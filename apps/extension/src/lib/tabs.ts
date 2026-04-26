export const getActiveTab = (): Promise<chrome.tabs.Tab[]> => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, resolve)
    })
}


const LI_URL = "https://www.linkedin.com/";
const STORAGE_KEY = "liTabId";

export async function ensureLinkedInTab(): Promise<number> {
 
    const storage = await chrome.storage.local.get([STORAGE_KEY]);

    let tabId: number | undefined = storage[STORAGE_KEY] as number | undefined;

    if (tabId) {
        try {
            const tab = await chrome.tabs.get(tabId);
            if (tab && tab.id) {
                return tab.id;
            }
        } catch (e) {
            tabId = undefined;
        }
    }

    // 2. Search for existing LinkedIn tabs if our saved ID is dead
    const existingTabs = await chrome.tabs.query({ url: "*://*.linkedin.com/*" });

    if (existingTabs.length > 0 && existingTabs[0].id !== undefined) {
        tabId = existingTabs[0].id;
        await chrome.tabs.update(tabId, { pinned: true });
    } else {
        // 3. Create a new pinned tab
        const newTab = await chrome.tabs.create({
            url: LI_URL,
            pinned: true,
            active: false
        });
        tabId = newTab.id;
    }

    if (tabId === undefined) {
        throw new Error("Failed to create or find LinkedIn tab");
    }

    await chrome.storage.local.set({ [STORAGE_KEY]: tabId });
    return tabId;
}