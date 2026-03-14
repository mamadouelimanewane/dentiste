"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
    Users, Calendar, Activity, Sparkles, Brain, Radiation, 
    Stethoscope, FileText, ArrowRight, Zap, Clock, GraduationCap, ShieldCheck, HeartPulse, BrainCircuit, Wand2 
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

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
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Stethoscope className="h-64 w-64 text-emerald-500" />
                </div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">Hub Clinique Elite</span>
                            <span className="text-slate-400 text-xs font-bold italic">Bienvenue, {user.name}</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter leading-none italic uppercase">
                            Focus <span className="text-emerald-gradient">Praticien</span>
                        </h2>
                        <p className="text-slate-400 text-base font-medium leading-relaxed max-w-md">
                            Votre arsenal technologique est prêt. L'IA a pré-analysé les 3 prochaines panoramiques pour vous.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/agenda">
                                <Button className="bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl shadow-emerald-500/20 hover:bg-emerald-500">
                                    Voir mon Agenda
                                </Button>
                            </Link>
                            <Link href="/workflow">
                                <Button variant="outline" className="border-white/20 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 hover:bg-white/5">
                                    Workflow Patient
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="hidden md:block bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 rounded-[2.5rem] p-6 space-y-4">
                        <div className="flex items-center gap-3 text-emerald-400">
                            <Brain className="h-5 w-5" />
                            <span className="text-xs font-black uppercase tracking-widest">AI Radio Insight</span>
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-[11px] font-bold text-slate-200">Patient #224 : Anomalie détectée sur la 36 (possible carie interproximale).</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-[11px] font-bold text-slate-200">Patient #225 : Densité osseuse optimale pour l'implant prévu.</p>
                            </div>
                        </div>
                        <Button className="w-full bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase tracking-widest h-10 mt-2 rounded-xl">
                            Ouvrir AI Radio Lab
                        </Button>
                    </div>
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
                            <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer">
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
                                    <Button className="h-12 px-6 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest">Ouvrir Dossier</Button>
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
