"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
    DollarSign, BarChart3, CreditCard, TrendingUp, ArrowUpRight, 
    FileCheck, Clock, Download, PieChart, Activity, Wallet, FileText
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function AccountantDashboard({ user }: { user: any }) {
    const finStats = [
        { label: 'Recettes Hebdomadaires', value: '3,840,000 FCFA', trend: '+12.5%', icon: DollarSign, color: 'text-emerald-500' },
        { label: 'Factures en Attente', value: '1,250,500 FCFA', trend: 'Audit requis', icon: Clock, color: 'text-amber-500' },
        { label: 'Trésorerie Actuelle', value: '45,200,000 FCFA', trend: 'Santé Optimale', icon: Wallet, color: 'text-blue-500' },
        { label: 'Charge Salariale', value: '8,400,000 FCFA', trend: 'Fixe', icon: Activity, color: 'text-slate-900' },
    ]

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header / Hero */}
            <div className="bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <BarChart3 className="h-64 w-64 text-emerald-500" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest text-white">Finance & Compta Elite</span>
                            <span className="text-slate-400 text-xs font-bold italic">Bienvenue, {user.name}</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter leading-none italic uppercase">
                            Vision <span className="text-emerald-gradient">Financière</span>
                        </h2>
                        <p className="text-slate-400 text-base font-medium leading-relaxed max-w-md">
                            Reporting OHADA en temps réel. Vos indicateurs de performance sont à jour avec les dernières encaissement Wave & Orange Money.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/accounting">
                                <Button className="bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl shadow-emerald-500/20 hover:bg-emerald-500">
                                    Grand Livre OHADA
                                </Button>
                            </Link>
                            <Link href="/accounting/tax">
                                <Button variant="outline" className="border-emerald-500/50 text-emerald-400 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 hover:bg-emerald-500/10">
                                    Fiscalité OHADA
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-8 space-y-6 min-w-[320px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Répartition Recettes</span>
                            <PieChart className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { method: 'Espèces / Chèque', percent: 45, color: 'bg-emerald-500' },
                                { method: 'Mobile Money', percent: 35, color: 'bg-orange-500' },
                                { method: 'Assurances / Virement', percent: 20, color: 'bg-blue-500' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                                        <span className="text-slate-300">{item.method}</span>
                                        <span className="text-white">{item.percent}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {finStats.map((stat, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-widest">
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Transactions */}
                <Card className="lg:col-span-2 rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight">Derniers Encaissements</CardTitle>
                            <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest">Flux de trésorerie direct</CardDescription>
                        </div>
                        <Button variant="ghost" className="text-emerald-600 font-black uppercase text-[10px] tracking-widest">Historique Complet</Button>
                    </CardHeader>
                    <div className="divide-y divide-slate-50">
                        {[
                            { patient: 'Fatou Ndiaye', ref: 'FACT-2026-001', amount: '85,000 FCFA', method: 'Wave', status: 'RÉGLÉ' },
                            { patient: 'Ibrahima Diallo', ref: 'FACT-2026-002', amount: '12,000 FCFA', method: 'Espèces', status: 'RÉGLÉ' },
                            { patient: 'Samba Ba', ref: 'FACT-2026-003', amount: '450,000 FCFA', method: 'Chèque', status: 'EN ATTENTE' },
                            { patient: 'Khady Diop', ref: 'FACT-2026-004', amount: '25,000 FCFA', method: 'Orange Money', status: 'RÉGLÉ' },
                        ].map((tx, i) => (
                            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer">
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-[9px] uppercase tracking-tighter">
                                        {tx.method.substring(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{tx.patient}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.ref} • {tx.method}</p>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-6">
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{tx.amount}</p>
                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${tx.status === 'RÉGLÉ' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-900">
                                        <Download className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Ledger Quick Tasks */}
                <div className="space-y-8">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                             <FileCheck className="h-4 w-4 text-emerald-600" /> Validation Expert
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                                <p className="text-[11px] font-bold text-slate-600">3 devis en attente de vérification fiscale.</p>
                                <Button className="w-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest h-9 rounded-xl">Traiter</Button>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                                <p className="text-[11px] font-bold text-slate-600">Clôture mensuelle prête pour signature.</p>
                                <Button className="w-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest h-9 rounded-xl">Signer OHADA</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-8 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <PieChart className="h-32 w-32" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest mb-4">Stratégie Fiscale</h3>
                        <p className="text-lg font-black mb-4 tracking-tight leading-tight italic">Maximisez vos marges avec l'analyse prédictive IA.</p>
                        <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest h-12 rounded-xl">
                            Simuler mon ROI
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
