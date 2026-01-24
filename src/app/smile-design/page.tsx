"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
    Sparkles,
    Image as ImageIcon,
    Upload,
    ChevronLeft,
    ChevronRight,
    Zap,
    RefreshCw,
    Download,
    Share2,
    Eye,
    Palette,
    Layers,
    Smile,
    History,
    CheckCircle2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function SmileDesignStudio() {
    const [step, setStep] = useState(1)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [comparisonView, setComparisonView] = useState(0.5) // Slider for before/after
    const [selectedTreatment, setSelectedTreatment] = useState('VENEERS')

    const treatments = [
        { id: 'VENEERS', name: 'Facettes Porcelaine', color: 'bg-gold', icon: Sparkles },
        { id: 'WHITENING', name: 'Blanchiment Laser', color: 'bg-white', icon: Zap },
        { id: 'IMPLANTS', name: 'Implants Digitaux', color: 'bg-indigo-500', icon: Layers },
        { id: 'ORTHO', name: 'Aligneurs Invisibles', color: 'bg-teal-500', icon: Smile },
    ]

    const handleStartAnalysis = () => {
        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            setStep(2)
        }, 3000)
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-gold" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Esthetic Simulation Engine</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Smile <span className="text-gold">Design Studio Pro</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Simulation esthétique par IA : Montrez le futur sourire à vos patients.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <History className="mr-2 h-4 w-4" /> Historique Simulations
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Download className="mr-2 h-5 w-5" /> Exporter le Design
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Main Interaction Area */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[4rem] border-none shadow-2xl bg-white overflow-hidden relative min-h-[600px] flex flex-col">
                        {step === 1 ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-10">
                                <div className="relative">
                                    <div className="h-40 w-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex items-center justify-center group hover:border-gold transition-all cursor-pointer overflow-hidden">
                                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Upload className="h-10 w-10 text-slate-300 group-hover:text-gold transition-colors" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 h-12 w-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
                                        <ImageIcon className="h-5 w-5 text-indigo-600" />
                                    </div>
                                </div>
                                <div className="space-y-4 max-w-md">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Importez le Portrait Patient</h2>
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                                        Téléchargez une photo de face avec sourire apparent. Notre IA analysera la symétrie faciale et la ligne gingivale.
                                    </p>
                                </div>
                                <Button
                                    onClick={handleStartAnalysis}
                                    disabled={isAnalyzing}
                                    className="bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest h-14 px-12 rounded-2xl shadow-xl active:scale-95 transition-all"
                                >
                                    {isAnalyzing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    {isAnalyzing ? "Analyse Neurale..." : "Lancer l'Analyse IA"}
                                </Button>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col relative h-full">
                                {/* Split Comparison View */}
                                <div className="relative flex-1 bg-slate-100">
                                    {/* SIMULATION BEFORE (Left side) */}
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=1200')] bg-center bg-cover" />

                                    {/* SIMULATION AFTER (Right side - masked) */}
                                    <div
                                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542610123-e813979d3e56?auto=format&fit=crop&q=80&w=1200')] bg-center bg-cover border-l-2 border-gold shadow-[-10px_0_30px_rgba(0,0,0,0.3)]"
                                        style={{ clipPath: `inset(0 0 0 ${comparisonView * 100}%)` }}
                                    >
                                        <div className="absolute top-8 right-8 bg-gold text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Simulation Digitale</div>
                                    </div>

                                    {/* Slider Handle */}
                                    <div
                                        className="absolute inset-y-0 w-1 bg-gold cursor-ew-resize z-20"
                                        style={{ left: `${comparisonView * 100}%` }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-gold">
                                            <div className="flex gap-1">
                                                <ChevronLeft className="h-3 w-3 text-gold" />
                                                <ChevronRight className="h-3 w-3 text-gold" />
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={comparisonView}
                                        onChange={(e) => setComparisonView(parseFloat(e.target.value))}
                                        className="absolute inset-x-0 bottom-0 opacity-0 z-30 cursor-ew-resize"
                                    />

                                    <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">État Actuel</div>
                                </div>

                                {/* Controls Overlay */}
                                <div className="p-8 bg-white border-t flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {treatments.map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => setSelectedTreatment(t.id)}
                                                className={cn(
                                                    "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                                    selectedTreatment === t.id
                                                        ? "bg-slate-900 text-white shadow-xl scale-105"
                                                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                                )}
                                            >
                                                <t.icon className={cn("h-4 w-4", selectedTreatment === t.id ? "text-gold" : "text-slate-300")} />
                                                {t.name}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="ghost" className="h-12 w-12 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900">
                                            <Share2 className="h-5 w-5" />
                                        </Button>
                                        <Button variant="ghost" onClick={() => setStep(1)} className="h-12 px-6 rounded-xl text-slate-400 font-black uppercase text-[10px] tracking-widest">Réinitialiser</Button>
                                        <Button className="h-12 px-8 rounded-xl bg-gold text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-gold/20">Valider Design</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* AI Insights on Design */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Palette className="h-5 w-5 text-indigo-500" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analyse de Teinte</h4>
                            </div>
                            <p className="text-sm font-bold text-slate-900 leading-tight">Suggéré : Vita 3D Master OM3</p>
                            <p className="text-[10px] text-slate-400 mt-2 italic">L'IA préconise cette teinte pour un rendu naturel sur la carnation détectée.</p>
                        </Card>
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Smile className="h-5 w-5 text-teal-500" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Symétrie Gingivale</h4>
                            </div>
                            <p className="text-sm font-bold text-slate-900 leading-tight">Optimisée (+1.2mm secteur 1)</p>
                            <p className="text-[10px] text-slate-400 mt-2 italic">Correction de la ligne de sourire pour aligner les collets.</p>
                        </Card>
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="h-5 w-5 text-amber-500" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rendu Visuel 3D</h4>
                            </div>
                            <p className="text-sm font-bold text-slate-900 leading-tight">Photoréalisme : 98.4%</p>
                            <p className="text-[10px] text-slate-400 mt-2 italic">L'éclairage a été harmonisé pour correspondre aux sources de lumière réelles.</p>
                        </Card>
                    </div>
                </div>

                {/* Right Sidebar - Details & Options */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 opacity-10">
                            <Sparkles className="h-40 w-40" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black tracking-tighter uppercase italic">Plan de Soin Optique</h3>
                                <div className="h-8 w-8 bg-gold rounded-xl flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                                    <span className="text-slate-400">Teinte sélectionnée</span>
                                    <span>OM3 (Blanchiment)</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                                    <span className="text-slate-400">Nb de Facettes</span>
                                    <span>8 Unités (14 à 24)</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                                    <span className="text-slate-400">Forme des dents</span>
                                    <span>Ovalaire / Soft Esthetic</span>
                                </div>
                            </div>
                            <div className="pt-4">
                                <div className="flex justify-between items-end mb-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gold text-center w-full">Impact prévisionnel du sourire</p>
                                </div>
                                <div className="text-center bg-white/5 border border-white/10 p-4 rounded-2xl">
                                    <p className="text-3xl font-black">+42%</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-indigo-300">Confiance en soi estimée (AI Score)</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 flex flex-col space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Outils de Retouche IA</h3>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>Blanchissage (Luminosité)</span>
                                    <span className="text-gold">+15%</span>
                                </div>
                                <Slider defaultValue={[15]} max={100} step={1} className="text-gold" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>Alignement Médian</span>
                                    <span className="text-gold">Parfait</span>
                                </div>
                                <Slider defaultValue={[50]} max={100} step={1} />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>Volume Gingival</span>
                                    <span className="text-gold">-5%</span>
                                </div>
                                <Slider defaultValue={[45]} max={100} step={1} />
                            </div>
                        </div>
                        <Button className="w-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl mt-4">Appliquer Retouches</Button>
                    </Card>

                    <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[3rem] flex flex-col items-center text-center space-y-4">
                        <Zap className="h-8 w-8 text-indigo-400" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 leading-none mb-1">Génération de Devis</p>
                            <p className="text-sm font-black text-slate-900 max-w-[200px]">Transformer cette simulation en devis officiel ?</p>
                        </div>
                        <Button
                            className="bg-indigo-600 text-white font-black uppercase text-[9px] tracking-widest h-10 px-6 rounded-xl shadow-lg"
                            onClick={() => window.location.href = '/quotes/create'}
                        >
                            Créer Devis Multi-Option
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
