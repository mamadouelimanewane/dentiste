"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Users,
    Calendar,
    Clock,
    Search,
    UserPlus,
    Bell,
    CheckCircle2,
    ArrowRight,
    MapPin,
    Smartphone,
    MessageCircle,
    Mic,
    Scan
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function ReceptionPortal() {
    const queue = [
        { name: 'Abdoulaye Diallo', time: '10:15', type: 'Consultation', status: 'PRESENT' },
        { name: 'Safiétou Mane', time: '10:45', type: 'Implants', status: 'RETARD' },
        { name: 'Oumar Sy', time: '11:00', type: 'Détartrage', status: 'CONFIRMÉ' },
    ]

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col p-8 space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-8 rounded-[3rem] shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="h-14 w-14 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                        <Users className="h-7 w-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
                            Portail <span className="text-emerald-gradient">Accueil</span>
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Gestion de l'Expérience Patient Elite</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-3xl border border-slate-100 flex-1 max-w-xl mx-10">
                    <Search className="h-4 w-4 text-slate-400" />
                    <Input className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm font-bold placeholder:text-slate-300" placeholder="Rechercher un patient, un rendez-vous..." />
                    <span className="text-[9px] font-black text-slate-300 bg-white border px-1.5 py-0.5 rounded shadow-sm">CMD + K</span>
                </div>

                <div className="flex gap-4">
                    <Button className="bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest h-14 px-8 shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all">
                        <UserPlus className="mr-2 h-4 w-4" /> Nouveau Patient
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Queue & Check-in */}
                <div className="lg:col-span-8 space-y-10">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter italic">FILE D'ATTENTE <span className="text-emerald-600">EN TEMPS RÉEL</span></CardTitle>
                                <p className="text-xs font-medium text-slate-400">3 patients attendus dans la prochaine heure.</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">Direct Live</span>
                            </div>
                        </CardHeader>
                        <div className="divide-y divide-slate-50">
                            {queue.map((p, i) => (
                                <div key={i} className="p-8 flex items-center justify-between group hover:bg-slate-50 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="h-16 w-16 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <span className="text-xs font-black uppercase tracking-widest">{p.time}</span>
                                        </div>
                                        <div>
                                            <p className="text-lg font-black text-slate-900 leading-tight tracking-tight">{p.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-black text-emerald-600 uppercase italic">{p.type}</span>
                                                <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{p.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" className="rounded-xl border-slate-200 h-10 px-4 text-[9px] font-black uppercase group-hover:bg-white">
                                            Arrivée
                                        </Button>
                                        <Button size="icon" className="h-10 w-10 bg-slate-900 rounded-xl text-white hover:bg-emerald-600 transition-all">
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Registration / QR Code */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-emerald-600 text-white p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Scan className="h-32 w-32" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4">Self Check-in</h3>
                            <p className="text-2xl font-black mb-6 tracking-tight leading-tight">Proposez au patient de scanner le QR Code pour confirmer son arrivée.</p>
                            <Button className="bg-white text-emerald-600 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-10 shadow-xl">
                                Générer QR Code
                            </Button>
                        </Card>
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-6 border border-slate-100">
                             <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <MessageCircle className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Auto</p>
                                    <p className="text-sm font-black text-slate-900">Rappels de l'après-midi</p>
                                </div>
                             </div>
                             <p className="text-xs text-slate-500 font-medium leading-relaxed italic">"Bonjour ! Nous vous confirmons votre rendez-vous de ce jour à 15h30 chez DentoPrestige..."</p>
                             <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest h-10 rounded-xl border-slate-200">
                                Envoyer manuellement
                             </Button>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Key Infos */}
                <div className="lg:col-span-4 space-y-10">
                    {/* Welcome Banner */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-10 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-5">
                            <Mic className="h-48 w-48 text-white" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-3xl font-black tracking-tighter leading-tight italic uppercase">Elite <span className="text-emerald-500">Concierge</span></h3>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">Assurez un accueil personnalisé avec nos scripts IA basés sur le profil patient.</p>
                            <div className="space-y-3">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                    <p className="text-[11px] font-black text-emerald-400 uppercase mb-1 flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Tips IA du moment
                                    </p>
                                    <p className="text-xs font-medium text-slate-200">Offrir un café Nespresso au patient M. Diallo (VIP Gold).</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Stats */}
                    <div className="space-y-6">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacité Salle d'At.</span>
                                <span className="text-xs font-black text-emerald-600">60%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight italic">4 places disponibles.</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
