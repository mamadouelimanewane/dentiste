"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
    DollarSign, BarChart3, CreditCard, TrendingUp, ArrowUpRight, 
    FileCheck, Clock, Download, PieChart, Activity, Wallet, FileText
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
            <div className="bg-white rounded-[2rem] p-10 text-slate-900 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <BarChart3 className="h-64 w-64 text-emerald-500" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-wider">Finance & Compta Elite</span>
                            <span className="text-slate-500 text-xs font-medium italic">Bienvenue, {user.name}</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight leading-none text-slate-900">
                            Vision Financière
                        </h2>
                        <p className="text-slate-500 text-sm font-normal leading-relaxed max-w-md">
                            Reporting OHADA en temps réel. Vos indicateurs de performance sont à jour avec les dernières encaissement Wave & Orange Money.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/accounting">
                                <Button className="bg-emerald-600 text-white font-semibold text-sm h-12 rounded-xl px-8 shadow-sm hover:bg-emerald-700">
                                    Grand Livre OHADA
                                </Button>
                            </Link>
                            <Link href="/accounting/tax">
                                <Button variant="outline" className="border-slate-200 text-slate-600 font-semibold text-sm h-12 rounded-xl px-8 hover:bg-slate-50">
                                    Fiscalité OHADA
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 space-y-6 min-w-[320px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Répartition Recettes</span>
                            <PieChart className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { method: 'Espèces / Chèque', percent: 45, color: 'bg-emerald-500' },
                                { method: 'Mobile Money', percent: 35, color: 'bg-orange-500' },
                                { method: 'Assurances / Virement', percent: 20, color: 'bg-blue-500' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                                        <span className="text-slate-600">{item.method}</span>
                                        <span className="text-slate-900">{item.percent}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pipeline Ribbon */}
            <div className="bg-white rounded-2xl p-6 text-slate-900 border border-slate-200 shadow-sm flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 pr-6 lg:border-r border-slate-200 shrink-0">
                    <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Flux Temps Réel</p>
                        <p className="text-xl font-bold">24 <span className="text-sm font-medium text-slate-500">Actifs</span></p>
                    </div>
                </div>
                
                <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar justify-between">
                    {[
                        { label: 'Accueil', val: 3, id: 'PHASE_1_ACCUEIL', color: 'bg-indigo-500' },
                        { label: 'Attente', val: 4, id: 'PHASE_2_ARRIVEE', color: 'bg-amber-500' },
                        { label: 'Fauteuil', val: 2, id: 'PHASE_3_CONSULTATION', color: 'bg-teal-500' },
                        { label: 'Chirurgie', val: 0, id: 'PHASE_4_ACTES', color: 'bg-rose-500', empty: true },
                        { label: 'Admin/Paiement', val: 5, id: 'PHASE_5_ADMIN', color: 'bg-blue-600' },
                        { label: 'Sortie', val: 10, id: 'PHASE_6_SUIVI', color: 'bg-emerald-500' }
                    ].map((phase, i) => (
                        <div key={i} className="flex items-center gap-2 group cursor-pointer">
                            <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl transition-all", phase.empty ? "opacity-30 grayscale" : "bg-slate-50 hover:bg-slate-100")}>
                                <div className={cn("h-3 w-3 rounded-full", phase.color)} />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 group-hover:text-slate-900 leading-none hidden sm:block whitespace-nowrap">{phase.label}</span>
                                <span className="text-sm font-bold ml-1">{phase.val}</span>
                            </div>
                            {i < 5 && <ArrowRight className="h-3 w-3 text-slate-300 hidden md:block" />}
                        </div>
                    ))}
                </div>

                <div className="pl-6 lg:border-l border-white/10 shrink-0 hidden lg:block">
                    <Link href="/workflow">
                        <Button className="bg-slate-900 text-white hover:bg-slate-800 font-semibold text-[11px] rounded-xl px-6">Ouvrir Workflow</Button>
                    </Link>
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
