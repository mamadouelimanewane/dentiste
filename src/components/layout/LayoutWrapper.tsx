"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useState, useEffect } from "react"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // No context before mount
    if (!mounted) return <div className="min-h-screen bg-slate-950" />

    // If we are on the landing page (slash page), don't show the layout
    if (pathname === "/") {
        return <>{children}</>
    }

    return (
        <div className="flex h-full w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header />
                <main className="flex-1 h-full overflow-y-auto no-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    )
}
