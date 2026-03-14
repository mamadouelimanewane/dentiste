"use client"

import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Loader2 } from "lucide-react"

// Pages accessibles sans authentification
const PUBLIC_PAGES = ["/", "/login"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session, status } = useSession()
    const [mounted, setMounted] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    // Redirect unauthenticated users to login (except on public pages) - DISABLED FOR DEMO
    /*
    useEffect(() => {
        if (status === "unauthenticated" && !PUBLIC_PAGES.includes(pathname)) {
            router.push("/login")
        }
    }, [status, pathname, router])
    */

    // No context before mount
    if (!mounted) return <div className="min-h-screen bg-slate-950" />

    // If on a public page, render without layout
    if (PUBLIC_PAGES.includes(pathname)) {
        return <>{children}</>
    }

    // Show loading spinner while checking auth
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                        Chargement de votre session...
                    </p>
                </div>
            </div>
        )
    }

    /*
    // If unauthenticated and not on public page, show nothing (redirect is happening)
    if (status === "unauthenticated") {
        return <div className="min-h-screen bg-slate-950" />
    }
    */

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
