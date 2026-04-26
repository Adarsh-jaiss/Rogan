export interface LogEntry {
    id: string;
    message: string;
    timestamp: string; 
}

const STORAGE_KEY = "extension_logs";

export const logger = {
    
    add : async (message :string) => {
        const result = await chrome.storage.local.get([STORAGE_KEY]);
        const currentLogs: LogEntry[] = (result[STORAGE_KEY] as LogEntry[]) || [];
        
        const newLog:LogEntry = {
            id:crypto.randomUUID(),
            message:message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updatedLogs = [newLog, ...currentLogs];
        await chrome.storage.local.set({ [STORAGE_KEY]: updatedLogs });
    },

    clear: async () => {
        await chrome.storage.local.set({ [STORAGE_KEY]:[] });
    }

}