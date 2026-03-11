"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Target, Shield, Activity, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface NeuralNode {
    id: string
    label: string
    type: 'PATHOLOGY' | 'TREATMENT' | 'PREVENTION'
    status: 'DETECTED' | 'RECOMMENDED' | 'PLANNED'
    confidence?: number
}

interface NeuralConnection {
    from: string
    to: string
    label?: string
}

interface NeuralTreatmentMapProps {
    nodes: NeuralNode[]
    connections: NeuralConnection[]
    className?: string
}

export function NeuralTreatmentMap({ nodes, connections, className }: NeuralTreatmentMapProps) {
    return (
        <div className={cn("relative w-full h-[400px] bg-slate-950 rounded-[2.5rem] overflow-hidden p-8", className)}>
            {/* Background Grid/Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950" />
            </div>

            <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Neural treatment mapper</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Calcul stratégique d'inter-dépendances des soins</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            <Activity className="h-3 w-3 text-teal-400" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AI Confidence: 94.2%</span>
                        </div>
                    </div>
                </div>

                {/* Nodes Display (Simulated Graph Layout) */}
                <div className="flex-1 relative flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-12 w-full max-w-2xl px-10">
                        {/* Column 1: Pathologies */}
                        <div className="space-y-6">
                            {nodes.filter(n => n.type === 'PATHOLOGY').map((node, i) => (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl relative group"
                                >
                                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,1)] animate-pulse" />
                                    <p className="text-[9px] font-black text-rose-500 uppercase mb-1">Pathology</p>
                                    <p className="text-xs font-bold text-white">{node.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Column 2: Treatments */}
                        <div className="space-y-6 pt-10">
                            {nodes.filter(n => n.type === 'TREATMENT').map((node, i) => (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="p-5 bg-indigo-500/20 border-2 border-indigo-500/50 rounded-2xl relative shadow-2xl shadow-indigo-500/10 group cursor-default"
                                >
                                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40">
                                        <div className="h-0.5 w-4 bg-indigo-500" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="h-4 w-4 text-indigo-400" />
                                        <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Recommended</p>
                                    </div>
                                    <p className="text-sm font-black text-white">{node.label}</p>

                                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40">
                                        <div className="h-0.5 w-4 bg-teal-500" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Column 3: Impact/Prevention */}
                        <div className="space-y-6">
                            {nodes.filter(n => n.type === 'PREVENTION').map((node, i) => (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl relative"
                                >
                                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,1)]" />
                                    <div className="flex items-center gap-2 mb-1">
                                        <Shield className="h-3 w-3 text-teal-500" />
                                        <p className="text-[9px] font-black text-teal-500 uppercase tracking-widest">Post-Op Goal</p>
                                    </div>
                                    <p className="text-xs font-bold text-white leading-relaxed">{node.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* SVG Connections Layer (Simulated with simple lines for demo) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <svg className="w-full h-full">
                            <defs>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>
                            {/* In a real app, calculate actual paths between node refs */}
                        </svg>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center bg-white/5 border-t border-white/10 p-4 -m-8">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-rose-500" />
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Symptômes Détectés (Vision)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-indigo-500" />
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Actions Prioritaires (GPT-4)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-teal-500" />
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Optimisation de Vie</span>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 group">
                        <Sparkles className="h-3 w-3 group-hover:rotate-12 transition-transform" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Générer Rapport Stratégique</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
