"use client"

import { useState } from 'react'
import { Odontogram, ToothState } from "@/components/dental/Odontogram"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Activity,
    Stethoscope,
    History,
    Save,
    FileText,
    Zap,
    Sparkles,
    ShieldCheck,
    Dna,
    Clock,
    UserCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ChartingPage() {
    const [toothStates, setToothStates] = useState<Record<number, ToothState>>({
        16: 'CROWN',
        21: 'CARIES',
        36: 'MISSING',
        46: 'IMPLANT'
    })

    const handleToothStateChange = (number: number, state: ToothState) => {
        setToothStates(prev => ({ ...prev, [number]: state }))
    }

    const clinicalNotes = [
        { date: '15/01/2026', author: 'Dr. Aere Lao', text: 'Pose implant dent 46. Stabilisation primaire excellente.', type: 'CHIRURGIE' },
        { date: '08/01/2026', author: 'Dr. Aere Lao', text: 'Détartrage complet et polissage. Sensibilité gingivale légère.', type: 'SOINS' },
        { date: '22/12/2025', author: 'Dr. Aere Lao', text: 'Observation carie débutante sur dent 21. À surveiller.', type: 'OBSERVATION' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Dossier Clinique Elite</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Schéma & <span className="text-indigo-600">Odontogramme</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight mt-1 items-center flex gap-2">
                        <UserCircle className="h-4 w-4 text-slate-400" /> Patient : <span className="text-slate-900 font-bold">Mamadou Elimane WANE</span> (ID: #D-2026-X4)
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:shadow-md transition-all">
                        <History className="mr-2 h-4 w-4" /> Historique Soins
                    </Button>
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all border-none">
                        <Save className="mr-2 h-5 w-5" /> Enregistrer Dossier
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Main Odontogram Section */}
                <div className="xl:col-span-8 space-y-8">
                    <Odontogram toothStates={toothStates} onToothStateChange={handleToothStateChange} />

                    {/* AI Diagnostics Card */}
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white overflow-hidden group">
                        <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter flex items-center gap-2 uppercase">
                                    <Sparkles className="h-5 w-5 text-indigo-400" /> Analyse IA Diagnostic
                                </CardTitle>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">DeepSeek Dental Engine Active</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 animate-pulse">
                                <Zap className="h-5 w-5 text-indigo-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-widest">Observations Prédictives</h4>
                                <div className="space-y-3">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-2 w-2 rounded-full bg-red-400" />
                                            <span className="text-[10px] font-black text-white/80 uppercase">Alerte Dent 21</span>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">L'analyse radiologique suggère une progression vers la dentine. Traitement conservateur recommandé sous 30 jours.</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-2 w-2 rounded-full bg-teal-400" />
                                            <span className="text-[10px] font-black text-white/80 uppercase">Post-Opératoire Dent 46</span>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">Osseointegration à 94%. Charge prothétique envisageable dans 8 semaines.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between p-6 bg-gradient-to-br from-indigo-600/20 to-transparent rounded-[2rem] border border-white/5">
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-2">
                                        <ShieldCheck className="h-3 w-3" /> Score de Santé Globale
                                    </h4>
                                    <div className="text-4xl font-black">78%</div>
                                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: '78%' }} />
                                    </div>
                                </div>
                                <p className="text-[10px] mt-4 text-slate-500 italic font-medium">
                                    Indices basés sur la densité minérale, l'état parodontal et l'historique de soins.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Clinical Actions */}
                <div className="xl:col-span-4 space-y-6">
                    {/* Clinical Journal */}
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white">
                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Journal Clinique</CardTitle>
                            <FileText className="h-4 w-4 text-slate-300" />
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-50">
                                {clinicalNotes.map((note, i) => (
                                    <div key={i} className="p-6 hover:bg-slate-50 transition-all cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-tighter border",
                                                note.type === 'CHIRURGIE' ? "bg-red-50 text-red-600 border-red-100" :
                                                    note.type === 'SOINS' ? "bg-teal-50 text-teal-600 border-teal-100" :
                                                        "bg-slate-100 text-slate-500 border-slate-200"
                                            )}>
                                                {note.type}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400">{note.date}</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">{note.text}</p>
                                        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mt-2">{note.author}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6">
                                <Button variant="ghost" className="w-full text-xs font-black uppercase text-indigo-600 hover:bg-indigo-50 tracking-widest rounded-xl h-11">
                                    Nouveau Rapport Clinique +
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats Sidebar */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-[2rem] shadow-luxury border border-slate-50 space-y-2">
                            <Clock className="h-5 w-5 text-indigo-500" />
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Dernier Soin</p>
                            <p className="text-lg font-black text-slate-900">15 Jan.</p>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] shadow-luxury border border-slate-50 space-y-2">
                            <Dna className="h-5 w-5 text-teal-500" />
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Risque</p>
                            <p className="text-lg font-black text-teal-600">Bas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
