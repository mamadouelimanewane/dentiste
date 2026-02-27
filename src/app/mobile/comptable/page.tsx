"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    CreditCard,
    FileText,
    TrendingUp,
    DollarSign,
    PieChart,
    Briefcase,
    ChevronRight,
    ArrowDownLeft,
    ArrowUpRight,
    Download,
    Search
} from "lucide-react"

export default function AccountantMobileApp() {
    return (
        <div className="space-y-6 pt-10 px-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Module Comptable</p>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Finance <span className="text-gold">Elite</span></h1>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black shadow-xl">
                    CP
                </div>
            </div>

            {/* Daily Cashflow Summary */}
            <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white overflow-hidden shadow-2xl p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Trésorerie Actuelle</span>
                    <span className="text-[9px] font-black bg-white/10 text-white px-2 py-0.5 rounded-md uppercase tracking-widest">Temps Réel</span>
                </div>

                <h3 className="text-4xl font-black tracking-tighter">12.55M <span className="text-sm font-medium text-white/40">FCFA</span></h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Encaissements</p>
                        <div className="flex items-center gap-2">
                            <ArrowDownLeft className="h-4 w-4 text-teal-400" />
                            <span className="text-sm font-black">+450K</span>
                        </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Décaissements</p>
                        <div className="flex items-center gap-2">
                            <ArrowUpRight className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-black">-120K</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Pending Invoices / Payments */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Paiements en attente</h4>
                    <span className="text-[9px] font-black text-gold">24 factures</span>
                </div>

                {[
                    { patient: "Abdou Leye", amount: "85,000", status: "PENDING", date: "Aujourd'hui" },
                    { patient: "Ndeye Fatou", amount: "12,500", status: "LATE", date: "Hier" },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-slate-50">
                        <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 ${item.status === 'LATE' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'} rounded-xl flex items-center justify-center`}>
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900">{item.patient}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date} • {item.amount} FCFA</p>
                            </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-200" />
                    </div>
                ))}
            </div>

            {/* Financial Tools Grid */}
            <div className="grid grid-cols-2 gap-4 pb-24">
                <Card className="rounded-[2.5rem] border-none bg-white shadow-xl shadow-slate-100 p-6 flex flex-col gap-4">
                    <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                        <PieChart className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 leading-tight">Bilan<br />Mensuel</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Générer PDF</p>
                    </div>
                </Card>
                <Card className="rounded-[2.5rem] border-none bg-white shadow-xl shadow-slate-100 p-6 flex flex-col gap-4">
                    <div className="h-12 w-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                        <ArrowUpRight className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 leading-tight">Saisie<br />Dépense</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Note de frais</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
