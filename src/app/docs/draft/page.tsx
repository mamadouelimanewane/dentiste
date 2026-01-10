"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, FileText, Send, Download, Copy, RefreshCw, Star, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DocumentDraftingPage() {
    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    const templates = [
        { id: '1', title: 'Plan de Traitement Complexe', icon: FileText },
        { id: '2', title: 'Courrier Confrère (Correspondant)', icon: Send },
        { id: '3', title: 'Compte Rendu Opératoire', icon: ShieldCheck },
        { id: '4', title: 'Note d\'expertise Médicale', icon: Star },
    ]

    const handleGenerate = async () => {
        setIsGenerating(true)
        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{
                        role: 'user',
                        content: `Rédige un document professionnel de type ${prompt}. Utilise un ton formel et médical, avec des termes précis pour un cabinet dentaire de prestige.`
                    }]
                })
            })
            const data = await response.json()
            setResult(data.text)
        } catch (e) {
            setResult("Erreur lors de la génération.")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-accent rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">IA Automation</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Rédaction <span className="text-gold">Assistée par IA</span></h1>
                    <p className="text-slate-500 font-medium">Générez vos comptes-rendus, courriers et plans de traitement en quelques secondes.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left: Templates & Input */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 border-b pb-4">Modèles de Documents</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {templates.map(t => (
                            <Card
                                key={t.id}
                                className="rounded-2xl border-none shadow-sm bg-white hover:shadow-luxury hover:border-accent/20 cursor-pointer transition-all group"
                                onClick={() => setPrompt(t.title)}
                            >
                                <CardContent className="p-5 flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                                        <t.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-[11px] font-black uppercase tracking-tight text-slate-700 leading-tight">{t.title}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-4 pt-6">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Instructions Spécifiques</h2>
                        <Textarea
                            placeholder="Décrivez les détails à inclure (ex: Patient Durand, extraction de la 16 sans complication, antibiothérapie prescrite...)"
                            className="min-h-[150px] rounded-3xl border-slate-200 p-6 text-sm focus-visible:ring-accent"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <Button
                            className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 font-black uppercase tracking-widest text-xs rounded-2xl group shadow-xl"
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                        >
                            {isGenerating ? (
                                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                            ) : (
                                <Sparkles className="h-5 w-5 mr-2 text-gold group-hover:scale-110 transition-transform" />
                            )}
                            Générer le document Elite
                        </Button>
                    </div>
                </div>

                {/* Right: AI Result */}
                <div className="col-span-12 lg:col-span-7">
                    <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white h-full flex flex-col min-h-[600px] overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/30">
                            <div>
                                <CardTitle className="text-base font-black tracking-tighter">Prévisualisation Document</CardTitle>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document prêt pour signature</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100"><Copy className="h-4 w-4 text-slate-400" /></Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100"><Download className="h-4 w-4 text-slate-400" /></Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 flex-1 overflow-y-auto no-scrollbar">
                            {result ? (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-1000">
                                    <div className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line font-serif">
                                        {result}
                                    </div>
                                    <div className="h-20 w-48 border-b-2 border-slate-200 mt-20 flex flex-col justify-end pb-2">
                                        <p className="text-[10px] font-black text-slate-300 uppercase italic">Signature Praticien</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30 text-slate-500">
                                    <FileText className="h-20 w-20" />
                                    <p className="text-xs font-black uppercase tracking-[0.3em] italic">En attente de génération...</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

