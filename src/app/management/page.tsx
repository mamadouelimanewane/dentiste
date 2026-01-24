"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Users,
    Building2,
    Timer,
    BarChart3,
    Briefcase,
    Clock,
    ShieldCheck,
    TrendingUp,
    Plus,
    ArrowRight,
    Star,
    Calendar,
    Target,
    Zap,
    MoreHorizontal
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function ManagementPage() {
    const [activeCabinet, setActiveCabinet] = useState('Dakar Plateau')

    const stats = [
        { label: 'Effectif Total', value: '18', sub: '3 Cabinets activés', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Productivité Moy.', value: '94%', sub: '+2% cette semaine', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Indice Satisfaction', value: '4.9/5', sub: 'Basé sur 1.2k avis', icon: Star, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { label: 'Rentabilité Globale', value: '82%', icon: TrendingUp, color: 'text-teal-500', bg: 'bg-teal-50' },
    ]

    const cabinets = [
        { name: 'Dakar Plateau', status: 'Ouvert', staff: 8, efficiency: 96, revenue: '12.5M' },
        { name: 'Almadies Point E', status: 'Ouvert', staff: 6, efficiency: 91, revenue: '8.2M' },
        { name: 'Saly Portudal', status: 'Fermé (Jour Férié)', staff: 4, efficiency: 85, revenue: '4.1M' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-slate-900 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Corporate Strategy & HR</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-gold">Management</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Gestion multi-sites, ressources humaines et pilotage de la performance.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Building2 className="mr-2 h-4 w-4" /> Configurer Site
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouveau Collaborateur
                    </Button>
                </div>
            </div>

            {/* Global Performance Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white group hover:translate-y-[-4px] transition-all overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</div>
                            {stat.sub && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.sub}</p>}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Cabinets Overview */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter uppercase">Statut des Cabinets Network</CardTitle>
                                <CardDescription className="text-sm font-medium text-slate-400 mt-1">Surveillance multi-sites en temps réel.</CardDescription>
                            </div>
                        </CardHeader>
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-b border-slate-50">
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14 pl-10">Site</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Statut</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Effectif</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Efficiency</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14 text-right pr-10">CA (Mois)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cabinets.map((cab, i) => (
                                    <TableRow key={i} className="hover:bg-slate-50 group transition-colors cursor-pointer border-b border-slate-50 last:border-0">
                                        <TableCell className="py-6 pl-10">
                                            <div className="flex flex-col">
                                                <span className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{cab.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sénégal, West Africa</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                cab.status.includes('Ouvert') ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-400"
                                            )}>{cab.status}</span>
                                        </TableCell>
                                        <TableCell className="text-sm font-bold text-slate-700">{cab.staff} Pers.</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${cab.efficiency}%` }} />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-900">{cab.efficiency}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10 font-black text-slate-900">{cab.revenue} FCFA</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Time Tracking / RH */}
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 flex flex-col space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-base font-black uppercase tracking-tight">Pointage & Heures</h3>
                                <Clock className="h-5 w-5 text-indigo-500" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'Dr. Aere Lao', status: 'Actif', time: '08:15', role: 'Owner' },
                                    { name: 'Fatou Diop', status: 'Actif', time: '08:45', role: 'Secrétariat' },
                                    { name: 'Mamadou Sall', status: 'Absent', time: '-', role: 'Assistant' },
                                ].map((staff, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-white rounded-xl flex items-center justify-center text-[10px] font-black italic shadow-sm">
                                                {staff.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-slate-900 leading-none">{staff.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{staff.role}</p>
                                            </div>
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-black uppercase px-2 py-0.5 rounded-full",
                                            staff.status === 'Actif' ? "text-teal-600 bg-teal-50" : "text-slate-400 bg-slate-100"
                                        )}>{staff.status === 'Actif' ? `Arrivée ${staff.time}` : 'Absent'}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="text-[10px] font-black uppercase text-indigo-600 w-full">Gérer Registre RH →</Button>
                        </Card>

                        {/* Objectives / Gamification */}
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-10 flex flex-col space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-base font-black uppercase tracking-tight text-white">Objectifs Network</h3>
                                <Target className="h-5 w-5 text-gold" />
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Objectif CA Q1</span>
                                        <span className="text-white">75%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gold rounded-full" style={{ width: '75%' }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Nouveaux Patients</span>
                                        <span className="text-white">142/200</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '71%' }} />
                                    </div>
                                </div>
                            </div>
                            <p className="text-[11px] font-medium text-slate-400 italic">
                                "La clinique du Plateau est en tête des performances de satisfaction patient ce mois-ci."
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Alerts & Global Actions */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    {/* ACADEMY REWARDS MODULE */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-8 border-2 border-gold/20">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gold">Elite Academy Rewards</h3>
                            <Trophy className="h-5 w-5 text-gold" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Dr. Aere Lao", xp: "1,240", bonus: "250,000", status: "À Payer" },
                                { name: "Fatou Diack", xp: "1,120", bonus: "150,000", status: "À Payer" },
                            ].map((user) => (
                                <div key={user.name} className="flex items-center justify-between p-4 bg-gold/5 rounded-[2rem] border border-gold/10">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center font-black text-xs border border-gold/20 text-gold shadow-sm">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 leading-tight">{user.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{user.xp} XP ce mois</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-gold">{user.bonus} <span className="text-[8px] uppercase">FCFA</span></p>
                                        <span className="text-[8px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{user.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full bg-gold text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl shadow-gold/20">
                            Décaisser Bonus Academy
                        </Button>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Actions Corporate</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Audit Interne', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                { name: 'Payer Salaires', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
                                { name: 'Rapport Annuel', icon: BarChart3, color: 'text-teal-600', bg: 'bg-teal-50' },
                                { name: 'Plan d\'Agenda', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                            ].map((action, i) => (
                                <button key={i} className="flex flex-col items-center justify-center p-6 rounded-[2rem] border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all group">
                                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", action.bg, action.color)}>
                                        <action.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 leading-tight text-center">{action.name}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 opacity-10">
                            <BarChart3 className="h-40 w-40" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-2xl font-black tracking-tighter">AI Finance Advisor</h3>
                            <p className="text-sm font-medium text-indigo-100 leading-relaxed">
                                "L'introduction des bonus Academy a augmenté la productivité clinique de 15% le mois dernier aux Almadies."
                            </p>
                            <Button className="w-full bg-white text-indigo-700 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl shadow-xl">Simuler Optimisation</Button>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white border border-slate-100 overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Récents Recrutements</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-50">
                                {[
                                    { name: 'Dr. Moussa Ndiaye', pos: 'Chirurgien Dentiste', date: 'Jan 2026' },
                                    { name: 'Adja Kone', pos: 'Assistante Senior', date: 'Déc 2025' },
                                ].map((p, i) => (
                                    <div key={i} className="p-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{p.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.pos}</p>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-300">{p.date}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
