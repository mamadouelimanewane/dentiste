"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    ShieldCheck,
    RefreshCw,
    Thermometer,
    Activity,
    Clock,
    Box,
    AlertTriangle,
    CheckCircle2,
    History,
    FileText,
    Zap,
    Waves,
    ClipboardCheck,
    FlaskConical,
    Search,
    Download,
    Settings,
    ShieldAlert
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function SterilizationPage() {
    const [viewMode, setViewMode] = useState<'LIVE' | 'HISTORY' | 'INVENTORY'>('LIVE')

    const cycles = [
        { id: 'CYC-2026-081', autoclave: 'Lisa 500 - Onyx', status: 'IN_PROGRESS', temp: '134°C', pressure: '2.1 bar', time: '18m / 45m', type: 'Prion B', batch: 'KLT-992' },
        { id: 'CYC-2026-080', autoclave: 'Lisa 300 - Quartz', status: 'SUCCESS', temp: '134°C', pressure: '2.1 bar', time: 'Terminé', type: 'Normal S', batch: 'KLT-991' },
    ]

    const instruments = [
        { id: 'INS-442', name: 'Kit Implantologie Premium', cycle: 'CYC-2026-080', patient: 'Mamadou Diallo', date: 'Aujourd\'hui 09:12', user: 'Sarah (Ass.)' },
        { id: 'INS-112', name: 'Micro-Miroir Réfractive', cycle: 'CYC-2026-078', patient: 'Sophie Faye', date: 'Hier 11:45', user: 'Alice (Ass.)' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-teal-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500">Hygiène & Aseptie Elite</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Bunker <span className="text-gold">Sterilization Lab</span></h1>
                    <p className="text-slate-500 font-medium">Gestion des cycles d'autoclave, traçabilité instrumentale et conformité ISO.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                        {(['LIVE', 'HISTORY', 'INVENTORY'] as const).map(tab => (
                            <Button
                                key={tab}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "rounded-xl px-6 text-[11px] font-black uppercase tracking-widest transition-all",
                                    viewMode === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                                onClick={() => setViewMode(tab)}
                            >
                                {tab === 'LIVE' ? 'En Direct' : tab === 'HISTORY' ? 'Historique' : 'Consommables'}
                            </Button>
                        ))}
                    </div>
                    <Button className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl px-8 shadow-xl">
                        <Zap className="h-4 w-4 mr-2" /> Nouveau Cycle
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <AnimatePresence mode="wait">
                        {viewMode === 'LIVE' && (
                            <motion.div
                                key="live"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {cycles.map(cycle => (
                                        <Card key={cycle.id} className={cn(
                                            "rounded-[3rem] border-none shadow-luxury overflow-hidden relative group transition-all",
                                            cycle.status === 'IN_PROGRESS' ? "bg-slate-950 text-white shadow-teal-500/10" : "bg-white text-slate-900 border border-slate-50"
                                        )}>
                                            <CardContent className="p-8 space-y-8">
                                                <div className="flex justify-between items-start">
                                                    <div className={cn(
                                                        "h-14 w-14 rounded-2xl flex items-center justify-center",
                                                        cycle.status === 'IN_PROGRESS' ? "bg-white/10 text-teal-400" : "bg-teal-50 text-teal-600"
                                                    )}>
                                                        <Waves className={cn("h-7 w-7", cycle.status === 'IN_PROGRESS' && "animate-pulse")} />
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className={cn(
                                                            "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-2",
                                                            cycle.status === 'IN_PROGRESS' ? "bg-teal-500/10 text-teal-400 border-teal-500/20" : "bg-teal-50 text-teal-600 border-teal-100"
                                                        )}>
                                                            {cycle.status === 'IN_PROGRESS' ? 'Phase: Plateau Vapor' : 'Cycle Terminé'}
                                                        </span>
                                                        <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">{cycle.id}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-black tracking-tight">{cycle.autoclave}</h3>
                                                    <p className={cn("text-xs font-bold uppercase tracking-widest", cycle.status === 'IN_PROGRESS' ? "text-slate-400" : "text-slate-500")}>Profil: {cycle.type} • Lot: {cycle.batch}</p>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Température</p>
                                                        <div className="flex items-center gap-1.5 font-black text-lg">
                                                            <Thermometer className="h-4 w-4 text-red-400" /> {cycle.temp}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Pression</p>
                                                        <div className="flex items-center gap-1.5 font-black text-lg">
                                                            <Activity className="h-4 w-4 text-blue-400" /> {cycle.pressure}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Temps</p>
                                                        <div className="flex items-center gap-1.5 font-black text-lg justify-end">
                                                            <Clock className="h-4 w-4 text-teal-400" /> {cycle.time.split(' / ')[0]}
                                                        </div>
                                                    </div>
                                                </div>

                                                {cycle.status === 'IN_PROGRESS' && (
                                                    <div className="pt-2">
                                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-teal-500 animate-progress" style={{ width: '45%' }} />
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Detailed History Table for current session */}
                                <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                        <h3 className="text-base font-black tracking-tighter flex items-center gap-2">
                                            <ClipboardCheck className="h-5 w-5 text-teal-600" /> Traceur Instrumentale J-0
                                        </h3>
                                        <div className="flex gap-2">
                                            <div className="h-10 w-48 relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                                <input placeholder="Scanner instrument..." className="w-full h-full bg-slate-50 border-none rounded-xl pl-9 text-[10px] font-black uppercase tracking-widest placeholder:text-slate-300 focus:ring-1 focus:ring-teal-500 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        {instruments.map((ins, i) => (
                                            <div key={i} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-6">
                                                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                                                        <FlaskConical className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-slate-900 tracking-tight">{ins.name}</h4>
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                            <span className="text-teal-600">ID: {ins.id}</span>
                                                            <span>•</span>
                                                            <span>Cycle: {ins.cycle}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-12">
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{ins.patient}</p>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ins.date}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                        <div className="h-2 w-2 rounded-full bg-teal-500" />
                                                        <span className="text-[9px] font-black uppercase text-slate-500">{ins.user}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Panel: Compliance & Maintenance */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 space-y-8 border border-slate-50">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
                                Maintenance Autoclaves
                                <Settings className="h-4 w-4" />
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Lisa 500 (Onyx)', next: '12 Mars 2026', usage: 78, status: 'OK' },
                                    { name: 'Lisa 300 (Quartz)', next: '22 Jan 2026', usage: 92, status: 'WARNING' },
                                ].map((m, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-50 hover:border-slate-200 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <p className="text-xs font-black text-slate-900 uppercase">{m.name}</p>
                                            {m.status === 'WARNING' && <AlertTriangle className="h-4 w-4 text-amber-500 animate-pulse" />}
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
                                                <span>Cycles avant révision</span>
                                                <span className={m.status === 'WARNING' ? 'text-amber-600' : 'text-slate-900'}>{100 - m.usage}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                                                <div className={cn("h-full rounded-full transition-all", m.status === 'WARNING' ? 'bg-amber-500' : 'bg-slate-900')} style={{ width: `${m.usage}%` }} />
                                            </div>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Prochaine intervention : {m.next}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck className="h-32 w-32 text-accent" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" /> Compliance Hygiène ISO
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Indicateurs chimiques', val: 'CONFORME', date: 'Matin' },
                                    { label: 'Test de vide (Bowie-Dick)', val: 'VALIDE', date: 'J-0' },
                                    { label: 'Température Stockage', val: '21.4°C', date: 'Live' },
                                ].map((s, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase">{s.label}</p>
                                            <p className="text-[10px] font-black text-accent mt-0.5">{s.val}</p>
                                        </div>
                                        <span className="text-[8px] font-bold text-slate-600">{s.date}</span>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[9px] h-11 hover:bg-white/10">Exporter Certificat Mensuel</Button>
                        </div>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-gradient-to-br from-teal-500 to-teal-700 p-8 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Box className="h-5 w-5" />
                            <h3 className="text-lg font-black tracking-tight">Consommables Stériles</h3>
                        </div>
                        <p className="text-xs text-white/80 font-medium leading-relaxed mb-6">Tracez l'utilisation des gaines, indicateurs et filtres directement sur vos cycles.</p>
                        <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                            <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                                <span>Gaines de Stérilisation</span>
                                <span>12%</span>
                            </div>
                            <p className="text-[9px] text-teal-100 font-bold italic">Alerte stock faible : Commander Lot 50x150</p>
                        </div>
                        <Button className="w-full bg-white text-teal-700 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl mt-6 shadow-lg border-none hover:bg-teal-50">Lancer Commande</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

