import React, { useEffect, useState } from "react";
import { LogEntry, logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";

export default function ActivityLogs() {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // 1. Initial Load and Sync with Chrome Storage
    useEffect(() => {
        const updateLogs = async () => {
            const data = await chrome.storage.local.get("extension_logs");
            setLogs((data.extension_logs as LogEntry[]) || []);
        }
        updateLogs();

        // 2. Listen for storage changes (updates UI automatically when logger.add is called)
        const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
            if (changes.extension_logs) {
                setLogs((changes.extension_logs.newValue as LogEntry[]) || []);
            }
        }
        chrome.storage.onChanged.addListener(listener);

        return () => {
            chrome.storage.onChanged.removeListener(listener);
        }
    }, [])

    if (logs.length === 0) return null;

    return (
        <div className="mt-auto p-6 w-full bg-white border-gray-100">
            <div className="flex justify-between items-center mb-3"> 
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Activity</span>
                <Button variant={"destructive"} onClick={() => { logger.clear() }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </Button>
            </div>

            <div className="flex flex-col gap-2">
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 items-start text-xs">
                        <span className="text-gray-300 tabular-nums shrink-0">{log.timestamp}</span>
                        <span className="text-custom-blue wrap-break-word leading-tight">
                            {log.message}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}