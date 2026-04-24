import React from "react";

interface NavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

function Navbar({ activeTab, setActiveTab }: NavbarProps) {
    const navItems = ["Home", "Messages", "Campaigns", "Queue", "Analytics"];

    return (
        <nav className="w-full bg-white px-6 pt-6 border-b border-border">
    
            <div className="flex justify-between items-center w-full">
                {navItems.map((item) => {
                    const isActive = item === activeTab;
                    return (
                        <div key={item} className="relative pb-2">
                            <button
                                onClick={() => setActiveTab(item)} // Update state on click
                                className={`text-sm font-medium transition-colors hover:text-foreground cursor-pointer
                                    ${isActive ? "text-custom-blue" : "text-muted-foreground"}`}
                            >
                                {item}
                            </button>

                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-custom-blue rounded-full" />
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    )
}

export default Navbar;