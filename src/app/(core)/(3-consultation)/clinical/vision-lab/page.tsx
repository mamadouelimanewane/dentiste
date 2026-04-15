"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Radiation, Zap, Search, Layers, Activity, 
    ShieldAlert, FileText, Download, Share2, 
    Maximize2, Info, ChevronRight, BrainCircuit,
    Crosshair, Microscope, Scan, CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function NeuralVisionLab() {
    const [isScanning, setIsScanning] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)
    const [detections, setDetections] = useState<any[]>([])
    const [selectedView, setSelectedView] = useState('PANORAMIC')

    const startScan = () => {
        setIsScanning(true)
        setScanProgress(0)
        setDetections([])
        
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsScanning(false)
                    setDetections([
                        { id: 1, type: 'RISK', location: 'Dent 36', label: 'Carie Interproximale', confidence: '98.4%', info: 'Infiltration suspectée sous l\'émail.' },
                        { id: 2, type: 'STATUS', location: 'Branche Mandibulaire', label: 'Densité Osseuse Optimale', confidence: '99.1%', info: 'Zone idéale pour implant immédiat.' },
                        { id: 3, type: 'ALERT', location: 'Sinus Maxillaire', label: 'Légère Inflammation', confidence: '82.0%', info: 'Possible sinusite d\'origine dentaire.' },
                    ])
                    return 100
                }
                return prev + 2
            })
        }, 50)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                            <BrainCircuit className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.3em]">Advanced Neural Diagnostics</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter italic uppercase underline decoration-indigo-500/30">
                        Vision <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Lab 24/7</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-2xl h-14 px-8 font-black uppercase text-[10px] tracking-widest transition-all">
                        <Layers className="mr-2 h-4 w-4" /> Switch 3D CBCT
                    </Button>
                    <Button onClick={startScan} disabled={isScanning} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl h-14 px-10 font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-indigo-600/30 border-none">
                        {isScanning ? <Activity className="mr-2 h-4 w-4 animate-spin" /> : <Scan className="mr-2 h-4 w-4" />}
                        {isScanning ? `Analyse EN COURS (${scanProgress}%)` : 'Lancer Analyse Deep IA'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Scan Viewer */}
                <Card className="lg:col-span-8 rounded-[3rem] border-none bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
                    <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                    
                    <div className="p-10 relative z-10">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400">View: Panoramic HD</span>
                                <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400">Contrast: Neural+</span>
                            </div>
                            <Maximize2 className="h-5 w-5 text-slate-500 cursor-pointer hover:text-white transition-colors" />
                        </div>

                        {/* Scanner Visualizer */}
                        <div className="relative aspect-[21/9] bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden shadow-inner flex items-center justify-center">
                            {/* Placeholder for X-Ray */}
                            <img 
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                                className={cn("w-full h-full object-cover opacity-30 grayscale transition-all duration-1000", isScanning && "blur-[1px] brightness-125")}
                            />
                            
                            {/* Scanning Overlays */}
                            {isScanning && (
                                <motion.div 
                                    className="absolute inset-y-0 w-1 bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,1)] z-20"
                                    initial={{ left: "0%" }}
                                    animate={{ left: "100%" }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                            )}

                            {/* Detected Markers */}
                            {!isScanning && detections.map((d, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.3 }}
                                    className="absolute"
                                    style={{ top: `${20 + i * 25}%`, left: `${30 + i * 20}%` }}
                                >
                                    <div className="relative">
                                        <div className={cn(
                                            "h-10 w-10 rounded-full border-2 flex items-center justify-center animate-ping absolute",
                                            d.type === 'RISK' ? 'border-amber-500' : d.type === 'ALERT' ? 'border-red-500' : 'border-emerald-500'
                                        )} />
                                        <div className={cn(
                                            "h-10 w-10 rounded-full border-2 flex items-center justify-center relative bg-slate-900/80 backdrop-blur-md",
                                            d.type === 'RISK' ? 'border-amber-500' : d.type === 'ALERT' ? 'border-red-500' : 'border-emerald-500'
                                        )}>
                                            <Crosshair className={cn("h-4 w-4", d.type === 'RISK' ? 'text-amber-500' : d.type === 'ALERT' ? 'text-red-500' : 'text-emerald-500')} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Analysis Feedback Area */}
                        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Pathologies', value: detections.filter(d => d.type === 'RISK').length, icon: ShieldAlert, color: 'text-amber-500' },
                                { label: 'Alertes Critiques', value: detections.filter(d => d.type === 'ALERT').length, icon: Zap, color: 'text-red-500' },
                                { label: 'Densité Osseuse', value: '88%', icon: Activity, color: 'text-emerald-500' },
                                { label: 'Taux Confiance', value: detections.length > 0 ? '97.2%' : '-', icon: Microscope, color: 'text-indigo-500' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <div className="flex items-center gap-3 mb-1">
                                        <stat.icon className={cn("h-4 w-4", stat.color)} />
                                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</span>
                                    </div>
                                    <p className="text-xl font-black">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Sidebar Analysis Details */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="rounded-[3rem] border-none bg-white text-slate-900 p-8 shadow-luxury">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-xs font-black uppercase tracking-widest border-b border-slate-100 pb-4">Résultats du Scanning Neural</CardTitle>
                        </CardHeader>
                        <div className="space-y-6">
                            <AnimatePresence>
                                {detections.length === 0 && !isScanning && (
                                    <div className="text-center py-10 opacity-30 italic font-medium text-sm">
                                        En attente de scanning...
                                    </div>
                                )}
                                {detections.map((d, i) => (
                                    <motion.div 
                                        key={d.id}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest",
                                                d.type === 'RISK' ? 'bg-amber-100 text-amber-700' : d.type === 'ALERT' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                                            )}>
                                                {d.location}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-400">{d.confidence} match</span>
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 mb-1">{d.label}</h4>
                                        <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">"{d.info}"</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {detections.length > 0 && (
                            <div className="mt-8 space-y-3">
                                <Button className="w-full bg-slate-900 text-white rounded-xl h-12 font-black uppercase text-[9px] tracking-widest">
                                    <Share2 className="mr-2 h-4 w-4" /> Partager au Patient
                                </Button>
                                <Button variant="outline" className="w-full border-slate-200 rounded-xl h-12 font-black uppercase text-[9px] tracking-widest">
                                    <Download className="mr-2 h-4 w-4" /> Exporter Rapport DICOM
                                </Button>
                            </div>
                        )}
                    </Card>

                    <Card className="rounded-[3rem] border-none bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Radiation className="h-40 w-40" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">Deep Learning Insight</h3>
                        <p className="text-2xl font-black italic tracking-tighter leading-tight uppercase mb-6">
                            L'IA préconise <span className="text-indigo-200">l'Implantologie</span> guidée par ordinateur.
                        </p>
                        <Button className="w-full bg-white text-indigo-700 rounded-xl h-12 font-black uppercase text-[9px] tracking-widest shadow-xl">
                            Voir Simulateur 3D
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
