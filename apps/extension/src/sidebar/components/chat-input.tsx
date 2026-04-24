import React, { useState } from "react"
import { SendHorizontal, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ChatInput() {
    const [text, setText] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const handleAction = () => {
        if (isGenerating) {
            setIsGenerating(false)
        } else if (text.trim()) {
            setIsGenerating(true)
            setTimeout(() => setIsGenerating(false), 3000)
        }
    }

    return (
        <div className="w-full border border-gray-200 rounded-xl p-2 bg-custom-light">
            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Connect me with ..."
                className="w-full min-h-16 resize-none border-none bg-transparent px-3 py-2 text-sm focus-visible:ring-0 shadow-none"
            />

            <div className="flex justify-end">
                <Button onClick={handleAction} size="icon" variant="default" className={`h-9 w-9 rounded-full cursor-pointer transition-colors duration-150 focus-visible:ring-0 focus-visible:outline-none shadow-none  ${isGenerating ? "bg-custom-blue text-white hover:bg-custom-blue" : text.trim() ? "bg-transparent text-custom-blue hover:bg-transparent" : "bg-transparent text-gray-300 hover:bg-transparent" } `} >
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