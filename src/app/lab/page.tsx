"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    FlaskConical,
    Truck,
    Clock,
    FileUp,
    Palette,
    Box,
    ChevronRight,
    Search,
    Filter,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Library,
    Layers,
    Shapes,
    Sparkles,
    Eye
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function LabPage() {
    const [activeTab, setActiveTab] = useState<'WORKS' | 'CATALOG' | 'STOCKS'>('WORKS')

    const labWorks = [
        { id: 'LAB-2026-001', patient: 'Sophie Faye', lab: 'DentiLab Pro 3D', type: 'Couronne Zircone E-Max', shade: 'A2 (VITA)', status: 'IN_TRANSIT', delivery: '14 Jan', stl: 'scan_upper_45.stl' },
        { id: 'LAB-2026-002', patient: 'Mamadou Diallo', lab: 'Elite Ortho Lab', type: 'Guide Chirurgical Impl.', shade: '--', status: 'RECEIVED', delivery: 'Hier', stl: 'guide_16_17.stl' },
        { id: 'LAB-2026-003', patient: 'Marie Curie', lab: 'Design Dental Sur Mesure', type: 'Bridge 3 Éléments', shade: 'A3', status: 'WAITING_RETOUCH', delivery: 'Pausé', stl: 'bridge_curie.stl' },
    ]

    const materials = [
        { name: 'Zircone Multicouche High-Trans', category: 'Céramique', properties: 'Hautement esthétique, 1200MPa' },
        { name: 'E-Max Press', category: 'Céramique Vitreuse', properties: 'Translucidité naturelle' },
        { name: 'Titane Grade 5', category: 'Métal', properties: 'Bio-compatible, Haute résistance' },
        { name: 'PMMA High-Quality', category: 'Temporaire', properties: 'Longue durée (jusqu\'à 6 mois)' },
    ]

    const shades = ['A1', 'A2', 'A3', 'A3.5', 'B1', 'B2', 'C1', 'D2', 'Bleach 1']

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Liaison Labo & CFAO Digitale</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Prosthetics <span className="text-gold">Lab Center</span></h1>
                    <p className="text-slate-500 font-medium">Gestion des flux numériques (STL), suivi des travaux et catalogue de matériaux.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                        {(['WORKS', 'CATALOG', 'STOCKS'] as const).map(tab => (
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
                                {tab === 'WORKS' ? 'En Cours' : tab === 'CATALOG' ? 'Matériaux' : 'Stocks'}
                            </Button>
                        ))}
                    </div>
                    <Button className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl px-8 shadow-xl">
                        <PlusIcon className="h-4 w-4 mr-2" /> Nouveau Travail
                    </Button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'WORKS' && (
                    <motion.div
                        key="works"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-12 gap-8"
                    >
                        {/* Task List */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                    <div className="relative w-72">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input placeholder="Rechercher patient ou labo..." className="pl-10 h-10 bg-slate-50 border-none rounded-xl text-xs font-bold" />
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-slate-400"><Filter className="mr-2 h-4 w-4" /> Trier par Date</Button>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-slate-50">
                                        {labWorks.map(work => (
                                            <div key={work.id} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-6">
                                                    <div className={cn(
                                                        "h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black",
                                                        work.status === 'RECEIVED' ? "bg-teal-50 text-teal-600" :
                                                            work.status === 'IN_TRANSIT' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                                                    )}>
                                                        {work.status === 'RECEIVED' ? <CheckCircle2 className="h-6 w-6" /> : <Truck className="h-6 w-6" />}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{work.patient}</h3>
                                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{work.type} • {work.shade}</p>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1.5 bg-slate-900/5 px-2.5 py-1 rounded-lg">
                                                                <FileUp className="h-3 w-3 text-slate-400" />
                                                                <span className="text-[9px] font-black text-slate-500 uppercase">{work.stl}</span>
                                                            </div>
                                                            <span className="text-[9px] font-bold text-slate-300">Lab: {work.lab}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-10">
                                                    <div className="text-right">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Livraison Prévue</p>
                                                        <p className="text-base font-black text-slate-900 flex items-center gap-2 justify-end">
                                                            <Clock className="h-4 w-4 text-accent" /> {work.delivery}
                                                        </p>
                                                    </div>
                                                    <Button variant="outline" size="icon" className="h-10 w-10 border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all">
                                                        <ChevronRight className="h-5 w-5 text-slate-400" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Stats & CFAO Sync */}
                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Layers className="h-32 w-32 text-accent" />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                                            <Shapes className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Status Gateway CFAO</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Cloud Sync STL', status: 'Online', color: 'text-teal-400' },
                                            { label: 'Liaison Labo Pro', status: 'Encrypted', color: 'text-blue-400' },
                                            { label: 'File d\'attente', status: '3 fichiers', color: 'text-accent' },
                                        ].map((s, i) => (
                                            <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-slate-500">{s.label}</span>
                                                <span className={s.color}>{s.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl hover:bg-white/10">Synchroniser Scanner ITero</Button>
                                </div>
                            </Card>

                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 border border-slate-50">
                                <div className="flex items-center gap-3 mb-6">
                                    <Palette className="h-5 w-5 text-indigo-500" />
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Sélecteur de Teintes Smart</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {shades.slice(0, 6).map(s => (
                                        <div key={s} className="flex flex-col items-center gap-2 cursor-pointer group">
                                            <div className="h-12 w-full rounded-xl bg-gradient-to-br from-[#f8f1e0] to-[#e8dcc0] border border-slate-100 group-hover:border-accent transition-all flex items-center justify-center">
                                                <span className="text-[10px] font-black text-slate-900/40">{s}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="link" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 mt-4">Voir Nuancier Complet →</Button>
                            </Card>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'CATALOG' && (
                    <motion.div
                        key="catalog"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {materials.map(m => (
                            <Card key={m.name} className="rounded-[2rem] border-none shadow-luxury bg-white p-8 space-y-4 group hover:scale-[1.02] transition-all border border-slate-50">
                                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                                    <Library className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-900 tracking-tight">{m.name}</h3>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">{m.category}</span>
                                </div>
                                <p className="text-[10px] font-medium text-slate-500 leading-relaxed border-t border-slate-50 pt-4">{m.properties}</p>
                                <Button variant="ghost" className="w-full text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 p-0 h-auto self-end">Consulter Fiche Technique</Button>
                            </Card>
                        ))}
                        <Card className="rounded-[2rem] border-dashed border-2 border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 cursor-pointer hover:bg-slate-50 hover:border-slate-400 transition-all">
                            <PlusIcon className="h-8 w-8 mb-2 opacity-20" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Nouveau Matériau</span>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'STOCKS' && (
                    <motion.div
                        key="stocks"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: 'Dents Temporaires (Lot)', qty: 45, unit: 'pcs', alert: false },
                                { name: 'Résine PMMA Temporaire', qty: 2, unit: 'blocs', alert: true },
                                { name: 'Ciment Temporaire Sans Eugenol', qty: 12, unit: 'tubes', alert: false },
                            ].map((s, i) => (
                                <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 flex items-center gap-6">
                                    <div className={cn(
                                        "h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-black",
                                        s.alert ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-900"
                                    )}>
                                        {s.qty}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-slate-900 tracking-tight">{s.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.unit}</p>
                                        {s.alert && (
                                            <div className="mt-2 flex items-center gap-1.5 text-red-600">
                                                <AlertCircle className="h-3 w-3" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Stock Faible</span>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Box className="h-40 w-40" />
                            </div>
                            <div className="relative z-10 space-y-6 max-w-2xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200">Gestion Intelligent des Temporaires</span>
                                <h2 className="text-3xl font-black tracking-tighter">Inventaire & Traçabilité J+0.</h2>
                                <p className="text-indigo-100 text-sm font-medium leading-relaxed">Suivez chaque élément prothétique provisoire installé. Le système alerte automatiquement le patient et le laboratoire si le port d'une temporaire dépasse la limite recommandée.</p>
                                <div className="flex gap-4">
                                    <Button className="bg-white text-indigo-600 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 shadow-xl">Audit Inventaire</Button>
                                    <Button className="bg-indigo-400 text-white border border-indigo-300 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8">Configuration Alertes</Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )
}

