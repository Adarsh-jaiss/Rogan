import React from 'react'
import ReactDOM from 'react-dom/client'

import { injectContentScript } from '@/lib/injectScript'
import { getActiveTab } from '@/lib/tabs'
import ChatInput from '../components/chat-input'
function HomePage() {
    const sayHello = async () => {
        try {
            const tabs = await getActiveTab()

            if (!tabs.length) {
                console.log("no tabs found")
                return
            }

            const tabId = tabs[0].id
            if (!tabId) {
                console.log("tab id is undefined")
                return
            }

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
            </div>
        </>
    )
}


export default HomePage;