"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Activity, AlertCircle, FileText, User, Image as ImageIcon, 
    Plus, Sparkles, Brain, Send, PenTool, CheckCircle, 
    Clock, X, MessageSquare, ListTodo, FolderTree, RefreshCw, 
    Star, Timer, ExternalLink, Calendar, ChevronRight,
    TrendingUp, ShieldCheck, Zap, HeartPulse, GraduationCap,
    Dna, Fingerprint, Camera
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Odontogram } from "@/components/dental/Odontogram"
import { SignaturePad } from "@/components/ui/signature-pad"
import { ProtocolManager } from "@/components/dental/ProtocolManager"
import { TimeTracker } from "@/components/dental/TimeTracker"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function PatientDashboard({ params }: { params: { id: string } }) {
    const id = params.id
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [aiAnalysis, setAiAnalysis] = useState<null | { detection: string[], confidence: number }>(null)
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot' as const, text: "Bonjour Dr. Aere Lao. Dossier de M. Jean Valjean analysé. Score Elite : 85/100. Sa santé parodontale est stable." }
    ])
    const [input, setInput] = useState("")
    const [isSigning, setIsSigning] = useState(false)
    const [showSummary, setShowSummary] = useState(false)
    const [caseSummary, setCaseSummary] = useState<string | null>(null)
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
    const [toothStates, setToothStates] = useState<Record<number, any>>({})
    const [isOdontogramLoading, setIsOdontogramLoading] = useState(true)
    const [consents, setConsents] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState('TIMELINE')

    // Audit Log for access
    useEffect(() => {
        const logAccess = async () => {
            try {
                await fetch(`/api/audit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patientId: id,
                        action: 'VIEW_PATIENT_RECORD',
                        details: 'Consultation du dossier complet Elite',
                        severity: 'INFO'
                    })
                })
            } catch (p) {}
        }
        logAccess()
    }, [id])

    // Fetch Consents
    useEffect(() => {
        const fetchConsents = async () => {
            try {
                const res = await fetch(`/api/patients/${id}/consents`)
                const data = await res.json()
                if (!data.error) setConsents(data)
            } catch (error) {
                console.error("Failed to fetch consents:", error)
            }
        }
        fetchConsents()
    }, [id])

    // Fetch Tooth States
    useEffect(() => {
        const fetchToothStates = async () => {
            try {
                const res = await fetch(`/api/patients/${id}/odontogram`)
                const data = await res.json()
                if (!data.error) setToothStates(data)
            } catch (error) {
                console.error("Failed to fetch tooth states:", error)
            } finally {
                setIsOdontogramLoading(false)
            }
        }
        fetchToothStates()
    }, [id])

    const handleToothStateChange = async (number: number, state: string) => {
        setToothStates(prev => ({ ...prev, [number]: state }))
        try {
            await fetch(`/api/patients/${id}/odontogram`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toothNumber: number, status: state })
            })
        } catch (error) {
            console.error("Failed to update tooth state:", error)
        }
    }

    // Timeline Events
    const timelineEvents = [
        { date: '12 Fév 2026', title: 'Consultation Elite', type: 'CHECKUP', status: 'COMPLETED', desc: 'Détartrage & Bilan complet.' },
        { date: '15 Jan 2026', title: 'Pose Implant Sector 4', type: 'SURGERY', status: 'COMPLETED', desc: 'Succès chirurgical total.' },
        { date: '10 Déc 2025', title: 'Smile Design Preview', type: 'COSMETIC', status: 'COMPLETED', desc: 'Validation esthétique par le patient.' },
        { date: '22 Avr 2026', title: 'Pose Couronne Finale', type: 'SURGERY', status: 'PLANNED', desc: 'Rendez-vous pré-programmé.' },
    ]

    useEffect(() => {
        // Mock loading tooth states
        setTimeout(() => setIsOdontogramLoading(false), 800)
    }, [])

    const runAnalysis = () => {
        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            setAiAnalysis({
                detection: ["Caries probables sur 16", "Légère gingivite secteur 3"],
                confidence: 97.5
            })
        }, 3000)
    }

    const handleSend = async () => {
        if (!input.trim()) return
        const userMsg = { role: 'user' as const, text: input }
        const newMessages = [...chatMessages, userMsg]
        setChatMessages(newMessages as any)
        setInput("")

        try {
            const apiMessages = newMessages.map(m => ({
                role: m.role === 'bot' ? 'assistant' : 'user',
                content: m.text
            }))

            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages })
            })

            const data = await response.json()
            if (data.text) {
                setChatMessages(prev => [...prev, { role: 'bot', text: data.text }] as any)
            }
        } catch (error) {
            console.error("AI Error:", error)
            setChatMessages(prev => [...prev, { role: 'bot', text: "Désolé, une erreur est survenue lors de la communication avec l'IA." }] as any)
        }
    }

    return (
        <div className="flex h-full flex-col bg-slate-50/50 pb-40">
            {/* Neural Header */}
            <div className="bg-white border-b px-8 py-10 flex flex-col md:flex-row justify-between items-start gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Dna className="h-64 w-64 text-indigo-600" />
                </div>
                <div className="flex gap-8 relative z-10">
                    <div className="h-24 w-24 rounded-[2.5rem] bg-slate-900 flex items-center justify-center text-emerald-400 text-3xl font-black shadow-2xl relative group">
                        JD
                        <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                            <ShieldCheck className="h-4 w-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 italic">Patient VIP Elite</span>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none">ID: {id.slice(0, 8)}</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Jean <span className="text-emerald-gradient">Valjean</span></h1>
                        <div className="flex gap-6 text-sm text-slate-500 mt-2 font-medium">
                            <span className="flex items-center gap-2"><User className="h-4 w-4 text-indigo-500" /> 35 ans • Homme</span>
                            <span className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-rose-500" /> Groupe A+ • Allergie Pénicilline</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-end relative z-10 w-full md:w-auto">
                    <div className="bg-slate-900 text-white rounded-[2rem] p-6 flex items-center gap-8 shadow-2xl">
                        <div className="text-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Score Elite</p>
                            <p className="text-3xl font-black text-emerald-400">85<span className="text-xs text-slate-500">/100</span></p>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10" />
                        <div className="text-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Loyalty Points</p>
                            <p className="text-3xl font-black text-gold">12.5k</p>
                        </div>
                        <Button className="h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white p-0">
                            <Plus className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-12 rounded-2xl border-slate-200 bg-white font-black uppercase text-[10px] tracking-widest">Éditer Dossier</Button>
                        <Button className="h-12 px-8 rounded-2xl bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-500/20">Initier Nouveau Soin</Button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-8 mt-10">
                <div className="flex gap-4 border-b border-slate-100 overflow-x-auto no-scrollbar py-2">
                    {[
                        { id: 'TIMELINE', label: 'Timeline Prédictive', icon: Clock },
                        { id: 'CLINICAL', label: 'Clinique & IA', icon: Activity },
                        { id: 'SMILE_GALLERY', label: 'Galerie Smile AR', icon: Camera },
                        { id: 'DOCS', label: 'Archives (GED)', icon: FileText },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab.id 
                                    ? "bg-slate-900 text-white shadow-xl translate-y-[-2px]" 
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="grid grid-cols-12 gap-10">
                    {/* Left Column - Main Content according to Tab */}
                    <div className="col-span-12 xl:col-span-8 space-y-10">
                        
                        <AnimatePresence mode="wait">
                            {activeTab === 'TIMELINE' && (
                                <motion.div key="timeline" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-10">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-black uppercase tracking-tight italic">360° Visionnaire <span className="text-emerald-600">Journey</span></h2>
                                            <Button variant="ghost" className="text-emerald-600 font-black uppercase text-[10px] tracking-widest">Projection IA 2027 →</Button>
                                        </div>
                                        <div className="relative space-y-12">
                                            <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-slate-100" />
                                            {timelineEvents.map((event, i) => (
                                                <div key={i} className="relative flex gap-10 items-start group">
                                                    <div className={cn(
                                                        "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 z-10 border-4 border-white transition-all group-hover:scale-110",
                                                        event.status === 'COMPLETED' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-900 text-white animate-pulse"
                                                    )}>
                                                        {event.status === 'COMPLETED' ? <CheckCircle className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{event.date}</span>
                                                            <span className={cn(
                                                                "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest",
                                                                event.status === 'COMPLETED' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                                                            )}>{event.status}</span>
                                                        </div>
                                                        <h4 className="text-xl font-black text-slate-900 tracking-tight italic">{event.title}</h4>
                                                        <p className="text-sm text-slate-500 font-medium italic">{event.desc}</p>
                                                    </div>
                                                    <Button variant="outline" className="ml-auto rounded-xl border-slate-100 bg-slate-50 group-hover:bg-white transition-colors">Détails</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            )}

                            {activeTab === 'CLINICAL' && (
                                <motion.div key="clinical" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                                    <Card className="rounded-[3rem] border-none shadow-luxury overflow-hidden bg-white">
                                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest">Odontogramme Haute Précision</CardTitle>
                                            <div className="flex gap-2">
                                                <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase">Vue 3D</span>
                                                <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase">Historique</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-10 flex justify-center bg-slate-50/30 min-h-[500px] items-center">
                                            {isOdontogramLoading ? (
                                                <RefreshCw className="h-10 w-10 animate-spin text-emerald-600" />
                                            ) : (
                                                <Odontogram toothStates={toothStates} onToothStateChange={handleToothStateChange} />
                                            )}
                                        </CardContent>
                                    </Card>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <ProtocolManager />
                                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 space-y-6">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Signature Patient</h3>
                                            <div className="p-8 bg-slate-50 border border-dashed rounded-3xl flex flex-col items-center justify-center text-center gap-4">
                                                <PenTool className="h-10 w-10 text-slate-300" />
                                                <p className="text-[11px] font-medium text-slate-500 italic max-w-[180px]">Aucun consentement en attente pour cette session.</p>
                                                <Button variant="outline" className="w-full rounded-2xl border-slate-200 uppercase text-[9px] font-black tracking-widest">Gérer les documents</Button>
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'SMILE_GALLERY' && (
                                <motion.div key="gallery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                                    <Card className="rounded-[4rem] border-none shadow-luxury bg-slate-900 text-white overflow-hidden relative p-12">
                                        <div className="absolute top-0 right-0 p-12 opacity-10">
                                            <Camera className="h-64 w-64 text-emerald-500" />
                                        </div>
                                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                            <div className="aspect-square w-64 md:w-80 rounded-[3rem] bg-white/5 border border-white/20 overflow-hidden group relative">
                                                <img src="https://images.unsplash.com/photo-1542610123-e813979d3e56?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100" />
                                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest">Avant / Before</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-6">
                                                <div className="flex items-center gap-3">
                                                    <Sparkles className="h-6 w-6 text-emerald-400" />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Simulation Smile Design AR</span>
                                                </div>
                                                <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Réalité <span className="text-emerald-gradient">Augmentée</span></h3>
                                                <p className="text-slate-400 font-medium italic leading-relaxed">
                                                    "Affichez le rendu final sur le visage du patient en temps réel grâce à notre moteur neural de rendu esthétique."
                                                </p>
                                                <div className="flex gap-4">
                                                    <Button className="h-14 px-8 rounded-2xl bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-emerald-600/30">Lancer Mode AR</Button>
                                                    <Button variant="ghost" className="h-14 px-8 rounded-2xl border border-white/10 text-white hover:bg-white/5 uppercase text-[10px] font-black tracking-widest">Partager Vidéo</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column - Neural Sidebar */}
                    <div className="col-span-12 xl:col-span-4 space-y-10">
                        {/* Time Tracker */}
                        <TimeTracker />

                        {/* AI Analysis Panel */}
                        <Card className="rounded-[3rem] border-none shadow-2xl bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-10 space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <Brain className="h-40 w-40 text-white" />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-6 w-6 text-emerald-400 animate-pulse" />
                                        <h3 className="text-xl font-black italic tracking-tighter uppercase italic">AI Copilot Vision</h3>
                                    </div>
                                    {aiAnalysis && <span className="px-3 py-1 bg-emerald-500 rounded-full text-[9px] font-black">{aiAnalysis.confidence}% Confiance</span>}
                                </div>
                                
                                {!aiAnalysis && !isAnalyzing ? (
                                    <div className="space-y-4">
                                        <p className="text-xs font-medium opacity-80 leading-relaxed italic">"Je peux analyser les scanners 3D et les antécédents pour détecter des anomalies invisibles."</p>
                                        <Button onClick={runAnalysis} className="w-full bg-white text-indigo-700 hover:bg-white/90 font-black h-14 rounded-2xl uppercase text-[10px] tracking-widest shadow-2xl">Lancer Analyse Neural</Button>
                                    </div>
                                ) : isAnalyzing ? (
                                    <div className="flex flex-col items-center py-10 gap-6">
                                        <div className="flex gap-2">
                                            {[1, 2, 3].map(i => <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="h-3 w-3 bg-white rounded-full" />)}
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Scanning Bio-Patterns...</p>
                                    </div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                        {aiAnalysis?.detection.map((d, i) => (
                                            <div key={i} className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10">
                                                <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                                    <Zap className="h-3 w-3 text-white" />
                                                </div>
                                                <p className="text-xs font-bold leading-relaxed">{d}</p>
                                            </div>
                                        ))}
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black h-14 rounded-2xl uppercase text-[10px] tracking-widest mt-4">Générer Rapport IA</Button>
                                    </motion.div>
                                )}
                            </div>
                        </Card>

                        {/* Neural AI Chat */}
                        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] border border-slate-100 overflow-hidden flex flex-col h-[400px] shadow-luxury">
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar transition-all">
                                {chatMessages.map((msg, i) => (
                                    <div key={i} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                        <div className={cn(
                                            "max-w-[85%] p-5 rounded-3xl text-[13px] font-medium leading-relaxed italic shadow-sm",
                                            msg.role === 'user' ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none border border-slate-50"
                                        )}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-white/50 border-t border-slate-100 flex gap-4">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Demandez au dossier..."
                                    className="h-14 text-sm bg-white border-slate-100 rounded-2xl focus-visible:ring-emerald-500 shadow-sm transition-all"
                                />
                                <Button className="h-14 w-14 rounded-2xl bg-slate-900 text-white p-0 shadow-xl" onClick={handleSend}>
                                    <Send className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Elite Academy Promotion */}
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-gold text-white p-10 space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <GraduationCap className="h-32 w-32" />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-widest italic leading-none">Elite Education</h3>
                            <p className="text-2xl font-black italic tracking-tighter leading-tight uppercase">Masterclass <span className="text-slate-950">Bio-Esthétique</span></p>
                            <p className="text-[11px] font-medium opacity-80 leading-relaxed italic">"Formez-vous aux protocoles appliqués à ce dossier sur l'Elite Academy."</p>
                            <Button className="w-full bg-white text-gold font-black h-12 rounded-2xl uppercase text-[9px] tracking-widest shadow-2xl">En savoir plus</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
