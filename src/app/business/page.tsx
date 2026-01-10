"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Users,
    TrendingUp,
    Target,
    PieChart,
    Rocket,
    BarChart3,
    Mail,
    Phone,
    Search,
    Plus,
    Filter,
    Briefcase,
    FileBarChart,
    BrainCircuit,
    Sparkles,
    CheckCircle2,
    Clock,
    UserPlus,
    Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function BusinessDevelopmentPage() {
    const [activeTab, setActiveTab] = useState<'CRM' | 'KPI' | 'MARKETING'>('CRM')
    const [metrics, setMetrics] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('/api/business/metrics')
                const data = await res.json()
                setMetrics(data)
            } finally {
                setIsLoading(false)
            }
        }
        fetchMetrics()
    }, [])

    const prospects = [
        { id: 1, name: 'Alice Faye', interest: 'Implantologie', status: 'CONTACTED', source: 'Facebook', date: 'Hier' },
        { id: 2, name: 'Modou Diop', interest: 'Orthodontie', status: 'NEW', source: 'Google', date: 'Il y a 2h' },
        { id: 3, name: 'Fatou Sow', interest: 'Blanchiment', status: 'QUOTED', source: 'Recommandation', date: '3 jours' },
    ]

    const campaigns = [
        { id: 1, name: 'Voeux 2026 & Checkup', sent: 450, opened: 380, conversion: '12%', status: 'SENT' },
        { id: 2, name: 'Promo Blanchiment Été', sent: 120, opened: 95, conversion: '8%', status: 'SENT' },
    ]

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-accent" />
                    <p className="font-black text-[10px] uppercase tracking-[0.5em] text-slate-400">Initialisation de l'Intelligence Center</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-accent rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Croissance & Pilotage</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Business <span className="text-gold">Intelligence Center</span></h1>
                    <p className="text-slate-500 font-medium">CRM avancé, analyse de rentabilité et automation marketing.</p>
                </div>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl">
                    {(['CRM', 'KPI', 'MARKETING'] as const).map(tab => (
                        <Button
                            key={tab}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "rounded-xl px-6 text-[11px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>
            </div>

            {activeTab === 'CRM' && (
                <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* CRM KPIs */}
                    <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Nouveaux Patients', value: metrics?.newPatientsThisMonth || '0', icon: UserPlus, color: 'text-blue-600' },
                            { label: 'Taux de Conversion Devis', value: metrics?.conversionRate || '0%', icon: Target, color: 'text-teal-600' },
                            { label: 'Opportunités (Quotes)', value: `${(metrics?.potentialRevenue || 0).toLocaleString()} FCFA`, icon: TrendingUp, color: 'text-accent' },
                            { label: 'Patients Totaux', value: metrics?.patientCount || '0', icon: Users, color: 'text-purple-600' },
                        ].map((s, i) => (
                            <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white group hover:scale-[1.02] transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl font-black text-slate-900 flex justify-between items-center tracking-tighter">
                                        {s.value}
                                        <s.icon className={cn("h-5 w-5 opacity-20 group-hover:opacity-100 transition-all", s.color)} />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pipeline / Prospects List */}
                    <div className="col-span-12 lg:col-span-8">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                            <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                <CardTitle className="text-base font-black tracking-tighter">Pipeline des Prospects</CardTitle>
                                <Button size="sm" className="bg-slate-900 text-white font-black text-[10px] uppercase rounded-xl h-9">
                                    <Plus className="h-4 w-4 mr-2" /> Nouveau Prospect
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {prospects.map(p => (
                                        <div key={p.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-accent/10 group-hover:text-accent transition-all">
                                                    {p.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">{p.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.interest}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="hidden md:block text-right text-xs font-bold text-slate-500">
                                                    Source: <span className="text-slate-900">{p.source}</span>
                                                </div>
                                                <span className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                                                    p.status === 'NEW' ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                        p.status === 'QUOTED' ? "bg-accent/10 text-accent border-accent/20" :
                                                            "bg-slate-50 text-slate-700 border-slate-200"
                                                )}>
                                                    {p.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Prospect Stats / Source Analysis */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-slate-950 text-white p-8">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-accent mb-6">Répartition par Source</CardTitle>
                            <div className="space-y-4">
                                {[
                                    { label: 'Google Search', val: 56, color: 'bg-accent' },
                                    { label: 'Réseaux Sociaux', val: 24, color: 'bg-white/20' },
                                    { label: 'Bouche à oreille', val: 15, color: 'bg-white/20' },
                                ].map(s => (
                                    <div key={s.label} className="space-y-1.5">
                                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                            <span>{s.label}</span>
                                            <span className="text-accent">{s.val}%</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className={cn("h-full", s.color)} style={{ width: `${s.val}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Sparkles className="h-5 w-5 text-accent" />
                                <h3 className="text-sm font-black text-slate-900 tracking-tight italic">IA Matchmaker</h3>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                L'IA suggère de relancer <span className="font-bold text-slate-900">Alice Faye</span> pour son devis d'implant car son profil correspond à nos dossiers les plus rentables.
                            </p>
                            <Button variant="link" className="text-accent p-0 h-auto text-[9px] font-black uppercase tracking-widest mt-4">Lancer la relance →</Button>
                        </Card>
                    </div>
                </div>
            )}

            {activeTab === 'KPI' && (
                <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="col-span-12 lg:col-span-7">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-10 h-full">
                            <CardHeader className="p-0 mb-8">
                                <CardTitle className="text-xl font-black tracking-tighter">Performance Financière Elite</CardTitle>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance consolidée du cabinet</p>
                            </CardHeader>
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Chiffre d'Affaires Global</p>
                                        <p className="text-3xl font-black text-slate-900 tracking-tighter">{(metrics?.revenue || 0).toLocaleString()} <span className="text-sm text-slate-400">FCFA</span></p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Loyauté Patient (Retention)</p>
                                        <p className="text-3xl font-black text-teal-600">82%</p>
                                    </div>
                                </div>
                                <div className="h-[300px] bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8 flex flex-col justify-end">
                                    <div className="flex items-end justify-between h-48 gap-4 px-4">
                                        {/* Simplified Bar Chart representing invoices */}
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${Math.random() * 80 + 20}%` }}
                                                    className={cn(
                                                        "w-full rounded-t-lg transition-all",
                                                        i === 7 ? "bg-accent shadow-lg shadow-accent/20" : "bg-slate-200"
                                                    )}
                                                />
                                                <span className="text-[8px] font-black text-slate-400">M{i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-12 lg:col-span-5 space-y-6">
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-slate-950 text-white p-8">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-accent mb-6 flex items-center justify-between">
                                Rentabilité Associés
                                <FileBarChart className="h-4 w-4" />
                            </CardTitle>
                            <div className="space-y-6">
                                {[
                                    { name: 'Dr. Aere Lao (Partner)', share: '62%', growth: '+15%' },
                                    { name: 'Dr. Martin (Associate)', share: '38%', growth: '+8%' },
                                ].map(p => (
                                    <div key={p.name} className="flex items-center justify-between group">
                                        <div>
                                            <p className="text-sm font-black text-white group-hover:text-accent transition-colors">{p.name}</p>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Part de CA: {p.share}</p>
                                        </div>
                                        <div className="text-teal-400 text-xs font-black">{p.growth}</div>
                                    </div>
                                ))}
                                <Button className="w-full bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl h-11 hover:bg-white/10">Exporter Rapport PDF</Button>
                            </div>
                        </Card>
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-white p-8 overflow-hidden relative">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Note d'Asset</h3>
                            <p className="text-sm font-black text-slate-900 mb-4">Valeur estimée du fonds de commerce :</p>
                            <p className="text-3xl font-black text-slate-950 tracking-tighter">142 000 000 <span className="text-sm text-slate-400">FCFA</span></p>
                            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-tighter mt-2">+4M cette année</p>
                        </Card>
                    </div>
                </div>
            )}

            {activeTab === 'MARKETING' && (
                <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-slate-950 text-white p-8">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                                    <Rocket className="h-4 w-4" /> Nouvelle Campagne
                                </CardTitle>
                            </CardHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Cible Automation</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:ring-1 ring-accent">
                                        <option>Patients Inactifs (6 mois+)</option>
                                        <option>Anniversaires du Mois</option>
                                        <option>Suivi Post-Implant J+30</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Canal Préféré</label>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="flex-1 bg-white/5 border border-white/10 text-xs rounded-xl h-10 hover:border-accent">WhatsApp</Button>
                                        <Button size="sm" className="flex-1 bg-white/5 border border-white/10 text-xs rounded-xl h-10 hover:border-accent">SMS</Button>
                                    </div>
                                </div>
                                <Button className="w-full bg-accent text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl mt-4 shadow-lg shadow-accent/20">Programmer l'envoi</Button>
                            </div>
                        </Card>
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-white p-8">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase mb-4 tracking-tighter">
                                <Sparkles className="h-4 w-4 text-accent" /> Marketing Predictif
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                L'IA prédit que 15% de votre base patient va être inactive dans les 30 prochains jours. Une campagne de rappel est recommandée.
                            </p>
                        </Card>
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                            <CardHeader className="p-8 border-b border-slate-50">
                                <CardTitle className="text-base font-black tracking-tighter">Historique des Campagnes</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {campaigns.map(c => (
                                        <div key={c.id} className="p-8 group hover:bg-slate-50 transition-all">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h4 className="text-lg font-black text-slate-900 group-hover:text-accent transition-colors">{c.name}</h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">{c.status}</span>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp Campaign</span>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="rounded-full text-slate-300 group-hover:text-slate-950 transition-colors">
                                                    <BarChart3 className="h-5 w-5" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-3 gap-8">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Envoyés</p>
                                                    <p className="text-2xl font-black text-slate-950">{c.sent}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ouverture</p>
                                                    <p className="text-2xl font-black text-slate-950">{c.opened}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">CONVERSION</p>
                                                    <p className="text-2xl font-black text-teal-600">{c.conversion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}

function Diamond(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.4l8.6 8.6a2.41 2.41 0 0 0 3.4 0l8.6-8.6a2.41 2.41 0 0 0 0-3.4l-8.6-8.6a2.41 2.41 0 0 0-3.4 0Z" />
        </svg>
    )
}

