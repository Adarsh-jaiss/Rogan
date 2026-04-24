import React from 'react'
import ReactDOM from 'react-dom/client'
import '../global.css'
import Header from './components/header'
import { TooltipProvider } from "@/components/ui/tooltip"
import Navbar from './components/navbar'
import HomePage from './sections/HomePage'
import { useState } from 'react'

function App() {
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

                {/* Pass state and setter to Navbar */}
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