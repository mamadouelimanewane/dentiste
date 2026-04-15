"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
    Users, Calendar, Activity, Sparkles, Brain, Radiation, 
    Stethoscope, FileText, ArrowRight, Zap, Clock, GraduationCap, ShieldCheck, HeartPulse, BrainCircuit, Wand2 
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function PractitionerDashboard({ user }: { user: any }) {
    const clinicalStats = [
        { label: 'Patients Aujourd\'hui', value: '12', icon: Users, color: 'text-emerald-500' },
        { label: 'Actes Réalisés', value: '24', icon: Activity, color: 'text-blue-500' },
        { label: 'Temps Moyen / Soin', value: '35 min', icon: Clock, color: 'text-amber-500' },
        { label: 'Analyses IA', value: '8', icon: Brain, color: 'text-purple-500' },
    ]

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header / Hero */}
            <div className="bg-white rounded-[2rem] p-10 text-slate-900 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Stethoscope className="h-64 w-64 text-emerald-500" />
                </div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-wider">Hub Clinique Elite</span>
                            <span className="text-slate-500 text-xs font-medium italic">Bienvenue, {user.name}</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight leading-none text-slate-900">
                            Focus Praticien
                        </h2>
                        <p className="text-slate-500 text-sm font-normal leading-relaxed max-w-md">
                            Votre arsenal technologique est prêt. L'IA a pré-analysé les 3 prochaines panoramiques pour vous.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/agenda">
                                <Button className="bg-emerald-600 text-white font-semibold text-sm h-12 rounded-xl px-8 shadow-sm hover:bg-emerald-700">
                                    Voir mon Agenda
                                </Button>
                            </Link>
                            <Link href="/workflow">
                                <Button variant="outline" className="border-slate-200 text-slate-600 font-semibold text-sm h-12 rounded-xl px-8 hover:bg-slate-50">
                                    Workflow Patient
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="hidden md:block bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 space-y-4">
                        <div className="flex items-center gap-3 text-emerald-600">
                            <Brain className="h-5 w-5" />
                            <span className="text-xs font-bold uppercase tracking-wider">AI Radio Insight</span>
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 bg-white rounded-xl border border-emerald-100/50 shadow-sm">
                                <p className="text-[12px] font-medium text-slate-700">Patient #224 : Anomalie détectée sur la 36 (possible carie interproximale).</p>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-emerald-100/50 shadow-sm">
                                <p className="text-[12px] font-medium text-slate-700">Patient #225 : Densité osseuse optimale pour l'implant prévu.</p>
                            </div>
                        </div>
                        <Link href="/ai-radio-lab" className="block mt-2">
                            <Button className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-semibold h-10 rounded-xl">
                                Ouvrir AI Radio Lab
                            </Button>
                        </Link>
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {clinicalStats.map((stat, i) => (
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
                {/* Agenda Shortlist */}
                <Card className="lg:col-span-12 rounded-[3.5rem] border-none shadow-luxury bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight">Prochains Soins du Jour</CardTitle>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Focus clinique uniquement</p>
                        </div>
                        <Link href="/agenda">
                            <Button variant="ghost" className="text-emerald-600 font-black uppercase text-[10px] tracking-widest">Planning Complet <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </Link>
                    </CardHeader>
                    <div className="divide-y divide-slate-50">
                        {[
                            { time: '10:30', name: 'Jean Valjean', procedure: 'Implantologie Postérieure', room: 'Salle Elite 1', badge: 'PRÉPARÉ' },
                            { time: '11:45', name: 'Moussa Gueye', procedure: 'Smile Design - Consultation', room: 'Studio VIP', badge: 'EN ATTENTE' },
                            { time: '14:00', name: 'Marie Curie', procedure: 'Détartrage & Bilan', room: 'Salle 2', badge: 'CONFIRMÉ' },
                        ].map((apt, i) => (
                            <div key={i} 
                                onClick={() => window.location.href = `/patients/demo-id`}
                                className="p-8 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-8">
                                    <div className="h-14 w-14 bg-slate-950 rounded-2xl flex items-center justify-center text-emerald-500 font-black text-xs">
                                        {apt.time}
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-slate-900 tracking-tight">{apt.name}</p>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                            <span>{apt.procedure}</span>
                                            <span>•</span>
                                            <span className="text-emerald-600">{apt.room}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">{apt.badge}</span>
                                    <Link href="/patients/demo-id">
                                        <Button className="h-10 px-5 rounded-xl bg-slate-900 text-white font-semibold text-[11px]">Ouvrir Dossier</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Specialist Tools */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                    { name: 'Smile Design Studio', icon: Sparkles, desc: 'Simulation 3D & Esthétique', href: '/smile-design' },
                    { name: 'Holo-Smile Studio', icon: Wand2, desc: 'Miroir Holo-IA', href: '/clinical/smile-studio' },
                    { name: 'Neural Vision Lab', icon: BrainCircuit, desc: 'Diagnostique Profond', href: '/clinical/vision-lab' },
                    { name: 'AI Radio Lab', icon: Radiation, desc: 'Dépistage Intelligent', href: '/ai-radio-lab' },
                    { name: 'Elite Academy', icon: GraduationCap, desc: 'Formation Continue', href: '/academy' },
                    { name: 'Traçabilité Hub', icon: ShieldCheck, desc: 'Hygiène & Sécurité', href: '/sterilization' },
                    { name: 'Smart Waiting Room', icon: Clock, desc: 'Gestion du Flux VIP', href: '/waiting-room' },
                    { name: 'Suivi Post-Op IA', icon: HeartPulse, desc: 'Télésurveillance Robotique', href: '/portal/post-op' },
                    { name: 'Dictée Vocale Elite', icon: FileText, desc: 'Saisie sans contact', href: '/dictation' },
                ].map((tool, i) => (
                    <Link key={i} href={tool.href}>
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-6 hover:-translate-y-1 transition-all group overflow-hidden relative h-full">
                            <div className="absolute -right-4 -bottom-4 opacity-5 text-emerald-600 group-hover:scale-110 transition-transform">
                                <tool.icon className="h-20 w-20" />
                            </div>
                            <div className="h-10 w-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <tool.icon className="h-5 w-5" />
                            </div>
                            <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-tight leading-tight">{tool.name}</h4>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{tool.desc}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
