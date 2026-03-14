"use client"

import { useState, useEffect } from 'react'
import { 
    Clock, Users, CheckCircle, AlertCircle, QrCode, Bell, 
    ChevronRight, Wifi, Activity, Fingerprint, Mic, Sparkles,
    Smartphone, Calendar, Info, Volume2, ShieldCheck, HeartPulse
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const ANNOUNCEMENTS = [
    "Bienvenue chez DentoPrestige Elite — Excellence & Confort",
    "Votre praticien vous recevra dans quelques minutes.",
    "Découvrez nos nouveaux protocoles Smile Design exclusifs.",
    "Le Wi-Fi Elite est disponible : Dento_VIP / Prestige2026",
]

export default function WaitingRoomPage() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [activeTab, setActiveTab] = useState('LIVE_QUEUE')
    const [isBiometricScanning, setIsBiometricScanning] = useState(false)
    const [isVoiceActive, setIsVoiceActive] = useState(false)
    const [voiceStatus, setVoiceStatus] = useState('En attente...')
    const [predictionModel, setPredictionModel] = useState('Stable')

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const simulateBiometric = () => {
        setIsBiometricScanning(true)
        setTimeout(() => setIsBiometricScanning(false), 3500)
    }

    const simulateVoice = () => {
        setIsVoiceActive(true)
        setVoiceStatus('Écoute active...')
        setTimeout(() => setVoiceStatus('Analyse sémantique...'), 1500)
        setTimeout(() => {
            setVoiceStatus('Historique mis à jour avec succès.')
            setTimeout(() => setIsVoiceActive(false), 1500)
        }, 3000)
    }

    return (
        <div className="p-4 md:p-8 space-y-10 max-w-7xl mx-auto pb-40">
            {/* Elite Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[4rem] shadow-luxury border border-slate-50">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-emerald-400 shrink-0">
                        <Sparkles className="h-10 w-10 animate-pulse" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-1 w-8 bg-emerald-500 rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 italic">Concierge Digital Elite</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Expérience <span className="text-emerald-gradient">Patient VIP</span></h1>
                        <p className="text-xs md:text-sm text-slate-500 font-medium tracking-tight">Bienvenue, Jean Valjean. Votre confort est notre priorité absolue.</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <p className="text-3xl font-black tracking-tighter text-slate-900">
                        {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Système Live Sync</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Interaction Area */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Concierge Terminal */}
                    <Card className="rounded-[4rem] border-none shadow-2xl bg-slate-950 text-white overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                        <CardContent className="p-12 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Biometric Check-in */}
                                <div className="space-y-6 text-center md:text-left">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Fingerprint className="h-5 w-5 text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Check-in Biométrique</span>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter italic">Reconnaissance <span className="text-emerald-400">Sans Contact</span></h3>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                        Identifiez-vous instantanément pour valider votre arrivée sans passer par la réception.
                                    </p>
                                    <div className="relative h-48 w-full bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-center overflow-hidden group cursor-pointer" onClick={simulateBiometric}>
                                        <AnimatePresence>
                                            {isBiometricScanning && (
                                                <motion.div 
                                                    initial={{ top: '0%' }}
                                                    animate={{ top: '100%' }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                                    className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)] z-20" 
                                                />
                                            )}
                                        </AnimatePresence>
                                        <Fingerprint className={cn("h-24 w-24 text-slate-700 transition-colors duration-500", isBiometricScanning && "text-emerald-500 animate-pulse")} />
                                        {!isBiometricScanning && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px] font-black uppercase tracking-widest">Scanner maintenant</span>
                                            </div>
                                        )}
                                    </div>
                                    {isBiometricScanning && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black text-emerald-400 uppercase tracking-widest animate-pulse text-center">
                                            Analyse des points de sécurité...
                                        </motion.p>
                                    )}
                                </div>

                                {/* Voice AI Interaction */}
                                <div className="space-y-6 text-center md:text-left">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Mic className="h-5 w-5 text-indigo-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assistant Vocal Elite</span>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter italic">Mise à jour <span className="text-indigo-400">Anamnèse Vocale</span></h3>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                        "Précisez tout changement dans votre santé ou nouveaux traitements en parlant naturellement."
                                    </p>
                                    <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[3rem] flex flex-col items-center justify-center gap-4 group cursor-pointer" onClick={simulateVoice}>
                                        <div className={cn(
                                            "h-20 w-20 rounded-full flex items-center justify-center transition-all duration-500",
                                            isVoiceActive ? "bg-indigo-500 animate-pulse scale-110" : "bg-white/5 group-hover:bg-white/10"
                                        )}>
                                            <Mic className={cn("h-10 w-10 text-white", !isVoiceActive && "opacity-40")} />
                                        </div>
                                        <p className={cn("text-[10px] font-black uppercase tracking-widest", isVoiceActive ? "text-indigo-400" : "text-slate-500")}>
                                            {voiceStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Live Queue Overview */}
                    <div className="bg-white rounded-[4rem] shadow-luxury p-10 space-y-8 border border-slate-50">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-8">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight italic">Flux Patients <span className="text-emerald-600">Temps Réel</span></h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Transparence & Sérénité</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Modèle IA</p>
                                    <p className="text-xs font-black text-emerald-600">{predictionModel}</p>
                                </div>
                                <Activity className="h-6 w-6 text-emerald-500 animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'Moussa Gueye', time: 'En cours', status: 'IN_PROGRESS', room: 'Salle Elite 1', wait: '0' },
                                { name: 'Awa Diop', time: 'Suivant', status: 'NEXT', room: 'Studio VIP', wait: '5' },
                                { name: 'Jean Valjean (Vous)', time: 'Prévu : 14:15', status: 'WAITING', room: 'Salle Elite 2', wait: '12' },
                                { name: 'Fatou Binetou', time: 'Prévu : 15:00', status: 'WAITING', room: 'Salle 3', wait: '25' },
                            ].map((p, i) => (
                                <div key={i} className={cn(
                                    "p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 transition-all",
                                    p.status === 'IN_PROGRESS' ? "bg-slate-900 text-white" : 
                                    p.status === 'NEXT' ? "bg-emerald-50 border border-emerald-100" : "bg-slate-50"
                                )}>
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className={cn(
                                            "h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xs",
                                            p.status === 'IN_PROGRESS' ? "bg-emerald-500 text-white" : "bg-white text-slate-400"
                                        )}>
                                            {p.status === 'IN_PROGRESS' ? <Activity className="h-6 w-6 animate-spin-slow" /> : i + 1}
                                        </div>
                                        <div>
                                            <p className="text-lg font-black tracking-tight">{p.name}</p>
                                            <p className={cn("text-[10px] font-bold uppercase tracking-widest", p.status === 'IN_PROGRESS' ? "text-emerald-400" : "text-slate-400")}>
                                                {p.time} • {p.room}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                        <div className="text-center md:text-right">
                                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Attente estimée</p>
                                            <p className={cn("text-xl font-black", p.status === 'IN_PROGRESS' ? "text-emerald-400" : "text-slate-900")}>
                                                {p.wait} <span className="text-[10px] uppercase font-bold text-slate-400">min</span>
                                            </p>
                                        </div>
                                        <ChevronRight className={cn("h-6 w-6", p.status === 'IN_PROGRESS' ? "text-white/20" : "text-slate-200")} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Patient Sidebar Services */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic">Concierge VIP</h3>
                            <Volume2 className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: 'Assistance Boisson', icon: Sparkles, color: 'emerald' },
                                { label: 'Presse Digitale Elite', icon: Smartphone, color: 'indigo' },
                                { label: 'Wi-Fi 6 Haute Vitesse', icon: Wifi, color: 'blue' },
                                { label: 'Service Prise en Charge', icon: ShieldCheck, color: 'teal' },
                            ].map((item, i) => (
                                <button key={i} className="w-full p-6 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-100 transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-colors", `bg-${item.color}-50 text-${item.color}-600 group-hover:bg-${item.color}-500 group-hover:text-white`)}>
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-[11px] font-black text-slate-900 uppercase italic transition-colors group-hover:text-emerald-600">{item.label}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-emerald-400 transition-all group-hover:translate-x-1" />
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Emergency / SupportIA */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-emerald-600 text-white p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <HeartPulse className="h-48 w-48 text-white" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-8 bg-white/40 rounded-full" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Urgence Support IA</span>
                            </div>
                            <h3 className="text-2xl font-black tracking-tighter italic leading-tight">Besoin d'aide immédiate ?</h3>
                            <p className="text-[11px] font-medium opacity-80 leading-relaxed italic">
                                "Demandez au concierge digital pour tout besoin spécifique pendant votre attente."
                            </p>
                            <Button className="w-full bg-white text-emerald-600 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-2xl">Lancer l'Appel VIP</Button>
                        </div>
                    </Card>

                    {/* Banner Promo / Education */}
                    <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-6 relative overflow-hidden">
                        <div className="absolute -bottom-10 -left-10 opacity-20 rotate-12">
                            <Sparkles className="h-40 w-40 text-emerald-500" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 italic leading-none">Elite Insight</p>
                            <h3 className="text-xl font-black italic tracking-tighter uppercase mb-4">Saviez-vous ?</h3>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
                                "Le Smile Design Studio permet de visualiser votre futur sourire avant même de commencer les soins. Demandez au Dr. Lao."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Navigation (Mobile Optimized) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full px-8 py-4 shadow-2xl flex items-center gap-10">
                <button className="flex flex-col items-center gap-1 group">
                    <Calendar className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    <span className="text-[8px] font-black text-slate-400 uppercase">RDV</span>
                </button>
                <div className="h-8 w-[1px] bg-slate-200" />
                <button className="flex flex-col items-center gap-1 group">
                    <Info className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    <span className="text-[8px] font-black text-slate-400 uppercase">Aide</span>
                </button>
                <div className="h-8 w-[1px] bg-slate-200" />
                <button className="flex flex-col items-center gap-1 group">
                    <Volume2 className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    <span className="text-[8px] font-black text-slate-400 uppercase">Volume</span>
                </button>
            </div>
        </div>
    )
}
