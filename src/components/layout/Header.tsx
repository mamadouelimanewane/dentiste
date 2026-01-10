"use client"

import { Search, Bell, Settings, User, Globe, Activity } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const routeTitles: Record<string, string> = {
    "/": "Aere Lao Console",
    "/patients": "Gestion Patients",
    "/planning": "Planning 3D Elite",
    "/agenda": "Elite Planner Pro",
    "/imaging": "Elite Imaging Lab",
    "/surgery": "Bloc Chirurgical",
    "/lab": "Prosthetics Lab Center",
    "/inventory": "Elite Inventory Hub",
    "/sterilization": "Stérilisation Bunker",
    "/communication": "Communication Hub",
    "/ai-lab": "DeepSeek AI Lab",
    "/billing": "Facturation & Devis",
    "/accounting": "Comptabilité OHADA",
    "/business": "Business Intelligence",
    "/security": "Security Compliance",
    "/settings": "Command Center"
}

export function Header({ title: manualTitle }: { title?: string }) {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const getTitle = () => {
        if (manualTitle) return manualTitle
        if (!mounted) return "Chargement..."

        // Handle dynamic patient routes
        if (pathname?.startsWith('/patients/')) return "Dossier Patient"

        return routeTitles[pathname || "/"] || "Aere Lao Console"
    }

    return (
        <header className="flex h-20 items-center justify-between bg-white px-10 border-b border-slate-100 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-8 flex-1">
                <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase whitespace-nowrap">{getTitle()}</h1>

                <div className="relative w-96 group hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-accent transition-colors" />
                    <input
                        placeholder="Recherche clinique (Patient, Dossier, Acte...)"
                        className="w-full h-11 bg-slate-50 border-none rounded-xl pl-11 text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 focus:ring-1 focus:ring-accent transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 border-r pr-6 border-slate-100 hidden sm:flex">
                    <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Database Live</span>
                </div>

                <div className="flex gap-3">
                    <button className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                        <Globe className="h-4 w-4" />
                    </button>
                    <button className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all relative">
                        <Bell className="h-4 w-4" />
                        <div className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></div>
                    </button>
                    <button className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                        <Settings className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex items-center gap-4 pl-6 border-l border-slate-100 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-xs font-black text-slate-900 uppercase">Dr. Aere Lao</p>
                        <p className="text-[9px] font-bold text-accent uppercase tracking-widest">Praticien Chef</p>
                    </div>
                    <div className="h-11 w-11 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-slate-200 group-hover:scale-105 transition-all">
                        AL
                    </div>
                </div>
            </div>
        </header>
    )
}

