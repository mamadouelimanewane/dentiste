"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    LayoutDashboard,
    Users,
    TrendingUp,
    ShieldCheck,
    Settings,
    Activity,
    DollarSign,
    Lock,
    ArrowRight,
    Star,
    Zap,
    Brain,
    AlertCircle,
    Bell
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AdminPortal() {
    const stats = [
        { label: 'Revenu Mensuel', value: '12,450,000 FCFA', trend: '+14%', icon: DollarSign, color: 'text-emerald-500' },
        { label: 'Nouveaux Patients', value: '48', trend: '+8%', icon: Users, color: 'text-blue-500' },
        { label: 'Taux de Conversion', value: '72%', trend: '+5%', icon: Activity, color: 'text-indigo-500' },
        { label: 'Sécurité Système', value: 'Maximale', trend: 'Audit OK', icon: ShieldCheck, color: 'text-emerald-400' },
    ]

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col p-8 space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Portail <span className="text-emerald-gradient">Administrateur</span>
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-widest">Contrôle de Gestion & Stratégie Elite</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black uppercase text-[10px] tracking-widest h-12 px-6">
                        <Lock className="mr-2 h-4 w-4" /> Audit Sécurité
                    </Button>
                    <Button className="bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest h-12 px-8 shadow-xl">
                        <Settings className="mr-2 h-4 w-4" /> Configuration
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 group hover:scale-[1.02] transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={cn("h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center", stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                {stat.trend}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">vs mois dernier</span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Performance Hero */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white overflow-hidden relative p-10">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Brain className="h-64 w-64 text-emerald-500" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">AI Vision Business</span>
                                <span className="text-slate-400 text-xs font-bold italic">Analyse en temps réel.</span>
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter max-w-xl italic uppercase">
                                Revue de <span className="text-emerald-gradient">Performance</span>
                            </h2>
                            <p className="text-slate-400 text-base font-medium leading-relaxed max-w-md">
                                Votre cabinet enregistre une croissance de 12% ce trimestre. L'automatisation des rappels a réduit les absences de 45%.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Button className="bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 transition-colors">
                                    Voir les Rapports
                                </Button>
                                <Button variant="outline" className="border-white/20 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 hover:bg-white/5">
                                    Optimisation IA
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Operational Alerts */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10">
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                <AlertCircle className="h-6 w-6 text-emerald-600" /> Alertes Opérationnelles
                            </CardTitle>
                        </CardHeader>
                        <div className="space-y-4">
                            {[
                                { title: 'Droit d\'accès modifié', desc: 'Le Dr. Diallo a mis à jour les permissions du module Finance.', time: 'Il y a 2h', icon: ShieldCheck, color: 'emerald' },
                                { title: 'Renouvellement Stock', desc: 'Le stock d\'implants de type B arrive à expiration (3 unités).', time: 'Il y a 5h', icon: Zap, color: 'amber' },
                                { title: 'Audit mensuel requis', desc: 'Veuillez valider la clôture du mois de Février pour le grand livre.', time: 'À faire', icon: DollarSign, color: 'indigo' },
                            ].map((alert, i) => (
                                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 hover:bg-emerald-50 group transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", `bg-${alert.color}-100 text-${alert.color}-600`)}>
                                            <alert.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{alert.title}</p>
                                            <p className="text-xs text-slate-500 font-medium">{alert.desc}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 group-hover:text-emerald-400 transition-colors">{alert.time}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-10">
                    {/* Active Staff */}
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Équipe en Ligne</CardTitle>
                        </CardHeader>
                        <div className="space-y-6">
                            {[
                                { name: 'Dr. Aere Lao', role: 'Directeur Médical', status: 'En Soin', initials: 'AL' },
                                { name: 'Mariam Faye', role: 'Secrétaire Elite', status: 'Accueil', initials: 'MF' },
                                { name: 'Idrissa Ba', role: 'Assistant Technique', status: 'Labo', initials: 'IB' },
                            ].map((staff, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">
                                        {staff.initials}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-slate-900">{staff.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{staff.role}</p>
                                    </div>
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Luxury Call to Action */}
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-gradient-to-br from-indigo-600 to-purple-800 text-white p-8 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <Star className="h-32 w-32" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest mb-4">Elite Academy</h3>
                        <p className="text-2xl font-black mb-4 tracking-tight leading-tight">Formez vos équipes aux outils IA DentoPrestige.</p>
                        <button 
                            onClick={() => window.location.href = '/academy'}
                            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest h-12 rounded-xl transition-all"
                        >
                            Accéder aux modules
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
