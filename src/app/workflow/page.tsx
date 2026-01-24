"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Plus,
    MoreHorizontal,
    User,
    Clock,
    CheckCircle2,
    Calendar,
    ArrowRight,
    Search,
    Filter,
    Activity,
    Zap,
    AlertCircle,
    Brain,
    Bot,
    GripVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function WorkflowPage() {
    const columns = [
        { id: 'VISIT_UPCOMING', title: 'Consultation Initiale', count: 5, color: 'bg-indigo-500' },
        { id: 'TREATMENT_PLAN', title: 'Plan de Soin / Devis', count: 3, color: 'bg-amber-500' },
        { id: 'PROCEDURE', title: 'En Traitement', count: 8, color: 'bg-teal-500' },
        { id: 'FOLLOW_UP', title: 'Suivi Post-Op', count: 4, color: 'bg-fuchsia-500' }
    ]

    const [patients, setPatients] = useState([
        { id: 1, name: 'Jean Valjean', status: 'VISIT_UPCOMING', priority: 'HIGH', date: 'Auj, 14:00', procedure: 'Implant 16' },
        { id: 2, name: 'Moussa Diouf', status: 'TREATMENT_PLAN', priority: 'MEDIUM', date: 'Demain, 09:00', procedure: 'Orthodontie' },
        { id: 3, name: 'Adja Kone', status: 'PROCEDURE', priority: 'HIGH', date: 'En cours', procedure: 'Extraction 48' },
        { id: 4, name: 'Awa Ndiaye', status: 'FOLLOW_UP', priority: 'LOW', date: 'Hier', procedure: 'Contrôle Blanchiment' },
        { id: 5, name: 'Oumar Sy', status: 'VISIT_UPCOMING', priority: 'MEDIUM', date: 'Auj, 16:30', procedure: 'Détartrage' },
    ])

    return (
        <div className="p-8 space-y-10 max-w-full mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Clinical Operations Engine</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-indigo-600">Workflow Manager</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Pilotage du parcours patient, gestion des priorités et automatisation des transitions.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Filter className="mr-2 h-4 w-4" /> Filtres Avancés
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Ajouter au Parcours
                    </Button>
                </div>
            </div>

            {/* Quick Stats Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {columns.map(col => (
                    <Card key={col.id} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-6 flex flex-col items-center justify-center text-center">
                        <div className={cn("h-1.5 w-12 rounded-full mb-4", col.color)} />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{col.title}</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tighter">{col.count} <span className="text-xs font-bold text-slate-300">Patients</span></p>
                    </Card>
                ))}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 overflow-x-auto pb-10 no-scrollbar">
                {columns.map(col => (
                    <div key={col.id} className="space-y-6 min-w-[300px]">
                        <div className="flex items-center justify-between px-4 pb-2 border-b-2 border-slate-100">
                            <div className="flex items-center gap-3">
                                <span className={cn("h-2 w-2 rounded-full", col.color)} />
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-600">{col.title}</h3>
                            </div>
                            <span className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">{col.count}</span>
                        </div>

                        <div className="space-y-4">
                            {patients.filter(p => p.status === col.id).map(p => (
                                <motion.div
                                    key={p.id}
                                    layoutId={p.id.toString()}
                                    className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-grab active:cursor-grabbing group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                p.priority === 'HIGH' ? "bg-rose-500" : p.priority === 'MEDIUM' ? "bg-amber-500" : "bg-teal-500"
                                            )} />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{p.priority} Priority</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 group-hover:text-slate-900"><MoreHorizontal className="h-4 w-4" /></Button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 font-black text-xs">
                                                {p.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 tracking-tight">{p.name}</p>
                                                <p className="text-[10px] font-bold text-indigo-600 uppercase italic">{p.procedure}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Clock className="h-3 w-3" />
                                            <span className="text-[9px] font-black uppercase">{p.date}</span>
                                        </div>
                                        <div className="flex -space-x-2">
                                            <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black">DL</div>
                                            <div className="h-6 w-6 rounded-full border-2 border-white bg-indigo-50 text-indigo-600 flex items-center justify-center text-[8px] font-black">FD</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <Button variant="ghost" className="w-full h-14 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black uppercase text-[10px] tracking-widest hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
                                <Plus className="h-4 w-4 mr-2" /> Quick Add
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Insight Feed */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-slate-100">
                <div className="md:col-span-8 flex items-center gap-10">
                    <div className="h-20 w-20 rounded-[2.5rem] bg-indigo-950 flex items-center justify-center text-white shrink-0 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <Bot className="h-10 w-10 relative z-10" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-600">AI Workflow Optimization</span>
                        <p className="text-lg font-bold text-slate-900 max-w-2xl leading-tight">
                            "Le Dr. Lao a 15 min de retard sur le planning. L'IA suggère de décaler la consultation de Mme Ndiaye de 20 min pour fluidifier le flux."
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Button className="h-9 px-6 rounded-xl bg-slate-900 text-white font-black uppercase text-[9px] tracking-widest shadow-lg shadow-slate-900/10">Appliquer Suggestion</Button>
                            <Button variant="ghost" className="h-9 px-6 rounded-xl text-slate-400 font-black uppercase text-[9px] tracking-widest">Ignorer</Button>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-4 bg-slate-900 rounded-[3rem] p-8 text-white flex justify-between items-center relative overflow-hidden">
                    <div className="absolute -right-6 top-0 opacity-10">
                        <Zap className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Automatisations Actives</p>
                        <p className="text-2xl font-black text-white">42 <span className="text-xs font-bold text-teal-400">Actions IA</span></p>
                    </div>
                    <Button size="icon" className="h-12 w-12 rounded-2xl bg-white text-slate-950 font-black shadow-xl hover:bg-slate-100 transition-all">
                        <Activity className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
