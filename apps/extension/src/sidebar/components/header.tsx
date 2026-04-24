import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Header() {
    const redirectToGoogleForms = () => {
        window.open("https://forms.gle/7VG4GhYox5qKT8jw7", "_blank", "noopener,noreferrer")
    }
    return (
        <>
            <header className="flex items-center justify-between p-4 pl-6 pr-6">
                <h1 className="text-zinc-800 text-xl font-semibold">Rogan</h1>

                <div className="flex items-center gap-2">
                    <Button variant={"default"} className="bg-custom-blue rounded-md text-white hover:bg-custom-blue cursor-pointer" onClick={redirectToGoogleForms}>Help us Improve</Button>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>

            </header>
        </>
    )
}

export default Header;
