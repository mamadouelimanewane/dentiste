"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bell, Search, Diamond, Menu, X, ChevronDown, Wifi, Battery, Clock, Zap } from 'lucide-react'
import { navigationSections } from './Sidebar'

const NOTIFICATIONS_PREVIEW = [
    { title: 'RDV dans 30 minutes', desc: 'Ibrahima Sow — Extraction', time: '2 min', urgent: true },
    { title: 'Paiement reçu', desc: 'Aissatou Ba — 95 000 FCFA', time: '15 min', urgent: false },
    { title: 'Stock critique', desc: 'Lidocaïne — 2 unités restantes', time: '1h', urgent: true },
]

export function Header() {
    const pathname = usePathname()
    const [currentTime, setCurrentTime] = useState(new Date())
    const [showNotifications, setShowNotifications] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Find current page title
    const currentPage = navigationSections
        .flatMap(s => s.items)
        .find(item => item.href === pathname)

    const unreadCount = 3

    // Search results
    const searchResults = searchQuery.length > 1
        ? navigationSections.flatMap(s => s.items).filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
        : []

    return (
        <>
            <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 flex-shrink-0 relative z-30">
                {/* Left: Page Title */}
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">DentoPrestige Elite</p>
                        <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">
                            {currentPage?.name || 'Tableau de Bord'}
                        </h1>
                    </div>
                </div>

                {/* Center: Search */}
                <div className="hidden md:flex items-center relative flex-1 max-w-sm mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                            placeholder="Rechercher un module, patient..."
                            className="w-full h-10 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium pl-11 pr-4 focus:outline-none focus:border-accent/30 focus:bg-white transition-all"
                        />
                        {showSearch && searchResults.length > 0 && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden z-50">
                                {searchResults.map(item => (
                                    <Link key={item.href} href={item.href}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-all"
                                        onClick={() => setSearchQuery('')}>
                                        <item.icon className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Live Clock */}
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                        <Wifi className="h-3 w-3 text-teal-500" />
                        <span className="text-xs font-black text-slate-600 tabular-nums">
                            {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    {/* Quick Actions */}
                    <Link href="/teleconsultation"
                        className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">
                        <Zap className="h-3.5 w-3.5" /> Téléconsult
                    </Link>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all"
                        >
                            <Bell className="h-4 w-4" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-[9px] font-black text-white flex items-center justify-center animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-[1.5rem] border border-slate-100 shadow-2xl overflow-hidden z-50">
                                <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                                    <h3 className="font-black text-slate-900 text-sm">Notifications</h3>
                                    <span className="text-[9px] font-black text-red-500 bg-red-100 px-2 py-0.5 rounded-full">{unreadCount} non lues</span>
                                </div>
                                <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                                    {NOTIFICATIONS_PREVIEW.map((notif, i) => (
                                        <div key={i} className="p-4 hover:bg-slate-50 transition-all cursor-pointer">
                                            <div className="flex items-start gap-3">
                                                <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${notif.urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-black text-slate-900 text-xs">{notif.title}</p>
                                                    <p className="text-[11px] text-slate-500 truncate">{notif.desc}</p>
                                                </div>
                                                <span className="text-[10px] text-slate-400 flex-shrink-0">{notif.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-slate-50">
                                    <Link href="/notifications" onClick={() => setShowNotifications(false)}
                                        className="block w-full text-center text-xs font-black text-accent hover:text-accent/80 transition-colors uppercase tracking-widest">
                                        Voir toutes les notifications →
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Avatar */}
                    <Link href="/settings"
                        className="h-10 w-10 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-black text-xs hover:bg-accent/30 transition-all">
                        DR
                    </Link>
                </div>
            </header>

            {/* Click outside to close notifications */}
            {showNotifications && (
                <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
            )}
        </>
    )
}
