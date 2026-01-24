"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
    Users,
    Calendar,
    Activity,
    DollarSign,
    ClipboardList,
    Settings,
    LayoutDashboard,
    FileText,
    FileCheck,
    Image as ImageIcon,
    Package,
    ShieldCheck,
    BookOpen,
    MessageSquare,
    Diamond,
    Briefcase,
    Zap,
    ShieldAlert,
    Brain,
    Radiation,
    Shapes,
    Stethoscope,
    UserCircle,
    Sparkles,
    Target,
    RefreshCw,
    Split,
    ArrowRight,
    Mic
} from 'lucide-react'

const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Command Center', href: '/ai-hub', icon: Brain },
    { name: 'AI Radio Lab', href: '/ai-radio-lab', icon: Radiation },
    { name: 'AI Voice Dictation', href: '/dictation', icon: Mic },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Smile Design Studio', href: '/smile-design', icon: Sparkles },
    { name: 'Portail Patient VIP', href: '/portal', icon: UserCircle },
    { name: 'Gestion Elite (RH)', href: '/management', icon: Briefcase },
    { name: 'Financial War Room', href: '/financial-war-room', icon: Target },
    { name: 'Agenda', href: '/agenda', icon: Calendar },
    { name: 'Facturation', href: '/billing', icon: DollarSign },
    { name: 'Devis Multi-Options', href: '/quotes', icon: FileCheck },
    { name: 'Stocks & Intrants', href: '/inventory', icon: Package },
    { name: 'Traçabilité Hub', href: '/sterilization', icon: ShieldCheck },
    { name: 'Comptabilité OHADA', href: '/accounting', icon: BookOpen },
    { name: 'Communication', href: '/communication', icon: MessageSquare },
    { name: 'Paramètres', href: '/settings', icon: Settings },
]

export function Sidebar() {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-64 bg-slate-950 h-full border-r border-white/5" />
    }

    return (
        <div className="flex h-full w-64 flex-col border-r bg-slate-950 text-slate-300">
            <div className="flex h-20 items-center px-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
                <Diamond className="h-6 w-6 text-accent mr-3 animate-pulse" />
                <span className="text-lg font-black tracking-tighter text-white uppercase">Dento<span className="text-accent">Prestige</span></span>
            </div>

            <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto no-scrollbar">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center px-4 py-2.5 text-[13px] font-bold rounded-xl transition-all duration-300",
                                isActive
                                    ? "bg-accent/10 text-accent shadow-[inset_0_0_20px_rgba(212,175,55,0.05)] border border-accent/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-4 w-4 flex-shrink-0 transition-all duration-300",
                                    isActive ? "text-accent scale-110" : "text-slate-500 group-hover:text-slate-300"
                                )}
                            />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-white/5 p-6 bg-slate-950/50">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-black text-xs shadow-lg">
                        DR
                    </div>
                    <div>
                        <p className="text-sm font-black text-white">Dr. Aere Lao</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-accent/60">Praticien Elite</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
