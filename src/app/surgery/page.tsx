"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Activity,
    Clock,
    ClipboardCheck,
    Box,
    User,
    Plus,
    Calendar,
    Settings,
    Zap,
    Timer,
    ShieldCheck,
    CheckCircle2,
    AlertTriangle,
    FlaskConical,
    ChevronRight,
    ArrowRight,
    DoorOpen,
    Thermometer,
    Wind,
    ScanLine,
    Stethoscope,
    Bell
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function SurgeryPage() {
    const [activeSurgery, setActiveSurgery] = useState<number | null>(1)
    const [viewMode, setViewMode] = useState<'MONITOR' | 'PLANNING' | 'POST_OP'>('MONITOR')

    const blocks = [
        { id: 'BLOCK-01', name: 'Bloc Sémantique Onyx', status: 'OCCUPIED', temp: '21.5°C', humidity: '45%', pressure: 'Normal' },
        { id: 'BLOCK-02', name: 'Bloc Implantation Quartz', status: 'READY', temp: '20.8°C', humidity: '42%', pressure: 'Normal' },
    ]

    const surgeries = [
        { id: 1, patient: 'Mamadou Diallo', procedure: 'Implantation #16, #17', room: 'Bloc Onyx', status: 'IN_PROGRESS', time: '45m / 1h30', crew: ['Dr. Martin', 'Alice (Ass.)'], steps: ['Incisions', 'Forage Pilote', 'Pose Implants', 'Sutures'], currentStep: 1 },
        { id: 2, patient: 'Marie Curie', procedure: 'Sinus Lift + Greffe', room: 'Bloc Quartz', status: 'READY', time: '14:30', crew: ['Dr. Aere Lao', 'Sarah (Ass.)'], steps: ['Anesthésie', 'Volet Osseux', 'Décollement', 'Comblement'], currentStep: 0 },
    ]

    const consumables = [
        { name: 'Implant Nobel Biocare 4.3mm', lot: 'LOT-2026-X4', sn: 'SN-99812', expiry: '2028', status: 'SCANNED' },
        { name: 'Membrane Bio-Gide 25x25', lot: 'LOT-99827', sn: 'SN-5561', expiry: '2027', status: 'SCANNED' },
        { name: 'Suture Prolene 4-0', lot: 'LOT-4412', sn: 'SN-8827', expiry: '2029', status: 'PENDING' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            {/* Header with Block Environment Status */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-red-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Bloc Opératoire & Chirurgie de Pointe</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Surgery <span className="text-gold">Command Center</span></h1>
                    <p className="text-slate-500 font-medium">Gestion du bloc, traçabilité des implants et monitoring environnemental.</p>
                </div>
                <div className="flex gap-4">
                    {blocks.map(b => (
                        <Card key={b.id} className="bg-white border-slate-100 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
                            <div className={cn("h-2 w-2 rounded-full", b.status === 'OCCUPIED' ? 'bg-red-500 animate-pulse' : 'bg-teal-500')} />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{b.name}</span>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900">
                                    <Thermometer className="h-3 w-3 text-red-400" /> {b.temp}
                                    <Wind className="h-3 w-3 text-blue-400" /> {b.humidity}
                                </div>
                            </div>
                        </Card>
                    ))}
                    <Button className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl px-8 shadow-xl">
                        <Plus className="h-4 w-4 mr-2" /> Réserver Bloc
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left: Operative Monitoring */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl w-fit">
                        {['MONITOR', 'PLANNING', 'POST_OP'].map(tab => (
                            <Button
                                key={tab}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "rounded-xl px-6 text-[10px] font-black uppercase tracking-widest transition-all",
                                    viewMode === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                                )}
                                onClick={() => setViewMode(tab as any)}
                            >
                                {tab === 'MONITOR' ? 'Surveillance Live' : tab === 'PLANNING' ? 'Check-lists' : 'Protocoles Post-Op'}
                            </Button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {viewMode === 'MONITOR' && (
                            <motion.div
                                key="monitor"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {surgeries.map(s => (
                                        <Card
                                            key={s.id}
                                            className={cn(
                                                "rounded-[2.5rem] border-none shadow-luxury transition-all cursor-pointer group relative overflow-hidden",
                                                activeSurgery === s.id ? "bg-slate-950 text-white" : "bg-white text-slate-900 border border-slate-50 hover:bg-slate-50"
                                            )}
                                            onClick={() => setActiveSurgery(s.id)}
                                        >
                                            <CardContent className="p-8 space-y-6">
                                                <div className="flex justify-between items-start">
                                                    <div className={cn(
                                                        "h-12 w-12 rounded-2xl flex items-center justify-center",
                                                        activeSurgery === s.id ? "bg-white/10 text-accent" : "bg-slate-100 text-slate-400"
                                                    )}>
                                                        <Activity className="h-6 w-6" />
                                                    </div>
                                                    <span className={cn(
                                                        "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                                                        s.status === 'IN_PROGRESS' ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-green-500/10 text-green-500 border-green-500/20"
                                                    )}>
                                                        {s.status === 'IN_PROGRESS' ? 'En Cours' : 'Prêt'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black tracking-tight mb-1">{s.procedure}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-3 w-3 text-slate-500" />
                                                        <p className={cn("text-xs font-bold", activeSurgery === s.id ? "text-slate-400" : "text-slate-500")}>{s.patient} • {s.room}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-6">
                                                    <div className="flex -space-x-3">
                                                        {s.crew.map((member, i) => (
                                                            <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-black" title={member}>
                                                                {member[0]}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Temps Restant (Est.)</p>
                                                        <p className="text-xl font-black text-accent">{s.time.split(' / ')[1]}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Active Step Timeline */}
                                <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10">
                                    <div className="flex justify-between items-center mb-10">
                                        <h3 className="text-base font-black tracking-tighter flex items-center gap-2">
                                            <Timer className="h-5 w-5 text-accent" /> Timeline Clinique en Temps Réel
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">Sync IA Active</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        {surgeries[activeSurgery === 1 ? 0 : 1].steps.map((step, i) => (
                                            <div key={i} className="flex-1 space-y-4">
                                                <div className={cn(
                                                    "h-2 rounded-full transition-all duration-500",
                                                    i < surgeries[activeSurgery === 1 ? 0 : 1].currentStep ? "bg-teal-500" :
                                                        i === surgeries[activeSurgery === 1 ? 0 : 1].currentStep ? "bg-accent animate-pulse" : "bg-slate-100"
                                                )} />
                                                <div className="text-center">
                                                    <p className={cn(
                                                        "text-[10px] font-black uppercase tracking-tighter",
                                                        i === surgeries[activeSurgery === 1 ? 0 : 1].currentStep ? "text-slate-900" : "text-slate-400"
                                                    )}>{step}</p>
                                                    {i === surgeries[activeSurgery === 1 ? 0 : 1].currentStep && (
                                                        <span className="text-[8px] font-bold text-accent uppercase">Actif</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {viewMode === 'PLANNING' && (
                            <motion.div
                                key="planning"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                                        <ClipboardCheck className="h-5 w-5 text-accent" /> Check-list Pré-Opératoire Elite
                                    </h4>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Validation Identité Patient', status: 'OK' },
                                            { label: 'Consentement Éclairé Signé', status: 'OK' },
                                            { label: 'Antibioprophylaxie administrée', status: 'OK' },
                                            { label: 'Scanner 3D importé dans le guide', status: 'PENDING' },
                                            { label: 'Stérilisation instrumentation validée', status: 'OK' },
                                            { label: 'Planification chirurgicale validée Dr.', status: 'PENDING' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white border hover:border-slate-100 transition-all cursor-pointer">
                                                <span className="text-xs font-bold text-slate-700">{item.label}</span>
                                                {item.status === 'OK' ? <CheckCircle2 className="h-5 w-5 text-teal-500" /> : <div className="h-5 w-5 rounded-full border-2 border-slate-200" />}
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white p-8">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-accent mb-8 flex items-center gap-2">
                                        <ScanLine className="h-5 w-5 text-accent" /> Scan Consommables & Implants
                                    </h4>
                                    <div className="space-y-6">
                                        {consumables.map((c, i) => (
                                            <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group">
                                                <div>
                                                    <p className="text-xs font-black text-white">{c.name}</p>
                                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">LOT: {c.lot} • SN: {c.sn}</p>
                                                    <p className="text-[8px] font-black text-slate-600 uppercase mt-1">Expire: {c.expiry}</p>
                                                </div>
                                                <div className={cn(
                                                    "h-10 w-10 rounded-xl flex items-center justify-center",
                                                    c.status === 'SCANNED' ? "bg-teal-500/10 text-teal-400" : "bg-white/5 text-slate-600"
                                                )}>
                                                    {c.status === 'SCANNED' ? <CheckCircle2 className="h-5 w-5" /> : <ScanLine className="h-5 w-5" />}
                                                </div>
                                            </div>
                                        ))}
                                        <Button className="w-full bg-accent text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-xl shadow-xl shadow-accent/20">Scanner Nouveau Code</Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {viewMode === 'POST_OP' && (
                            <motion.div
                                key="post-op"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-8"
                            >
                                <Card className="rounded-[3rem] border-none shadow-luxury bg-indigo-600 text-white p-10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 opacity-10">
                                        <Bell className="h-40 w-40" />
                                    </div>
                                    <div className="relative z-10 space-y-6 max-w-2xl">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200">Protocoles Post-Opératoires Automatisés</span>
                                        <h2 className="text-3xl font-black tracking-tighter">Communication Patient J+1 à J+7.</h2>
                                        <p className="text-indigo-100 text-sm font-medium leading-relaxed">Le système envoie automatiquement des instructions de soins, des rappels de médication et des questionnaires de suivi de douleur.</p>
                                        <div className="flex gap-4">
                                            <Button className="bg-white text-indigo-600 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 shadow-xl">Activer Automatisation</Button>
                                            <Button className="bg-indigo-500 text-white border border-indigo-400 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8">Voir Templates</Button>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { day: 'J+0 (Soir)', channel: 'WhatsApp', content: 'Contrôle douleur & hémorragie' },
                                        { day: 'J+1 (Matin)', channel: 'SMS', content: 'Rappel Hygiène & Alimentation' },
                                        { day: 'J+7 (Matin)', channel: 'Email', content: 'Rappel d\'ablation des fils' },
                                    ].map((p, i) => (
                                        <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white p-6 border border-slate-50">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500">{p.day}</span>
                                                <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                                    <Zap className="h-4 w-4" />
                                                </div>
                                            </div>
                                            <h4 className="text-xs font-black text-slate-900 mb-1">{p.channel} Automatisé</h4>
                                            <p className="text-[10px] font-medium text-slate-500 italic">"{p.content}"</p>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Resources & Safety stats */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 space-y-8">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
                                Ressources Operatoires
                                <Stethoscope className="h-4 w-4" />
                            </h3>
                            <div className="space-y-4">
                                <div className="p-5 rounded-2xl bg-slate-50 flex justify-between items-center group cursor-pointer hover:bg-slate-100 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                            <DoorOpen className="h-5 w-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 uppercase">Bloc Onyx</p>
                                            <p className="text-[9px] font-bold text-red-500">INDISPONIBLE (45m)</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-300" />
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 flex justify-between items-center group cursor-pointer hover:bg-slate-100 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                            <DoorOpen className="h-5 w-5 text-teal-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 uppercase">Bloc Quartz</p>
                                            <p className="text-[9px] font-bold text-teal-500">DISPONIBLE</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-300" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-slate-50">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Traçabilité Instrumentation</h4>
                            <div className="bg-slate-950 rounded-2xl p-6 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <ShieldCheck className="h-20 w-20" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-2xl font-black tracking-tighter text-gold">100%</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Conformité Stérilisation J-0</p>
                                    <Button variant="link" className="p-0 h-auto text-[9px] font-black uppercase text-accent mt-4">Voir logs autoclaves →</Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-gradient-to-br from-red-500 to-red-700 p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="h-6 w-6" />
                            <h3 className="text-lg font-black tracking-tight">Security Alerts</h3>
                        </div>
                        <p className="text-xs text-white/80 font-medium leading-relaxed mb-6">Le détecteur de particules du Bloc Onyx indique une maintenance nécessaire sous 48h (Dépassement seuil ISO-5).</p>
                        <Button className="w-full bg-white text-red-700 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl shadow-lg border-none hover:bg-red-50">Programmer Maintenance</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

