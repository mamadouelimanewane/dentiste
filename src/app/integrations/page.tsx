"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Share2,
    Settings2,
    Layers,
    Image as ImageIcon,
    Calendar,
    CreditCard,
    Cpu,
    Webhook,
    Video,
    Briefcase,
    Zap,
    CheckCircle2,
    AlertCircle,
    Power,
    RefreshCw,
    Code2,
    Database,
    Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

const PROVIDERS = [
    { id: 'sirona', name: 'Sirona SIDEXIS', type: 'IMAGING', icon: ImageIcon, desc: 'Pont TWAIN/DICOM pour acquisition radio haute-fidélité.' },
    { id: 'google_cal', name: 'Google Calendar', type: 'CALENDAR', icon: Calendar, desc: 'Synchronisation bidirectionnelle avec agendas mobiles.' },
    { id: 'stripe', name: 'Stripe Payments', type: 'PAYMENT', icon: CreditCard, desc: 'Paiements par carte et abonnements de soins.' },
    { id: 'doctolib', name: 'Doctolib API', type: 'API', icon: Webhook, desc: 'Synchronisation des rendez-vous externes.' },
    { id: 'zoom', name: 'Zoom Health', type: 'TELECONSULT', icon: Video, desc: 'Téléconsultations sécurisées intégrées au dossier.' },
    { id: 'sage', name: 'Sage / OHADA', type: 'ACCOUNTING', icon: Briefcase, desc: 'Export automatisé des écritures comptables.' },
]

export default function IntegrationsPage() {
    const [activeIntegrations, setActiveIntegrations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [connectingId, setConnectingId] = useState<string | null>(null)

    useEffect(() => {
        fetchIntegrations()
    }, [])

    const fetchIntegrations = async () => {
        try {
            const res = await fetch('/api/integrations')
            const data = await res.json()
            setActiveIntegrations(data)
        } finally {
            setLoading(false)
        }
    }

    const toggleIntegration = async (provider: any) => {
        const existing = activeIntegrations.find(i => i.provider === provider.name)
        setConnectingId(provider.id)

        try {
            if (existing) {
                // Delete
                await fetch('/api/integrations', {
                    method: 'DELETE',
                    body: JSON.stringify({ id: existing.id })
                })
            } else {
                // Create
                await fetch('/api/integrations', {
                    method: 'POST',
                    body: JSON.stringify({
                        provider: provider.name,
                        type: provider.type,
                        status: 'CONNECTED',
                        config: { lastSync: new Date().toISOString() }
                    })
                })
            }
            await fetchIntegrations()
        } finally {
            setConnectingId(null)
        }
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-900">
                <Loader2 className="h-10 w-10 animate-spin text-teal-400" />
            </div>
        )
    }

    return (
        <div className="p-8 space-y-12 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1 w-12 bg-teal-500 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500">Core Ecosystem</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Hub d'<span className="text-slate-400">Intégrations</span></h1>
                    <p className="text-slate-500 font-medium mt-2">Connectez votre cabinet aux meilleurs outils du marché.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 font-black uppercase text-[10px] tracking-widest">
                        <Code2 className="mr-2 h-4 w-4" /> Documentation API
                    </Button>
                    <Button className="bg-slate-950 text-white rounded-2xl h-14 px-8 font-black uppercase text-[10px] tracking-widest shadow-2xl">
                        Webhook personnalisé
                    </Button>
                </div>
            </div>

            {/* API Status Alert */}
            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-teal-500 border border-slate-100">
                        <Cpu className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight">API Gateway Operationnelle</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Temps de réponse moyen : 42ms • Uptime : 99.99%</p>
                    </div>
                </div>
                <Badge className="bg-teal-500/10 text-teal-600 border-none px-4 py-2 rounded-full font-black text-[10px] uppercase">
                    Service Actif
                </Badge>
            </div>

            {/* Grid of Providers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROVIDERS.map((p) => {
                    const isActive = activeIntegrations.find(ai => ai.provider === p.name)
                    const isConnecting = connectingId === p.id

                    return (
                        <Card key={p.id} className={cn(
                            "rounded-[3rem] border-none shadow-luxury transition-all duration-500 group relative overflow-hidden",
                            isActive ? "bg-white ring-2 ring-teal-500/20" : "bg-white grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
                        )}>
                            <CardHeader className="p-8 pb-0">
                                <div className="flex justify-between items-start">
                                    <div className={cn(
                                        "h-16 w-16 rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                                        isActive ? "bg-teal-50 text-teal-500 shadow-lg shadow-teal-500/10" : "bg-slate-50 text-slate-400"
                                    )}>
                                        <p.icon className="h-8 w-8" />
                                    </div>
                                    <Badge variant="outline" className="rounded-full font-black text-[9px] uppercase tracking-widest px-3 py-1 border-slate-100">
                                        {p.type}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-black tracking-tight mt-6">{p.name}</CardTitle>
                                <CardDescription className="text-xs font-medium leading-relaxed mt-2 text-slate-400">
                                    {p.desc}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {isActive ? (
                                        <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black uppercase">
                                            <CheckCircle2 className="h-3 w-3" /> Connecté
                                        </div>
                                    ) : (
                                        <div className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Déconnecté</div>
                                    )}
                                </div>
                                <Button
                                    onClick={() => toggleIntegration(p)}
                                    disabled={isConnecting}
                                    variant={isActive ? "outline" : "default"}
                                    className={cn(
                                        "h-12 w-12 rounded-2xl flex items-center justify-center p-0 shadow-lg group-hover:rotate-12 transition-all",
                                        isActive ? "border-slate-100 text-slate-400" : "bg-slate-950 text-white"
                                    )}
                                >
                                    {isConnecting ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : isActive ? (
                                        <Power className="h-5 w-5" />
                                    ) : (
                                        <Power className="h-5 w-5" />
                                    )}
                                </Button>
                            </CardContent>

                            {/* Visual effect for active items */}
                            {isActive && (
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
                                </div>
                            )}
                        </Card>
                    )
                })}
            </div>

            {/* Custom Webhook Card */}
            <Card className="rounded-[4rem] border-none shadow-luxury bg-slate-950 text-white p-12 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-12 opacity-10">
                    <Database className="h-64 w-64" />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap className="h-6 w-6 text-teal-400" />
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Flux Temps Réel (Webhooks)</h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed font-medium">
                            Envoyez vos évènements cliniques vers n'importe quel service tiers. Patient créé, diagnostic posé, ou acte facturé : synchronisez tout instantanément.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                                <Code2 className="h-5 w-5 text-teal-400" />
                                <div>
                                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Endpoint URL</p>
                                    <p className="text-xs font-mono text-teal-400/80">https://api.votre-cabinet.com/v1/events</p>
                                </div>
                            </div>
                            <Button className="h-16 w-24 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest">Tester</Button>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-md">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-teal-400 mb-6">Logs Webhook Récents</h4>
                        <div className="space-y-4">
                            {[
                                { event: 'appointment.created', time: '2m ago', status: '200 OK' },
                                { event: 'invoice.paid', time: '15m ago', status: '200 OK' },
                                { event: 'treatment.updated', time: '1h ago', status: '200 OK' },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-teal-500" />
                                        <span className="text-xs font-mono opacity-80">{log.event}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-slate-500">{log.time}</span>
                                        <span className="text-[10px] font-black text-teal-500">{log.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

