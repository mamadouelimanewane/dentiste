"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Camera, ShieldCheck, HeartPulse, MessageSquare, 
    Sparkles, Brain, CheckCircle, AlertCircle, 
    ChevronRight, ArrowLeft, Send, Activity, 
    Info, Star, Clock, Heart, Apple, Coffee
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function PostOpIAGuard() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<null | 'NORMAL' | 'WARNING'>(null)
    const [chatMessages, setChatMessages] = useState([
        { role: 'bot', text: "Bonjour Jean. Comment se passe votre récupération aujourd'hui ? Je suis là pour surveiller votre cicatrisation." }
    ])
    const [input, setInput] = useState("")

    const simulateAnalysis = () => {
        setIsAnalyzing(true)
        setAnalysisResult(null)
        setTimeout(() => {
            setIsAnalyzing(false)
            setAnalysisResult('NORMAL')
        }, 4000)
    }

    return (
        <div className="p-4 md:p-8 space-y-10 max-w-5xl mx-auto pb-40">
            {/* Header */}
            <div className="flex items-center gap-6 mb-12">
                <Button variant="ghost" onClick={() => window.location.href = '/portal'} className="h-12 w-12 rounded-2xl bg-white shadow-sm">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-1.5 w-8 bg-emerald-500 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Post-Op IA Guard Elite</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Suivi de <span className="text-emerald-gradient">Cicatrisation</span></h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Action Area */}
                <div className="lg:col-span-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Selfie Check Tool */}
                        <Card className="rounded-[4rem] border-none shadow-luxury bg-white p-12 space-y-8 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Activity className="h-40 w-40 text-emerald-600" />
                            </div>
                            <div className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center">
                                <Camera className="h-10 w-10" />
                            </div>
                            <div className="space-y-3 relative z-10">
                                <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Selfie-Check <span className="text-emerald-600">Cicatrisation</span></h3>
                                <p className="text-sm text-slate-500 font-medium italic leading-relaxed px-4">
                                    Prenez une photo nette de la zone d'intervention. Notre IA analysera instantanément les signes d'inflammation.
                                </p>
                            </div>
                            <div className="w-full aspect-[4/3] bg-slate-50 border-4 border-dashed border-slate-100 rounded-[3rem] flex items-center justify-center relative group cursor-pointer overflow-hidden" onClick={simulateAnalysis}>
                                {isAnalyzing ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex gap-2">
                                            {[1,2,3].map(i => <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="h-3 w-3 bg-emerald-500 rounded-full" />)}
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 animate-pulse">Bio-Scan en cours...</p>
                                    </div>
                                ) : analysisResult === 'NORMAL' ? (
                                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-4 text-emerald-600">
                                        <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <CheckCircle className="h-12 w-12" />
                                        </div>
                                        <p className="text-xs font-black uppercase tracking-widest leading-none bg-emerald-50 px-4 py-2 rounded-full">Cicatrisation Normale</p>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-slate-300">
                                        <Camera className="h-16 w-16 group-hover:scale-110 transition-transform" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Cliquer pour prendre/déposer</p>
                                    </div>
                                )}
                            </div>
                            <Button className="w-full h-16 rounded-[2rem] bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest shadow-xl">Analyser ma Photo</Button>
                        </Card>

                        {/* IA Suport Chat */}
                        <Card className="rounded-[4rem] border-none shadow-luxury bg-slate-900 text-white flex flex-col overflow-hidden h-full min-h-[500px]">
                            <div className="p-10 border-b border-white/5 flex items-center gap-4 bg-white/5">
                                <div className="h-12 w-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
                                    <Brain className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black italic tracking-tighter uppercase italic">Assistance <span className="text-indigo-400">Post-Op IA</span></h3>
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mt-1">Chat 24/7 Illimité</p>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar h-[350px]">
                                {chatMessages.map((msg, i) => (
                                    <div key={i} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                        <div className={cn(
                                            "max-w-[85%] p-6 rounded-3xl text-[13px] font-medium leading-relaxed italic shadow-sm relative",
                                            msg.role === 'user' ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white/10 text-white rounded-tl-none border border-white/5"
                                        )}>
                                            {msg.text}
                                            {msg.role === 'bot' && i === 0 && <div className="absolute -top-2 -left-2 bg-indigo-400 rounded-full h-4 w-4 animate-ping" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 bg-black/20 flex gap-4">
                                <Input 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Posez une question (Douleur, alimentation...)"
                                    className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus-visible:ring-indigo-500"
                                />
                                <Button className="h-14 w-14 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" onClick={() => {
                                    setChatMessages([...chatMessages, { role: 'user', text: input }])
                                    setInput("")
                                }}>
                                    <Send className="h-6 w-6" />
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Pre-Loaded Quick Support */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-6 border border-slate-50 group hover:bg-emerald-50 transition-all duration-500">
                            <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <Apple className="h-7 w-7" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none">Nutrition <span className="text-emerald-600">Elite</span></h4>
                                <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed">Aliments conseillés et texture idéale pour vos premières 48h.</p>
                            </div>
                         </Card>
                         <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-6 border border-slate-50 group hover:bg-amber-50 transition-all duration-500">
                            <div className="h-14 w-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
                                <Clock className="h-7 w-7" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none">Rappel <span className="text-amber-600">Prescription</span></h4>
                                <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed">Vos prochaines prises médicamenteuses synchronisées avec votre profil.</p>
                            </div>
                         </Card>
                         <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-6 border border-slate-50 group hover:bg-slate-900 transition-all duration-500">
                            <div className="h-14 w-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <Heart className="h-7 w-7" />
                            </div>
                            <div className="space-y-2 group-hover:text-white transition-all">
                                <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none">Hygiène <span className="text-emerald-500">Premium</span></h4>
                                <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed group-hover:text-slate-400">Protocoles de brossage et de rinçage spécifiques à votre acte.</p>
                            </div>
                         </Card>
                    </div>

                    {/* Emergency Banner */}
                    <div className="bg-rose-50 border border-rose-100 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <AlertCircle className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-rose-900 tracking-tighter italic leading-none">Urgence Clinique ?</h3>
                                <p className="text-sm font-medium text-rose-600 mt-2 italic">Notre ligne d'astreinte est ouverte 24/7 pour les patients Elite.</p>
                            </div>
                        </div>
                        <Button className="h-14 px-10 rounded-2xl bg-rose-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-rose-600/20">Contacter le Dr. de Garde</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
