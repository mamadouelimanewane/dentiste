"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Calendar,
    CreditCard,
    QrCode,
    Bell,
    ChevronRight,
    Star,
    ShieldCheck,
    Droplets,
    Activity
} from "lucide-react"

export default function ClientMobileApp() {
    return (
        <div className="space-y-6 pt-10 px-6">
            {/* Header / Profile Summary */}
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Bienvenue sur votre app</p>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Jean <span className="text-gold">Valjean</span></h1>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black shadow-xl">
                    JV
                </div>
            </div>

            {/* Quick Action - QR Code Card */}
            <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <QrCode className="h-40 w-40" />
                </div>
                <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-gold/20 flex items-center justify-center">
                            <QrCode className="h-4 w-4 text-gold" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gold">Check-in Express</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight">Présentez ce code à <br /> l'accueil du cabinet.</h3>
                    <Button className="w-full bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl mt-2">
                        Afficher mon QR Code
                    </Button>
                </CardContent>
            </Card>

            {/* Appointment Alert */}
            <div className="bg-indigo-50 border border-indigo-100/50 rounded-3xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-50">
                        <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Prochain RDV</p>
                        <p className="text-sm font-black text-slate-900">Demain, 10:30</p>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-300" />
            </div>

            {/* Loyalty Section */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="rounded-[2rem] border-none bg-white shadow-xl shadow-slate-100 p-6">
                    <Star className="h-6 w-6 text-gold mb-3" />
                    <p className="text-2xl font-black text-slate-900">1,250</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Points Elite</p>
                </Card>
                <Card className="rounded-[2rem] border-none bg-white shadow-xl shadow-slate-100 p-6">
                    <CreditCard className="h-6 w-6 text-teal-500 mb-3" />
                    <p className="text-lg font-black text-slate-900">À jour</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Paiements</p>
                </Card>
            </div>

            {/* AI Health Tip */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-gold" />
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Santé Bucco-Dentaire IA</h4>
                    </div>
                    <span className="text-[8px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-full uppercase">Live</span>
                </div>

                <div className="relative pl-6 border-l-2 border-gold/30">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed italic">
                        "Nous avons remarqué une amélioration sur votre gencive quadrant 4. N'oubliez pas d'utiliser le jet dentaire ce soir."
                    </p>
                </div>

                <div className="flex gap-2">
                    <div className="h-1 bg-gold rounded-full flex-1" />
                    <div className="h-1 bg-gold/20 rounded-full flex-1" />
                    <div className="h-1 bg-gold/20 rounded-full flex-1" />
                </div>
            </div>

            {/* Dental News / Reminders */}
            <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-2">Derniers Conseils</h4>
                {[
                    { title: "Brossage efficace", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50" },
                    { title: "Protection Email", icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-50" },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-3xl flex items-center justify-between shadow-sm border border-slate-50">
                        <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 ${item.bg} rounded-xl flex items-center justify-center ${item.color}`}>
                                <item.icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-700">{item.title}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                    </div>
                ))}
            </div>
        </div>
    )
}
