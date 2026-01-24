"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    ShieldCheck,
    QrCode,
    RefreshCw,
    Search,
    History,
    FileText,
    Activity,
    Thermometer,
    Timer,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Package,
    ScanLine,
    Plus,
    ChevronLeft,
    Clock,
    Zap,
    Scale,
    Cpu,
    Waves,
    Wind,
    Bell,
    Settings,
    Gauge
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function IoTSterilizationHub() {
    const [isScanning, setIsScanning] = useState(false)
    const [temp, setTemp] = useState(134.5)
    const [pressure, setPressure] = useState(2.1)
    const [progress, setProgress] = useState(65)

    // Simulate IoT live updates
    useEffect(() => {
        const interval = setInterval(() => {
            setTemp(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1))
            setPressure(prev => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(2))
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    const recentCycles = [
        { id: 'CY-2026-X41', type: 'Prion Cycle 134°', status: 'COMPLETED', assistant: 'Fatou D.', date: 'Aujourd\'hui 09:12', result: 'VALID' },
        { id: 'CY-2026-X40', type: 'Normal Cycle 121°', status: 'COMPLETED', assistant: 'Mamadou S.', date: 'Hier 16:45', result: 'VALID' },
        { id: 'CY-2026-X39', type: 'Prion Cycle 134°', status: 'FAILED', assistant: 'Fatou D.', date: 'Hier 11:20', result: 'INTERRUPTED' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            {/* Header with IoT Connectivity Status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-teal-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-teal-600/20 relative">
                        <Waves className="h-8 w-8 animate-pulse" />
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Cpu className="h-4 w-4 text-teal-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 italic">Connected Sterilization Hub v2.0</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">IoT <span className="text-teal-600">Sterilization Vault</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Surveillance en temps réel des autoclaves, traçabilité QR-Direct et maintenance prédictive.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white group hover:bg-slate-50">
                        <Settings className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform" /> Configurer IoT
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouveau Cycle
                    </Button>
                </div>
            </div>

            {/* IoT Live Monitoring Dashboard */}
            <div className="grid grid-cols-12 gap-8">
                {/* Active Machine Live Feed */}
                <Card className="col-span-12 lg:col-span-8 rounded-[4rem] border-none shadow-2xl bg-slate-950 text-white overflow-hidden relative p-12 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200')] opacity-5 bg-center bg-cover" />

                    <div className="relative z-10 flex flex-col h-full space-y-12">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-green-500 animate-ping" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">Autoclave Getinge A-01 : En cours</span>
                                </div>
                                <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none">PRION CORE 134°C</h2>
                                <p className="text-slate-400 font-medium tracking-tight">Cycle sécurisé chargé avec 8 plateaux chirurgicaux.</p>
                            </div>
                            <div className="text-right">
                                <p className="text-6xl font-black text-teal-400 tracking-tighter">18:45</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Temps Restant</p>
                            </div>
                        </div>

                        {/* Telemetry Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: 'Température', val: `${temp}°C`, sub: 'Limite 135°', icon: Thermometer, color: 'text-rose-400' },
                                { label: 'Pression', val: `${pressure} Bar`, sub: 'Limite 2.5', icon: Gauge, color: 'text-indigo-400' },
                                { label: 'Hygrométrie', val: '0.04%', sub: 'Séchage actif', icon: Wind, color: 'text-teal-400' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-4 hover:bg-white/10 transition-all">
                                    <div className="flex justify-between items-center">
                                        <stat.icon className={cn("h-6 w-6", stat.color)} />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Live IoT</span>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-white">{stat.val}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">{stat.label}</p>
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-600 italic mt-2">{stat.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* Progress Visualization */}
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Avancement du Cycle</span>
                                <span className="text-teal-400 font-black text-sm">{progress}%</span>
                            </div>
                            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-teal-600 to-indigo-600 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1.5 }}
                                />
                            </div>
                            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-600">
                                <span>Préchauffage</span>
                                <span>Plateau de Température</span>
                                <span>Séchage</span>
                                <span>Refroidissement</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* AI Maintenance Predictor */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-8 flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none">
                            <Activity className="h-40 w-40 text-slate-900" />
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-black tracking-tighter uppercase italic">AI Maintenance</h3>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                    <RefreshCw className="h-5 w-5 text-indigo-500" />
                                </motion.div>
                            </div>

                            <div className="space-y-8">
                                <div className="text-center p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Prochaine Révision IA</p>
                                        <p className="text-4xl font-black text-slate-900 tracking-tighter">42 <span className="text-xs font-bold text-slate-400">Cycles</span></p>
                                        <p className="text-[10px] font-black text-indigo-600 uppercase mt-4">Statut des Joints : 92%</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 leading-tight">Vérification de Chambre</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Valide - Passé hier</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                                            <AlertTriangle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 leading-tight">Nettoyage Filtres</p>
                                            <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Recommandé sous 7 jours</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest shadow-xl">Contacter Support Elite</Button>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-indigo-600 text-white p-10 space-y-6 text-center">
                        <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto border border-white/20">
                            <Bell className="h-8 w-8 text-white animate-bounce" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black tracking-tighter uppercase italic leading-tight">Système d'Alertes IoT</h3>
                            <p className="text-xs font-medium text-indigo-100">Notifications instantanées sur mobile en cas d'interruption de cycle.</p>
                        </div>
                        <Button className="w-full h-12 rounded-xl bg-white text-indigo-600 font-black uppercase text-[10px] tracking-widest">Configurer Mobiles</Button>
                    </Card>
                </div>
            </div>

            {/* Bottom Section: QR Scanning Area & Legend */}
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-8">
                    <Card className="rounded-[4rem] border-none shadow-luxury bg-white p-12 overflow-hidden">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter uppercase italic">Direct Scan <span className="text-teal-600">& Trace</span></h3>
                                <p className="text-sm font-medium text-slate-400 mt-1">Liez vos plateaux techniques au cycle de stérilisation en cours.</p>
                            </div>
                            <Button
                                onClick={() => setIsScanning(!isScanning)}
                                className={cn(
                                    "h-16 px-8 rounded-2xl flex items-center gap-4 transition-all",
                                    isScanning ? "bg-rose-500 text-white scale-105" : "bg-slate-900 text-white"
                                )}
                            >
                                <ScanLine className="h-6 w-6" />
                                <span className="font-black uppercase text-[11px] tracking-widest">{isScanning ? "Arrêter Scanner" : "Lancer Scanner"}</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sachets Prêts pour Archivage</label>
                                    <div className="flex flex-wrap gap-3">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="px-6 h-12 border border-slate-100 bg-slate-50 text-slate-900 rounded-2xl flex items-center gap-3 group hover:border-teal-500 hover:bg-white transition-all cursor-pointer">
                                                <QrCode className="h-4 w-4 text-slate-300 group-hover:text-teal-500" />
                                                <span className="text-[11px] font-black">LOT-X{i}0{i}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 bg-teal-50/50 border border-teal-100 rounded-[2.5rem] flex items-center gap-6">
                                    <CheckCircle2 className="h-10 w-10 text-teal-600" />
                                    <div>
                                        <p className="text-xs font-black text-slate-900">12 Lots d'instruments validés</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prêts pour le stockage stérile.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="aspect-video bg-slate-100 rounded-[3rem] overflow-hidden relative group">
                                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-48 h-48 border-2 border-teal-500/50 rounded-3xl relative">
                                        <div className="absolute -top-2 -left-2 h-6 w-6 border-t-4 border-l-4 border-teal-500" />
                                        <div className="absolute -top-2 -right-2 h-6 w-6 border-t-4 border-r-4 border-teal-500" />
                                        <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b-4 border-l-4 border-teal-500" />
                                        <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-4 border-r-4 border-teal-500" />
                                        {isScanning && (
                                            <motion.div
                                                className="absolute inset-x-0 h-1 bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,1)]"
                                                animate={{ top: ['0%', '100%', '0%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                                    Caméra de Traçabilité Active
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Journal d'Audit Rapide</CardTitle>
                        </CardHeader>
                        <div className="p-0">
                            {recentCycles.map((cycle, i) => (
                                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-10 w-10 rounded-2xl flex items-center justify-center",
                                            cycle.result === 'VALID' ? "bg-teal-50 text-teal-600" : "bg-rose-50 text-rose-600"
                                        )}>
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900">{cycle.id}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{cycle.date}</p>
                                        </div>
                                    </div>
                                    <FileText className="h-4 w-4 text-slate-300" />
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-slate-50 text-center">
                            <Button variant="link" className="text-[10px] font-black uppercase text-indigo-600">Voir le registre complet →</Button>
                        </div>
                    </Card>

                    <Card className="rounded-[4rem] border-none shadow-luxury bg-slate-950 p-10 flex flex-col items-center text-center space-y-4">
                        <div className="h-20 w-20 bg-teal-500 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-teal-500/20">
                            <ShieldCheck className="h-10 w-10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-black text-white tracking-tighter uppercase italic">Norme ISO 17665</h4>
                            <p className="text-xs font-medium text-slate-400 leading-relaxed px-4">Votre cabinet est 100% conforme aux exigences de stérilisation à la vapeur d'eau.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-[10px] font-black text-teal-400 uppercase tracking-widest">
                            Certifié Janvier 2026
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
