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

    // Simplified RBAC logic based on Sidebar navigationSections
    const userRole = (session?.user as any)?.role || 'GUEST'

    const isAccessDenied = () => {
        // Paths that only OWNER can access
        const ownerOnlyPaths = ['/admin-portal', '/management', '/settings']
        if (ownerOnlyPaths.includes(pathname) && userRole !== 'OWNER') return true

        // Client (Patient) restrictions
        if (userRole === 'CLIENT') {
            const allowedForClient = ['/portal', '/payment', '/loyalty', '/teleconsultation', '/notifications']
            if (!allowedForClient.includes(pathname) && !pathname.startsWith('/portal/')) return true
        }

        // Accountant restrictions
        if (userRole === 'ACCOUNTANT') {
            const allowedForAccountant = ['/dashboard', '/accounting', '/billing', '/financial-war-room', '/messages']
            if (!allowedForAccountant.includes(pathname)) return true
        }

        // Assistant/Secretary restrictions (Clinical + Admin minus sensitive owner stuff)
        if (userRole === 'ASSISTANT' || userRole === 'SECRETARY') {
            const deniedForStaff = ['/admin-portal', '/management', '/settings', '/smile-design']
            if (deniedForStaff.includes(pathname)) return true
        }

        // Dentist (Praticien) restrictions
        if (userRole === 'DENTIST') {
            const deniedForDentist = ['/admin-portal', '/management', '/accounting', '/financial-war-room']
            if (deniedForDentist.includes(pathname)) return true
        }

        return false
    }

    if (isAccessDenied()) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
                <div className="max-w-md w-full bg-slate-900 border border-red-500/20 rounded-[3rem] p-12 text-center shadow-2xl">
                    <div className="h-20 w-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                        <Loader2 className="h-10 w-10 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Accès Restreint</h2>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                        Désolé, votre rôle (**{userRole}**) ne vous permet pas d'accéder à ce module Elite. 
                        Veuillez contacter l'administrateur du cabinet.
                    </p>
                    <button 
                        onClick={() => router.push(userRole === 'CLIENT' ? '/portal' : '/dashboard')}
                        className="w-full bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20"
                    >
                        Retour au Hub Autorisé
                    </button>
                </div>
            </div>
        )
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
