"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useState, useEffect } from "react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    // No context before mount
    if (!mounted) return <div className="min-h-screen bg-slate-950" />

    // If we are on the landing page (slash page), don't show the layout
    if (pathname === "/") {
        return <>{children}</>
    }

    return (
        <div className="flex h-full w-full">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden lg:flex" />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

                {/* Mobile Sidebar */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetContent side="left" className="p-0 border-none w-64">
                        <Sidebar className="w-full" />
                    </SheetContent>
                </Sheet>

                <main className="flex-1 h-full overflow-y-auto no-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    )
}
