"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    ShieldCheck,
    QrCode,
    RefreshCw,
    Search,
    History,
    FileText,
    Activity,
    Thermometer,
    Timer,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Package,
    ScanLine,
    Plus,
    ChevronLeft,
    Clock,
    Zap,
    Scale
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function SterilizationRegistry() {
    const [isScanning, setIsScanning] = useState(false)
    const [step, setStep] = useState(1) // 1: Preparation, 2: Cycle, 3: Validation

    const recentCycles = [
        { id: 'CY-2026-X41', type: 'Prion Cycle 134°', status: 'COMPLETED', assistant: 'Fatou D.', date: 'Aujourd\'hui 09:12', result: 'VALID' },
        { id: 'CY-2026-X40', type: 'Normal Cycle 121°', status: 'COMPLETED', assistant: 'Mamadou S.', date: 'Hier 16:45', result: 'VALID' },
        { id: 'CY-2026-X39', type: 'Prion Cycle 134°', status: 'FAILED', assistant: 'Fatou D.', date: 'Hier 11:20', result: 'INTERRUPTED' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={() => window.location.href = '/inventory'} className="rounded-2xl h-14 w-14 bg-white border shadow-sm">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="h-4 w-4 text-teal-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 italic">Hygiene & Sterilization Unit</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-teal-600">Traceability Hub</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Registre numérique de stérilisation, suivi des lots par QR Code et conformité sanitaire.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <History className="mr-2 h-4 w-4" /> Registre Légal
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouveau Cycle
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Main Interaction Area: QR Scanner / Cycle Launcher */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[4rem] border-none shadow-2xl bg-white p-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <QrCode className="h-64 w-64 text-slate-950" />
                        </div>

                        <div className="relative z-10 space-y-12">
                            <div className="flex items-center justify-between">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black tracking-tighter uppercase italic">Lancement d'une session <span className="text-teal-600">QR-Trace</span></h2>
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(s => (
                                            <div key={s} className={cn(
                                                "h-1.5 w-12 rounded-full",
                                                step >= s ? "bg-teal-500" : "bg-slate-100"
                                            )} />
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setIsScanning(!isScanning)}
                                    className={cn(
                                        "h-20 w-20 rounded-3xl flex flex-col items-center justify-center transition-all",
                                        isScanning ? "bg-rose-500 text-white animate-pulse" : "bg-slate-900 text-white hover:bg-slate-800"
                                    )}
                                >
                                    <ScanLine className="h-8 w-8 mb-1" />
                                    <span className="text-[8px] font-black uppercase">SCAN</span>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Équipement Actif</label>
                                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                    <RefreshCw className="h-6 w-6 text-teal-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 tracking-tight">Autoclave Getinge A-01</p>
                                                    <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Opérationnel</p>
                                                </div>
                                            </div>
                                            <RefreshCw className="h-4 w-4 text-slate-300 group-hover:text-teal-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sachets Instrumentaux Scannés</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="px-4 h-10 border border-teal-100 bg-teal-50/50 rounded-xl flex items-center gap-2 group hover:bg-white transition-all">
                                                    <QrCode className="h-3 w-3 text-teal-600" />
                                                    <span className="text-[10px] font-black text-slate-800">PK-00{i + 1}</span>
                                                    <XCircle className="h-3 w-3 text-slate-300 hover:text-rose-500 cursor-pointer" />
                                                </div>
                                            ))}
                                            <Button variant="ghost" className="h-10 w-10 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-teal-500 hover:text-teal-500"><Plus className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </div>

                                <Card className="bg-slate-950 text-white rounded-[3rem] p-8 space-y-8 border-none overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />
                                    <div className="flex items-center gap-4 border-b border-white/5 pb-8 mb-2">
                                        <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center text-teal-500 border border-white/10">
                                            <Zap className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cycle de Stérilisation</p>
                                            <p className="text-lg font-black tracking-tight text-white uppercase italic">PRION CORE 134°C</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Pression</p>
                                            <p className="text-xl font-black text-white">2.1 Bar</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Température</p>
                                            <p className="text-xl font-black text-white">134.5 °C</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Durée Restante</p>
                                            <p className="text-xl font-black text-teal-400">18:45 min</p>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-teal-600 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl shadow-teal-600/20">Lancer Cycle Sécurisé</Button>
                                </Card>
                            </div>
                        </div>
                    </Card>

                    {/* Historical Table */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter uppercase">Historique des Cycles & Validation</CardTitle>
                                <CardDescription className="text-xs font-bold text-slate-400 tracking-widest mt-1">Traçabilité complète à valeur probante légale.</CardDescription>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-teal-600">Filtrer par date</Button>
                        </CardHeader>
                        <div className="divide-y divide-slate-50">
                            {recentCycles.map((cycle, i) => (
                                <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-16 w-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110",
                                            cycle.result === 'VALID' ? "bg-teal-50 text-teal-600 shadow-[0_5px_15px_rgba(20,184,166,0.1)]" : "bg-rose-50 text-rose-600 shadow-[0_5px_15px_rgba(244,63,94,0.1)]"
                                        )}>
                                            {cycle.result === 'VALID' ? <CheckCircle2 className="h-8 w-8" /> : <AlertTriangle className="h-8 w-8" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <p className="text-lg font-black text-slate-900 tracking-tight">{cycle.id}</p>
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border",
                                                    cycle.result === 'VALID' ? "border-teal-200 text-teal-600 bg-teal-50" : "border-rose-200 text-rose-600 bg-rose-50"
                                                )}>{cycle.result}</span>
                                            </div>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{cycle.type} • Opérateur : {cycle.assistant}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-8">
                                        <div>
                                            <p className="text-xs font-black text-slate-900 leading-none">{cycle.date.split(' ')[1]}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cycle.date.split(' ')[0]}</p>
                                        </div>
                                        <Button size="icon" variant="ghost" className="rounded-full text-slate-300 hover:text-slate-900">
                                            <FileText className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Compliance Info */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Analyse de Conformité</h3>
                            <Activity className="h-5 w-5 text-teal-600" />
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Taux de Succès Cycles</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">97.8%</p>
                                </div>
                                <Zap className="h-8 w-8 text-gold opacity-30" />
                            </div>

                            <div className="p-6 border-slate-200 border-2 border-dashed rounded-[2rem] space-y-4">
                                <div className="flex items-center gap-3">
                                    <Scale className="h-5 w-5 text-indigo-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Statistiques de Charge</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-bold text-slate-400">
                                        <span>Consommables Chimie</span>
                                        <span>75%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '75%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Clock className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/50">Urgence Réappro</h3>
                            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                                <AlertTriangle className="h-6 w-6 text-gold" />
                                <p className="text-[11px] font-medium text-slate-300 leading-relaxed italic">
                                    "Stock de gaines de stérilisation (L-Size) inférieur au seuil. Commande programmée ce jour."
                                </p>
                            </div>
                            <Button className="w-full bg-teal-600 text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl shadow-xl shadow-teal-600/20">Valider Réappro</Button>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white border border-slate-100 p-8 flex flex-col items-center text-center space-y-4 transition-all hover:bg-slate-50 cursor-pointer">
                        <div className="h-16 w-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-xl">
                            <Package className="h-8 w-8 text-gold" />
                        </div>
                        <div>
                            <h3 className="text-base font-black tracking-tighter text-slate-900 uppercase">Stockage Stérile</h3>
                            <p className="text-[11px] font-medium text-slate-400 leading-relaxed italic mt-2">Accéder au journal de stockage des bacs validés par QR Code.</p>
                        </div>
                        <Button variant="link" className="text-[10px] font-black uppercase text-indigo-600 mt-2">Voir Registre Bacs →</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
