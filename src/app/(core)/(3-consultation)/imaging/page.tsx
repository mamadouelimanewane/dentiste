"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    ImageIcon,
    Maximize2,
    MousePointer2,
    Ruler,
    Layers,
    Download,
    Trash2,
    Share2,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    Activity,
    Box,
    FileText,
    Zap,
    Sparkles,
    CheckCircle2,
    CloudIcon,
    Lock,
    Split,
    Scaling,
    RotateCw,
    Contrast,
    Sun
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function ImagingPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [viewMode, setViewMode] = useState<'GALLERY' | 'VIEWER' | 'COMPARISON'>('GALLERY')
    const [comparisonImages, setComparisonImages] = useState<number[]>([1, 4]) // Comparison between Panoramique and X-Ray
    const [sliderPos, setSliderPos] = useState(50)

    const gallery = [
        { id: 1, type: 'BANO', date: '12 Jan 2026', tooth: 'Full', title: 'Panoramique Initiative', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800' },
        { id: 2, type: 'CBCT', date: '08 Jan 2026', tooth: '16, 17', title: 'Cone Beam 3D Précision', url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800' },
        { id: 3, type: 'PHOTO', date: '04 Jan 2026', tooth: 'Antérieures', title: 'Smile Design - Avant', url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800' },
        { id: 4, type: 'XRAY', date: '02 Jan 2026', tooth: '26', title: 'Rétro-alvéolaire', url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Imagerie & Diagnostic 3D</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-gold">Imaging Lab</span></h1>
                    <p className="text-slate-500 font-medium">Visualisation DICOM, CBCT et outils de mesure sub-millimétriques.</p>
                </div>
                <div className="flex gap-3">
                    <Card className="bg-teal-50 border-teal-100 flex items-center px-4 py-2 gap-3 rounded-2xl">
                        <CloudIcon className="h-4 w-4 text-teal-600" />
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase text-teal-700 tracking-widest leading-none">Cloud HDS Actif</span>
                            <span className="text-[10px] font-bold text-teal-900">3.4 TB disponibles</span>
                        </div>
                    </Card>
                    <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 font-bold bg-white"
                        onClick={() => setViewMode('COMPARISON')}
                    >
                        <Split className="mr-2 h-4 w-4" /> Comparaison Avant/Après
                    </Button>
                    <Button className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-2xl px-8 shadow-xl">
                        <ImageIcon className="h-4 w-4 mr-2" /> Importer DICOM/STL
                    </Button>
                </div>
            </div>

            {viewMode === 'GALLERY' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gallery.map(img => (
                            <Card key={img.id} className="rounded-[2rem] border-none shadow-luxury bg-white group hover:scale-[1.02] transition-all overflow-hidden border border-slate-50">
                                <div
                                    className="aspect-square relative overflow-hidden cursor-pointer"
                                    onClick={() => { setSelectedImage(img.id); setViewMode('VIEWER'); }}
                                >
                                    <img src={img.url} alt={img.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <div className="flex gap-2">
                                            <Button size="icon" className="h-8 w-8 rounded-lg bg-white/20 hover:bg-white/40 text-white backdrop-blur-md">
                                                <Maximize2 className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" className="h-8 w-8 rounded-lg bg-white/20 hover:bg-white/40 text-white backdrop-blur-md">
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                                            {img.type}
                                        </span>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-sm font-black text-slate-900 mb-1">{img.title}</h3>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Tooth {img.tooth}</span>
                                        <span>{img.date}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {viewMode === 'VIEWER' && (
                <div className="animate-in zoom-in duration-500">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 overflow-hidden relative min-h-[700px] flex flex-col">
                        {/* Viewer Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-md relative z-10">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => setViewMode('GALLERY')}>
                                    <ChevronLeft className="h-5 w-5 mr-2" /> Retour
                                </Button>
                                <div className="h-4 w-[1px] bg-white/10" />
                                <h2 className="text-white font-black tracking-tight">{gallery[selectedImage ? selectedImage - 1 : 0].title}</h2>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="bg-white/5 border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Télécharger DICOM</Button>
                                <Button className="bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest px-6">Partager Confrère</Button>
                            </div>
                        </div>

                        {/* Main Interaction Area */}
                        <div className="flex-1 flex overflow-hidden">
                            {/* Toolbar Left */}
                            <div className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-slate-950 relative z-10">
                                {[
                                    { icon: MousePointer2, label: 'Selection' },
                                    { icon: Ruler, label: 'Mesure' },
                                    { icon: Activity, label: 'Densité' },
                                    { icon: Layers, label: 'Calques' },
                                    { icon: Sun, label: 'Luminosité' },
                                    { icon: Contrast, label: 'Contraste' },
                                    { icon: RotateCw, label: 'Rotation' },
                                    { icon: Zap, label: 'AI Diagnostic' },
                                ].map((tool, i) => (
                                    <Button key={i} variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-accent hover:bg-white/5 transition-all">
                                        <tool.icon className="h-5 w-5" />
                                    </Button>
                                ))}
                            </div>

                            {/* Center Viewer */}
                            <div className="flex-1 relative bg-black flex items-center justify-center group overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
                                <img
                                    src={gallery[selectedImage ? selectedImage - 1 : 0].url}
                                    className="max-h-[90%] max-w-[90%] object-contain"
                                    alt="Selected Diagnostic"
                                />

                                {/* Annotation Labels (Mock) */}
                                <div className="absolute top-[40%] left-[30%] pointer-events-none">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500 border-2 border-white animate-pulse" />
                                        <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-[8px] text-white font-black uppercase border border-white/10">Lésion apicale ?</div>
                                    </div>
                                </div>

                                {/* Overlay AI Info */}
                                <div className="absolute top-8 right-8 w-64 space-y-4">
                                    <Card className="bg-slate-900/80 backdrop-blur-xl border-white/10 p-4 text-white rounded-2xl shadow-2xl">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="h-4 w-4 text-gold" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gold">AI Diagnostic Lab</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-slate-500 uppercase">Densité Osseuse (Hu)</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-teal-500" style={{ width: '75%' }}></div>
                                                    </div>
                                                    <span className="text-[10px] font-black">754 Hu</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-bold border-b border-white/5 pb-2">
                                                <span className="text-slate-400 uppercase tracking-tighter">Racine 16</span>
                                                <span className="text-white">14.22 mm</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-bold">
                                                <span className="text-slate-400 uppercase tracking-tighter">Diagnostic</span>
                                                <span className="text-red-400">Pathologie détectée</span>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="bg-slate-900/80 backdrop-blur-xl border-white/10 p-4 text-white rounded-2xl shadow-2xl">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Box className="h-4 w-4 text-accent" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-accent">CBCT 3D View</span>
                                        </div>
                                        <div className="aspect-square bg-slate-950 rounded-xl flex items-center justify-center border border-white/5 group-hover:bg-slate-900 transition-all overflow-hidden relative">
                                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400')] opacity-20 bg-center bg-cover" />
                                            <Activity className="h-8 w-8 text-white/50 animate-pulse relative z-10" />
                                        </div>
                                    </Card>
                                </div>

                                {/* Ruler Mock */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none">
                                    <div className="flex flex-col items-center">
                                        <div className="h-4 flex items-end gap-1">
                                            {[...Array(20)].map((_, i) => (
                                                <div key={i} className={cn("w-[2px] bg-white/20", i % 5 === 0 ? "h-4" : "h-2")} />
                                            ))}
                                        </div>
                                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest mt-1">Escale : 1px = 0.05mm</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Right (Metadata/History) */}
                            <div className="w-80 border-l border-white/5 bg-slate-950 p-8 space-y-8 relative z-10 flex flex-col">
                                <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
                                    <div>
                                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                                            <FileText className="h-4 w-4" /> Analyse Expert
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { user: 'Dr. Martin', note: 'Absence de pathologie apicale sur 16.', time: '12 Jan 2026' },
                                                { user: 'Système', note: 'Auto-classification : Radiographie Panoramique conforme.', time: '12 Jan 2026' },
                                            ].map((n, i) => (
                                                <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 group hover:border-accent/40 transition-colors">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <p className="text-[10px] font-black text-accent uppercase">{n.user}</p>
                                                        <span className="text-[8px] font-bold text-slate-600 tracking-tighter">{n.time}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{n.note}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Lock className="h-3 w-3 text-indigo-400" />
                                            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Sécurisation Cloud</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 leading-relaxed italic">Image originale haute résolution (80MB) sauvegardée dans le coffre HDS.</p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/5">
                                    <Button className="w-full bg-accent text-white rounded-xl text-[10px] font-black uppercase h-12 hover:bg-accent/80 shadow-lg shadow-accent/20">
                                        Ajouter Diagnostic
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {viewMode === 'COMPARISON' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500 h-[700px]">
                    <Card className="rounded-[3.5rem] border-none shadow-luxury bg-slate-950 overflow-hidden relative h-full flex flex-col">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-md relative z-10">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => setViewMode('GALLERY')}>
                                    <ChevronLeft className="h-5 w-5 mr-2" /> Gallery
                                </Button>
                                <div className="h-4 w-[1px] bg-white/10" />
                                <h2 className="text-white font-black tracking-tight uppercase text-xs tracking-[0.2em]">Superposition Comparative <span className="text-gold">Elite-View</span></h2>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 bg-white/5 px-4 rounded-xl border border-white/10">
                                    <span className="text-[9px] font-black text-slate-400 uppercase">Sensibilité</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        className="accent-accent h-1 w-24"
                                        value={sliderPos}
                                        onChange={(e) => setSliderPos(parseInt(e.target.value))}
                                    />
                                </div>
                                <Button className="bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest px-6" onClick={() => setViewMode('GALLERY')}>Quitter</Button>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-black overflow-hidden flex items-center justify-center">
                            {/* Comparison Slider UI */}
                            <div className="relative w-[90%] h-[90%] overflow-hidden rounded-2xl border border-white/5">
                                {/* Image 1 (Background) */}
                                <img src={gallery[0].url} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" />

                                {/* Image 2 (Foreground / Over) */}
                                <div
                                    className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-accent transition-all duration-75"
                                    style={{ width: `${sliderPos}%` }}
                                >
                                    <img src={gallery[1].url} className="absolute inset-0 w-full h-full object-cover scale-150 transform-gpu" style={{ width: `calc(100% * (100 / ${sliderPos}))` }} />
                                    <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">Avant : 12 Jan 2026</p>
                                    </div>
                                </div>
                                <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest text-right">Après : Diagnostic 3D</p>
                                </div>

                                {/* Drag Handle */}
                                <div
                                    className="absolute inset-y-0 w-1 bg-accent cursor-ew-resize group"
                                    style={{ left: `${sliderPos}%` }}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-accent rounded-full border-4 border-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <Scaling className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Info Tooltip Overlay */}
                            <div className="absolute bottom-10 inset-x-0 flex justify-center pointer-events-none">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="bg-accent/90 backdrop-blur-md text-white px-8 h-12 rounded-full flex items-center gap-4 border border-white/20 shadow-2xl"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">L'IA détecte un gain de masse osseuse de +12.4% entre les deux clichés.</span>
                                </motion.div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}

