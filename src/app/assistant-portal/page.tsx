"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    FileText,
    FileCheck,
    DollarSign,
    MessageSquare,
    Zap,
    Sparkles,
    ShieldCheck,
    Download,
    Eye,
    Plus,
    Activity,
    Clock,
    UserCircle,
    Brain,
    Bot
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AssistantPortal() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col p-8 space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Assistant <span className="text-emerald-gradient">Administratif</span>
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-widest leading-none">Gestion & Bureau d'Expertise Elite</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black uppercase text-[10px] tracking-widest h-12 px-6">
                        <FileText className="mr-2 h-4 w-4" /> Archives GED
                    </Button>
                    <Button className="bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest h-12 px-8 shadow-xl shadow-emerald-500/20">
                        <Plus className="mr-2 h-4 w-4" /> Nouveau Devis/Facture
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Statistics & Priorities */}
                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                        { label: 'Devis à Relancer', value: '12', sub: 'Urgence : 3', icon: FileCheck, color: 'text-amber-500' },
                        { label: 'Factures Non Payées', value: '450k', sub: 'Wave/OM inclus', icon: DollarSign, color: 'text-emerald-500' },
                        { label: 'Tâches du Jour', value: '8/12', sub: 'En progression', icon: Zap, color: 'text-indigo-500' },
                    ].map((s, i) => (
                        <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={cn("h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center", s.color)}>
                                    <s.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">{s.value}</p>
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{s.sub}</p>
                        </Card>
                    ))}
                </div>

                {/* Left Column: Tasks & Documents */}
                <div className="lg:col-span-8 space-y-10">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/10">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter italic uppercase">Dossiers <span className="text-emerald-600">En Attente de Traitement</span></CardTitle>
                                <p className="text-xs font-medium text-slate-400">Documents nécessitant une action administrative.</p>
                            </div>
                            <Button variant="ghost" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600">Tout traiter</Button>
                        </CardHeader>
                        <div className="divide-y divide-slate-50">
                            {[
                                { name: 'Moussa Niang', type: 'Devis Implant', date: 'Hier, 16:45', patient: 'Lamine Sall' },
                                { name: 'Safiétou Mane', type: 'Traitement Canal', date: 'Aujourd\'hui, 09:15', patient: 'Dr. Lao' },
                                { name: 'Oumar Sy', type: 'Prise en Charge Mutuelle', date: 'Aujourd\'hui, 10:30', patient: 'Mutuelle Santé+' },
                            ].map((doc, i) => (
                                <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="h-14 w-14 bg-slate-100 rounded-2-3xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{doc.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-black text-emerald-600/80 uppercase italic tracking-tighter">{doc.type}</span>
                                                <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{doc.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-emerald-600">
                                            <Eye className="h-5 w-5" />
                                        </Button>
                                        <Button size="icon" className="h-10 w-10 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* AI Document Generation Hero */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Brain className="h-64 w-64 text-emerald-500" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-5 w-5 text-emerald-500" />
                                        <span className="px-3 py-1 bg-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">Générateur IA Elite</span>
                                    </div>
                                    <h3 className="text-4xl font-black italic tracking-tighter leading-tight uppercase">Rédaction <span className="text-emerald-gradient">Automatisée</span></h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">Générez vos courriers, relances et devis complexes en une seconde grâce à l'IA.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                                    <Bot className="h-10 w-10 text-emerald-500" />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button className="bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl hover:bg-emerald-50 transition-colors">
                                    Démarrer la rédaction
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Communication & Reminders */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-10 border border-slate-100">
                        <div>
                            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b pb-2">Communications Récentes</CardTitle>
                            <div className="space-y-6">
                                {[
                                    { icon: MessageSquare, label: 'Lamine Sall', sub: 'Confirmation RDV demandée', color: 'bg-emerald-50 text-emerald-600' },
                                    { icon: Clock, label: 'Mutuelle Santé+', sub: 'Dossier incomplet - Correction', color: 'bg-amber-50 text-amber-600' },
                                    { icon: UserCircle, label: 'Dr. Aere Lao', sub: 'Validé : Devis P102', color: 'bg-indigo-50 text-indigo-600' },
                                ].map((c, i) => (
                                    <div key={i} className="flex gap-4 group cursor-pointer">
                                        <div className={cn("h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm", c.color)}>
                                            <c.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase italic tracking-tighter">{c.label}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{c.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                             <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Objectif Facturation</CardTitle>
                             <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase">
                                    <span>Paiements Encaissés</span>
                                    <span>72%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '72%' }}></div>
                                </div>
                             </div>
                        </div>
                    </Card>

                    {/* Elite Security Badge */}
                    <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] flex items-center gap-4">
                        <ShieldCheck className="h-8 w-8 text-emerald-600" />
                        <div>
                            <p className="text-[11px] font-black text-slate-900 uppercase italic">Conformité RGPD & HDS</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Chiffrement AES 256 Actif</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
