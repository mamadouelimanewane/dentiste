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
    Mic,
    HardDrive,
    GraduationCap,
    Megaphone,
    Bell,
    Video,
    CreditCard,
    Star,
    Clock,
    Hash,
    ChevronLeft,
    ChevronRight,
    LogOut,
    User,
    Smartphone
} from 'lucide-react'

export const navigationSections = [
    {
        title: 'Gestion Clinique',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'],
        items: [
            { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
            { name: 'Patients Elite', href: '/patients', icon: Users, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
            { name: 'Workflow Clinique', href: '/workflow', icon: Activity, roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
            { name: 'Smile Design Studio', href: '/smile-design', icon: Sparkles, roles: ['OWNER', 'DENTIST'] },
            { name: 'Agenda Dynamique', href: '/agenda', icon: Calendar },
            { name: 'Salle d\'Attente', href: '/waiting-room', icon: Clock, badge: '3' },
        ]
    },
    {
        title: 'Intelligence & Pilotage',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT'],
        items: [
            { name: 'AI Command Center', href: '/ai-hub', icon: Brain, roles: ['OWNER', 'DENTIST'] },
            { name: 'AI Radio Lab', href: '/ai-radio-lab', icon: Radiation },
            { name: 'AI Voice Dictation', href: '/dictation', icon: Mic },
            { name: 'Financial War Room', href: '/financial-war-room', icon: Target, roles: ['OWNER', 'ACCOUNTANT'] },
            { name: 'Téléconsultation', href: '/teleconsultation', icon: Video, isNew: true },
        ]
    },
    {
        title: 'Admin & Finance',
        roles: ['OWNER', 'SECRETARY', 'ACCOUNTANT'],
        items: [
            { name: 'GED Elite (Vault)', href: '/ged', icon: HardDrive, roles: ['OWNER', 'DENTIST', 'SECRETARY'] },
            { name: 'Devis Multi-Options', href: '/quotes', icon: FileCheck },
            { name: 'Facturation & Actes', href: '/billing', icon: DollarSign },
            { name: 'Paiement en Ligne', href: '/payment', icon: CreditCard, isNew: true },
            { name: 'Comptabilité OHADA', href: '/accounting', icon: BookOpen, roles: ['OWNER', 'ACCOUNTANT'] },
        ]
    },
    {
        title: 'Opérations & Cabinet',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'],
        items: [
            { name: 'Marketing IA Hub', href: '/marketing', icon: Megaphone, roles: ['OWNER'] },
            { name: 'Gestion Elite (RH)', href: '/management', icon: Briefcase, roles: ['OWNER'] },
            { name: 'Stocks & Intrants', href: '/inventory', icon: Package, roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
            { name: 'Traçabilité Hub', href: '/sterilization', icon: ShieldCheck, roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
            { name: 'Portail Patient VIP', href: '/portal', icon: UserCircle },
            { name: 'Programme Fidélité', href: '/loyalty', icon: Star, isNew: true },
        ]
    },
    {
        title: 'Communication',
        items: [
            { name: 'Messagerie Interne', href: '/messages', icon: Hash, isNew: true },
            { name: 'Communication', href: '/communication', icon: MessageSquare },
            { name: 'Notifications', href: '/notifications', icon: Bell, badge: '3' },
        ]
    },
    {
        title: 'Système',
        items: [
            { name: 'Documentation Elite', href: '/documentation', icon: BookOpen },
            { name: 'Elite Academy', href: '/academy', icon: GraduationCap },
            { name: 'Paramètres', href: '/settings', icon: Settings, roles: ['OWNER'] },
        ]
    },
    {
        title: 'Mobile Apps (Elite)',
        roles: ['OWNER'], // Only Admin can switch for demo
        items: [
            { name: 'Mobile Hub (Switcher)', href: '/mobile', icon: Smartphone, badge: '4' },
            { name: 'App Patient', href: '/mobile/client', icon: UserCircle },
            { name: 'App Admin', href: '/mobile/admin', icon: ShieldCheck },
            { name: 'App Dentiste', href: '/mobile/staff', icon: Stethoscope },
            { name: 'App Comptable', href: '/mobile/comptable', icon: BookOpen },
        ]
    }
]

export function Sidebar({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const [user, setUser] = useState<{ role: string, name: string } | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
        const savedUser = localStorage.getItem('dp_user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const filteredSections = navigationSections.map(section => {
        // Filter items within section
        const filteredItems = section.items.filter(item => {
            const allowed = (item as any).roles
            if (!allowed || !user) return true
            return allowed.includes(user.role)
        })

        if (filteredItems.length === 0) return null

        // Check if section itself is restricted
        const sectionRoles = (section as any).roles
        if (sectionRoles && user && !sectionRoles.includes(user.role)) {
            return null
        }

        return { ...section, items: filteredItems }
    }).filter(Boolean) as typeof navigationSections

    if (!mounted) {
        return <div className={cn("w-64 bg-slate-950 h-full border-r border-white/5", className)} />
    }

    return (
        <div className={cn(
            "flex h-full flex-col border-r bg-slate-950 text-slate-300 transition-all duration-300",
            collapsed ? "w-20" : "w-64",
            className
        )}>
            {/* Logo */}
            <div className="flex h-20 items-center justify-between px-4 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl flex-shrink-0">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <Diamond className="h-6 w-6 text-accent animate-pulse flex-shrink-0" />
                        <span className="text-lg font-black tracking-tighter text-white uppercase">Dento<span className="text-accent">Prestige</span></span>
                    </div>
                )}
                {collapsed && <Diamond className="h-6 w-6 text-accent animate-pulse mx-auto" />}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex h-8 w-8 rounded-xl bg-white/5 hover:bg-white/10 items-center justify-center text-slate-400 hover:text-white transition-all flex-shrink-0"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            </div>

            <nav className="flex-1 space-y-6 px-3 py-6 overflow-y-auto no-scrollbar">
                {filteredSections.map((section) => (
                    <div key={section.title} className="space-y-1">
                        {!collapsed && (
                            <h3 className="px-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-3">{section.title}</h3>
                        )}
                        <div className="space-y-0.5">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        title={collapsed ? item.name : undefined}
                                        className={cn(
                                            "group flex items-center px-3 py-2.5 text-[12px] font-bold rounded-xl transition-all duration-200 relative",
                                            collapsed ? "justify-center" : "gap-3",
                                            isActive
                                                ? "bg-accent/10 text-accent border border-accent/20"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                "h-4 w-4 flex-shrink-0 transition-all duration-200",
                                                isActive ? "text-accent scale-110" : "text-slate-500 group-hover:text-slate-300"
                                            )}
                                        />
                                        {!collapsed && (
                                            <>
                                                <span className="flex-1 truncate">{item.name}</span>
                                                {(item as any).isNew && (
                                                    <span className="text-[8px] font-black text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded-full">NEW</span>
                                                )}
                                                {(item as any).badge && (
                                                    <span className="h-4 w-4 bg-red-500 rounded-full text-[9px] font-black text-white flex items-center justify-center">{(item as any).badge}</span>
                                                )}
                                            </>
                                        )}
                                        {collapsed && (item as any).badge && (
                                            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full text-[7px] font-black text-white flex items-center justify-center">{(item as any).badge}</span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className="border-t border-white/5 p-3 bg-slate-950/50 flex-shrink-0">
                {collapsed ? (
                    <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-black text-xs">
                            DR
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-black text-xs shadow-lg flex-shrink-0">
                            DR
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-white truncate">{user?.name || 'Dr. Aere Lao'}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent/60">
                                {user?.role === 'OWNER' ? 'Administrateur Elite' :
                                    user?.role === 'DENTIST' ? 'Praticien Elite' :
                                        user?.role === 'ASSISTANT' ? 'Assistant(e) Elite' :
                                            user?.role === 'SECRETARY' ? 'Secrétaire Elite' :
                                                'Utilisateur Elite'}
                            </p>
                        </div>
                        <Link href="/login" className="h-8 w-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                            <LogOut className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
