"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
    History,
    Download,
    FolderOpen,
    Trash2,
    Languages,
    RefreshCw
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type DictationRecord = {
    id: number
    type: 'PRESCRIPTION' | 'NOTE' | 'TREATMENT'
    text: string
    date: string
    savedAt?: string
}

export default function VoiceDictationPage() {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [interimTranscript, setInterimTranscript] = useState("")
    const [status, setStatus] = useState("En attente d'activation vocale...")
    const [mode, setMode] = useState<'PRESCRIPTION' | 'NOTE' | 'TREATMENT'>('NOTE')
    const [records, setRecords] = useState<DictationRecord[]>([])
    const [savePath, setSavePath] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isPolishing, setIsPolishing] = useState(false)
    const [voiceLang, setVoiceLang] = useState<'fr-FR' | 'en-US'>('fr-FR')
    const [secondsListened, setSecondsListened] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const recognitionRef = useRef<any>(null)

    // ─── Load records from API ─────────────────────────────────────────────────
    const loadRecords = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/dictation')
            const data = await res.json()
            if (data.records) {
                setRecords(data.records)
                setSavePath(data.savePath || "")
            }
        } catch {
            toast.error("Impossible de charger les dictées.")
        } finally {
            setIsLoading(false)
        }
    }

    // ─── Init SpeechRecognition ────────────────────────────────────────────────
    useEffect(() => {
        loadRecords()

        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition()
                recognition.continuous = true
                recognition.interimResults = true
                recognition.lang = voiceLang

                recognition.onstart = () => {
                    setIsListening(true)
                    setStatus("🔴 Écoute active — Parlez maintenant...")
                    timerRef.current = setInterval(() => setSecondsListened(s => s + 1), 1000)
                }

                recognition.onresult = (event: any) => {
                    let finalText = ''
                    let interimText = ''
                    for (let i = 0; i < event.results.length; i++) {
                        if (event.results[i].isFinal) {
                            finalText += event.results[i][0].transcript + ' '
                        } else {
                            interimText += event.results[i][0].transcript
                        }
                    }
                    if (finalText) setTranscript(finalText)
                    setInterimTranscript(interimText)
                }

                recognition.onend = () => {
                    setIsListening(false)
                    setInterimTranscript("")
                    setStatus("✓ Dictée terminée. Prêt pour enregistrement.")
                    if (timerRef.current) clearInterval(timerRef.current)
                }

                recognition.onerror = (event: any) => {
                    setIsListening(false)
                    setInterimTranscript("")
                    if (timerRef.current) clearInterval(timerRef.current)
                    if (event.error === 'not-allowed') {
                        setStatus("⚠ Permission microphone refusée.")
                        toast.error("Veuillez autoriser l'accès au microphone dans les paramètres du navigateur.")
                    } else if (event.error !== 'no-speech') {
                        setStatus("Erreur de microphone : " + event.error)
                        toast.error("Erreur micro : " + event.error)
                    }
                }

                recognitionRef.current = recognition
            } else {
                setStatus("⚠ Votre navigateur ne supporte pas la dictée vocale.")
                toast.warning("Utilisez Chrome ou Edge pour la dictée vocale.")
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [])

    // Update recognition language when voiceLang changes
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = voiceLang
        }
    }, [voiceLang])

    const toggleListening = () => {
        if (!recognitionRef.current) {
            return toast.error("Votre navigateur ne supporte pas la dictée vocale intégrée (Essayez Chrome ou Edge).")
        }
        if (!isListening) {
            setTranscript("")
            setInterimTranscript("")
            setSecondsListened(0)
            try {
                recognitionRef.current.lang = voiceLang
                recognitionRef.current.start()
            } catch (e) {
                console.error(e)
            }
        } else {
            recognitionRef.current.stop()
        }
    }

    const polishTranscript = async () => {
        if (!transcript.trim()) return
        setIsPolishing(true)
        setStatus("Analyse neurale et correction médicale...")
        try {
            const res = await fetch('/api/ai/analyze-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: transcript,
                    analysisType: 'DICTATION_POLISH'
                })
            })
            const data = await res.json()
            if (data.success && data.polished) {
                setTranscript(data.polished)
                toast.success("Texte corrigé et formaté par l'IA médicale.")
            } else {
                throw new Error("fallback")
            }
        } catch {
            // Fallback: client-side medical term correction
            let polished = transcript
                .replace(/amoxicilline|amox\b/gi, "Amoxicilline 1g")
                .replace(/ibuprofène|ibu\b/gi, "Ibuprofène 400mg")
                .replace(/paracétamol|doliprane/gi, "Paracétamol 1g")
                .replace(/\bpano\b|panoramique/gi, "Radiographie Panoramique")
                .replace(/\bimplant\b/gi, "Implant Nobel Biocare")
                .replace(/\bcarie\b/gi, "lésion carieuse")
                .replace(/détartrage\b/gi, "détartrage ultrasonique complet")
                .trim()
            polished = polished.charAt(0).toUpperCase() + polished.slice(1)
            if (!polished.endsWith('.')) polished += '.'
            setTranscript(polished)
            toast.success("Texte structuré par le correcteur médical local.")
        } finally {
            setIsPolishing(false)
            setStatus("Correction terminée. Prêt à sauvegarder.")
        }
    }

    const saveRecord = async () => {
        if (!transcript.trim()) return
        setIsSaving(true)
        try {
            const res = await fetch('/api/dictation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: mode,
                    text: transcript.trim(),
                    date: "À l'instant"
                })
            })
            const data = await res.json()
            if (data.success) {
                setRecords(prev => [data.record, ...prev])
                setSavePath(data.savePath || savePath)
                setTranscript("")
                setStatus("✅ Enregistré dans le dossier patient")
                toast.success("Dictée sauvegardée avec succès !")
            } else {
                throw new Error("Save failed")
            }
        } catch {
            toast.error("Erreur de sauvegarde. Vérifiez la connexion serveur.")
        } finally {
            setIsSaving(false)
        }
    }

    const deleteRecord = async (id: number) => {
        try {
            const res = await fetch(`/api/dictation?id=${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                setRecords(prev => prev.filter(r => r.id !== id))
                toast.success("Dictée supprimée.")
            }
        } catch {
            toast.error("Erreur lors de la suppression.")
        }
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            toast.success("Copié dans le presse-papiers !")
        } catch {
            toast.error("Impossible de copier.")
        }
    }

    const downloadRecord = (record: DictationRecord) => {
        const typeLabel = record.type === 'PRESCRIPTION' ? 'Ordonnance' : record.type === 'TREATMENT' ? 'Plan-de-soins' : 'Note-clinique'
        const content = `DentoPrestige Elite — ${typeLabel}\nDate : ${record.date}\n\n${record.text}`
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${typeLabel}_${new Date().toISOString().split('T')[0]}.txt`
        a.click()
        URL.revokeObjectURL(url)
        toast.success("Fichier téléchargé !")
    }

    const formatSeconds = (s: number) => {
        const m = Math.floor(s / 60)
        const sec = s % 60
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            {/* Header */}
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
                <div className="flex gap-3 items-center">
                    {/* Language selector */}
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2">
                        <Languages className="h-4 w-4 text-slate-400" />
                        <button onClick={() => setVoiceLang('fr-FR')} className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg transition-all", voiceLang === 'fr-FR' ? "bg-indigo-600 text-white" : "text-slate-400")}>FR</button>
                        <button onClick={() => setVoiceLang('en-US')} className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg transition-all", voiceLang === 'en-US' ? "bg-indigo-600 text-white" : "text-slate-400")}>EN</button>
                    </div>
                    <Button variant="outline" onClick={loadRecords} className="rounded-2xl border-slate-200 h-14 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <RefreshCw className="mr-2 h-4 w-4" /> Actualiser
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <History className="mr-2 h-4 w-4" /> Historique
                    </Button>
                </div>
            </div>

            {/* Save path banner */}
            {savePath && (
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-4">
                    <FolderOpen className="h-5 w-5 text-indigo-500 shrink-0" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Répertoire de sauvegarde des dictées</p>
                        <p className="text-sm font-mono font-bold text-slate-700 tracking-tight">{savePath}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto text-[9px] font-black uppercase text-indigo-500" onClick={() => copyToClipboard(savePath)}>
                        <Copy className="h-3 w-3 mr-1" /> Copier
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-12 gap-10">
                {/* Dictation Canvas */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[4rem] border-none shadow-2xl bg-indigo-950 text-white p-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Mic className="h-64 w-64 text-white" />
                        </div>

                        <div className="relative z-10 space-y-10">
                            {/* Mode & Status bar */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
                                    {(['NOTE', 'PRESCRIPTION', 'TREATMENT'] as const).map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setMode(m)}
                                            className={cn(
                                                "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                mode === m ? "bg-indigo-500 text-white shadow-lg" : "text-white/40 hover:text-white"
                                            )}
                                        >
                                            {m === 'NOTE' ? 'Note Clinique' : m === 'PRESCRIPTION' ? 'Ordonnance' : 'Plan de Soins'}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
                                    <div className={cn("h-2 w-2 rounded-full", isListening ? "bg-red-500 animate-pulse" : "bg-teal-500")} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">{status}</span>
                                    {isListening && (
                                        <span className="text-[10px] font-mono text-red-400 ml-2">{formatSeconds(secondsListened)}</span>
                                    )}
                                </div>
                            </div>

                            {/* Transcript area */}
                            <div className="min-h-[250px] relative">
                                <AnimatePresence mode="wait">
                                    {isListening ? (
                                        <motion.div
                                            key="listening"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center justify-center gap-2 h-[120px]">
                                                {[...Array(30)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ height: [12, 80 + Math.random() * 80, 12] }}
                                                        transition={{ repeat: Infinity, duration: 0.8 + Math.random() * 0.6, delay: i * 0.03 }}
                                                        className="w-1.5 bg-indigo-400/60 rounded-full"
                                                    />
                                                ))}
                                            </div>
                                            {/* Live interim transcript */}
                                            {(transcript || interimTranscript) && (
                                                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6">
                                                    <p className="text-base font-medium leading-relaxed text-white/70 italic">
                                                        {transcript}
                                                        <span className="text-indigo-300">{interimTranscript}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="transcript"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 min-h-[250px]"
                                        >
                                            {transcript ? (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{mode} — {voiceLang === 'fr-FR' ? 'Français' : 'English'}</span>
                                                        <span className="text-[10px] font-bold text-white/30">{transcript.split(' ').length} mots</span>
                                                    </div>
                                                    <p className="text-xl font-medium leading-relaxed text-white italic">{transcript}</p>
                                                </div>
                                            ) : (
                                                <p className="text-2xl font-medium leading-relaxed italic text-white/20">
                                                    Le texte dicté s'affichera ici en temps réel...
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-4">
                                <Button
                                    id="btn-toggle-dictation"
                                    onClick={toggleListening}
                                    className={cn(
                                        "flex-[2] h-20 rounded-[2rem] text-lg font-black uppercase tracking-widest transition-all shadow-2xl",
                                        isListening
                                            ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                                            : "bg-white text-indigo-900 hover:bg-slate-100"
                                    )}
                                >
                                    {isListening ? <MicOff className="mr-4 h-8 w-8" /> : <Mic className="mr-4 h-8 w-8" />}
                                    {isListening ? "Arrêter la dictée" : "Démarrer la dictée vocale"}
                                </Button>

                                {transcript && !isListening && (
                                    <Button
                                        id="btn-polish"
                                        onClick={polishTranscript}
                                        disabled={isPolishing}
                                        className="h-20 flex-1 rounded-[2rem] bg-indigo-500 hover:bg-indigo-400 text-white shadow-2xl transition-all font-black uppercase tracking-widest text-[11px] disabled:opacity-60"
                                    >
                                        {isPolishing
                                            ? <><RefreshCw className="h-5 w-5 mr-2 animate-spin" /> Correction...</>
                                            : <><Sparkles className="h-5 w-5 mr-2" /> Polir avec IA</>
                                        }
                                    </Button>
                                )}

                                {transcript && !isListening && (
                                    <Button
                                        id="btn-save-dictation"
                                        onClick={saveRecord}
                                        disabled={isSaving}
                                        className="h-20 w-24 shrink-0 rounded-[2rem] bg-teal-500 hover:bg-teal-400 text-white shadow-2xl transition-all disabled:opacity-60"
                                    >
                                        {isSaving ? <RefreshCw className="h-7 w-7 animate-spin" /> : <Save className="h-7 w-7" />}
                                    </Button>
                                )}
                            </div>

                            {/* Copy current transcript shortcut */}
                            {transcript && !isListening && (
                                <div className="flex gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/40 hover:text-white text-[9px] font-black uppercase tracking-widest"
                                        onClick={() => copyToClipboard(transcript)}
                                    >
                                        <Copy className="h-3 w-3 mr-1" /> Copier le texte
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/40 hover:text-white text-[9px] font-black uppercase tracking-widest"
                                        onClick={() => { setTranscript(""); setStatus("En attente d'activation vocale...") }}
                                    >
                                        <XCircle className="h-3 w-3 mr-1" /> Effacer
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Historical Feed */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter uppercase">Dernières Dictées Enregistrées</CardTitle>
                                <CardDescription className="text-xs font-bold text-slate-400 tracking-widest mt-1 flex items-center gap-2">
                                    <FolderOpen className="h-3 w-3" />
                                    {savePath ? (
                                        <span className="font-mono">{savePath}</span>
                                    ) : (
                                        "Synchronisé avec le dossier patient"
                                    )}
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">
                                    {records.length} dictée{records.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </CardHeader>

                        <div className="divide-y divide-slate-50">
                            {isLoading ? (
                                <div className="p-10 flex justify-center">
                                    <RefreshCw className="h-6 w-6 text-slate-300 animate-spin" />
                                </div>
                            ) : records.length === 0 ? (
                                <div className="p-16 text-center">
                                    <Mic className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                                    <p className="text-sm font-bold text-slate-400">Aucune dictée enregistrée. Commencez par dicter une note.</p>
                                </div>
                            ) : (
                                records.map((r) => (
                                    <motion.div
                                        key={r.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-8 flex items-start justify-between hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="flex items-start gap-6">
                                            <div className={cn(
                                                "h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform shrink-0",
                                                r.type === 'PRESCRIPTION' ? "bg-rose-500" : r.type === 'TREATMENT' ? "bg-teal-500" : "bg-indigo-500"
                                            )}>
                                                {r.type === 'PRESCRIPTION' ? <FileText className="h-6 w-6" /> : r.type === 'TREATMENT' ? <Zap className="h-6 w-6" /> : <Activity className="h-6 w-6" />}
                                            </div>
                                            <div className="max-w-xl">
                                                <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                    <span className={cn(
                                                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                                                        r.type === 'PRESCRIPTION' ? "bg-rose-50 text-rose-600" :
                                                        r.type === 'TREATMENT' ? "bg-teal-50 text-teal-600" :
                                                        "bg-indigo-50 text-indigo-600"
                                                    )}>{r.type}</span>
                                                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                    <span className="text-[10px] font-bold text-slate-400">{r.date}</span>
                                                    {r.savedAt && (
                                                        <>
                                                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                            <span className="text-[9px] font-mono text-slate-300">{new Date(r.savedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="text-sm font-bold text-slate-900 leading-relaxed">{r.text}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 shrink-0 ml-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Copier"
                                                className="h-10 w-10 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"
                                                onClick={() => copyToClipboard(r.text)}
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Télécharger"
                                                className="h-10 w-10 text-slate-300 hover:text-teal-600 hover:bg-teal-50 rounded-xl"
                                                onClick={() => downloadRecord(r)}
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Supprimer"
                                                className="h-10 w-10 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl"
                                                onClick={() => deleteRecord(r.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
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
                                    "Le moteur IA corrige automatiquement les termes médicaux et structure la note cliniquement."
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
                                        <span className="text-teal-400">Navigateur Natif</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span>Langue active</span>
                                        <span className="text-teal-400">{voiceLang === 'fr-FR' ? '🇫🇷 Français' : '🇬🇧 English'}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span>Vocabulaire</span>
                                        <span className="text-indigo-400">Dental V2</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span>Sauvegarde</span>
                                        <span className="text-teal-400">JSON Local + API</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Save path card */}
                            {savePath && (
                                <div className="bg-slate-50 border border-slate-100 p-5 rounded-[2rem] space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FolderOpen className="h-4 w-4 text-teal-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fichier de sauvegarde</span>
                                    </div>
                                    <p className="text-[10px] font-mono text-slate-600 break-all leading-relaxed">{savePath}</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10 text-center space-y-6">
                        <div className="h-20 w-20 rounded-[2rem] bg-white/10 flex items-center justify-center mx-auto border border-white/20 shadow-xl">
                            <Zap className="h-10 w-10 text-indigo-200" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tighter uppercase italic text-white leading-none mb-2">Workflow Automatisé</h3>
                            <p className="text-[11px] font-medium text-indigo-100 leading-relaxed">
                                Une fois dictée, téléchargez l'ordonnance en .TXT ou copiez-la directement pour l'envoyer par WhatsApp.
                            </p>
                        </div>
                        <Button
                            className="w-full bg-white text-indigo-900 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl"
                            onClick={() => window.location.href = '/settings#ai'}
                        >
                            Configurer Destinataires
                        </Button>
                    </Card>

                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] flex items-center gap-4">
                        <Clock className="h-8 w-8 text-slate-300" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dictées sauvegardées</p>
                            <p className="text-lg font-black text-slate-900">{records.length} <span className="text-xs font-bold text-slate-400">enregistrement{records.length !== 1 ? 's' : ''}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
