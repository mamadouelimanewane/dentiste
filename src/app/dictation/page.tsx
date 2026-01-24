"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Mic,
    MicOff,
    CheckCircle2,
    XCircle,
    Copy,
    Save,
    FileText,
    Activity,
    Brain,
    Bot,
    Sparkles,
    ChevronLeft,
    Clock,
    Zap,
    History
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function VoiceDictationPage() {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [status, setStatus] = useState("En attente d'activation vocale...")
    const [mode, setMode] = useState<'PRESCRIPTION' | 'NOTE' | 'TREATMENT'>('NOTE')
    const [records, setRecords] = useState<any[]>([
        { id: 1, type: 'NOTE', text: 'Patient présente une sensibilité accrue sur la 16. Prévoir test de vitalité au prochain rdv.', date: 'Il y a 2h' },
        { id: 2, type: 'PRESCRIPTION', text: 'Amoxicilline 1g, 2 fois par jour pendant 7 jours. Ibuprofène 400mg si douleur.', date: 'Il y a 4h' }
    ])

    const toggleListening = () => {
        if (!isListening) {
            setIsListening(true)
            setStatus("Dictée en cours...")
            // Simulated dictation sequence
            setTimeout(() => {
                const mockTexts = {
                    'PRESCRIPTION': "Paracétamol 1g, 3 fois par jour pendant 5 jours. Bain de bouche sans alcool matin et soir.",
                    'NOTE': "Extraction de la 48 effectuée sans complication. Sutures résorbables mises en place. Contrôle dans 10 jours.",
                    'TREATMENT': "Plan de traitement validé : Pose de deux implants Nobel en secteur 2. Devis signé numériquement."
                }
                setTranscript(mockTexts[mode])
                setIsListening(false)
                setStatus("Dictée terminée. Prêt pour enregistrement.")
            }, 3000)
        } else {
            setIsListening(false)
            setStatus("Interrompu")
        }
    }

    const saveRecord = () => {
        if (!transcript) return
        const newRecord = {
            id: Date.now(),
            type: mode,
            text: transcript,
            date: "À l'instant"
        }
        setRecords([newRecord, ...records])
        setTranscript("")
        setStatus("Enregistré dans le dossier patient")
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={() => window.location.href = '/ai-hub'} className="rounded-2xl h-14 w-14 bg-white border shadow-sm">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Brain className="h-4 w-4 text-indigo-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Neural Dictation Suite</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">AI <span className="text-indigo-600">Voice Dictation</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Dictée vocale intelligente d'ordonnances et de notes cliniques.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <History className="mr-2 h-4 w-4" /> Historique Dictées
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Dictation Canvas */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[4rem] border-none shadow-2xl bg-indigo-950 text-white p-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Mic className="h-64 w-64 text-white" />
                        </div>

                        <div className="relative z-10 space-y-10">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
                                    {(['NOTE', 'PRESCRIPTION', 'TREATMENT'] as const).map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setMode(m)}
                                            className={cn(
                                                "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                mode === m ? "bg-indigo-500 text-white shadow-lg" : "text-white/40 hover:text-white"
                                            )}
                                        >
                                            {m === 'NOTE' ? 'Note Clinique' : m === 'PRESCRIPTION' ? 'Ordonnance' : 'Plan de Soins'}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                                    <div className={cn("h-2 w-2 rounded-full animate-pulse", isListening ? "bg-red-500" : "bg-teal-500")} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">{status}</span>
                                </div>
                            </div>

                            <div className="min-h-[250px] relative">
                                <AnimatePresence mode="wait">
                                    {isListening ? (
                                        <motion.div
                                            key="listening"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center justify-center gap-3 h-[250px]"
                                        >
                                            {[...Array(25)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: [20, 100, 20, 120, 20] }}
                                                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.04 }}
                                                    className="w-1.5 bg-indigo-400/60 rounded-full"
                                                />
                                            ))}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="transcript"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 h-full min-h-[250px]"
                                        >
                                            <p className={cn(
                                                "text-2xl font-medium leading-relaxed italic transition-all",
                                                transcript ? "text-white" : "text-white/20 italic"
                                            )}>
                                                {transcript || "Le texte dicté s'affichera ici en temps réel..."}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    onClick={toggleListening}
                                    className={cn(
                                        "flex-1 h-20 rounded-[2rem] text-lg font-black uppercase tracking-widest transition-all shadow-2xl",
                                        isListening ? "bg-red-500 hover:bg-red-600" : "bg-white text-indigo-900 hover:bg-slate-100"
                                    )}
                                >
                                    {isListening ? <MicOff className="mr-4 h-8 w-8" /> : <Mic className="mr-4 h-8 w-8" />}
                                    {isListening ? "Arrêter la dictée" : "Démarrer la dictée vocale"}
                                </Button>
                                {transcript && (
                                    <Button
                                        onClick={saveRecord}
                                        className="h-20 w-20 rounded-[2rem] bg-teal-500 hover:bg-teal-400 text-white shadow-2xl transition-all"
                                    >
                                        <Save className="h-8 w-8" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Historical Feed */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter uppercase">Dernières Dictées Enregistrées</CardTitle>
                                <CardDescription className="text-xs font-bold text-slate-400 tracking-widest mt-1">Tous les enregistrements sont synchronisés avec le dossier patient.</CardDescription>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Tout voir</Button>
                        </CardHeader>
                        <div className="divide-y divide-slate-50">
                            {records.map((r) => (
                                <div key={r.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform",
                                            r.type === 'PRESCRIPTION' ? "bg-rose-500" : r.type === 'TREATMENT' ? "bg-teal-500" : "bg-indigo-500"
                                        )}>
                                            {r.type === 'PRESCRIPTION' ? <FileText className="h-6 w-6" /> : r.type === 'TREATMENT' ? <Zap className="h-6 w-6" /> : <Activity className="h-6 w-6" />}
                                        </div>
                                        <div className="max-w-xl">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{r.type}</span>
                                                <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                <span className="text-[10px] font-bold text-slate-400">{r.date}</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 leading-relaxed">{r.text}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-indigo-600"><Copy className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-rose-500"><XCircle className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Intelligence Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Intelligence Linguistique</h3>
                            <Sparkles className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2.5rem]">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Correction IA</span>
                                </div>
                                <p className="text-[11px] font-bold text-indigo-900/70 leading-relaxed italic">
                                    "Le moteur IA corrige automatiquement les termes médicaux (ex: 'Amoxiciline' → 'Amoxicilline') et structure la note cliniquement."
                                </p>
                            </div>

                            <Card className="rounded-[2.5rem] border-none shadow-lg bg-slate-900 text-white p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Bot className="h-20 w-20" />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Statut Neural Core</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span>Reconnaissance</span>
                                        <span className="text-teal-400">99.2% Précis</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span>Latence</span>
                                        <span className="text-teal-400">45ms</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span>Vocabulaire</span>
                                        <span className="text-indigo-400">Dental V2</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10 text-center space-y-6">
                        <div className="h-20 w-20 rounded-[2rem] bg-white/10 flex items-center justify-center mx-auto border border-white/20 shadow-xl">
                            <Zap className="h-10 w-10 text-indigo-200" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tighter uppercase italic text-white leading-none mb-2">Workflow Automatisé</h3>
                            <p className="text-[11px] font-medium text-indigo-100 leading-relaxed">
                                Une fois dictée, l'ordonnance est générée en PDF et envoyée automatiquement à la pharmacie partenaire si cochée.
                            </p>
                        </div>
                        <Button className="w-full bg-white text-indigo-900 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl">Configurer Destinataires</Button>
                    </Card>

                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] flex items-center gap-4">
                        <Clock className="h-8 w-8 text-slate-300" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Temps de dictée cumulé</p>
                            <p className="text-lg font-black text-slate-900">1h 12m <span className="text-xs font-bold text-slate-400">ce mois</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
