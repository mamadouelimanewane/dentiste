"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    MessageSquare,
    Mail,
    Smartphone,
    Bell,
    UserCheck,
    History,
    ShieldCheck,
    Zap,
    FileText,
    PlayCircle,
    Star,
    Calendar,
    ChevronRight,
    Search,
    Filter,
    ArrowUpRight,
    Smile,
    Heart,
    Share2,
    Lock,
    Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function CommunicationPage() {
    const [activeTab, setActiveTab] = useState<'CAMPAIGNS' | 'PORTAL' | 'FEEDBACK' | 'EDUCATION'>('CAMPAIGNS')
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/communication/logs')
                const json = await res.json()
                setData(json)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const educationvids = [
        { title: 'Hygiène post-implantaire', duration: '4:20', views: 124, category: 'Surgery' },
        { title: 'Utilisation des brossettes', duration: '2:15', views: 450, category: 'Prevention' },
    ]

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
                    <p className="font-black text-[10px] uppercase tracking-[0.5em] text-slate-400">Canal Sécurisé en cours d'établissement...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-pink-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Expérience & Relation Patient</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-gold">Connect Lab</span></h1>
                    <p className="text-slate-500 font-medium">Communication automatisée, portail patient sécurisé et éducation clinique.</p>
                </div>
                <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl">
                    {(['CAMPAIGNS', 'PORTAL', 'FEEDBACK', 'EDUCATION'] as const).map(tab => (
                        <Button
                            key={tab}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "rounded-xl px-6 text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'CAMPAIGNS' ? 'Campagnes' : tab === 'PORTAL' ? 'Portail' : tab === 'FEEDBACK' ? 'Satisfaction' : 'Education'}
                        </Button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'CAMPAIGNS' && (
                    <motion.div
                        key="campaigns"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-12 gap-8"
                    >
                        {/* Live Feed */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                    <CardTitle className="text-base font-black tracking-tighter">Flux de Communication Live</CardTitle>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" className="text-[9px] font-black uppercase text-slate-400">Toutes les chaines</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-slate-50">
                                        {(data?.logs || []).map((comm: any) => (
                                            <div key={comm.id} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-6">
                                                    <div className={cn(
                                                        "h-12 w-12 rounded-2xl flex items-center justify-center",
                                                        comm.type === 'SMS' ? "bg-teal-50 text-teal-600" :
                                                            comm.type === 'EMAIL' ? "bg-blue-50 text-blue-600" : "bg-indigo-50 text-indigo-600"
                                                    )}>
                                                        {comm.type === 'SMS' ? <Smartphone className="h-5 w-5" /> :
                                                            comm.type === 'EMAIL' ? <Mail className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{comm.patient}</h3>
                                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{comm.category} • {comm.content}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right">
                                                        <p className={cn(
                                                            "text-[9px] font-black uppercase tracking-widest",
                                                            comm.status === 'DELIVERED' || comm.status === 'OPENED' ? "text-teal-600" : "text-amber-500"
                                                        )}>{comm.status}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{comm.time}</p>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="rounded-full text-slate-200 group-hover:text-slate-950 transition-colors">
                                                        <ChevronRight className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Automation Panel */}
                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white p-8 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Zap className="h-40 w-40 text-pink-500" />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-pink-400 flex items-center gap-2">
                                        <Zap className="h-4 w-4" /> Smart Automations
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Rappels RDV J-2', active: true },
                                            { label: 'Instructions Post-Op J+0', active: true },
                                            { label: 'Recalls (Contrôle Annuel)', active: false },
                                            { label: 'Factures Portail Automatiques', active: true },
                                        ].map((s, i) => (
                                            <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</span>
                                                <div className={cn(
                                                    "h-2 w-8 rounded-full",
                                                    s.active ? "bg-pink-500" : "bg-white/10"
                                                )} />
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full bg-pink-500 text-white font-black uppercase tracking-widest text-[9px] h-12 rounded-xl hover:bg-pink-400 shadow-xl shadow-pink-500/20">Configurer Scénarios</Button>
                                </div>
                            </Card>

                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 border border-slate-50">
                                <div className="flex items-center gap-2 mb-6">
                                    <Heart className="h-5 w-5 text-red-500" />
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Délivrabilité Global</h3>
                                </div>
                                <div className="flex items-end gap-3 mb-6">
                                    <span className="text-5xl font-black text-slate-900">{data?.stats?.deliveryRate || '0%'}</span>
                                    <span className="text-teal-600 text-xs font-black uppercase mb-2">Taux de succès</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Total Envoyés</span>
                                        <span>{data?.stats?.totalSent || 0}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-pink-500" style={{ width: data?.stats?.deliveryRate || '0%' }} />
                                    </div>
                                </div>
                                <Button variant="link" className="w-full text-[10px] font-black uppercase text-slate-400 mt-4">Voir les avis patients →</Button>
                            </Card>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'PORTAL' && (
                    <motion.div
                        key="portal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-indigo-600 text-white p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <Lock className="h-48 w-48" />
                            </div>
                            <div className="relative z-10 space-y-8 max-w-3xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200">Bunker Patient Portal Management</span>
                                <h1 className="text-4xl font-black tracking-tighter">Accès sécurisé et Documents en temps réel.</h1>
                                <p className="text-indigo-100 text-lg font-medium leading-relaxed">
                                    Le portail patient permet à vos patients de consulter leurs radiographies, factures et plans de traitement de manière chiffrée. Une expérience fluide qui réduit les demandes administratives à l'accueil.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                    {[
                                        { label: 'Espace Chiffré', icon: ShieldCheck },
                                        { label: 'Signature Tablette', icon: Zap },
                                        { label: 'Paiement en ligne', icon: ArrowUpRight },
                                    ].map((feat, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/20">
                                            <feat.icon className="h-5 w-5 text-indigo-200" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{feat.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <Button className="bg-white text-indigo-600 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl border-none">Activer pour 1,420 Patients</Button>
                                    <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 hover:bg-white/10">Paramètres Sécurité</Button>
                                </div>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Taux d\'adoption', val: '64%', color: 'text-teal-600' },
                                { label: 'Docs téléchargés', val: '2.4k', color: 'text-indigo-600' },
                                { label: 'RDV pris via portail', val: '142', color: 'text-pink-600' },
                                { label: 'Uptime Portail', val: '99.9%', color: 'text-slate-900' },
                            ].map((s, i) => (
                                <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white p-6 border border-slate-50">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
                                    <p className={cn("text-2xl font-black tracking-tight", s.color)}>{s.val}</p>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'EDUCATION' && (
                    <motion.div
                        key="education"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-12 gap-8"
                    >
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {educationvids.map((vid, i) => (
                                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden group border border-slate-50">
                                        <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
                                            <PlayCircle className="h-16 w-16 text-white/20 group-hover:text-pink-500 group-hover:scale-110 transition-all cursor-pointer" />
                                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-950 to-transparent">
                                                <span className="text-[9px] font-black uppercase text-pink-400 tracking-widest">{vid.category}</span>
                                            </div>
                                        </div>
                                        <CardContent className="p-8">
                                            <h3 className="text-lg font-black text-slate-900 tracking-tight">{vid.title}</h3>
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                                                <span>{vid.duration} min</span>
                                                <div className="flex items-center gap-1">
                                                    <Smile className="h-3 w-3" />
                                                    <span>{vid.views} Partages</span>
                                                </div>
                                            </div>
                                            <Button className="w-full bg-slate-50 text-slate-900 border border-slate-100 rounded-xl mt-6 h-12 font-black uppercase tracking-widest text-[9px] hover:bg-slate-900 hover:text-white transition-all">Envoyer au patient</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 space-y-6 border border-slate-50">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <FileText className="h-4 w-4" /> Fiches Conseils IA
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        'Protocole Post-Chirurgie J+7',
                                        'Maintenance Aligneurs',
                                        'Alimentation & Orthodontie',
                                        'Sevrage Tabagique & Paro',
                                    ].map((f, i) => (
                                        <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center group cursor-pointer hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                                            <span className="text-[11px] font-bold text-slate-700">{f}</span>
                                            <Share2 className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-500" />
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl shadow-xl">Générer Fiche Personnalisée</Button>
                            </Card>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

