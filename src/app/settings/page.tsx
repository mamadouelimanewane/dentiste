"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Building2,
    Clock,
    Lock,
    Mail,
    Save,
    User,
    Global,
    Bell,
    Cloud,
    Database,
    Eye,
    Palette,
    Smartphone,
    CreditCard,
    ShieldCheck,
    Globe
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('CLINIC')

    const sections = [
        { id: 'CLINIC', name: 'Elite Clinic Profile', icon: Building2 },
        { id: 'TEAM', name: 'Collaborateurs & Rôles', icon: User },
        { id: 'AGENDA', name: 'Horaires & Synchronisation', icon: Clock },
        { id: 'SECURITY', name: 'Périmètre de Sécurité', icon: ShieldCheck },
        { id: 'BILLING', name: 'Facturation & Licence', icon: CreditCard },
        { id: 'INTEGRATIONS', name: 'Hub API & Webhooks', icon: Globe },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-slate-900 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Configuration Globale Engine</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Console <span className="text-gold">Command Center</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Personnalisez votre expérience DentoPrestige et gérez vos accès.</p>
                </div>
                <Button className="bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] h-14 rounded-2xl px-10 shadow-luxury hover:bg-slate-800 transition-all">
                    <Save className="mr-2 h-5 w-5" /> Déployer les Changements
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-2">
                    {sections.map(section => (
                        <Button
                            key={section.id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start h-14 rounded-2xl px-6 text-[11px] font-black uppercase tracking-widest transition-all",
                                activeSection === section.id
                                    ? "bg-slate-900 text-white shadow-xl translate-x-2"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <section.icon className={cn("mr-4 h-5 w-5", activeSection === section.id ? "text-accent" : "text-slate-400")} />
                            {section.name}
                        </Button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-8">
                    {activeSection === 'CLINIC' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase">Identité de la Clinique</CardTitle>
                                    <CardDescription className="text-sm font-medium text-slate-500">Ces informations sont utilisées pour l'en-tête de vos documents officiels.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nom de l'établissement</label>
                                            <Input className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5" defaultValue="Clinique Dentaire Aere Lao" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identifiant Fiscal / NINEA</label>
                                            <Input className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5" defaultValue="DK-1234567-RE" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Adresse Siège</label>
                                            <Input className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5" defaultValue="Avenue Léopold Sédar Senghor, Dakar, Sénégal" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Téléphone Secrétariat</label>
                                            <Input className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5" defaultValue="+221 33 800 00 00" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Public</label>
                                            <Input className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5" defaultValue="contact@aerelao-dental.sn" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10">
                                <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase mb-8">Design & Signatures</CardTitle>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300">
                                            <Palette className="h-8 w-8" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Modifier Logo Officiel</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300">
                                            <Mail className="h-8 w-8" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Template Emails AI</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300">
                                            <Cloud className="h-8 w-8" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Backup Cloud HDS</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {activeSection === 'SECURITY' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-10">
                                    <Lock className="h-40 w-40 text-accent" />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">Protocole de Sécurité Militaire</h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">Votre infrastructure est protégée par un chiffrement AES-256 de bout en bout. Toutes les actions sont tracées et immuables.</p>
                                    <div className="flex gap-4">
                                        <Button className="bg-accent text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 shadow-xl border-none">Activer 2FA Biométrique</Button>
                                        <Button variant="outline" className="border-white/10 text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 hover:bg-white/5 transition-all">Audit des Logs</Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

