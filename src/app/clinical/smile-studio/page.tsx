"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Sparkles, Camera, Smartphone, Scan, 
    RefreshCw, Heart, Share2, Download, 
    Layers, Zap, ShieldCheck, Microscope,
    Maximize2, ChevronRight, Wand2, Eye, Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function HolographicSmileStudio() {
    const [isSimulating, setIsSimulating] = useState(false)
    const [selectedStyle, setSelectedStyle] = useState('HOLLYWOOD')
    
    const smileStyles = [
        { id: 'HOLLYWOOD', name: 'Hollywood White', desc: 'Blancheur éclatante et symétrie parfaite.', icon: Sparkles },
        { id: 'NATURAL', name: 'Natural Elite', desc: 'Harmonie biologique et nuances subtiles.', icon: Heart },
        { id: 'SPORT', name: 'Active Force', desc: 'Robustesse et alignement fonctionnel.', icon: Zap },
    ]

    const simulate = () => {
        setIsSimulating(true)
        setTimeout(() => setIsSimulating(false), 3000)
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 space-y-10">
            {/* Header / Brand */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            <Wand2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em]">AR Generative Aesthetics</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter italic uppercase text-white">
                        Holographic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-glow">Smile Studio</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-2xl h-14 px-8 font-black uppercase text-[10px] tracking-widest">
                        <Camera className="mr-2 h-4 w-4" /> Calibration Facial
                    </Button>
                    <Button onClick={simulate} disabled={isSimulating} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl h-14 px-10 font-black uppercase text-[10px] tracking-widest shadow-luxury border-none">
                        {isSimulating ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Eye className="mr-2 h-4 w-4" />}
                        {isSimulating ? 'Génération Holo-Mirror...' : 'Lancer le Miroir Magique'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Visualizer Frame */}
                <Card className="lg:col-span-8 rounded-[4rem] border-none bg-black/40 shadow-[0_0_100px_rgba(168,85,247,0.15)] overflow-hidden relative group">
                    <div className="absolute inset-0 bg-radial-indigo pointer-events-none opacity-20" />
                    
                    <div className="relative z-10 p-10 h-full flex flex-col items-center justify-center min-h-[650px]">
                        {/* The "Hologram" */}
                        <div className="relative aspect-[4/5] w-full max-w-[450px] rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl bg-slate-950 flex items-center justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1542610123-e813979d3e56?auto=format&fit=crop&q=80&w=800"
                                className={cn("w-full h-full object-cover transition-all duration-1000", isSimulating ? "blur-xl scale-110 opacity-50" : "grayscale group-hover:grayscale-0")}
                            />
                            
                            {/* Neural Overlay */}
                            <AnimatePresence>
                                {!isSimulating && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Scanning Grid (Vertical Line) */}
                            {isSimulating && (
                                <motion.div 
                                    className="absolute inset-x-0 h-[2px] bg-purple-400 shadow-[0_0_20px_purple] z-20"
                                    initial={{ top: "0%" }}
                                    animate={{ top: "100%" }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                            )}

                            {/* Floating UI Elements on the Mirror */}
                            <div className="absolute top-10 left-10 flex flex-col gap-3">
                                <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Tracking Face 100%</span>
                                </div>
                                <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                    <Layers className="h-3 w-3 text-white" />
                                    <span className="text-[8px] font-black uppercase tracking-widest">{selectedStyle} Applied</span>
                                </div>
                            </div>
                        </div>

                        {/* Controls underneath */}
                        <div className="mt-10 flex gap-6">
                            {smileStyles.map(style => (
                                <button 
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={cn(
                                        "flex flex-col items-center gap-2 transition-all group",
                                        selectedStyle === style.id ? "scale-110" : "opacity-40 hover:opacity-100"
                                    )}
                                >
                                    <div className={cn(
                                        "h-16 w-16 rounded-[1.5rem] border-2 flex items-center justify-center transition-all",
                                        selectedStyle === style.id ? "border-purple-500 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.3)]" : "border-white/10 bg-white/5"
                                    )}>
                                        <style.icon className={cn("h-6 w-6", selectedStyle === style.id ? "text-purple-400" : "text-white")} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{style.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Aesthetic Detail Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="rounded-[3rem] border-none bg-white text-slate-900 p-8 shadow-luxury">
                        <CardHeader className="p-0 mb-8 border-b border-slate-50 pb-6">
                            <CardTitle className="text-xl font-black uppercase tracking-tight italic">Analyse <span className="text-purple-600">Proportionnelle</span></CardTitle>
                        </CardHeader>
                        <div className="space-y-8">
                            {[
                                { label: 'Ratio Gencive / Dent', value: '72/28', desc: 'Harmonie optimale détectée.', status: 'OK' },
                                { label: 'Axe Inter-Incisif', value: '0.5°', desc: 'Alignement parfait avec le philtrum.', status: 'OK' },
                                { label: 'Exposition Labiale', value: 'Medium', desc: 'Recommandation : Lifting léger des tissus.', status: 'SUGGESTION' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                        <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-full uppercase", item.status === 'OK' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600')}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p className="text-lg font-black text-slate-900">{item.value}</p>
                                        <p className="text-[11px] font-medium text-slate-400 italic">"{item.desc}"</p>
                                    </div>
                                    <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-950 w-[85%]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 space-y-3">
                            <Button className="w-full bg-slate-900 text-white rounded-2xl h-14 font-black uppercase text-[10px] tracking-widest shadow-xl">
                                <Share2 className="mr-2 h-4 w-4" /> Partager l'Avatar 3D
                            </Button>
                            <Button variant="ghost" className="w-full text-slate-400 hover:text-slate-900 uppercase text-[9px] font-black tracking-widest">
                                <Download className="mr-2 h-4 w-4" /> Sauvegarder Simulation
                            </Button>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none bg-slate-800 text-white p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                            <Star className="h-40 w-40" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-purple-400">Elite Reward</h3>
                        <p className="text-2xl font-black italic tracking-tighter uppercase leading-tight">
                            Gagnez <span className="text-emerald-400">500 Points</span> en partageant votre futur sourire.
                        </p>
                        <Button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl h-12 font-black uppercase text-[9px] tracking-widest">
                            Social Media Connect
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
