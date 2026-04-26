import React from 'react'
import ReactDOM from 'react-dom/client'

import { injectContentScript } from '@/lib/injectScript'
import { getActiveTab } from '@/lib/tabs'
import ChatInput from './components/chat-input'
import ActivityLogs from './components/activity-logs'
import { ensureLinkedInTab } from '@/lib/tabs'

function HomePage() {
    const sayHello = async () => {
        try {
           const tabId = await ensureLinkedInTab();

            await injectContentScript(tabId);

            chrome.tabs.sendMessage(tabId, { type: "HELLO" }, () => {
                if (chrome.runtime.lastError) {
                    console.error("No receiver:", chrome.runtime.lastError.message)
                }
            })
        } catch (err) {
            console.log("sayHello -> Injection failed:", err)
        }

    }

    return (
        <>
            <div className='p-4 pl-6 pr-6'>
                <ChatInput />
                <ActivityLogs />
            </div>
        </>
    )
}


export default HomePage;