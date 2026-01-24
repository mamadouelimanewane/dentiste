"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Activity,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    CreditCard,
    PieChart,
    BarChart3,
    Calendar,
    Download,
    RefreshCw,
    ShieldCheck,
    Landmark
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // Keeping it simple/mocked for visual fidelity for now or using CSS bars

export default function FinancialWarRoom() {
    // Mock Data for the "War Room" feel
    const metrics = [
        { label: "Chiffre d'Affaires (Mois)", value: "14,5M FCFA", change: "+12%", trend: "up" },
        { label: "Marge Nette", value: "42%", change: "+5%", trend: "up" },
        { label: "Cashflow Disponible", value: "8,2M FCFA", change: "-2%", trend: "down" },
        { label: "Impayés Patients", value: "450k FCFA", change: "-15%", trend: "up" }, // Green up because it went down (good)
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 italic">Executive Financial Command</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Financial <span className="text-emerald-600">War Room</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Pilotage stratégique de la rentabilité, projections 2026 et audit de performance.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Download className="mr-2 h-4 w-4" /> Export Bilan
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <RefreshCw className="mr-2 h-5 w-5" /> Live Sync Bank
                    </Button>
                </div>
            </div>

            {/* Main KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white hover:translate-y-[-4px] transition-all">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                                    {i === 0 ? <Activity className="h-6 w-6" /> :
                                        i === 1 ? <PieChart className="h-6 w-6" /> :
                                            i === 2 ? <Wallet className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                                </div>
                                <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1",
                                    m.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    {m.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {m.change}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{m.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Revenue Projections Chart Area */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative">
                        {/* Background Grid Mockup */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                        <div className="relative z-10 p-10 space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">Projection <span className="text-emerald-400">Croissance 2026</span></h3>
                                    <p className="text-slate-400 text-sm font-medium">Analyse prédictive basée sur l'historique Q4 2025.</p>
                                </div>
                                <div className="flex gap-2">
                                    {['1M', '3M', 'YTD', 'ALL'].map(t => (
                                        <button key={t} className={cn(
                                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                            t === 'YTD' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 text-slate-400 hover:bg-white/10"
                                        )}>{t}</button>
                                    ))}
                                </div>
                            </div>

                            {/* CSS Bar Chart Mockup for visual flair */}
                            <div className="h-64 flex items-end justify-between gap-4 pt-10 px-4">
                                {[40, 65, 45, 80, 55, 90, 70, 100, 85].map((h, i) => (
                                    <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                                        <div className="w-full relative">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={cn(
                                                    "w-full rounded-t-2xl absolute bottom-0 transition-all duration-300 group-hover:scale-110",
                                                    i === 7 ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]" : "bg-white/10 group-hover:bg-white/20"
                                                )}
                                                style={{ height: `${h}%` }} // Fallback
                                            />
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase">J-{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Transaction Feed */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Landmark className="h-5 w-5 text-slate-400" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Flux de Trésorerie (Live)</h3>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-black uppercase text-emerald-600">Voir tout</Button>
                        </CardHeader>
                        <div className="p-0">
                            {[
                                { desc: "Virement Sortant - Labo ProDakar", cat: "Fournisseur", amount: "- 450,000", date: "À l'instant", type: "out" },
                                { desc: "Paiement CB - Patient M. Dia", cat: "Encaissement", amount: "+ 125,000", date: "Il y a 2h", type: "in" },
                                { desc: "Prélèvement Senelec", cat: "Charges fixes", amount: "- 85,000", date: "Hier", type: "out" },
                                { desc: "Paiement Espèces - Mme Sow", cat: "Encaissement", amount: "+ 50,000", date: "Hier", type: "in" },
                            ].map((t, i) => (
                                <div key={i} className="p-6 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                            t.type === 'in' ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                                        )}>
                                            {t.type === 'in' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{t.desc}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.cat} • {t.date}</p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-sm font-black tracking-tight",
                                        t.type === 'in' ? "text-emerald-600" : "text-slate-900"
                                    )}>{t.amount} FCFA</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Side Stats & Targets */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-emerald-600 text-white p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 p-8 opacity-10">
                            <Target className="h-64 w-64" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-black tracking-tighter uppercase italic opacity-80">Objectif Mensuel</h3>
                                <p className="text-5xl font-black tracking-tighter">82%</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">12.4M / 15M FCFA Atteints</p>
                            </div>
                            <Progress value={82} className="h-3 bg-black/20" indicatorClassName="bg-white" />
                            <p className="text-[11px] font-medium leading-relaxed opacity-80 italic">
                                "Excellent travail Docteur. Vous êtes en avance de 12% par rapport à Janvier 2025. Poursuivez les cas d'implantologie pour maximiser la marge."
                            </p>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Répartition des Charges</h3>
                            <PieChart className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Achats Cliniques", val: "45%", color: "bg-indigo-500" },
                                { label: "Salaires & RH", val: "30%", color: "bg-purple-500" },
                                { label: "Loyer & Charges", val: "15%", color: "bg-slate-300" },
                                { label: "Marketing", val: "10%", color: "bg-emerald-400" },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                                        <span>{item.label}</span>
                                        <span>{item.val}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: item.val }}
                                            transition={{ delay: 0.5 + (i * 0.1) }}
                                            className={cn("h-full rounded-full", item.color)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] flex flex-col items-center text-center space-y-4">
                        <CreditCard className="h-8 w-8 text-emerald-600" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 leading-none mb-1">Terminal de Paiement</p>
                            <p className="text-xl font-black text-slate-900">TPE Connecté</p>
                        </div>
                        <p className="text-[10px] text-slate-400 px-4">Wave, Orange Money et Cartes Bancaires acceptés sans contact.</p>
                        <Button className="bg-emerald-600 text-white font-black uppercase text-[9px] tracking-widest h-10 px-6 rounded-xl hover:bg-emerald-700">Configurer TPE</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
