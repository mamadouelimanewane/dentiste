"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Calendar, User, Heart, Settings, Briefcase, CreditCard, PieChart } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function MobileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const getTabsByRole = () => {
        if (pathname.includes('/mobile/client')) {
            return [
                { id: 'home', icon: Home, label: 'Accueil', href: '/mobile/client' },
                { id: 'rdv', icon: Calendar, label: 'Bouton', href: '/mobile/client/rdv' },
                { id: 'care', icon: Heart, label: 'Soins', href: '/mobile/client/soins' },
                { id: 'profile', icon: User, label: 'Profil', href: '/mobile/client/profil' },
            ]
        }
        if (pathname.includes('/mobile/admin')) {
            return [
                { id: 'stats', icon: PieChart, label: 'Stats', href: '/mobile/admin' },
                { id: 'ops', icon: Briefcase, label: 'Opérations', href: '/mobile/admin/ops' },
                { id: 'team', icon: User, label: 'Équipe', href: '/mobile/admin/equipe' },
                { id: 'settings', icon: Settings, label: 'Config', href: '/mobile/admin/settings' },
            ]
        }
        if (pathname.includes('/mobile/staff')) {
            return [
                { id: 'agenda', icon: Calendar, label: 'Agenda', href: '/mobile/staff' },
                { id: 'patients', icon: User, label: 'Patients', href: '/mobile/staff/patients' },
                { id: 'comms', icon: Home, label: 'Hub', href: '/mobile/staff/hub' },
                { id: 'profile', icon: Settings, label: 'Moi', href: '/mobile/staff/profil' },
            ]
        }
        if (pathname.includes('/mobile/comptable')) {
            return [
                { id: 'cash', icon: CreditCard, label: 'Caisse', href: '/mobile/comptable' },
                { id: 'invoices', icon: Briefcase, label: 'Factures', href: '/mobile/comptable/factures' },
                { id: 'bank', icon: PieChart, label: 'Banque', href: '/mobile/comptable/banque' },
                { id: 'reports', icon: FileText, label: 'Bilans', href: '/mobile/comptable/bilans' },
            ]
        }
        return []
    }

    const tabs = getTabsByRole()

    return (
        <div className="flex flex-col min-h-[100dvh] bg-slate-50 overflow-x-hidden font-sans select-none">
            {/* Main Viewport */}
            <main className="flex-1 pb-20 overflow-y-auto">
                {children}
            </main>

            {/* Bottom Mobile Tab Bar (Elite Glassmorphism) */}
            {tabs.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pointer-events-none">
                    <div className="mx-auto max-w-sm h-16 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl flex items-center justify-around px-4 pointer-events-auto">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.href
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1 transition-all duration-300 relative px-4",
                                        isActive ? "text-gold" : "text-slate-400 opacity-60 hover:opacity-100"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute -top-1 h-1 w-4 bg-gold rounded-full shadow-[0_0_10px_#C5A572]" />
                                    )}
                                    <tab.icon className={cn("h-5 w-5", isActive ? "scale-110" : "")} />
                                    <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

function FileText({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    )
}
