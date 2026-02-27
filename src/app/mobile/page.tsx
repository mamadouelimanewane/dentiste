"use client"

import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import {
    User,
    ShieldCheck,
    Stethoscope,
    Calculator,
    Smartphone,
    ArrowRight
} from "lucide-react"

export default function MobileHub() {
    const apps = [
        {
            title: "App Patient",
            role: "Patient / Client",
            href: "/mobile/client",
            icon: User,
            color: "bg-indigo-600",
            desc: "RDV, Factures, QR Code & Santé IA"
        },
        {
            title: "App Admin",
            role: "Propriétaire Cabinet",
            href: "/mobile/admin",
            icon: ShieldCheck,
            color: "bg-slate-900",
            desc: "KPIs Temps Réel, Chiffre d'Affaires & Staff"
        },
        {
            title: "App Dentiste",
            role: "Dentiste en chef / Staff",
            href: "/mobile/staff",
            icon: Stethoscope,
            color: "bg-gold",
            desc: "Agenda, Dossiers Patient & File d'attente"
        },
        {
            title: "App Comptable",
            role: "Comptabilité",
            href: "/mobile/comptable",
            icon: Calculator,
            color: "bg-teal-600",
            desc: "Caisse, Facturation & Bilans Financiers"
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50 p-8 space-y-8 flex flex-col justify-center max-w-lg mx-auto">
            <div className="text-center space-y-2">
                <div className="h-16 w-16 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <Smartphone className="h-8 w-8 text-slate-900" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Mobile <span className="text-gold">Elite Suites</span></h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">
                    Sélectionnez votre interface mobile personnalisée<br />pour une expérience 100% responsive.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {apps.map((app, i) => (
                    <Link key={i} href={app.href}>
                        <Card className="group rounded-[2rem] border-none shadow-xl shadow-slate-200/50 bg-white hover:bg-slate-900 transition-all duration-500 overflow-hidden cursor-pointer">
                            <CardContent className="p-6 flex items-center gap-5">
                                <div className={`h-14 w-14 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                                    <app.icon className="h-7 w-7" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <h3 className="text-base font-black text-slate-900 group-hover:text-white transition-colors">{app.title}</h3>
                                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-gold transition-colors" />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-gold transition-colors">{app.role}</p>
                                    <p className="text-[10px] font-medium text-slate-400 group-hover:text-white/40 mt-1 transition-colors">{app.desc}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <p className="text-[9px] font-black text-center text-slate-400 uppercase tracking-widest pt-6">
                Powered by DentoPrestige Elite OS v2.5
            </p>
        </div>
    )
}
