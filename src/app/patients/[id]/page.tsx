"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Activity, AlertCircle, FileText, User, Image as ImageIcon, Plus, Sparkles, Brain, Send, PenTool, CheckCircle, Clock, X, MessageSquare, ListTodo, FolderTree, RefreshCw, Star, Timer, ExternalLink, Calendar } from "lucide-react"
import { Odontogram } from "@/components/dental/Odontogram"
import { SignaturePad } from "@/components/ui/signature-pad"
import { ProtocolManager } from "@/components/dental/ProtocolManager"
import { TimeTracker } from "@/components/dental/TimeTracker"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function PatientDashboard({ params }: { params: { id: string } }) {
    const id = params.id
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [aiAnalysis, setAiAnalysis] = useState<null | { detection: string[], confidence: number }>(null)
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot' as const, text: "Bonjour Dr. Aere Lao. Je suis votre assistant IA. Comment puis-je vous aider avec le dossier de M. Jean Valjean ?" }
    ])
    const [input, setInput] = useState("")
    const [isSigning, setIsSigning] = useState(false)
    const [showSummary, setShowSummary] = useState(false)
    const [caseSummary, setCaseSummary] = useState<string | null>(null)
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
    const [toothStates, setToothStates] = useState<Record<number, any>>({})
    const [isOdontogramLoading, setIsOdontogramLoading] = useState(true)
    const [consents, setConsents] = useState<any[]>([])
    const [isConsentsLoading, setIsConsentsLoading] = useState(true)

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
                        details: 'Consultation du dossier complet',
                        severity: 'INFO'
                    })
                })
            } catch (p) {
                // Ignore log errors to not block UI
            }
        }
        logAccess()
    }, [id])

    // Fetch Consents
    useEffect(() => {
        const fetchConsents = async () => {
            try {
                const res = await fetch(`/api/patients/${id}/consents`)
                const data = await res.json()
                if (!data.error) {
                    setConsents(data)
                }
            } catch (error) {
                console.error("Failed to fetch consents:", error)
            } finally {
                setIsConsentsLoading(false)
            }
        }
        fetchConsents()
    }, [id])

    const handleSaveSignature = async (signatureData: string) => {
        try {
            const res = await fetch(`/api/patients/${id}/consents`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'Consentement Général de Soins (Numérique)',
                    content: 'Le patient accepte les protocoles de soins...',
                    signatureData,
                    ipAddress: '127.0.0.1', // Mock IP
                    userAgent: navigator.userAgent
                })
            })
            const newConsent = await res.json()
            setConsents(prev => [newConsent, ...prev])
            setIsSigning(false)
        } catch (error) {
            console.error("Failed to save signature:", error)
        }
    }

    // Fetch Tooth States
    useEffect(() => {
        const fetchToothStates = async () => {
            try {
                const res = await fetch(`/api/patients/${id}/odontogram`)
                const data = await res.json()
                if (!data.error) {
                    setToothStates(data)
                }
            } catch (error) {
                console.error("Failed to fetch tooth states:", error)
            } finally {
                setIsOdontogramLoading(false)
            }
        }
        fetchToothStates()
    }, [id])

    const handleToothStateChange = async (number: number, state: string) => {
        // Optimistic update
        setToothStates(prev => ({ ...prev, [number]: state }))

        try {
            await fetch(`/api/patients/${id}/odontogram`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toothNumber: number, status: state })
            })
        } catch (error) {
            console.error("Failed to update tooth state:", error)
            // Revert on error? Or just log
        }
    }

    const generateCaseSummary = async () => {
        setIsGeneratingSummary(true)
        setShowSummary(true)
        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{
                        role: 'user',
                        content: 'Fais-moi un résumé clinique elite et structuré de ce patient (Jean Valjean, 35 ans) en soulignant les points critiques et les opportunités de soins.'
                    }]
                })
            })
            const data = await response.json()
            setCaseSummary(data.text)
        } catch (e) {
            setCaseSummary("Une erreur est survenue lors de la génération du résumé.")
        } finally {
            setIsGeneratingSummary(false)
        }
    }

    const runAnalysis = () => {
        setIsAnalyzing(true)
        setAiAnalysis(null)
        setTimeout(() => {
            setIsAnalyzing(false)
            setAiAnalysis({
                detection: ["Caries probables sur 16 et 17", "Légère résorption osseuse secteur 4"],
                confidence: 94.2
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
        <div className="flex h-full flex-col bg-slate-50/50">
            {/* Patient Header */}
            <div className="bg-white border-b px-8 py-6 flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-2xl font-bold">
                        JD
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Jean Valjean</h1>
                        <div className="flex gap-4 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1"><User className="h-3 w-3" /> 35 ans • Homme</span>
                            <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> Dossier #{id.slice(0, 6)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="border-accent/30 text-accent font-black hover:bg-accent/5 gap-2"
                        onClick={generateCaseSummary}
                    >
                        <Star className="h-4 w-4 fill-accent" /> Résumé Elite IA
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/communication'}><MessageSquare className="h-4 w-4 mr-2" /> Contacter</Button>
                    <Button variant="outline">Éditer</Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-6">Nouveau Soin</Button>
                </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column - Clinical */}
                    <div className="col-span-12 xl:col-span-8 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center text-slate-800 font-black uppercase tracking-tight">
                                    Odontogramme Interactif
                                    <Button variant="ghost" size="sm" className="text-teal-600 font-bold">Plein Écran</Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 border border-dashed rounded-3xl p-6 flex justify-center overflow-x-auto shadow-inner min-h-[400px] items-center">
                                    {isOdontogramLoading ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <RefreshCw className="h-8 w-8 animate-spin text-slate-300" />
                                            <p className="text-[10px] font-black uppercase text-slate-400">Chargement Clinique...</p>
                                        </div>
                                    ) : (
                                        <Odontogram
                                            toothStates={toothStates}
                                            onToothStateChange={handleToothStateChange}
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="rounded-[2rem] border-none shadow-luxury bg-white">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="flex items-center gap-2 text-slate-800 font-black text-xs uppercase tracking-widest">
                                        <FolderTree className="h-4 w-4 text-indigo-600" />
                                        Archives Docs
                                    </CardTitle>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {['Radiographies', 'Analyses Labo', 'Photos Cliniques'].map(cat => (
                                            <div key={cat} className="flex items-center justify-between p-2 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                                                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{cat}</span>
                                                <span className="text-[10px] font-black text-slate-300">2 docs</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-[2rem] border-none shadow-luxury bg-white">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="flex items-center gap-2 text-slate-800 font-black text-xs uppercase tracking-widest">
                                        <ListTodo className="h-4 w-4 text-purple-600" />
                                        Tâches Assistantes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-2 rounded-xl bg-purple-50/50 border border-purple-100">
                                            <div className="h-2 w-2 rounded-full bg-purple-500" />
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-slate-800">Commander prothèse</p>
                                                <p className="text-[9px] text-slate-500 font-bold">Échéance : Demain</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="w-full text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase">
                                            + Nouvelle tâche
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-[2rem] border-none shadow-luxury bg-white">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="flex items-center gap-2 text-slate-800 font-black text-xs uppercase tracking-widest">
                                        <PenTool className="h-4 w-4 text-accent" />
                                        Consentements
                                    </CardTitle>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-accent" onClick={() => setIsSigning(true)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {consents.map(c => (
                                            <div key={c.id} className="flex flex-col p-3 rounded-xl border bg-slate-50/50 hover:bg-white transition-colors cursor-pointer group">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className={cn(
                                                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                                                        c.status === 'SIGNED' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                                    )}>
                                                        {c.status === 'SIGNED' ? 'Signé' : 'À Signer'}
                                                    </span>
                                                    <span className="text-[9px] text-slate-400 font-bold">
                                                        {c.signedAt ? format(new Date(c.signedAt), 'dd/MM/yy') : (c.createdAt ? format(new Date(c.createdAt), 'dd/MM/yy') : '---')}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-accent transition-colors">{c.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column - IA & Playbooks & Timer */}
                    <div className="col-span-12 xl:col-span-4 space-y-6">
                        {/* CHRONOS TIMER */}
                        <TimeTracker />

                        {/* PATIENT PORTAL PREVIEW CARD */}
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-white border border-slate-100 overflow-hidden">
                            <CardHeader className="bg-slate-50/50 pb-4">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accès Portail Patient</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-teal-500" />
                                        <span className="text-xs font-bold text-slate-800">Portail Actif</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold">Dernier accès : Hier</span>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full text-[10px] font-black uppercase tracking-widest h-10 border-slate-200"
                                    onClick={() => window.location.href = '/portal'}
                                >
                                    Consulter comme le patient <ExternalLink className="ml-2 h-3 w-3" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full text-[9px] font-black uppercase tracking-widest h-8 mt-2 text-slate-400 hover:text-indigo-600"
                                    onClick={() => window.open(`/api/patients/${id}/calendar`)}
                                >
                                    <Calendar className="mr-2 h-3 w-3" /> Synchroniser Agenda Mobile
                                </Button>
                            </CardContent>
                        </Card>

                        {/* PROTOCOL MANAGER */}
                        <ProtocolManager />

                        {/* IA INSIGHTS CARD */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="rounded-3xl shadow-2xl bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-600 text-white p-6 relative overflow-hidden"
                        >
                            <div className="absolute -top-10 -right-10 opacity-10">
                                <Brain className="h-40 w-40" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                                    <h2 className="text-xl font-black uppercase tracking-tighter">AI Copilot Insights</h2>
                                </div>

                                {!aiAnalysis && !isAnalyzing ? (
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                                        <p className="text-sm font-medium mb-4 leading-relaxed text-indigo-50">Analyse intelligente des radios et antécédents en cours.</p>
                                        <Button
                                            onClick={runAnalysis}
                                            className="w-full bg-white text-indigo-700 hover:bg-white/90 font-black shadow-lg border-none h-12 rounded-xl"
                                        >
                                            Lancer l'analyse IA
                                        </Button>
                                    </div>
                                ) : isAnalyzing ? (
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 border border-white/20">
                                        <div className="flex gap-2">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                    className="w-4 h-4 bg-white rounded-full"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/80 animate-pulse">Traitement neuronal DeepSeek...</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Rapport d'analyse</span>
                                            <span className="text-[10px] font-black bg-green-500 px-3 py-1 rounded-full">{aiAnalysis?.confidence}% Match</span>
                                        </div>
                                        <ul className="space-y-3">
                                            {aiAnalysis?.detection.map((d, i) => (
                                                <li key={i} className="text-sm font-bold flex items-start gap-3">
                                                    <div className="h-5 w-5 rounded-full bg-indigo-400/30 flex items-center justify-center text-[10px] shrink-0 border border-white/20">{i + 1}</div>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}

                                {/* AI CHAT */}
                                <div className="bg-slate-950/40 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[350px] shadow-inner">
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                                        {chatMessages.map((msg, i) => (
                                            <div key={i} className={cn(
                                                "flex w-full",
                                                msg.role === 'user' ? "justify-end" : "justify-start"
                                            )}>
                                                <div className={cn(
                                                    "max-w-[85%] p-4 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm",
                                                    msg.role === 'user'
                                                        ? "bg-indigo-600 text-white rounded-tr-none"
                                                        : "bg-white/10 text-white rounded-tl-none border border-white/5"
                                                )}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-black/20 border-t border-white/10 flex gap-2">
                                        <Input
                                            placeholder="Question au dossier (ex: Allergies...)"
                                            className="h-11 text-sm bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-indigo-400"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        />
                                        <Button size="icon" className="h-11 w-11 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl shadow-lg border-none" onClick={handleSend}>
                                            <Send className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <Card className="border-l-4 border-l-red-500 bg-red-50/20 shadow-xl rounded-3xl overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-red-600 flex items-center gap-2 font-black uppercase text-sm tracking-widest">
                                    <AlertCircle className="h-5 w-5" /> Alertes Médicales
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-1 text-sm font-bold text-slate-800">
                                    <li>Allergie Pénicilline (Signalé par DeepSeek)</li>
                                    <li>Hypertension stable</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Signature Modal Overlay */}
            <AnimatePresence>
                {isSigning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b bg-slate-50/50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">CONSENTEMENT ÉCLAIRÉ</h3>
                                    <p className="text-sm font-bold text-teal-600 uppercase tracking-widest">Signature Digitale Juridique</p>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-500 transition-colors" onClick={() => setIsSigning(false)}>
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-600 leading-relaxed border border-slate-100 max-h-48 overflow-y-auto no-scrollbar shadow-inner">
                                    <p className="font-black text-slate-900 mb-2 uppercase tracking-tight">Engagement du patient :</p>
                                    Je soussigné Jean Valjean, certifie avoir reçu toutes les informations nécessaires concernant le traitement proposé. J'ai conscience des risques et des alternatives possibles. Je donne mon accord libre et éclairé pour la réalisation des soins mentionnés dans le plan de traitement. Cette signature électronique a valeur de consentement légal.
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                        <PenTool className="h-3 w-3" /> Espace de signature tactile
                                    </p>
                                    <SignaturePad
                                        onSave={handleSaveSignature}
                                        onCancel={() => setIsSigning(false)}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI CASE SUMMARY MODAL */}
            <AnimatePresence>
                {showSummary && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="bg-slate-950 text-white rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden border border-white/5"
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                                    <div>
                                        <h3 className="text-xl font-black tracking-tighter uppercase italic">Rapport Elite Pilot AI</h3>
                                        <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Analyse de Dossier Haute Fidélité</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white/50" onClick={() => setShowSummary(false)}>
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="p-10">
                                {isGeneratingSummary ? (
                                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                                        <RefreshCw className="h-12 w-12 text-accent animate-spin" />
                                        <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Synthèse neuronale en cours...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 leading-relaxed text-slate-300 text-sm font-medium whitespace-pre-line">
                                            {caseSummary}
                                        </div>
                                        <div className="flex gap-4">
                                            <Button className="flex-1 bg-accent text-white font-black uppercase tracking-widest h-12 rounded-xl">Imprimer le rapport</Button>
                                            <Button variant="outline" className="flex-1 border-white/10 text-white font-black uppercase tracking-widest h-12 rounded-xl" onClick={() => setShowSummary(false)}>Fermer</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
