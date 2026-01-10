"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    DollarSign,
    Download,
    Plus,
    Zap,
    ShieldCheck,
    Wallet,
    CreditCard,
    TrendingUp,
    FileText,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    CheckCircle2,
    Clock,
    Scan,
    BarChart3,
    ArrowRight,
    AlertTriangle,
    ShieldAlert,
    History,
    FileCheck,
    CreditCard as PaymentIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function BillingPage() {
    const [viewMode, setViewMode] = useState<'DASHBOARD' | 'FSE' | 'PAYMENTS'>('DASHBOARD')

    const fseItems = [
        { id: 'FSE-2026-X81', patient: 'Sophie Faye', amount: '142,50', status: 'TRANSMITTED', date: 'Aujourd\'hui 14:22', type: 'CCAM' },
        { id: 'FSE-2026-X80', patient: 'Mamadou Diallo', amount: '23,00', status: 'ACCEPTED', date: 'Hier 11:45', type: 'NGAP' },
        { id: 'FSE-2026-X79', patient: 'Marie Curie', amount: '450,00', status: 'ERROR', date: '08 Jan', type: 'CCAM' },
    ]

    const paymentPlans = [
        { patient: 'Alice Diop', total: '1,250,000', paid: '450,000', next: '15 Jan', progress: 36 },
        { patient: 'Modou Fall', total: '4,800,000', paid: '1,200,000', next: '20 Jan', progress: 25 },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-teal-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500">Finance & Facturation Elite</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Finance <span className="text-gold">Cockpit</span></h1>
                    <p className="text-slate-500 font-medium">Télétransmission FSE, gestion du tiers-payant et plans d'échelonnement.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                        {(['DASHBOARD', 'FSE', 'PAYMENTS'] as const).map(tab => (
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
                                {tab === 'DASHBOARD' ? 'Cockpit' : tab === 'FSE' ? 'Télétrans (FSE)' : 'Échéanciers'}
                            </Button>
                        ))}
                    </div>
                    <Button className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl px-8 shadow-xl">
                        <Scan className="h-4 w-4 mr-2" /> Lire Carte Vitale
                    </Button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {viewMode === 'DASHBOARD' && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-10"
                    >
                        {/* Elite Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: 'CA Facturé (Mois)', value: '18,450,000', trend: '+12.4%', icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50' },
                                { label: 'Reste à Charge Global', value: '2,150,000', trend: '-5.2%', icon: Wallet, color: 'text-red-600', bg: 'bg-red-50' },
                                { label: 'FSE en Attente', value: '24 Flux', trend: 'Prêts à l\'envoi', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'Echéances J+30', value: '4,200,000', trend: 'Recouvrement 92%', icon: BarChart3, color: 'text-accent', bg: 'bg-gold/10' },
                            ].map((s, i) => (
                                <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white group hover:scale-[1.02] transition-all overflow-hidden border border-slate-50">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-xl font-black text-slate-900 flex justify-between items-center mb-1">
                                            {s.value} <span className="text-[10px] font-bold text-slate-400 ml-1">FCFA</span>
                                            <s.icon className={cn("h-5 w-5 opacity-20 group-hover:opacity-100 transition-all", s.color)} />
                                        </div>
                                        <p className={cn("text-[9px] font-bold uppercase", s.color)}>{s.trend}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-12 gap-8">
                            {/* Main Billing Table */}
                            <div className="col-span-12 lg:col-span-8">
                                <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                                    <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                        <CardTitle className="text-base font-black tracking-tighter">Écritures Comptables Récentes</CardTitle>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="ghost" className="text-[9px] font-black uppercase text-slate-400">Filtrer Nomenclature</Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-slate-50">
                                            {[
                                                { id: 'INV-2026-042', patient: 'Sophie Faye', amount: '145,000', status: 'PAID', type: 'FSE CCAM', icon: CheckCircle2 },
                                                { id: 'INV-2026-041', patient: 'Modou Diop', amount: '450,000', status: 'PARTIAL', type: 'Devis Echelonné', icon: Clock },
                                                { id: 'INV-2026-040', patient: 'Mamadou Diallo', amount: '12,500', status: 'UNPAID', type: 'Consul. Simple', icon: AlertTriangle },
                                            ].map((inv, i) => (
                                                <div key={i} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xs",
                                                            inv.status === 'PAID' ? "bg-teal-50 text-teal-600" :
                                                                inv.status === 'PARTIAL' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                                                        )}>
                                                            {inv.id.split('-')[2]}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900">{inv.patient}</p>
                                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                                <span>{inv.id}</span>
                                                                <span>•</span>
                                                                <span>{inv.type}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-8">
                                                        <div className="text-right">
                                                            <p className="text-sm font-black text-slate-900">{inv.amount} FCFA</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Hier</p>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="rounded-full text-slate-300 group-hover:text-slate-950 transition-colors">
                                                            <Download className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-center">
                                            <Button variant="link" className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900">Voir tout l'historique →</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Intelligence Panel */}
                            <div className="col-span-12 lg:col-span-4 space-y-8">
                                <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white p-8 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Sparkles className="h-40 w-40 text-accent" />
                                    </div>
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="h-5 w-5 text-accent" />
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">IA Financial Guard</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                                <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1">Alerte Reste à charge</p>
                                                <p className="text-[11px] font-medium text-slate-300">3 patients ont un reste à charge &gt; 500,000 FCFA sans plan d'échelonnement.</p>
                                                <Button variant="link" className="text-accent p-0 h-auto text-[9px] font-black uppercase mt-3">Lancer relances →</Button>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                                <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">Optimisation CCAM</p>
                                                <p className="text-[11px] font-medium text-slate-300">Suggestion d'acte complémentaire (HBQK002) détectée sur le dossier #452.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 border border-slate-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Tiers-Payant Temps Réel</h3>
                                        <ShieldCheck className="h-4 w-4 text-teal-600" />
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'CPAM (Télétrans)', status: 'Live', speed: '24ms' },
                                            { name: 'Mutuelle Complémentaire', status: 'Live', speed: '156ms' },
                                            { name: 'Vérification Droits', status: 'Ready', speed: '-' },
                                        ].map((s, i) => (
                                            <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">{s.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                                                    <span className="text-[9px] font-bold text-slate-400">{s.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                )}

                {viewMode === 'FSE' && (
                    <motion.div
                        key="fse"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {fseItems.map((fse, i) => (
                                <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 space-y-4 group hover:translate-y-[-4px] transition-all border border-slate-50">
                                    <div className="flex justify-between items-start">
                                        <div className={cn(
                                            "h-12 w-12 rounded-xl flex items-center justify-center",
                                            fse.status === 'ACCEPTED' ? "bg-teal-50 text-teal-600" :
                                                fse.status === 'ERROR' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                        )}>
                                            <FileCheck className="h-6 w-6" />
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                            fse.status === 'ACCEPTED' ? "bg-teal-50 text-teal-700" :
                                                fse.status === 'ERROR' ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                                        )}>{fse.status}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{fse.patient}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{fse.id} • Type {fse.type}</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                        <span className="text-base font-black text-slate-900">{fse.amount} €</span>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase">{fse.date}</span>
                                    </div>
                                </Card>
                            ))}
                            <Card className="rounded-[2.5rem] border-dashed border-2 border-slate-200 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all p-8">
                                <Plus className="h-8 w-8 mb-2 opacity-20" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Nouveau Lot FSE</span>
                            </Card>
                        </div>

                        <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Zap className="h-40 w-40 text-accent" />
                            </div>
                            <div className="relative z-10 space-y-6 max-w-2xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Flux de Télétransmission Sécurisé</span>
                                <h2 className="text-3xl font-black tracking-tighter">Transmission en un clic vers 600+ caisses & mutuelles.</h2>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">Conformité SESAM-Vitale 1.40 gadd-on. Vos flux sont sécurisés, chiffrés et envoyés vers la plateforme de concentrateur en temps réel.</p>
                                <Button className="bg-accent text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl shadow-accent/20">Lancer Télétransmission (24 FSE)</Button>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {viewMode === 'PAYMENTS' && (
                    <motion.div
                        key="payments"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {paymentPlans.map((plan, i) => (
                                <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-black text-slate-900 tracking-tight">{plan.patient}</h4>
                                        <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                            <History className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                            <span>Règlement : {plan.paid} / {plan.total} FCFA</span>
                                            <span>{plan.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-900" style={{ width: `${plan.progress}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase">Prochaine Échéance</p>
                                            <p className="text-sm font-black text-slate-900">{plan.next} (Automatique)</p>
                                        </div>
                                        <Button variant="outline" className="rounded-xl border-slate-200 text-[10px] font-black uppercase">Gérer</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="h-24 w-24 rounded-3xl bg-white/10 flex items-center justify-center shrink-0">
                                <PaymentIcon className="h-12 w-12 text-white" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-black tracking-tighter">Automatisation des Prélèvements.</h3>
                                <p className="text-indigo-100 text-sm font-medium leading-relaxed">Activez le prélèvement automatique pour vos plans de traitement complexes. Réduisez vos impayés de 40% et libérez votre accueil du suivi financier manuel.</p>
                                <div className="flex gap-4 pt-2">
                                    <Button className="bg-white text-indigo-700 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 shadow-xl">Nouvel Échéancier</Button>
                                    <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 hover:bg-white/10">Voir Rapports</Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

