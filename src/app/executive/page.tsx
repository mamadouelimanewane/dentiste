"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    LayoutDashboard, Users, TrendingUp, Activity, DollarSign,
    MapPin, Globe, Filter, Download, Calendar, ArrowUpRight,
    ArrowDownRight, Target, Brain, ShieldCheck, Zap, Sparkles,
    ChevronRight, Info, Building2, BarChart3, PieChart
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ExecutiveSatelliteView() {
    const [activeClinic, setActiveClinic] = useState('ALL')
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const clinics = [
        { id: 'DP_PLATEAU', name: 'DentoPrestige Plateau', location: 'Dakar Plateau', revenue: '8.4M FCFA', growth: '+12%', health: 92, status: 'EXCELLENT' },
        { id: 'DP_ALMADIES', name: 'DentoPrestige Almadies', location: 'Les Almadies', revenue: '12.2M FCFA', growth: '+18%', health: 88, status: 'TOP_PERFORMANCE' },
        { id: 'DP_SAINTLOUIS', name: 'DentoPrestige St-Louis', location: 'Saint-Louis', revenue: '4.1M FCFA', growth: '-2%', health: 74, status: 'ATTENTION' },
    ]

    const stats = [
        { label: 'Revenu Total Flotte', value: '24.7M FCFA', trend: '+14.5%', icon: DollarSign, color: 'emerald' },
        { label: 'Patients Actifs', value: '1,245', trend: '+8.2%', icon: Users, color: 'blue' },
        { label: 'Taux de Conversion (Studio)', value: '72%', trend: '+4.1%', icon: Activity, color: 'indigo' },
        { label: 'Indice Satisfaction Global', value: '4.9/5', trend: 'Stable', icon: ShieldCheck, color: 'teal' },
    ]

    const runBenchmarking = () => {
        setIsAnalyzing(true)
        setTimeout(() => setIsAnalyzing(false), 3000)
    }

    return (
        <div className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto pb-40">
            {/* Executive Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Globe className="h-64 w-64 text-emerald-500" />
                </div>
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-emerald-600 rounded-2xl flex items-center justify-center">
                            <Target className="h-6 w-6 text-white animate-pulse" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">Vision Stratégique Flotte</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Executive <span className="text-emerald-gradient">Satellite View</span></h1>
                    <p className="text-slate-400 font-medium italic max-w-lg leading-relaxed">
                        Pilotage multi-clinique en temps réel. Analyse comparative et optimisation IA de votre réseau de soins.
                    </p>
                </div>
                <div className="relative z-10 flex gap-4 w-full md:w-auto">
                    <Button onClick={runBenchmarking} disabled={isAnalyzing} className="h-16 px-10 rounded-2xl bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest hover:bg-emerald-50 transition-all shadow-xl">
                        {isAnalyzing ? "Analyse Flotte..." : "Benchmarking Global"}
                    </Button>
                    <Button variant="outline" className="h-16 px-8 rounded-2xl border-white/20 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/5">
                        Exporter l'Audit
                    </Button>
                </div>
            </div>

            {/* Performance Fleet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <Card key={i} className="rounded-[3rem] border-none shadow-luxury bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12", `bg-${stat.color}-50 text-${stat.color}-600`)}>
                                <stat.icon className="h-7 w-7" />
                            </div>
                            <div className="text-right flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                            {stat.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : stat.trend.startsWith('-') ? <ArrowDownRight className="h-3 w-3 text-rose-500" /> : null}
                            <span className={stat.trend.startsWith('-') ? "text-rose-500" : ""}>{stat.trend}</span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Fleet Steering Map/List */}
                <div className="lg:col-span-8 space-y-10">
                    <Card className="rounded-[4rem] border-none shadow-luxury bg-white p-12 space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50 pb-8">
                            <h2 className="text-xl font-black uppercase tracking-tight italic">État de Santé des <span className="text-emerald-600">Unités Flotte</span></h2>
                            <div className="flex gap-2">
                                <Button variant="ghost" className="h-10 rounded-xl bg-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-500">Filtrer par Performance</Button>
                                <Button className="h-10 rounded-xl bg-slate-950 text-[9px] font-black uppercase tracking-widest text-white shadow-xl">Vue Map</Button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {clinics.map((clinic) => (
                                <div key={clinic.id} className="p-8 rounded-[3rem] bg-slate-50 hover:bg-white hover:shadow-2xl border border-transparent hover:border-slate-100 transition-all group flex flex-col md:flex-row md:items-center gap-10">
                                    <div className="h-20 w-20 rounded-[1.75rem] bg-slate-900 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                        <Building2 className="h-10 w-10 text-emerald-400" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{clinic.name}</h4>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                clinic.status === 'EXCELLENT' ? "bg-emerald-50 text-emerald-600" :
                                                clinic.status === 'TOP_PERFORMANCE' ? "bg-indigo-50 text-indigo-600" : "bg-orange-50 text-orange-600"
                                            )}>{clinic.status}</span>
                                        </div>
                                        <div className="flex gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">
                                            <span className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {clinic.location}</span>
                                            <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> Health: {clinic.health}%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-12">
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Revenu Mensuel</p>
                                            <p className="text-2xl font-black text-slate-900">{clinic.revenue}</p>
                                            <span className={cn("text-[10px] font-black", clinic.growth.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>{clinic.growth} vs M-1</span>
                                        </div>
                                        <ChevronRight className="h-8 w-8 text-slate-200 group-hover:text-emerald-600 group-hover:translate-x-2 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Fleet Analytics Hub */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Mix Services Flotte</h3>
                                <PieChart className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Implantologie', value: 45, color: 'emerald' },
                                    { label: 'Smile Design', value: 30, color: 'indigo' },
                                    { label: 'Omni-soins', value: 25, color: 'slate' },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span>{item.label}</span>
                                            <span>{item.value}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ duration: 1.5, delay: i * 0.2 }} className={cn("h-full rounded-full", `bg-${item.color}-600`)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Tendances Hebdomadaires</h3>
                                <BarChart3 className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex items-end justify-between h-32 pt-4">
                                {[40, 65, 55, 90, 75, 85, 95].map((val, i) => (
                                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${val}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="w-4 bg-slate-100 hover:bg-emerald-500 rounded-t-lg transition-colors group relative cursor-pointer">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                                            {val}k
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest pt-2">
                                <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* AI Executive Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="rounded-[4rem] border-none shadow-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-12 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
                            <Brain className="h-48 w-48 text-emerald-500" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 leading-none">AI Market Benchmarks</span>
                            </div>
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Neural <span className="text-emerald-400">Positioning</span></h3>
                            <div className="space-y-6">
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Positionnement vs Dakar Elite</p>
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl font-black">Top 5%</div>
                                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <p className="text-[11px] font-medium opacity-60 mt-2 italic leading-relaxed">
                                        "Votre cabinet Almadies sur-performe de 45% la moyenne locale sur les actes de Smile Design."
                                    </p>
                                </div>
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Optimisation Flotte Suggérée</p>
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 text-[11px] font-bold italic opacity-80">
                                            <Zap className="h-4 w-4 text-gold shrink-0" />
                                            Redéployer 10% du stock d'implants de Plateau vers Almadies.
                                        </li>
                                        <li className="flex gap-3 text-[11px] font-bold italic opacity-80">
                                            <Zap className="h-4 w-4 text-gold shrink-0" />
                                            Lancer une campagne de parodontologie spécifique à Saint-Louis.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Button className="w-full h-16 rounded-[2rem] bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-emerald-600/20 active:scale-95 transition-all">Générer Stratégie Flotte</Button>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Alertes Critiques Flotte</h3>
                            <Info className="h-5 w-5 text-rose-500" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: 'Rupture Stock Plateau', desc: 'Seringues anesthésie G-Type', type: 'STOCK', color: 'rose' },
                                { title: 'Absence Praticien St-Louis', desc: 'Dr. Faye indisponible 14/03', type: 'HR', color: 'amber' },
                                { title: 'Objectif Revenu Atteint', desc: 'Almadies - 110% de la cible', type: 'FINANCE', color: 'emerald' },
                            ].map((alert, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:scale-105 transition-all cursor-pointer">
                                    <div className={cn("h-4 w-4 rounded-full shrink-0 mt-1", `bg-${alert.color}-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]`)} />
                                    <div>
                                        <p className="text-xs font-black text-slate-900 leading-tight italic">{alert.title}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1">{alert.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
            
            <AnimatePresence>
                {isAnalyzing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-8">
                        <div className="max-w-xl w-full text-center space-y-10">
                            <div className="relative h-48 w-48 mx-auto">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute inset-0 border-[6px] border-emerald-500/10 rounded-full border-t-emerald-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Globe className="h-16 w-16 text-emerald-500 animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase italic">Neural Fleet <span className="text-emerald-500">Scanning</span></h3>
                                <div className="flex flex-col gap-2">
                                    <p className="text-slate-400 text-sm font-medium animate-pulse">Agrégation des métriques réelles multi-sites...</p>
                                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Optimisation des flux et ressources via DeepSeek Vision Engine</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
