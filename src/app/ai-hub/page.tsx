"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Brain,
    Sparkles,
    Activity,
    TrendingUp,
    MessageSquare,
    Zap,
    ShieldCheck,
    Loader2,
    Search,
    Bot,
    Lightbulb,
    Target,
    BarChart3,
    Clock,
    UserCircle,
    Mic
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AIHubPage() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [command, setCommand] = useState("")

    const [isListening, setIsListening] = useState(false)
    const [voiceStatus, setVoiceStatus] = useState("En attente de commande...")

    const toggleListening = () => {
        if (!isListening) {
            setIsListening(true)
            setVoiceStatus("Écoute active...")
            // Simulated voice recognition sequence
            setTimeout(() => {
                setVoiceStatus("Traitement du signal...")
                setTimeout(() => {
                    const mockCommands = [
                        "Planifie un détartrage pour M. Sène mardi prochain",
                        "Affiche le rapport ROI du cabinet des Almadies",
                        "Analyse la radio panoramique de la patiente Diop",
                        "Vérifie le stock de gants nitrile"
                    ]
                    const randomCmd = mockCommands[Math.floor(Math.random() * mockCommands.length)]
                    setCommand(randomCmd)
                    setIsListening(false)
                    setVoiceStatus("Commande exécutée avec succès")
                    setTimeout(() => setVoiceStatus("En attente de commande..."), 3000)
                }, 1500)
            }, 2000)
        } else {
            setIsListening(false)
            setVoiceStatus("Session vocale interrompue")
        }
    }

    const stats = [
        { label: 'Indice de performance IA', value: '98.4%', icon: Activity, color: 'text-teal-500' },
        { label: 'Optimisations Suggérées', value: '12', icon: Lightbulb, color: 'text-amber-500' },
        { label: 'Précision Diagnostics', value: '99.1%', icon: Target, color: 'text-indigo-500' },
        { label: 'Automatisation Administrative', value: '85%', icon: Zap, color: 'text-fuchsia-500' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Neural Intelligence Layer</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">AI <span className="text-indigo-600">Command Center</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Pilotage intelligent, diagnostics assistés et automatisation clinique.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <BarChart3 className="mr-2 h-4 w-4" /> Analyse Prédictive
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <ShieldCheck className="mr-2 h-5 w-5" /> Mode Audit IA
                    </Button>
                </div>
            </div>

            {/* AI Console / Command Bar */}
            <Card className="rounded-[3rem] border-none shadow-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Brain className="h-80 w-80 text-white" />
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-400/30">
                                <Bot className="h-6 w-6 text-indigo-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Assistant Vocal & Textuel Tactique</span>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                            <div className={cn("h-2 w-2 rounded-full animate-pulse", isListening ? "bg-red-500" : "bg-teal-500")} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">{voiceStatus}</span>
                        </div>
                    </div>

                    <div className="min-h-[100px] flex items-center">
                        <AnimatePresence mode="wait">
                            {isListening ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-end gap-1.5 h-16"
                                >
                                    {[...Array(15)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [10, 40, 10, 50, 10] }}
                                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                                            className="w-1.5 bg-indigo-400 rounded-full"
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <h2 className="text-3xl font-black tracking-tight max-w-2xl animate-in fade-in slide-in-from-left-4 duration-500">
                                    {command || "\"Lancer l'analyse de rentabilité du secteur prothèse pour le mois de février.\""}
                                </h2>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-[2rem] max-w-3xl focus-within:bg-white/10 transition-all focus-within:ring-2 focus-within:ring-indigo-500/50">
                        <Search className="ml-6 h-5 w-5 text-indigo-400" />
                        <input
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            placeholder="Entrez une commande clinique ou administrative..."
                            className="bg-transparent border-none outline-none flex-1 h-14 text-sm font-bold placeholder:text-indigo-300/30 px-4"
                        />
                        <div className="flex gap-2 mr-2">
                            <Button
                                onClick={toggleListening}
                                size="icon"
                                className={cn(
                                    "h-12 w-12 rounded-2xl transition-all",
                                    isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-indigo-500 hover:bg-indigo-400"
                                )}
                            >
                                <Mic className="h-5 w-5" />
                            </Button>
                            <Button className="bg-white text-indigo-900 font-black uppercase text-[10px] tracking-widest h-12 rounded-2xl px-6">
                                Exécuter Command
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        {['Analyse RDV', 'Rappel Patients', 'Audit Sté', 'Optimisation CA'].map((tag) => (
                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-indigo-400/60 hover:text-indigo-400 cursor-pointer transition-colors">#{tag}</span>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Smart Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white group hover:translate-y-[-4px] transition-all">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-slate-50", s.color)}>
                                    <s.icon className="h-6 w-6" />
                                </div>
                                <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{s.label}</div>
                            </div>
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">{s.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* AI Predictive Reports */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter uppercase">Analyse de Performance Prédictive</CardTitle>
                                <CardDescription className="text-sm font-medium text-slate-400 mt-1">Projection basée sur l'agenda et l'historique financier.</CardDescription>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Export Rapport IA</Button>
                        </CardHeader>
                        <CardContent className="p-10 space-y-10">
                            {[
                                { title: 'Taux d\'Occupation Suggéré', value: 92, trend: '+15%', color: 'bg-indigo-500', note: 'AI suggère d\'ouvrir le créneau du samedi 15 fév.' },
                                { title: 'Rétention Patients', value: 88, trend: '+4%', color: 'bg-teal-500', note: '85 patients rappelés automatiquement par WhatsApp ce mois.' },
                                { title: 'Efficacité Traitements', value: 74, trend: '-2%', color: 'bg-amber-500', note: 'Augmentation légère des délais en chirurgie.' },
                            ].map((report, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-black text-slate-900">{report.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.note}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-slate-900">{report.value}%</span>
                                            <span className="text-[10px] font-black text-teal-600 ml-2">{report.trend}</span>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${report.value}%` }}
                                            transition={{ duration: 1.5, delay: i * 0.2 }}
                                            className={cn("h-full rounded-full", report.color)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-10 flex flex-col items-center text-center space-y-6">
                            <div className="h-20 w-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <TrendingUp className="h-10 w-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tighter uppercase">Optimisation CA</h3>
                                <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed italic">
                                    "Détection de 12 devis non transformés pour un total de 4.8M FCFA. Suggérer une relance personnalisée ?"
                                </p>
                            </div>
                            <Button className="w-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl">
                                Lancer Relances IA
                            </Button>
                        </Card>

                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-10 flex flex-col items-center text-center space-y-6">
                            <div className="h-20 w-20 rounded-3xl bg-teal-50 flex items-center justify-center text-teal-600">
                                <Sparkles className="h-10 w-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tighter uppercase">AI Clinical Guard</h3>
                                <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed italic">
                                    "Vérification multi-critères : 100% des fiches patients sont conformes aux protocoles de soins."
                                </p>
                            </div>
                            <Button variant="outline" className="w-full border-slate-200 text-slate-900 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl">
                                Rapport Conformité
                            </Button>
                        </Card>
                    </div>
                </div>

                {/* Right IA Feed / Neural Stream */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white border border-slate-100 overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <Bot className="h-4 w-4 text-indigo-500" /> Neural Activity Stream
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-50">
                                {[
                                    { time: 'À l\'instant', msg: 'Analyse automatique de la radio du patient #882 terminée.', icon: Clock, color: 'text-indigo-500' },
                                    { time: 'Il y a 12 min', msg: 'Planning optimisé : 2 rendez-vous déplacés pour boucher les trous.', icon: Zap, color: 'text-amber-500' },
                                    { time: 'Il y a 45 min', msg: 'Rappel automatique envoyé à 12 patients via WhatsApp.', icon: MessageSquare, color: 'text-teal-500' },
                                    { time: 'Il y a 2h', msg: 'Audit stock : 2 références critiques commandées automatiquement.', icon: ShieldCheck, color: 'text-fuchsia-500' },
                                    { time: 'Il y a 4h', msg: 'Calcul du CA clôturé : 100% de concordance bancaire.', icon: TrendingUp, color: 'text-green-500' },
                                ].map((activity, i) => (
                                    <div key={i} className="p-6 flex gap-4 items-start hover:bg-slate-50 transition-colors">
                                        <div className={cn("mt-1 shrink-0", activity.color)}>
                                            <activity.icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-900 leading-relaxed">{activity.msg}</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-slate-50/50 flex justify-center">
                                <Button variant="link" className="text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600">Voir journal d'intelligence complet →</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <UserCircle className="h-5 w-5 text-indigo-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statut du Neural Network</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span>Core Engine</span>
                                <span className="text-teal-400">Opérationnel</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span>Vision Module (Radios)</span>
                                <span className="text-teal-400">Actif</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span>Financial Predictor</span>
                                <span className="text-teal-400">Synchro 100%</span>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <p className="text-[10px] font-medium text-slate-500 italic">"L'IA est actuellement configurée pour assister le Dr. Aere Lao dans les prises de décisions cliniques et financières."</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
