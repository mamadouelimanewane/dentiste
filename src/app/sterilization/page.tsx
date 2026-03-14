"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
    ShieldCheck, 
    RefreshCw, 
    Zap, 
    Activity, 
    Clock, 
    CheckCircle2, 
    AlertTriangle, 
    QrCode, 
    ScanLine,
    Thermometer,
    Wind,
    Droplets,
    FileText,
    Search,
    History,
    MoreHorizontal
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function SterilizationHub() {
    const [scanActive, setScanActive] = useState(false)

    const cycles = [
        { id: 'C-2094', machine: 'Autoclave Elite A1', startTime: '10:30', duration: '45m', temp: '134°C', pressure: '2.1 bar', status: 'IN_PROGRESS', progress: 65 },
        { id: 'C-2093', machine: 'Autoclave Elite A2', startTime: '09:15', duration: '45m', temp: '134°C', pressure: '2.1 bar', status: 'COMPLETED', result: 'VALID' },
        { id: 'C-2092', machine: 'Bac Ultrasons', startTime: '08:45', duration: '15m', temp: '45°C', pressure: 'N/A', status: 'COMPLETED', result: 'VALID' },
    ]

    return (
        <div className="p-4 md:p-8 space-y-10 max-w-7xl mx-auto pb-40">
            {/* Header section with real-time status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-teal-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500 italic">Advanced Safety & Compliance</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">Sterilization <span className="text-teal-600">Hub</span></h1>
                    <p className="text-xs md:text-sm text-slate-500 font-medium tracking-tight">Traçabilité totale et monitoring des cycles biocide.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <FileText className="mr-2 h-4 w-4" /> Registre
                    </Button>
                    <Button
                        onClick={() => setScanActive(!scanActive)}
                        className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[10px] h-14 shadow-luxury transition-all"
                    >
                        <ScanLine className="mr-2 h-5 w-5" /> Scan Instrument
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {scanActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mb-10"
                    >
                        <Card className="rounded-[3rem] border-none shadow-2xl bg-teal-950 text-white p-12 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent)]" />
                            <div className="relative h-48 w-48 border-2 border-teal-500/30 rounded-[2.5rem] flex items-center justify-center group">
                                <ScanLine className="absolute inset-0 w-full h-full text-teal-500 animate-pulse" />
                                <div className="absolute inset-x-4 top-1/2 h-1 bg-teal-500 shadow-[0_0_20px_rgba(20,184,166,1)] animate-scan" />
                                <QrCode className="h-24 w-24 text-teal-500/50" />
                            </div>
                            <div className="relative z-10 space-y-2">
                                <h3 className="text-2xl font-black tracking-tighter italic">Scanner pour Traçabilité</h3>
                                <p className="text-teal-400/60 font-medium max-w-xs mx-auto">
                                    Veuillez présenter le QR Code du sachet d'instrument devant la caméra.
                                </p>
                            </div>
                            <Button variant="ghost" onClick={() => setScanActive(false)} className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest">Annuler le scan</Button>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-12 gap-8">
                {/* Active Monitoring */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cycles.map((cycle) => (
                            <Card key={cycle.id} className={cn(
                                "rounded-[3rem] border-none shadow-luxury overflow-hidden transition-all duration-500",
                                cycle.status === 'IN_PROGRESS' ? "bg-slate-900 text-white" : "bg-white"
                            )}>
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center border",
                                                cycle.status === 'IN_PROGRESS' ? "border-teal-500/30 bg-teal-500/10 text-teal-400" : "border-slate-100 bg-slate-50 text-slate-400"
                                            )}>
                                                <RefreshCw className={cn("h-6 w-6", cycle.status === 'IN_PROGRESS' && "animate-spin")} />
                                            </div>
                                            <div>
                                                <p className={cn("text-[10px] font-black uppercase tracking-widest", cycle.status === 'IN_PROGRESS' ? "text-teal-400" : "text-slate-400")}>
                                                    Cycle {cycle.id}
                                                </p>
                                                <h3 className="text-lg font-black tracking-tighter uppercase">{cycle.machine}</h3>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                            cycle.status === 'IN_PROGRESS' ? "bg-teal-500 text-white" : "bg-teal-50 text-teal-600"
                                        )}>
                                            {cycle.status === 'IN_PROGRESS' ? 'En cours' : 'Validé'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Température', val: cycle.temp, icon: Thermometer },
                                            { label: 'Pression', val: cycle.pressure, icon: Wind },
                                            { label: 'Humidité', val: 'Relative', icon: Droplets },
                                            { label: 'Démarrage', val: cycle.startTime, icon: Clock },
                                        ].map((stat, i) => (
                                            <div key={i} className={cn(
                                                "p-4 rounded-2xl flex items-center gap-3",
                                                cycle.status === 'IN_PROGRESS' ? "bg-white/5" : "bg-slate-50"
                                            )}>
                                                <stat.icon className="h-4 w-4 text-teal-500" />
                                                <div>
                                                    <p className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">{stat.label}</p>
                                                    <p className="text-xs font-black">{stat.val}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {cycle.status === 'IN_PROGRESS' && (
                                        <div className="space-y-2 pt-2">
                                            <div className="flex justify-between text-[10px] font-black">
                                                <span className="text-teal-400 uppercase">Phase Biocide</span>
                                                <span className="text-white">{cycle.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${cycle.progress}%` }}
                                                    className="h-full bg-teal-500"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {cycle.status === 'COMPLETED' && (
                                        <Button variant="ghost" className="w-full text-teal-600 font-black uppercase text-[10px] tracking-widest h-10 border-teal-100 hover:bg-teal-50">
                                            <CheckCircle2 className="mr-2 h-4 w-4" /> Imprimer Étiquettes
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Historique des Validations</h3>
                            <div className="flex items-center gap-2">
                                <Search className="h-4 w-4 text-slate-300" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filtrer par date</span>
                            </div>
                        </CardHeader>
                        <div className="divide-y divide-slate-50">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-5">
                                        <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center">
                                            <ShieldCheck className="h-5 w-5 text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 italic">Sachet d'Instruments #ST-90342</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Validé par M. Diallo · 12 Mar 2026</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-400 uppercase">ID Cycle</p>
                                            <p className="text-xs font-black text-slate-900">C-2088</p>
                                        </div>
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase">STÉRILE</span>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 rounded-xl">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Vertical Sidebar Statistics */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-teal-600 text-white p-10 space-y-8 relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <ShieldCheck className="h-64 w-64" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-black tracking-tighter uppercase italic opacity-80">Compliance</h3>
                                <CheckCircle2 className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-6xl font-black tracking-tighter">100%</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Zéro Incident Sanitaire Q1</p>
                            <div className="pt-4 border-t border-white/20">
                                <p className="text-[11px] font-medium leading-relaxed opacity-80 italic">
                                    "La traçabilité est la signature de l'excellence. Votre cabinet respecte les normes OHADA et SFD en temps réel."
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Maintenance Équipement</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Autoclave A1', next: '12 Juin 2026', status: 'OK', health: 95 },
                                { name: 'Compresseur Tech', next: '15 Avr 2026', status: 'WARN', health: 42 },
                                { name: 'Scanner 3D Elite', next: '02 Jan 2027', status: 'OK', health: 100 },
                            ].map((e, i) => (
                                <div key={i} className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[11px] font-black text-slate-900 uppercase italic">{e.name}</p>
                                            {e.status === 'WARN' && <AlertTriangle className="h-3 w-3 text-amber-500 animate-pulse" />}
                                        </div>
                                        <span className={cn(
                                            "text-[8px] font-black uppercase px-2 py-0.5 rounded-full",
                                            e.status === 'WARN' ? "bg-amber-100 text-amber-600" : "bg-teal-100 text-teal-600"
                                        )}>
                                            {e.status === 'WARN' ? 'Révision' : 'Stable'}
                                        </span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-[9px] font-bold">
                                            <span className="text-slate-400 uppercase tracking-tighter">Health Score</span>
                                            <span className="text-slate-900">{e.health}%</span>
                                        </div>
                                        <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                            <div 
                                                className={cn("h-full", e.health < 50 ? "bg-amber-500" : "bg-teal-500")} 
                                                style={{ width: `${e.health}%` }} 
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase pt-1">Prochain Service: {e.next}</p>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 h-10 hover:text-slate-900">
                            Gérer le parc équipement →
                        </Button>
                    </Card>

                    <div className="p-8 bg-teal-50 rounded-[3rem] border border-teal-100 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                            <Zap className="h-8 w-8 text-teal-400" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-teal-500 mb-1">Stock Désinfectant</p>
                                <p className="text-2xl font-black text-slate-900">Faible <span className="text-xs font-bold text-slate-400">(-15%)</span></p>
                            </div>
                            <Button className="bg-teal-600 text-white font-black uppercase text-[9px] tracking-widest h-10 px-8 rounded-xl shadow-lg shadow-teal-600/20">
                                Réapprovisionner
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
