import React, { useState } from "react"
import { SendHorizontal, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getActiveTab } from "@/lib/tabs"
import { injectContentScript } from "@/lib/injectScript"
import { LogEntry, logger } from "@/lib/logger";

export default function ChatInput() {
    const [text, setText] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const handleUserPromptAction = async () => {
        if (isGenerating) {
            setIsGenerating(false)
        } else if (text.trim()) {
            setIsGenerating(true)
            await logger.add("Searching profiles");

            try {
               const response = await chrome.runtime.sendMessage({type:"FETCH_KEYWORD_FROM_PROMPT", prompt:text})
               
               // 1. Check if the message even went through (Chrome level -> background script)
                if (!response) {
                    throw new Error("No response from background script");
                }
                
                // 2. Check the "Business Logic" success (Gemini level)
                // Equivalent to 'if !response.Success { return err }' in Go
                if (response.success === false) {
                    throw new Error(response.error || "Unknown API error");
                }

                const apiResult = response.data;

                console.log("Keyword:", apiResult);
                logger.add(`Keyword:${apiResult}`)

                // now i want to send a req to content script for this tab, but i want to keep

                

                
                setText(""); // Clear input after success
            } catch (err) {
                console.log("handleUserPromptAction -> Workflow failed:", err);
                logger.add(`Fetching profile ${err}`)
                // You might want to show this error in your UI logs
            } finally {
                setIsGenerating(false);
            }

        }
    }

    return (
        <div className="w-full border border-gray-200 rounded-xl p-2 bg-custom-light">
            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Connect me with ..."
                className="w-full min-h-16 resize-none border-none bg-transparent px-3 py-2 text-sm focus-visible:ring-0 shadow-none"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!isGenerating) {
                            handleUserPromptAction();
                        }
                    }
                }}
            />

            <div className="flex justify-end">
                <Button onClick={handleUserPromptAction} size="icon" variant="default" className={`h-9 w-9 rounded-full cursor-pointer transition-colors duration-150 focus-visible:ring-0 focus-visible:outline-none shadow-none  ${isGenerating ? "bg-custom-blue text-white hover:bg-custom-blue" : text.trim() ? "bg-transparent text-custom-blue hover:bg-transparent" : "bg-transparent text-gray-300 hover:bg-transparent"} `} >
                    {isGenerating ? (
                        <Square className="w-3 h-3 fill-current" />
                    ) : (
                        <SendHorizontal className="w-4 h-4" />
                    )}
                </Button>
            </div>
        </div>
    )
}