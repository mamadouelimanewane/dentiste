"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Calendar,
    Users,
    Stethoscope,
    Search,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Play
} from "lucide-react"

export default function StaffMobileApp() {
    return (
        <div className="space-y-6 pt-4 px-6 pb-20">

            {/* Quick Patient Search Bar */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Rechercher un patient..."
                    className="w-full h-14 bg-white rounded-2xl pl-12 pr-6 text-sm font-bold border-none shadow-xl shadow-slate-100 placeholder:text-slate-300 focus:ring-1 focus:ring-gold transition-all"
                />
            </div>

            {/* Today's Focus Card */}
            <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white overflow-hidden shadow-2xl">
                <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gold" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gold text-white/60">En cours</span>
                        </div>
                        <span className="text-[9px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full uppercase">Urgent</span>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Patient Actuel</p>
                        <h3 className="text-2xl font-black tracking-tight">Moussa Niang</h3>
                        <p className="text-xs font-bold text-white/60 italic">Extraction de 48 - Post-Opératoire</p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button className="flex-1 bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl">
                            Dossier Patient
                        </Button>
                        <Button className="h-12 w-12 bg-gold text-slate-900 rounded-xl flex items-center justify-center">
                            <Play className="h-5 w-5 fill-current" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Daily Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100 flex flex-col gap-2">
                    <Calendar className="h-5 w-5 text-indigo-500" />
                    <p className="text-2xl font-black text-slate-900">12</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rendez-vous</p>
                </div>
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100 flex flex-col gap-2">
                    <Users className="h-5 w-5 text-teal-500" />
                    <p className="text-2xl font-black text-slate-900">4</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Nouveaux dossiers</p>
                </div>
            </div>

            {/* Next Patients Queue */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">File d'attente</h4>
                    <span className="text-[9px] font-black text-gold">Voir tout</span>
                </div>

                {[
                    { name: "Fatou Sow", time: "11:45", type: "Contrôle", status: "WAITING" },
                    { name: "Babacar Diop", time: "12:30", type: "Prothèse", status: "READY" },
                ].map((p, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-slate-50">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
                                <span className="text-[9px] font-black text-slate-900">{p.time}</span>
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900">{p.name}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.type}</p>
                            </div>
                        </div>
                        {p.status === 'READY' ? (
                            <div className="h-2 w-2 rounded-full bg-teal-500" />
                        ) : (
                            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        )}
                    </div>
                ))}
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { icon: Stethoscope, label: "Actes", color: "bg-indigo-50 text-indigo-600" },
                    { icon: AlertCircle, label: "Alertes", color: "bg-red-50 text-red-600" },
                    { icon: CheckCircle2, label: "Tâches", color: "bg-teal-50 text-teal-600" },
                ].map((action, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className={`h-14 w-14 ${action.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                            <action.icon className="h-6 w-6" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{action.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
