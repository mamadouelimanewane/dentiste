"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Zap,
    Sparkles,
    Box,
    Users,
    Activity,
    ShieldCheck,
    RotateCcw,
    CheckCircle2,
    ChevronRight,
    Dna,
    Smartphone,
    Eye,
    Maximize2,
    Calendar,
    Layers,
    Stethoscope,
    FlaskConical,
    Target,
    PenTool
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function PlanningPage() {
    const [activeTab, setActiveTab] = useState<'SMILE' | 'IMPLANT' | 'ORTHO' | 'SIMULATOR'>('SMILE')
    const [sliderPos, setSliderPos] = useState(50)

    const plans = [
        { id: 1, title: 'Réhabilitation Esthétique Maxillaire', patient: 'Sophie Faye', status: 'IN_PLANNING', cost: '12,500 €', progress: 45 },
        { id: 2, title: 'Implantation Multiple & Greffe', patient: 'Mamadou Diallo', status: 'ACCEPTED', cost: '18,400 €', progress: 100 },
        { id: 3, title: 'Alignement Invisalign (Elite Package)', patient: 'Marc Diop', status: 'DRAFT', cost: '6,200 €', progress: 20 },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Planification & Design Clinique</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-gold">Planning Lab</span></h1>
                    <p className="text-slate-500 font-medium">Simulation 3D, Smile Design et planification chirurgicale guidée.</p>
                </div>
                <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                    {(['SMILE', 'IMPLANT', 'ORTHO', 'SIMULATOR'] as const).map(tab => (
                        <Button
                            key={tab}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "rounded-xl px-6 text-[11px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'SMILE' ? 'Smile Design' : tab === 'IMPLANT' ? 'Implant 3D' : tab === 'ORTHO' ? 'Orthodontie' : 'Simulation'}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Visualizer Area */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[3.5rem] border-none shadow-luxury bg-slate-950 overflow-hidden relative aspect-video flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {activeTab === 'SMILE' && (
                                <motion.div
                                    key="smile"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative w-full h-full"
                                >
                                    {/* Before/After Slider Mock */}
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200')] bg-center bg-cover opacity-50 grayscale" />
                                    <div
                                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200')] bg-center bg-cover overflow-hidden"
                                        style={{ width: `${sliderPos}%` }}
                                    >
                                        <div className="absolute top-8 left-8 flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                            <Sparkles className="h-4 w-4 text-gold" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Résultat Simulation</span>
                                        </div>
                                    </div>
                                    <div
                                        className="absolute inset-y-0 w-1 bg-accent cursor-ew-resize group"
                                        style={{ left: `${sliderPos}%` }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-accent rounded-full border-4 border-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                            <PenTool className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                                        min="0" max="100"
                                        value={sliderPos}
                                        onChange={(e) => setSliderPos(parseInt(e.target.value))}
                                    />
                                    <div className="absolute bottom-8 right-8 flex gap-4">
                                        <Button variant="outline" className="bg-white/10 border-white/10 text-white rounded-xl text-[10px] font-black uppercase">Blanchiment +2</Button>
                                        <Button variant="outline" className="bg-white/10 border-white/10 text-white rounded-xl text-[10px] font-black uppercase">Pose Facettes E-Max</Button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'IMPLANT' && (
                                <motion.div
                                    key="implant"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative w-full h-full flex items-center justify-center bg-black"
                                >
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=1200')] bg-center bg-cover" />
                                    <div className="relative z-10 text-center space-y-8">
                                        <div className="h-64 w-64 rounded-full border-[1px] border-accent/30 flex items-center justify-center animate-spin-slow">
                                            <div className="h-48 w-48 rounded-full border-[1px] border-accent/50 flex items-center justify-center">
                                                <Target className="h-20 w-20 text-accent animate-pulse" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-white tracking-tighter">Planification Guidée #16</h3>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Positionnement Implantaire 3D</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-4">
                                        {[
                                            { label: 'Diamètre', val: '4.3mm' },
                                            { label: 'Longueur', val: '12.5mm' },
                                            { label: 'Axe', val: '7.4°' },
                                            { label: 'Torque', val: '35 Ncm' },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl w-32 border-l-2 border-l-accent">
                                                <p className="text-[8px] font-black text-slate-500 uppercase">{stat.label}</p>
                                                <p className="text-sm font-black text-white">{stat.val}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'ORTHO' && (
                                <motion.div
                                    key="ortho"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="relative w-full h-full p-12 flex flex-col justify-end"
                                >
                                    <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-slate-950 to-transparent" />
                                    <div className="relative z-10 space-y-10">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h3 className="text-3xl font-black text-white tracking-tighter">Timeline Invisalign</h3>
                                                <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mt-2">Séquençage des Gouttières (45/52)</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-5xl font-black text-white">86%</p>
                                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Progression</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="flex-1 flex flex-col gap-3">
                                                    <div className={cn(
                                                        "h-2 rounded-full",
                                                        i < 6 ? "bg-accent" : i === 6 ? "bg-accent animate-pulse" : "bg-white/5"
                                                    )} />
                                                    <span className="text-[8px] font-black text-slate-500 uppercase">W-{i + 1}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map(p => (
                            <Card key={p.id} className="rounded-[2rem] border-none shadow-luxury bg-white group hover:translate-y-[-4px] transition-all overflow-hidden border border-slate-50">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <FlaskConical className="h-5 w-5" />
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                            p.status === 'ACCEPTED' ? "bg-teal-50 text-teal-700" : "bg-indigo-50 text-indigo-700"
                                        )}>
                                            {p.status}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-slate-900 line-clamp-2 min-h-[3rem] tracking-tight">{p.title}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{p.patient}</p>
                                    </div>
                                    <div className="space-y-2 pt-4 border-t border-slate-50">
                                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                                            <span>Validation Clinical AI</span>
                                            <span>{p.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-900 rounded-full" style={{ width: `${p.progress}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                        <span className="text-sm font-black text-slate-900">{p.cost}</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-900 transition-colors"><ChevronRight className="h-5 w-5" /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Control Panel Right */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 space-y-8">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
                                Smart Planning Helper
                                <Sparkles className="h-4 w-4" />
                            </h3>
                            <div className="space-y-4">
                                <Button className="w-full bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl h-14 flex justify-between px-6 hover:bg-white hover:border-accent group transition-all">
                                    <div className="flex items-center gap-3">
                                        <Maximize2 className="h-5 w-5 text-indigo-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Optimiser l'Axe</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-accent" />
                                </Button>
                                <Button className="w-full bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl h-14 flex justify-between px-6 hover:bg-white hover:border-accent group transition-all">
                                    <div className="flex items-center gap-3">
                                        <Layers className="h-5 w-5 text-teal-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Simuler Greffe</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-accent" />
                                </Button>
                                <Button className="w-full bg-slate-900 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] shadow-xl shadow-slate-200">
                                    Générer Guide Chirurgical
                                </Button>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="h-5 w-5 text-teal-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">Validation Éthique</span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">Le plan de traitement a été scanné contre 12,000 protocoles de référence. Aucune contre-indication détectée pour le patient #452.</p>
                        </div>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Box className="h-32 w-32" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-accent mb-6">Paramètres Simulateur 3D</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Rendu Textures', val: 'Ultra HD' },
                                { label: 'Physique des tissus', val: 'Activé' },
                                { label: 'Niveau d\'IA', val: 'Maximum' },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-[10px] font-medium text-slate-400">{s.label}</span>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{s.val}</span>
                                </div>
                            ))}
                            <div className="pt-6 border-t border-white/5">
                                <Button variant="outline" className="w-full border-white/10 text-white rounded-xl text-[10px] font-black uppercase h-11 hover:bg-white/5">Exporter pour Patient</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-gradient-to-br from-indigo-500 to-indigo-700 p-8 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="h-5 w-5" />
                            <h3 className="text-lg font-black tracking-tight">Smile Design AI</h3>
                        </div>
                        <p className="text-xs text-white/80 font-medium leading-relaxed mb-6">Simulation automatique du résultat final basée sur le profil morphologique du patient.</p>
                        <Button className="w-full bg-white text-indigo-700 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl shadow-lg border-none hover:bg-indigo-50">Lancer Auto-Design</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

