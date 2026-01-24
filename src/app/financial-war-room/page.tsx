"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    TrendingUp,
    TrendingDown,
    Activity,
    Target,
    Zap,
    Briefcase,
    Building2,
    DollarSign,
    BarChart3,
    PieChart,
    Rocket,
    Brain,
    ShieldCheck,
    ChevronLeft,
    RefreshCw,
    Plus,
    Minus,
    Calculator,
    Users
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function FinancialWarRoom() {
    const [scenario, setScenario] = useState('CURRENT')
    const [investment, setInvestment] = useState(40) // in Millions
    const [isSimulating, setIsSimulating] = useState(false)

    const handleSimulate = () => {
        setIsSimulating(true)
        setTimeout(() => setIsSimulating(false), 2500)
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={() => window.location.href = '/management'} className="rounded-2xl h-14 w-14 bg-white border shadow-sm">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="h-4 w-4 text-indigo-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Strategic Growth Unit</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Financial <span className="text-indigo-600">War Room</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Simulateur de croissance, analyse macro-économique et pilotage du ROI.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        Rapport Audit Annuel
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouveau Projet
                    </Button>
                </div>
            </div>

            {/* Simulation Header */}
            <Card className="rounded-[4rem] border-none shadow-2xl bg-indigo-950 text-white p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Brain className="h-96 w-96 text-white" />
                </div>
                <div className="relative z-10 grid grid-cols-12 gap-16 items-center">
                    <div className="col-span-12 lg:col-span-7 space-y-10">
                        <div className="space-y-4">
                            <span className="px-4 py-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-300">Scénario de Croissance Actif</span>
                            <h2 className="text-5xl font-black tracking-tighter leading-none">Investissement Straégique <br /><span className="text-gold italic">High Impact</span></h2>
                        </div>

                        <div className="flex items-center gap-12 bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl">
                            <div className="space-y-4 flex-1">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-indigo-300">
                                    <span>Montant Investissement</span>
                                    <span>{investment} M FCFA</span>
                                </div>
                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex items-center px-1">
                                    <div className="h-1 bg-gold rounded-full transition-all duration-500" style={{ width: `${(investment / 100) * 100}%` }} />
                                </div>
                                <div className="flex justify-between gap-4">
                                    <Button variant="ghost" onClick={() => setInvestment(prev => Math.max(5, prev - 5))} className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10"><Minus className="h-4 w-4" /></Button>
                                    <Button variant="ghost" onClick={() => setInvestment(prev => Math.min(200, prev + 5))} className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10"><Plus className="h-4 w-4" /></Button>
                                    <div className="flex-1" />
                                    <Button onClick={handleSimulate} className="bg-gold text-white font-black uppercase text-[10px] tracking-widest h-12 px-10 rounded-2xl shadow-xl shadow-gold/20">
                                        {isSimulating ? <RefreshCw className="h-4 w-4 animate-spin mr-3" /> : <Calculator className="h-4 w-4 mr-3" />}
                                        Lancer Simulation ROI
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-6">
                        {[
                            { label: 'EBITDA Projeté', value: '42%', trend: '+8.2%', icon: TrendingUp },
                            { label: 'ROI Estimé', value: '14 mois', trend: 'Ultra Fast', icon: Zap },
                            { label: 'Indice Risque', value: 'Bas', trend: 'Sécure', icon: ShieldCheck },
                            { label: 'Nouveaux Patients', value: '+450/an', trend: 'Target', icon: Users },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-between aspect-square">
                                <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                    <stat.icon className="h-5 w-5 text-indigo-300" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black text-white">{stat.value}</p>
                                    <p className="text-[9px] font-bold text-teal-400 mt-1 uppercase">{stat.trend}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-12 gap-10">
                {/* Detailed Analysis Reports */}
                <div className="col-span-12 lg:col-span-8 space-y-10">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter uppercase mb-1">Impact sur la Profitabilité</CardTitle>
                                <CardDescription className="text-sm font-medium text-slate-400 tracking-tight">Analyse détaillée par secteur d'activité après investissement de {investment}M.</CardDescription>
                            </div>
                            <PieChart className="h-6 w-6 text-indigo-500" />
                        </CardHeader>
                        <CardContent className="p-10 space-y-12">
                            {[
                                { sector: 'Implantologie Premium', increase: '+142%', label: 'Augmentation Capacité', color: 'bg-indigo-600' },
                                { sector: 'Orthodontie Invisible', increase: '+85%', label: 'Nouveaux revenus prévus', color: 'bg-teal-500' },
                                { sector: 'Chirurgie Assistée', increase: '+33%', label: 'Réduction temps intervention', color: 'bg-gold' },
                            ].map((s, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{s.sector}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                                        </div>
                                        <span className="text-3xl font-black text-slate-900 tracking-tighter">{s.increase}</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${60 + i * 15}%` }}
                                            transition={{ duration: 2, delay: i * 0.3 }}
                                            className={cn("h-full rounded-full", s.color)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 flex flex-col items-center text-center space-y-6">
                            <div className="h-20 w-20 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Building2 className="h-10 w-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tighter uppercase italic">Expansion Network</h3>
                                <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed italic">
                                    "L'ouverture d'un 4ème site à Thiès présente un ROI de 18 mois avec un potentiel de 12M FCFA/mois de CA récurrent."
                                </p>
                            </div>
                            <Button className="w-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl">Simuler Nouveau Cabinet</Button>
                        </Card>

                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 flex flex-col items-center text-center space-y-6">
                            <div className="h-20 w-20 rounded-[2.5rem] bg-amber-50 flex items-center justify-center text-amber-600">
                                <Rocket className="h-10 w-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tighter uppercase italic">Transformation Digitale</h3>
                                <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed italic">
                                    "Le passage au flux 100% numérique réduit les coûts de consommables prothétiques de 15% dès le 3ème mois."
                                </p>
                            </div>
                            <Button variant="outline" className="w-full border-slate-200 text-slate-900 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl">Rapport Digitale ROI</Button>
                        </Card>
                    </div>
                </div>

                {/* Right Scenario Feed */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Journal de Simulation</h3>
                            <Activity className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="space-y-6">
                            {[
                                { time: '14:22', msg: 'Ajustement investissement CAPEX : 40M FCFA.', type: 'ACTION' },
                                { time: '14:23', msg: 'IA détecte une opportunité sur le secteur Implants.', type: 'INSIGHT' },
                                { time: '14:25', msg: 'Simulation ROI : Seuil de rentabilité atteint Déc 2026.', type: 'RESULT' },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="text-[9px] font-black text-slate-300 mt-1">{log.time}</div>
                                    <div className="flex-1">
                                        <p className={cn(
                                            "text-[11px] font-bold",
                                            log.type === 'INSIGHT' ? "text-indigo-600" :
                                                log.type === 'RESULT' ? "text-teal-600" : "text-slate-900"
                                        )}>{log.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute -bottom-10 -left-10 opacity-10">
                            <BarChart3 className="h-40 w-40 text-gold" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-2xl font-black tracking-tighter text-white">Advisory IA Strategist</h3>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
                                <p className="text-xs font-medium text-slate-300 leading-relaxed italic">
                                    "Dr. Aere Lao, configurer cet investissement sur 24 mois au lieu de 12 permettrait de libérer 2M FCFA de cashflow mensuel pour le recrutement d'une 3ème assistante."
                                </p>
                            </div>
                            <Button className="w-full bg-gold text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl shadow-xl shadow-gold/20">Lancer l'Optimiseur IA</Button>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white border border-slate-100 p-8 text-center space-y-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Market Data Synchro</span>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 leading-tight">Mise à jour des taux d'intérêt et des flux patients régionaux effectuée à 21:00.</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}
