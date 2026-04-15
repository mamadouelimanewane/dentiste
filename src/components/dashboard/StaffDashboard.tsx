"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
    Users, Calendar, Clock, MessageSquare, Bell, ClipboardList, 
    ArrowRight, CheckCircle2, UserPlus, Phone, Search, Filter,
    Star, Briefcase, Zap, Smartphone
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function StaffDashboard({ user }: { user: any }) {
    const staffStats = [
        { label: 'Salle d\'Attente', value: '4', icon: Users, color: 'text-emerald-500' },
        { label: 'Check-ins Aujourd\'hui', value: '18', icon: UserPlus, color: 'text-blue-500' },
        { label: 'Tâches Prioritaires', value: '6', icon: Zap, color: 'text-amber-500' },
        { label: 'Temps d\'Attente Moyen', value: '12 min', icon: Clock, color: 'text-slate-900' },
    ]

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header / Hero */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                    <Smartphone className="h-64 w-64 text-slate-900" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-50 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-600 border border-emerald-100">Opérations & Accueil Elite</span>
                            <span className="text-slate-500 text-xs font-bold italic">Prêt pour le service, {user.name}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Command Center
                        </h2>
                        <p className="text-slate-500 text-base font-medium leading-relaxed max-w-md">
                            Gérez le flux de patients et les communications du cabinet en temps réel. Système de synchronisation SmartCheck active.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/waiting-room">
                                <Button className="bg-slate-900 text-white font-semibold text-sm h-12 rounded-xl px-8 shadow-sm hover:bg-slate-800">
                                    Salle d'Attente
                                </Button>
                            </Link>
                            <Link href="/sterilization">
                                <Button variant="outline" className="border-slate-200 text-slate-600 font-semibold text-sm h-12 rounded-xl px-8 hover:bg-slate-50">
                                    Traçabilité Hub
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Check-in rapide', icon: UserPlus, color: 'bg-emerald-500' },
                            { label: 'Rappels Patient', icon: Phone, color: 'bg-blue-500' },
                            { label: 'Gestion Tâches', icon: ClipboardList, color: 'bg-amber-500' },
                            { label: 'Urgences', icon: Zap, color: 'bg-red-500' },
                        ].map((btn, i) => (
                            <button key={i} className="h-28 w-32 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-50 hover:shadow-sm transition-all group">
                                <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white ${btn.color} shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}>
                                    <btn.icon className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight">{btn.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pipeline Ribbon */}
            <div className="bg-white rounded-2xl p-6 text-slate-900 border border-slate-200 shadow-sm flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 pr-6 lg:border-r border-slate-200 shrink-0">
                    <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Flux Temps Réel</p>
                        <p className="text-xl font-bold">24 <span className="text-sm font-medium text-slate-500">Actifs</span></p>
                    </div>
                </div>
                
                <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar justify-between">
                    {[
                        { label: 'Accueil', val: 3, id: 'PHASE_1_ACCUEIL', color: 'bg-indigo-500' },
                        { label: 'Attente', val: 4, id: 'PHASE_2_ARRIVEE', color: 'bg-amber-500' },
                        { label: 'Fauteuil', val: 2, id: 'PHASE_3_CONSULTATION', color: 'bg-teal-500' },
                        { label: 'Chirurgie', val: 0, id: 'PHASE_4_ACTES', color: 'bg-rose-500', empty: true },
                        { label: 'Admin/Paiement', val: 5, id: 'PHASE_5_ADMIN', color: 'bg-blue-600' },
                        { label: 'Sortie', val: 10, id: 'PHASE_6_SUIVI', color: 'bg-emerald-500' }
                    ].map((phase, i) => (
                        <div key={i} className="flex items-center gap-2 group cursor-pointer">
                            <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl transition-all", phase.empty ? "opacity-30 grayscale" : "bg-slate-50 hover:bg-slate-100")}>
                                <div className={cn("h-3 w-3 rounded-full", phase.color)} />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 group-hover:text-slate-900 leading-none hidden sm:block whitespace-nowrap">{phase.label}</span>
                                <span className="text-sm font-bold ml-1">{phase.val}</span>
                            </div>
                            {i < 5 && <ArrowRight className="h-3 w-3 text-slate-300 hidden md:block" />}
                        </div>
                    ))}
                </div>

                <div className="pl-6 lg:border-l border-white/10 shrink-0 hidden lg:block">
                    <Link href="/workflow">
                        <Button className="bg-slate-900 text-white hover:bg-slate-800 font-semibold text-[11px] rounded-xl px-6">Ouvrir Workflow</Button>
                    </Link>
                </div>
            </div>

            {/* Staff Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {staffStats.map((stat, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className={`h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Reception Queue */}
                <Card className="lg:col-span-8 rounded-[3.5rem] border-none shadow-luxury bg-white overflow-hidden">
                    <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight">Queue Dynamique</CardTitle>
                            <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Patients actuellement présents</CardDescription>
                        </div>
                        <Link href="/waiting-room">
                            <Button variant="outline" className="text-slate-900 border-slate-200 font-black uppercase text-[10px] tracking-widest px-8 h-12 rounded-xl">Vue Complète</Button>
                        </Link>
                    </CardHeader>
                    <div className="divide-y divide-slate-50">
                        {[
                            { name: 'Oumar Sy', time: 'Depuis 8 min', doc: 'Dr. Lao', status: 'SÉANCE EN COURS', color: 'text-emerald-600 bg-emerald-50' },
                            { name: 'Awa Diop', time: 'Depuis 15 min', doc: 'Dr. Diallo', status: 'EN ATTENTE', color: 'text-amber-600 bg-amber-50' },
                            { name: 'Cheikh Ndiaye', time: 'À l\'instant', doc: 'Dr. Lao', status: 'ARRIVÉ', color: 'text-blue-600 bg-blue-50' },
                        ].map((patient, i) => (
                            <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-all group">
                                <div className="flex items-center gap-8">
                                    <div className="h-14 w-14 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-[11px] font-black uppercase">
                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-slate-900 tracking-tight">{patient.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigné à {patient.doc} • {patient.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${patient.color}`}>
                                        {patient.status}
                                    </span>
                                    <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-900 transition-colors">
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Coordination tasks */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                             <ClipboardList className="h-4 w-4 text-emerald-600" /> Tâches du Cabinet
                        </h3>
                        <div className="space-y-6">
                            {[
                                { task: 'Rappeler Mme. Ndiaye', priority: 'HAUTE', done: false },
                                { task: 'Commander Gants Latex x10', priority: 'NORMAL', done: true },
                                { task: 'Valider Devis #882', priority: 'URGENT', done: false },
                            ].map((task, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all", task.done ? "bg-emerald-500 border-emerald-500" : "border-slate-200 group-hover:border-emerald-500")}>
                                            {task.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                                        </div>
                                        <span className={cn("text-xs font-black tracking-tight", task.done ? "text-slate-300 line-through" : "text-slate-700")}>{task.task}</span>
                                    </div>
                                    <span className={cn("text-[7px] font-black px-2 py-0.5 rounded-full uppercase", task.priority === 'URGENT' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400')}>
                                        {task.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" className="w-full text-slate-400 hover:text-slate-900 text-[10px] font-black uppercase tracking-widest mt-8">Voir tout →</Button>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-8 relative overflow-hidden">
                        <div className="absolute -bottom-4 -left-4 opacity-10">
                            <Star className="h-32 w-32" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest mb-4">Focus Communication</h3>
                        <p className="text-xl font-black mb-6 tracking-tight leading-tight italic">3 nouveaux messages patient via WhatsApp Elite.</p>
                        <Button className="w-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest h-12 rounded-xl border-none shadow-lg shadow-emerald-500/20">
                            Ouvrir le Hub
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
