"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    TrendingUp,
    PieChart,
    Users,
    DollarSign,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Briefcase,
    Settings,
    ChevronRight,
    Target
} from "lucide-react"

export default function AdminMobileApp() {
    return (
        <div className="space-y-6 pt-4 px-6 pb-20">

            {/* Performance Overview (Glassmorphism Dark) */}
            <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white overflow-hidden shadow-2xl relative p-8 space-y-8">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Chiffre d'affaires (Jour)</p>
                        <h3 className="text-3xl font-black tracking-tight">2.4M <span className="text-sm font-medium text-white/40">FCFA</span></h3>
                    </div>
                    <div className="flex items-center gap-1 bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-[10px] font-black">
                        <ArrowUpRight className="h-3 w-3" />
                        +14%
                    </div>
                </div>

                <div className="h-24 flex items-end gap-1 px-2">
                    {[30, 45, 25, 60, 40, 75, 50, 90, 65, 80].map((h, i) => (
                        <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`flex-1 rounded-t-sm transition-all duration-700 ${i === 7 ? 'bg-gold shadow-[0_0_15px_rgba(197,165,114,0.5)]' : 'bg-white/10'}`}
                        />
                    ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-white/5">
                    <div className="text-center">
                        <p className="text-lg font-black text-white">42</p>
                        <p className="text-[8px] font-black text-white/40 uppercase tracking-wider">RDVs Totaux</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-black text-white">8</p>
                        <p className="text-[8px] font-black text-white/40 uppercase tracking-wider">Cancellations</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-black text-white">92%</p>
                        <p className="text-[8px] font-black text-white/40 uppercase tracking-wider">Taux Occ.</p>
                    </div>
                </div>
            </Card>

            {/* Critical Alerts */}
            <div className="bg-red-50 border border-red-100/50 rounded-3xl p-5 flex items-center gap-4">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm border border-red-50">
                    <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Alerte Stocks</p>
                    <p className="text-xs font-bold text-slate-900">3 produits en rupture critique</p>
                </div>
                <Button size="sm" className="bg-red-600 text-white rounded-lg px-4 h-8 text-[9px] font-black uppercase">Voir</Button>
            </div>

            {/* Operation Grid */}
            <div className="grid grid-cols-1 gap-4">
                {[
                    { title: "Ressources Humaines", icon: Users, sub: "4 Dentistes actifs", color: "text-blue-500", bg: "bg-blue-50" },
                    { title: "Business & Marketing", icon: Target, sub: "Campagne blanchiment active", color: "text-gold", bg: "bg-gold/10" },
                    { title: "Infrastructures", icon: Briefcase, sub: "Maintenance Fauteuil #3", color: "text-purple-500", bg: "bg-purple-50" },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-[2rem] flex items-center justify-between shadow-sm border border-slate-50">
                        <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color}`}>
                                <item.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900">{item.title}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.sub}</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-200" />
                    </div>
                ))}
            </div>

            {/* Quick KPIs Summary */}
            <div className="grid grid-cols-2 gap-4 pb-24">
                <Card className="rounded-[2rem] border-none bg-indigo-600 text-white p-6 space-y-2">
                    <TrendingUp className="h-6 w-6 text-white/60" />
                    <p className="text-xl font-black">8.4M</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Prog. Mois</p>
                </Card>
                <Card className="rounded-[2rem] border-none bg-teal-600 text-white p-6 space-y-2">
                    <Target className="h-6 w-6 text-white/60" />
                    <p className="text-xl font-black">74%</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Objectif Atteint</p>
                </Card>
            </div>
        </div>
    )
}
