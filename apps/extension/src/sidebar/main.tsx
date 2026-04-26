import React from 'react'
import ReactDOM from 'react-dom/client'
import '../global.css'
import Header from './components/header'
import { TooltipProvider } from "@/components/ui/tooltip"
import Navbar from './components/navbar'
import HomePage from './sections/Homepage/HomePage'
import { useState, useEffect } from 'react'
import { ensureLinkedInTab } from '@/lib/tabs'

function App() {
    useEffect(() => {
        const startup = async () => {
            try {
                const tabId = await ensureLinkedInTab();
                console.log("LinkedIn tab synchronized and pinned.");
                console.log("Targeting Tab ID:", tabId);
            } catch (err) {
                console.log("Failed to sync LinkedIn tab:", err);
                throw new Error('Failed to sync LinkedIn tab.');
            }
        };

        startup();
    }, []);

    const [activeTab, setActiveTab] = useState("Home");
    const renderSection = () => {
        switch (activeTab) {
            case "Home": return <HomePage />;
            case "Messages": return <div>Messages Content</div>;
            case "Campaigns": return <div>Campaigns Content</div>;
            case "Queue": return <div>Queue Content</div>;
            case "Analytics": return <div>Analytics Content</div>;
            default: return <HomePage />;
        }
    }


    return (
        <TooltipProvider>
            <div className="flex flex-col h-screen bg-background overflow-hidden">
                <Header />
                <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Scrollable content area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    {renderSection()}
                </main>
            </div>
        </TooltipProvider>
    )
}


ReactDOM.createRoot(document.getElementById('root')!).render(<App />)