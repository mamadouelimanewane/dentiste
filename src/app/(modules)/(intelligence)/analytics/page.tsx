"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    BarChart3,
    TrendingUp,
    Users,
    Activity,
    AlertTriangle,
    CheckCircle2,
    DollarSign,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
    PieChart,
    ChevronRight,
    Zap,
    Scale,
    LineChart
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/analytics')
                const json = await res.json()
                setData(json)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-900">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <Loader2 className="h-16 w-16 animate-spin text-teal-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Zap className="h-6 w-6 text-white animate-pulse" />
                        </div>
                    </div>
                    <p className="font-black text-[10px] uppercase tracking-[0.5em] text-teal-500">Processing Neural Analytics...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 space-y-12 max-w-7xl mx-auto pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1 w-12 bg-teal-500 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500">Advanced Decision Engine</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Clinical & <span className="text-slate-400">Business Intel</span></h1>
                    <p className="text-slate-500 font-medium mt-2">Analytique haute-fidélité et benchmarking en temps réel.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-bold h-12 px-6">Exporter PDF</Button>
                    <Button className="bg-slate-900 text-white rounded-2xl font-black h-12 px-8 shadow-xl shadow-slate-900/20">Configurer Objectifs</Button>
                </div>
            </div>

            {/* Quick KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Taux de Réussite Clinique', value: data?.clinical?.successRate || '100%', icon: Activity, color: 'text-teal-600', trend: '+1.2%', up: true },
                    { label: 'Indicateur de Fidélisation', value: data?.retention?.retentionRate || '0%', icon: Users, color: 'text-indigo-600', trend: '+4%', up: true },
                    { label: 'Marge Opérationnelle', value: (data?.profitability?.margin || 0).toFixed(1) + "%", icon: TrendingUp, color: 'text-pink-600', trend: '-2%', up: false },
                    { label: 'Prévisionnel 30j (CA)', value: (data?.forecast?.potential || 0).toLocaleString() + '€', icon: Target, color: 'text-amber-500', trend: '+15%', up: true },
                ].map((kpi, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white group hover:scale-[1.02] transition-all overflow-hidden border border-slate-50">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("p-4 rounded-2xl bg-slate-50", kpi.color)}>
                                    <kpi.icon className="h-6 w-6" />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full",
                                    kpi.up ? "bg-teal-50 text-teal-600" : "bg-red-50 text-red-600"
                                )}>
                                    {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {kpi.trend}
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Clinical Success Chart */}
                <Card className="col-span-12 lg:col-span-8 rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden border border-slate-50">
                    <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black tracking-tight mb-1">Efficacité Clinique & Complications</CardTitle>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance par acte sur les 6 derniers mois</p>
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-teal-500" />
                    </CardHeader>
                    <CardContent className="p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Visual representation of success rate */}
                            <div className="relative aspect-square flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="70"
                                        className="fill-none stroke-slate-100"
                                        strokeWidth="24"
                                    />
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="70"
                                        className="fill-none stroke-teal-500"
                                        strokeWidth="24"
                                        strokeDasharray="440"
                                        strokeDashoffset={440 - (440 * parseFloat(data?.clinical?.successRate || '100')) / 100}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute text-center">
                                    <p className="text-5xl font-black text-slate-900 leading-none">{data?.clinical?.successRate}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Succès</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-2">
                                    <AlertTriangle className="h-3 w-3" /> Focus Complications
                                </h4>
                                <div className="space-y-4">
                                    {(data?.clinical?.recentComplications || []).length > 0 ? (
                                        (data?.clinical?.recentComplications || []).map((comp: any, i: number) => (
                                            <div key={i} className="p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-black text-red-800 uppercase tracking-tight">{comp.complicationType || 'Générique'}</p>
                                                    <p className="text-[10px] font-medium text-red-600/70">{comp.description} (Dent {comp.toothNumber})</p>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-red-200" />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-10 text-center bg-teal-50/30 rounded-3xl border border-dashed border-teal-100">
                                            <CheckCircle2 className="h-8 w-8 text-teal-500 mx-auto mb-3" />
                                            <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Aucune complication détectée</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Benchmarking Side Card */}
                <Card className="col-span-12 lg:col-span-4 rounded-[3rem] border-none shadow-luxury bg-indigo-900 text-white p-10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <Scale className="h-40 w-40" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Benchmarking Secteur</span>
                            <h3 className="text-2xl font-black tracking-tighter mt-4 leading-tight">CA Moyen par Patient</h3>
                            <p className="text-indigo-200/70 text-sm mt-4 leading-relaxed">Comparaison anonymisée avec les cabinets de typologie similaire (Afrique de l'Ouest / OHADA).</p>
                        </div>

                        <div className="space-y-8 mt-12">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>Votre Cabinet</span>
                                    <span>{data?.benchmarking?.office}€</span>
                                </div>
                                <div className="h-3 w-full bg-indigo-950 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-400" style={{ width: '85%' }} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-300">
                                    <span>Moyenne Secteur</span>
                                    <span>{data?.benchmarking?.industryAvg}€</span>
                                </div>
                                <div className="h-3 w-full bg-indigo-950 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/20" style={{ width: '60%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <p className="text-center text-[11px] font-bold text-teal-300">Votre performance est +18% supérieure à la moyenne régionale.</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Production & Profitability Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Production by Category */}
                <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 border border-slate-50">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Production par Acte</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume financier par catégorie</p>
                        </div>
                        <PieChart className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="space-y-6">
                        {(data?.production?.byCategory || []).map((cat: any, i: number) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-24 text-[10px] font-black uppercase tracking-tighter text-slate-500 truncate">{cat.category || 'N/A'}</div>
                                <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 rounded-full"
                                        style={{ width: `${Math.min(100, (cat._sum.cost / (data?.profitability?.totalRevenue || 1)) * 100)}%` }}
                                    />
                                </div>
                                <div className="w-20 text-right text-xs font-black text-slate-900">{cat._sum.cost?.toLocaleString()}€</div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Profitability */}
                <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white p-10 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-10 opacity-20 transform translate-y-1/4">
                        <BarChart3 className="h-48 w-48 text-pink-500" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-4 w-4 text-pink-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-pink-500">Rentabilité Pure</span>
                        </div>
                        <h3 className="text-xl font-black tracking-tight mb-8">Analyse des Coûts & Bénéfices</h3>

                        <div className="grid grid-cols-2 gap-10 mt-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Revenu Brut</p>
                                <p className="text-3xl font-black text-white">{data?.profitability?.totalRevenue?.toLocaleString()}€</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500/80 mb-2">Coûts Directs</p>
                                <p className="text-3xl font-black text-pink-500">-{data?.profitability?.totalEstimatedCost?.toLocaleString()}€</p>
                            </div>
                        </div>

                        <div className="mt-12 bg-white/5 rounded-[2rem] p-8 border border-white/5 backdrop-blur-md">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Marge Nette de Production</p>
                                    <p className="text-5xl font-black text-white tracking-tighter">{data?.profitability?.netProfit?.toLocaleString()}€</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-teal-400 text-3xl font-black">{data?.profitability?.margin?.toFixed(1)}%</p>
                                    <p className="text-[9px] font-black uppercase text-teal-400/60 tracking-widest">Excellent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

