"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Activity,
    Zap,
    Sparkles,
    Search,
    Brain,
    Maximize2,
    Ruler,
    Layers,
    RotateCw,
    Contrast,
    Sun,
    Lock,
    Eye,
    History,
    FileSearch,
    AlertCircle,
    CheckCircle2,
    Cpu,
    Radiation,
    ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function AIRadioLab() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<any>(null)
    const [selectedRadio, setSelectedRadio] = useState<any>(null)

    const radios = [
        { id: 1, title: 'Panoramique Patient Jean V.', date: '24 Jan 2026', type: 'BANO', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800' },
        { id: 2, title: 'CBCT 3D - Secteur 4', date: '20 Jan 2026', type: 'CBCT', url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800' },
    ]

    const handleRunAI = () => {
        setIsAnalyzing(true)
        setAnalysisResult(null)
        setTimeout(() => {
            setIsAnalyzing(false)
            setAnalysisResult({
                detections: [
                    { zone: '16-17', diagnosis: 'Caries probables (92% confidence)', severity: 'HIGH', color: 'text-red-500' },
                    { zone: 'Secteur 4', diagnosis: 'Résorption osseuse horizontale légère', severity: 'MODERATE', color: 'text-amber-500' },
                    { zone: '38', diagnosis: 'Dent de sagesse incluse - proximité nerf alvéolaire', severity: 'CRITICAL', color: 'text-rose-500' }
                ],
                generalIndex: 94
            })
        }, 3000)
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={() => window.location.href = '/imaging'} className="rounded-2xl h-14 w-14 bg-white border shadow-sm">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Radiation className="h-4 w-4 text-rose-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 italic">Advanced Neural Imaging</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">AI <span className="text-rose-600">Radio Lab</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Diagnostic assisté par ordinateur et détection automatique de pathologies.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <History className="mr-2 h-4 w-4" /> Journal d'Analyse
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Cpu className="mr-2 h-5 w-5" /> Charger Core V2.4
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Main AI Viewer */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-2xl bg-black overflow-hidden relative min-h-[600px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />

                        {!selectedRadio ? (
                            <div className="text-center space-y-6">
                                <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto animate-pulse">
                                    <Eye className="h-10 w-10 text-white/20" />
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-white/30">Veuillez sélectionner un examen pour lancer l'analyse IA</p>
                            </div>
                        ) : (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img src={selectedRadio.url} className="max-h-[85%] max-w-[85%] object-contain" alt="Clinical Exam" />

                                {/* AI Scanning Animation */}
                                <AnimatePresence>
                                    {isAnalyzing && (
                                        <motion.div
                                            initial={{ top: '0%' }}
                                            animate={{ top: '100%' }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            className="absolute left-0 right-0 h-1 bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,1)] z-20"
                                        />
                                    )}
                                </AnimatePresence>

                                {/* AI Detections Overlays */}
                                {analysisResult && (
                                    <div className="absolute inset-0 z-30 pointer-events-none">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="absolute top-[35%] left-[25%] h-24 w-24 border-2 border-rose-500 rounded-xl"
                                        >
                                            <div className="absolute top-0 left-0 -translate-y-full bg-rose-500 text-white text-[8px] font-black px-2 py-0.5 rounded-t-lg">PATHOLOGY: 16-17</div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="absolute bottom-[20%] right-[30%] h-16 w-16 border-2 border-amber-500 rounded-xl"
                                        >
                                            <div className="absolute top-0 left-0 -translate-y-full bg-amber-500 text-white text-[8px] font-black px-2 py-0.5 rounded-t-lg">RE-ANALYZE: 38</div>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Top Tools Bar */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-40">
                            <div className="flex gap-2">
                                {[Maximize2, Ruler, Layers, RotateCw, Contrast, Sun].map((Icon, i) => (
                                    <Button key={i} size="icon" className="h-10 w-10 bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 rounded-xl backdrop-blur-md">
                                        <Icon className="h-4 w-4" />
                                    </Button>
                                ))}
                            </div>
                            {selectedRadio && (
                                <Button
                                    onClick={handleRunAI}
                                    disabled={isAnalyzing}
                                    className="bg-rose-600 hover:bg-rose-500 text-white font-black uppercase text-[10px] tracking-widest h-11 rounded-xl px-8 shadow-xl shadow-rose-600/20"
                                >
                                    {isAnalyzing ? <Zap className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                    {isAnalyzing ? "Calcul Neural..." : "Lancer diagnostic IA"}
                                </Button>
                            )}
                        </div>
                    </Card>

                    {/* Radio Select Gallery */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {radios.map(r => (
                            <Card
                                key={r.id}
                                onClick={() => setSelectedRadio(r)}
                                className={cn(
                                    "rounded-[2rem] border-none shadow-luxury cursor-pointer transition-all overflow-hidden",
                                    selectedRadio?.id === r.id ? "ring-4 ring-rose-500/30 border-rose-500" : "bg-white hover:bg-slate-50"
                                )}
                            >
                                <div className="aspect-video bg-slate-900 relative">
                                    <img src={r.url} className="w-full h-full object-cover opacity-60" />
                                    <div className="absolute bottom-2 left-2 text-[8px] font-black text-white/60 uppercase">{r.type}</div>
                                </div>
                                <div className="p-4">
                                    <p className="text-[10px] font-black text-slate-800 tracking-tight line-clamp-1">{r.title}</p>
                                    <p className="text-[9px] font-bold text-slate-400 mt-0.5">{r.date}</p>
                                </div>
                            </Card>
                        ))}
                        <Card className="rounded-[2rem] border-dashed border-2 border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer p-4">
                            <Radiation className="h-6 w-6 mb-2 opacity-20" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Importer DICOM</span>
                        </Card>
                    </div>
                </div>

                {/* Right Analysis Feed */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Rapport d'Intelligence</h3>
                            <Brain className="h-5 w-5 text-rose-500" />
                        </div>

                        <div className="space-y-6">
                            {isAnalyzing ? (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                                    <Cpu className="h-10 w-10 text-rose-200 animate-spin" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                                        Traitement du volume DICOM<br />Convolution des calques pathogènes...
                                    </p>
                                </div>
                            ) : analysisResult ? (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2rem] text-center">
                                        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Score Global Santé</p>
                                        <p className="text-4xl font-black text-rose-600 tracking-tighter">{analysisResult.generalIndex}%</p>
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        {analysisResult.detections.map((d: any, i: number) => (
                                            <div key={i} className="py-4 flex gap-4">
                                                <div className={cn("mt-1", d.color)}>
                                                    <AlertCircle className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900">{d.zone}</p>
                                                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed mt-0.5">{d.diagnosis}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl">
                                        Générer Compte-Rendu Lab
                                    </Button>
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                                    <FileSearch className="h-12 w-12 text-slate-200" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">En attente de données</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Lock className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/50">HDS Compliance Shield</h3>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                                <span className="text-xs font-bold">Chiffrement AES-256 Actif</span>
                            </div>
                            <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                                "Toutes les images traitées par le Labo IA sont anonymisées avant transmission aux serveurs de calcul neural."
                            </p>
                            <Button variant="outline" className="w-full border-white/10 text-white font-black uppercase text-[9px] tracking-widest h-10 rounded-xl">
                                Configurer Privacy IA
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
