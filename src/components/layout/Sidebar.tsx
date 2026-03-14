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
    Smartphone
} from 'lucide-react'

export const navigationSections = [
    {
        title: 'Gestion Clinique',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'],
        items: [
            { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'ACCOUNTANT'] },
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
        title: 'Intelligence & Pilotage',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT'],
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
        roles: ['OWNER', 'SECRETARY', 'ACCOUNTANT'],
        items: [
            { name: 'GED Elite (Vault)', href: '/ged', icon: HardDrive, roles: ['OWNER', 'DENTIST', 'SECRETARY'] },
            { name: 'Devis Multi-Options', href: '/quotes', icon: FileCheck, roles: ['OWNER', 'DENTIST', 'SECRETARY'] },
            { name: 'Facturation & Actes', href: '/billing', icon: DollarSign, roles: ['OWNER', 'SECRETARY', 'ACCOUNTANT'] },
            { name: 'Paiement en Ligne', href: '/payment', icon: CreditCard, isNew: true, roles: ['OWNER', 'CLIENT', 'SECRETARY', 'ACCOUNTANT'] },
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
            { name: 'Programme Fidélité', href: '/loyalty', icon: Star, isNew: true, roles: ['OWNER', 'CLIENT', 'SECRETARY'] },
        ]
    },
    {
        title: 'Communication',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'ACCOUNTANT', 'CLIENT'],
        items: [
            { name: 'Messagerie Interne', href: '/messages', icon: Hash, isNew: true, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'ACCOUNTANT'] },
            { name: 'Communication', href: '/communication', icon: MessageSquare },
            { name: 'Notifications', href: '/notifications', icon: Bell, badge: '3' },
        ]
    },
    {
        title: 'Système',
        roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY', 'ACCOUNTANT'],
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
    const { data: session } = useSession()
    const pathname = usePathname()

    const user = session?.user ? {
        role: (session.user as any).role || 'OWNER',
        name: session.user.name || 'Utilisateur',
    } : null

    useEffect(() => {
        setMounted(true)
    }, [])

    const filteredSections = navigationSections.map(section => {
        // Check if section itself is restricted
        const sectionRoles = (section as any).roles
        if (sectionRoles) {
            if (!user) return null
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
        return <div className={cn("w-64 bg-white h-full border-r border-slate-100", className)} />
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const initials = user ? getInitials(user.name) : 'DR'
    return (
        <div className={cn(
            "flex h-full flex-col border-r bg-white text-slate-600 transition-all duration-300 shadow-sm",
            collapsed ? "w-20" : "w-64",
            className
        )}>
            {/* Logo */}
            <div className="flex h-20 items-center justify-between px-6 border-b border-slate-100 bg-white flex-shrink-0">
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                            <Diamond className="h-5 w-5 text-white animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tighter text-slate-900 uppercase italic">
                                Dento<span className="text-emerald-600">Prestige</span>
                            </span>
                            <span className="text-[7px] font-black tracking-[.3em] text-emerald-600/80 uppercase -mt-1">Elite Management</span>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mx-auto">
                        <Diamond className="h-5 w-5 text-white animate-pulse" />
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 items-center justify-center text-slate-400 hover:text-slate-900 transition-all flex-shrink-0"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            </div>

            <nav className="flex-1 space-y-8 px-4 py-8 overflow-y-auto no-scrollbar">
                {filteredSections.map((section) => (
                    <div key={section.title} className="space-y-2">
                        {!collapsed && (
                            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{section.title}</h3>
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
                                            "group flex items-center px-4 py-3 text-[13px] font-bold rounded-2xl transition-all duration-300 relative",
                                            collapsed ? "justify-center" : "gap-3",
                                            isActive
                                                ? "bg-emerald-50 text-emerald-700 shadow-sm"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                "h-5 w-5 flex-shrink-0 transition-all duration-300",
                                                isActive ? "text-emerald-600 scale-110" : "text-slate-400 group-hover:text-slate-600 group-hover:scale-110"
                                            )}
                                        />
                                        {!collapsed && (
                                            <>
                                                <span className="flex-1 truncate tracking-tight">{item.name}</span>
                                                {(item as any).isNew && (
                                                    <span className="text-[8px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-widest leading-none">New</span>
                                                )}
                                                {(item as any).badge && (
                                                    <span className="h-5 w-5 bg-emerald-600 rounded-full text-[9px] font-black text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">{(item as any).badge}</span>
                                                )}
                                            </>
                                        )}
                                        {collapsed && (item as any).badge && (
                                            <span className="absolute top-1 right-1 h-4 w-4 bg-emerald-600 rounded-full text-[8px] font-black text-white flex items-center justify-center">{(item as any).badge}</span>
                                        )}
                                        
                                        {/* Active Indicator Dot */}
                                        {isActive && !collapsed && (
                                            <div className="absolute left-0 w-1 h-6 bg-emerald-600 rounded-r-full shadow-[0_0_12px_rgba(5,150,105,0.4)]" />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 bg-slate-50/50 flex-shrink-0 border-t border-slate-100">
                {collapsed ? (
                    <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 font-black text-xs shadow-sm hover:scale-110 transition-transform cursor-pointer">
                            {initials}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-2 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm">
                        <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-500/20 flex-shrink-0">
                            {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-slate-900 truncate tracking-tight">{user?.name || 'Dr. Aere Lao'}</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600/80">
                                {user?.role === 'OWNER' ? 'Admin Elite' :
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
                            className="h-8 w-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all"
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
