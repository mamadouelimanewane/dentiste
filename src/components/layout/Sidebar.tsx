"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
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
    Smartphone,
    Layout
} from 'lucide-react'

export const navigationSections = [
    {
        title: 'Gestion Clinique',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'],
        items: [
            { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
            { name: 'Patients Elite', href: '/patients', icon: Users, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
            { name: 'Workflow Clinique', href: '/workflow', icon: Activity, roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
            { name: 'Smile Design Studio', href: '/smile-design', icon: Sparkles, roles: ['OWNER', 'DENTIST'] },
            { name: 'Agenda Dynamique', href: '/agenda', icon: Calendar, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
            { name: 'Labo Hub', href: '/lab', icon: Activity, roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
            { name: 'Command Center', href: '/tasks', icon: Briefcase, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
            { name: 'Salle d\'Attente', href: '/waiting-room', icon: Clock, badge: '3', roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
        ]
    },
    {
        title: 'Portails Elite',
        roles: ['OWNER', 'ASSISTANT', 'SECRETARY'],
        items: [
            { name: 'Admin Portal', href: '/admin-portal', icon: ShieldCheck, roles: ['OWNER'] },
            { name: 'Portail Accueil', href: '/reception-portal', icon: Users, roles: ['OWNER', 'SECRETARY', 'ASSISTANT'] },
            { name: 'Assistant Admin', href: '/assistant-portal', icon: FileText, roles: ['OWNER', 'ASSISTANT', 'SECRETARY'] },
        ]
    },
    {
        title: 'Intelligence & Pilotage',
        roles: ['OWNER', 'DENTIST', 'ACCOUNTANT', 'CLIENT'],
        items: [
            { name: 'AI Command Center', href: '/ai-hub', icon: Brain, roles: ['OWNER', 'DENTIST'] },
            { name: 'AI Radio Lab', href: '/ai-radio-lab', icon: Radiation, roles: ['OWNER', 'DENTIST'] },
            { name: 'AI Voice Dictation', href: '/dictation', icon: Mic, roles: ['OWNER', 'DENTIST'] },
            { name: 'Financial War Room', href: '/financial-war-room', icon: Target, roles: ['OWNER', 'ACCOUNTANT'] },
            { name: 'Téléconsultation', href: '/teleconsultation', icon: Video, isNew: true, roles: ['OWNER', 'DENTIST', 'CLIENT'] },
        ]
    },
    {
        title: 'Admin & Finance',
        roles: ['OWNER', 'SECRETARY', 'ACCOUNTANT', 'ASSISTANT'],
        items: [
            { name: 'GED Elite (Vault)', href: '/ged', icon: HardDrive, roles: ['OWNER', 'DENTIST', 'SECRETARY', 'ASSISTANT'] },
            { name: 'Devis Multi-Options', href: '/quotes', icon: FileCheck, roles: ['OWNER', 'DENTIST', 'SECRETARY', 'ASSISTANT'] },
            { name: 'Facturation & Actes', href: '/billing', icon: DollarSign, roles: ['OWNER', 'SECRETARY', 'ACCOUNTANT', 'ASSISTANT'] },
            { name: 'Paiement en Ligne', href: '/payment', icon: CreditCard, isNew: true, roles: ['OWNER', 'CLIENT', 'SECRETARY'] },
            { name: 'Comptabilité OHADA', href: '/accounting', icon: BookOpen, roles: ['OWNER', 'ACCOUNTANT'] },
        ]
    },
    {
        title: 'Opérations & Cabinet',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'CLIENT'],
        items: [
            { name: 'Marketing IA Hub', href: '/marketing', icon: Megaphone, roles: ['OWNER'] },
            { name: 'Gestion Elite (RH)', href: '/management', icon: Briefcase, roles: ['OWNER'] },
            { name: 'Stocks & Intrants', href: '/inventory', icon: Package, roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
            { name: 'Traçabilité Hub', href: '/sterilization', icon: ShieldCheck, roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
            { name: 'Portail Patient VIP', href: '/portal', icon: UserCircle, roles: ['OWNER', 'CLIENT'] },
            { name: 'Programme Fidélité', href: '/loyalty', icon: Star, isNew: true, roles: ['OWNER', 'CLIENT'] },
        ]
    },
    {
        title: 'Communication',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'ACCOUNTANT', 'CLIENT'],
        items: [
            { name: 'Messagerie Interne', href: '/messages', icon: Hash, isNew: true, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'ACCOUNTANT'] },
            { name: 'Communication', href: '/communication', icon: MessageSquare, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
            { name: 'Notifications', href: '/notifications', icon: Bell, badge: '3', roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'CLIENT'] },
        ]
    },
    {
        title: 'Système',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'ACCOUNTANT'],
        items: [
            { name: 'Documentation Elite', href: '/documentation', icon: BookOpen },
            { name: 'Elite Academy', href: '/academy', icon: GraduationCap, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
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
    const { data: session } = useSession()
    const pathname = usePathname()

    // For demo purposes, we allow switching roles if no real session exists
    const [demoRole, setDemoRole] = useState<string>('OWNER')

    const user = session?.user ? {
        role: (session.user as any).role || 'OWNER',
        name: session.user.name || 'Utilisateur',
    } : { role: demoRole, name: demoRole === 'OWNER' ? 'Directeur Elite' : demoRole === 'ASSISTANT' ? 'Assistant Elite' : 'Patient VIP' }

    useEffect(() => {
        setMounted(true)
    }, [])

    const filteredSections = navigationSections.map(section => {
        // Check if section itself is restricted
        const sectionRoles = (section as any).roles
        if (sectionRoles) {
            if (!user || user.role === 'GUEST') return null
            if (!sectionRoles.includes(user.role)) return null
        }

        // Filter items within section
        const filteredItems = section.items.filter(item => {
            const allowed = (item as any).roles
            if (!allowed) return true
            if (!user) return false
            return allowed.includes(user.role)
        })

        if (filteredItems.length === 0) return null

        return { ...section, items: filteredItems }
    }).filter(Boolean) as typeof navigationSections

    if (!mounted) {
        return <div className={cn("w-64 bg-slate-950 h-full border-r border-white/5", className)} />
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const initials = user ? getInitials(user.name) : 'DR'

    return (
        <div className={cn(
            "flex h-full flex-col border-r border-white/5 bg-slate-950 text-slate-400 transition-all duration-300 shadow-[20px_0_40px_rgba(0,0,0,0.1)] z-40 relative",
            collapsed ? "w-20" : "w-72",
            className
        )}>
            {/* Logo */}
            <div className="flex h-24 items-center justify-between px-8 border-b border-white/5 bg-slate-950 flex-shrink-0">
                {!collapsed && (
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                            <Diamond className="h-5 w-5 text-white animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                                Dento<span className="text-emerald-500">Prestige</span>
                            </span>
                            <span className="text-[7px] font-black tracking-[.3em] text-emerald-500/80 uppercase -mt-1">Elite Management</span>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="h-10 w-10 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mx-auto">
                        <Diamond className="h-5 w-5 text-white animate-pulse" />
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex h-9 w-9 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-600 items-center justify-center text-slate-400 hover:text-white transition-all flex-shrink-0 shadow-lg"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            </div>

            <nav className="flex-1 space-y-8 px-4 py-8 overflow-y-auto no-scrollbar scroll-smooth">
                {/* Demo Role Switcher (Only if no real session) */}
                {!session && (
                    <div className="px-4 mb-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">Mode Démo : Tester les Rôles</p>
                            <div className="grid grid-cols-2 gap-2">
                                {['OWNER', 'ASSISTANT', 'CLIENT', 'ACCOUNTANT'].map(role => (
                                    <button
                                        key={role}
                                        onClick={() => setDemoRole(role)}
                                        className={cn(
                                            "text-[8px] font-black py-2 rounded-lg transition-all border",
                                            user?.role === role 
                                                ? "bg-emerald-600 border-emerald-500 text-white shadow-lg" 
                                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                        )}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {filteredSections.map((section) => (
                    <div key={section.title} className="space-y-3">
                        {!collapsed && (
                            <h3 className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 mb-2">{section.title}</h3>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        title={collapsed ? item.name : undefined}
                                        className={cn(
                                            "group flex items-center px-6 py-4 text-[12px] font-bold rounded-[1.5rem] transition-all duration-300 relative mx-2",
                                            collapsed ? "justify-center mx-0 px-0" : "gap-4",
                                            isActive
                                                ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20"
                                                : "text-slate-200 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                "h-5 w-5 flex-shrink-0 transition-all duration-300",
                                                isActive ? "text-white scale-110" : "text-slate-300 group-hover:text-white group-hover:scale-110"
                                            )}
                                        />
                                        {!collapsed && (
                                            <>
                                                <span className="flex-1 truncate tracking-tight uppercase italic">{item.name}</span>
                                                {(item as any).isNew && (
                                                    <span className="text-[7px] font-black text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest leading-none border border-emerald-500/20">New</span>
                                                )}
                                                {(item as any).badge && (
                                                    <span className="h-5 w-5 bg-emerald-500 text-[9px] font-black text-white flex items-center justify-center rounded-full shadow-lg shadow-emerald-500/20">{(item as any).badge}</span>
                                                )}
                                            </>
                                        )}
                                        {collapsed && (item as any).badge && (
                                            <span className="absolute top-1 right-1 h-4 w-4 bg-emerald-600 rounded-full text-[8px] font-black text-white flex items-center justify-center">{(item as any).badge}</span>
                                        )}
                                        
                                        {/* Active Indicator Glow */}
                                        {isActive && !collapsed && (
                                            <div className="absolute left-[-8px] w-2 h-8 bg-emerald-500 rounded-r-full shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-6 bg-slate-900/40 flex-shrink-0 border-t border-white/5">
                {collapsed ? (
                    <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-emerald-500/20 hover:scale-110 transition-transform cursor-pointer">
                            {initials}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 p-3 rounded-[1.75rem] bg-white/5 border border-white/10 shadow-2xl">
                        <div className="h-11 w-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-500/20 flex-shrink-0">
                            {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-white truncate tracking-tight italic uppercase">{user?.name || 'Dr. Aere Lao'}</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">
                                {user?.role === 'OWNER' ? 'Directeur Elite' :
                                    user?.role === 'DENTIST' ? 'Praticien Elite' :
                                        user?.role === 'ASSISTANT' ? 'Assistant Elite' :
                                            user?.role === 'SECRETARY' ? 'Secrétaire Elite' :
                                                user?.role === 'ACCOUNTANT' ? 'Comptable Elite' :
                                                    user?.role === 'CLIENT' ? 'Patient VIP' :
                                                        'Invité Elite'}
                            </p>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="h-10 w-10 rounded-xl hover:bg-red-500/10 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all shadow-sm"
                            title="Se déconnecter"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
