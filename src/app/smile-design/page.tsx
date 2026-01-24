"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Plus,
    Minus,
    Camera,
    Sparkles,
    Trash2,
    Download,
    History,
    ChevronLeft,
    Monitor,
    MousePointer2,
    Palette,
    Shapes,
    CheckCircle2,
    ImageIcon,
    Star,
    RefreshCw,
    Split,
    ArrowRight,
    Target
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function SmileDesignStudio() {
    const [view, setView] = useState<'BEFORE' | 'AFTER' | 'COMPARISON'>('BEFORE')
    const [sliderPos, setSliderPos] = useState(50)
    const [activeLayer, setActiveLayer] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const layers = [
        { id: 'BLEACH', name: 'Blanchiment Ultra', color: 'text-indigo-500', icon: Palette, active: true },
        { id: 'FACETS', name: 'Facettes E-Max', color: 'text-teal-500', icon: Shapes, active: true },
        { id: 'ORTHO', name: 'Invisalign Align', color: 'text-rose-500', icon: Target, active: false }
    ]

    const handleSimulation = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 2000)
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={() => window.location.href = '/patients'} className="rounded-2xl h-14 w-14 bg-white border shadow-sm">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="h-4 w-4 text-gold" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Aesthetic Dentistry Division</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Digital <span className="text-gold">Smile Design</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Simulation esthétique Haute Fidélité et studio de morpho-psychologie dentaire.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <History className="mr-2 h-4 w-4" /> Sauvegarder Projet
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouveau Patient
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Design Canvas */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden relative min-h-[600px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_100%)] pointer-events-none" />

                        <div className="relative w-full h-[600px]">
                            {view === 'BEFORE' && (
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200"
                                    className="w-full h-full object-cover grayscale-[0.2]"
                                />
                            )}

                            {view === 'AFTER' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full h-full relative"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1559757117-097966ef403b?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                                    {/* Artificial Glow for After view */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-auto">
                                        <div className="w-full h-full bg-indigo-500/20 blur-[100px] rounded-full" />
                                    </div>
                                </motion.div>
                            )}

                            {view === 'COMPARISON' && (
                                <div className="w-full h-full relative">
                                    <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover" />
                                    <div
                                        className="absolute inset-0 overflow-hidden border-r-4 border-gold z-10"
                                        style={{ width: `${sliderPos}%` }}
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1559757117-097966ef403b?auto=format&fit=crop&q=80&w=1200"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            style={{ width: `calc(100vw * (100 / ${sliderPos}))`, maxWidth: 'none' }}
                                        />
                                    </div>
                                    {/* Drag Handle */}
                                    <div
                                        className="absolute inset-y-0 z-20 w-1 cursor-ew-resize flex items-center justify-center translate-x-[-1px]"
                                        style={{ left: `${sliderPos}%` }}
                                    >
                                        <input
                                            type="range"
                                            className="absolute inset-0 opacity-0 cursor-ew-resize w-20 -translate-x-10"
                                            value={sliderPos}
                                            onChange={(e) => setSliderPos(parseInt(e.target.value))}
                                        />
                                        <div className="h-10 w-10 bg-gold rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                                            <Split className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* View Switcher Overlay */}
                            <div className="absolute top-8 left-8 flex gap-2 z-40 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-white shadow-xl">
                                {(['BEFORE', 'AFTER', 'COMPARISON'] as const).map(v => (
                                    <button
                                        key={v}
                                        onClick={() => setView(v)}
                                        className={cn(
                                            "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                            view === v ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:text-slate-700 hover:bg-white"
                                        )}
                                    >
                                        {v === 'BEFORE' ? 'Avant Soin' : v === 'AFTER' ? 'Simulation IA' : 'Comparatif'}
                                    </button>
                                ))}
                            </div>

                            {/* Tools Menu Overlay */}
                            <div className="absolute bottom-8 left-8 right-8 z-40 flex justify-between items-end">
                                <div className="flex gap-3">
                                    <Button variant="outline" className="rounded-2xl h-12 w-12 bg-white/80 backdrop-blur-md border-none shadow-xl"><MousePointer2 className="h-5 w-5" /></Button>
                                    <Button variant="outline" className="rounded-2xl h-12 w-12 bg-white/80 backdrop-blur-md border-none shadow-xl"><Palette className="h-5 w-5" /></Button>
                                    <Button variant="outline" className="rounded-2xl h-12 w-12 bg-white/80 backdrop-blur-md border-none shadow-xl"><Shapes className="h-5 w-5" /></Button>
                                </div>
                                <div className="flex flex-col items-end gap-3">
                                    <Button
                                        onClick={handleSimulation}
                                        className="bg-gold text-white font-black uppercase text-[10px] tracking-widest h-14 px-10 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
                                    >
                                        {isLoading ? <RefreshCw className="h-5 w-5 animate-spin mr-3" /> : <Star className="h-5 w-5 mr-3 fill-white" />}
                                        {isLoading ? "Neuro-Mapping en cours..." : "Lancer Morphing Esthétique"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Simulation Parameters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {layers.map(layer => (
                            <Card
                                key={layer.id}
                                className={cn(
                                    "rounded-[2.5rem] border-none shadow-luxury bg-white transition-all cursor-pointer group",
                                    layer.active ? "ring-2 ring-gold/20" : "opacity-60"
                                )}
                            >
                                <CardContent className="p-8 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-slate-50", layer.color)}>
                                            <layer.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Module</p>
                                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{layer.name}</p>
                                        </div>
                                    </div>
                                    <button className={cn(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        layer.active ? "border-gold bg-gold text-white" : "border-slate-200"
                                    )}>
                                        {layer.active && <CheckCircle2 className="h-4 w-4" />}
                                    </button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right Design Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Paramètres Morpho-Dentaires</h3>
                            <Monitor className="h-5 w-5 text-gold" />
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Luminosité Email</label>
                                    <span className="text-xs font-bold text-slate-900">B1 (Elite)</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gold" style={{ width: '85%' }}></div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Arrondissement Angles</label>
                                    <span className="text-xs font-bold text-slate-900">70% Soft</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gold" style={{ width: '70%' }}></div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-50">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Suggestions IA Morpho</h4>
                                <div className="space-y-3">
                                    {[
                                        "Allongement incisives centrales (+0.5mm)",
                                        "Réduction diastème par facettes E-Max",
                                        "Alignement gingival par laser"
                                    ].map((msg, i) => (
                                        <div key={i} className="flex gap-3 bg-slate-50 p-4 rounded-2xl">
                                            <div className="h-4 w-4 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                                                <ArrowRight className="h-2 w-2 text-gold" />
                                            </div>
                                            <p className="text-[11px] font-bold text-slate-700 leading-tight">{msg}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-10 text-center space-y-6">
                        <div className="h-20 w-20 rounded-[2rem] bg-gold/10 flex items-center justify-center mx-auto border border-gold/30">
                            <ImageIcon className="h-10 w-10 text-gold" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tighter uppercase italic text-white leading-none mb-2">Expérience VR Patient</h3>
                            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                                Envoyez cette simulation sur le portail du patient pour qu'il la visualise en 360°.
                            </p>
                        </div>
                        <Button className="w-full bg-gold text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl shadow-gold/20">
                            Envoyer via Portal
                        </Button>
                    </Card>

                    <Button variant="ghost" className="w-full h-14 rounded-[2rem] border-2 border-slate-100 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2" /> Supprimer Session
                    </Button>
                </div>
            </div>
        </div>
    )
}
