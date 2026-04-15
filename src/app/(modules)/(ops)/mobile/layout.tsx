"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Calendar, User, Heart, Settings, Briefcase, CreditCard, PieChart, Bell, Zap, FileText } from 'lucide-react'
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
            {/* Premium Header */}
            <header className="px-6 pt-10 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex justify-between items-center border-b border-slate-100">
                <div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Elite OS Mobile</h2>
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter italic uppercase">
                        {pathname.includes('/client') ? 'Patient' : pathname.includes('/admin') ? 'Admin' : pathname.includes('/staff') ? 'Dentiste' : 'Portail'}
                    </h3>
                </div>
                <div className="flex gap-2">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 shadow-sm border border-white">
                        <Bell className="h-4 w-4" />
                    </div>
                </div>
            </header>

            {/* Main Viewport */}
            <main className="flex-1 pb-24 overflow-y-auto">
                {children}
            </main>

            {/* Bottom Mobile Tab Bar (Elite Glassmorphism) */}
            {tabs.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pointer-events-none">
                    <nav className="mx-auto max-w-sm h-16 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-around px-4 pointer-events-auto ring-1 ring-white/5">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.href
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1 transition-all duration-300 relative px-4 flex-1",
                                        isActive ? "text-gold" : "text-slate-400 opacity-60 hover:opacity-100"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute -top-1 h-1 w-6 bg-gold rounded-full shadow-[0_0_15px_#C5A572]" 
                                        />
                                    )}
                                    <tab.icon className={cn("h-5 w-5 transition-transform duration-500", isActive ? "scale-125 mb-0.5" : "scale-100")} />
                                    <span className="text-[7px] font-black uppercase tracking-widest">{tab.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            )}
        </div>
    )
}

import { motion } from 'framer-motion'
