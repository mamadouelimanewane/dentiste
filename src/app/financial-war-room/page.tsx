"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
    Activity,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    CreditCard,
    PieChart,
    BarChart3,
    Calendar,
    Download,
    RefreshCw,
    ShieldCheck,
    Landmark,
    Smartphone,
    Zap,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    Send,
    Copy,
    QrCode,
    AlertTriangle,
    Wifi
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────
type PaymentProvider = 'WAVE' | 'ORANGE_MONEY' | 'CARD'
type PaymentStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'

type PaymentResult = {
    success: boolean
    mode: 'LIVE' | 'SANDBOX' | 'ERROR'
    provider: PaymentProvider
    transactionId: string
    amount: number
    currency: string
    paymentUrl?: string
    waveDeepLink?: string
    status: string
    message: string
    ussdCode?: string
    otpInstruction?: string
    expiresAt?: string
}

type Transaction = {
    id: string
    desc: string
    cat: string
    amount: string
    date: string
    type: 'in' | 'out'
    provider?: PaymentProvider
    status?: 'SUCCESS' | 'PENDING' | 'FAILED'
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FinancialWarRoom() {
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PAIEMENT' | 'FLUX'>('OVERVIEW')
    const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('WAVE')
    const [paymentAmount, setPaymentAmount] = useState('')
    const [patientName, setPatientName] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [invoiceRef, setInvoiceRef] = useState('')
    const [payStatus, setPayStatus] = useState<PaymentStatus>('IDLE')
    const [payResult, setPayResult] = useState<PaymentResult | null>(null)
    const [timeFilter, setTimeFilter] = useState('YTD')
    const [refreshing, setRefreshing] = useState(false)

    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 'TX001', desc: "Wave — Patient M. Diallo", cat: "Encaissement Mobile", amount: "+ 350,000", date: "À l'instant", type: "in", provider: "WAVE", status: "SUCCESS" },
        { id: 'TX002', desc: "Orange Money — Mme Sow", cat: "Encaissement OM", amount: "+ 125,000", date: "Il y a 2h", type: "in", provider: "ORANGE_MONEY", status: "SUCCESS" },
        { id: 'TX003', desc: "Virement — Labo ProDakar", cat: "Fournisseur", amount: "- 450,000", date: "Hier 14:30", type: "out", status: "SUCCESS" },
        { id: 'TX004', desc: "Wave — Patient A. Faye", cat: "Encaissement Mobile", amount: "+ 80,000", date: "Hier", type: "in", provider: "WAVE", status: "PENDING" },
        { id: 'TX005', desc: "Charge Senelec", cat: "Charges fixes", amount: "- 85,000", date: "08 Mar", type: "out", status: "SUCCESS" },
    ])

    const metrics = [
        { label: "CA Mensuel", value: "14,5M FCFA", change: "+12%", trend: "up", icon: Activity },
        { label: "Marge Nette", value: "42%", change: "+5%", trend: "up", icon: PieChart },
        { label: "Cashflow Dispo", value: "8,2M FCFA", change: "-2%", trend: "down", icon: Wallet },
        { label: "Impayés", value: "450k FCFA", change: "-15%", trend: "up", icon: ShieldCheck },
    ]

    // Check URL for payment result after redirect
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const paymentStatus = params.get('payment')
        const ref = params.get('ref')
        if (paymentStatus === 'success') {
            toast.success(`Paiement ${ref} confirmé avec succès !`)
        } else if (paymentStatus === 'error') {
            toast.error(`Échec du paiement ${ref}. Réessayez.`)
        }
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true)
        await new Promise(r => setTimeout(r, 1200))
        setRefreshing(false)
        toast.success("Données synchronisées en temps réel.")
    }

    const initiatePayment = async () => {
        const amount = parseInt(paymentAmount.replace(/\D/g, ''))
        if (!amount || amount < 100) return toast.error("Montant minimum : 100 FCFA")
        if (!patientName) return toast.error("Nom du patient requis")
        if (paymentProvider === 'ORANGE_MONEY' && !patientPhone) return toast.error("Numéro de téléphone Orange requis pour Orange Money")

        setPayStatus('LOADING')
        setPayResult(null)

        try {
            const res = await fetch('/api/payment/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    patientName,
                    patientPhone: patientPhone ? `221${patientPhone.replace(/^0+/, '')}` : undefined,
                    description: `Règlement DentoPrestige — ${patientName}`,
                    paymentMethod: paymentProvider,
                    invoiceId: invoiceRef || `INV-${Date.now()}`
                })
            })

            const data: PaymentResult = await res.json()

            if (!res.ok || !data.success) throw new Error(data.message || "Erreur paiement")

            setPayResult(data)
            setPayStatus('SUCCESS')

            // Add to live feed
            const newTx: Transaction = {
                id: data.transactionId,
                desc: `${data.provider === 'WAVE' ? 'Wave' : 'Orange Money'} — ${patientName}`,
                cat: "Encaissement Mobile",
                amount: `+ ${amount.toLocaleString('fr-FR')}`,
                date: "À l'instant",
                type: "in",
                provider: data.provider,
                status: "PENDING"
            }
            setTransactions(prev => [newTx, ...prev])

            if (data.mode === 'LIVE') {
                toast.success(`Session ${data.provider} créée ! Partagez le lien au patient.`)
            } else {
                toast.info(`Mode SANDBOX — Configurez les clés API pour les vrais paiements.`)
            }

        } catch (err: any) {
            setPayStatus('ERROR')
            toast.error(err.message || "Erreur lors de l'initiation du paiement.")
        }
    }

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => toast.success(`${label} copié !`))
    }

    const resetPayment = () => {
        setPayStatus('IDLE')
        setPayResult(null)
        setPaymentAmount('')
        setPatientName('')
        setPatientPhone('')
        setInvoiceRef('')
    }

    return (
        <div className="p-4 md:p-8 space-y-6 md:space-y-10 max-w-7xl mx-auto pb-40">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 italic">Executive Financial Command</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">Financial <span className="text-emerald-gradient">War Room</span></h1>
                    <p className="text-sm text-slate-500 font-medium tracking-tight">Pilotage financier temps réel · Wave & Orange Money Sénégal</p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {/* Tab navigation */}
                    <div className="flex gap-1 p-1 bg-white border border-slate-100 rounded-2xl">
                        {(['OVERVIEW', 'PAIEMENT', 'FLUX'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    activeTab === tab ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "text-slate-400 hover:text-emerald-600"
                                )}
                            >
                                {tab === 'OVERVIEW' ? 'Tableau de Bord' : tab === 'PAIEMENT' ? '💳 Encaisser' : 'Flux Live'}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" onClick={handleRefresh} disabled={refreshing} className="rounded-2xl border-slate-200 h-12 px-5 text-[10px] font-black uppercase text-slate-500 bg-white">
                        <RefreshCw className={cn("mr-2 h-4 w-4", refreshing && "animate-spin")} />
                        {refreshing ? "Sync..." : "Live Sync"}
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-12 px-5 text-[10px] font-black uppercase text-slate-500 bg-white">
                        <Download className="mr-2 h-4 w-4" /> Bilan
                    </Button>
                </div>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((m, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white hover:translate-y-[-4px] transition-all">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                                    <m.icon className="h-5 w-5" />
                                </div>
                                <div className={cn("px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1",
                                    m.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    {m.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {m.change}
                                </div>
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{m.label}</p>
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter">{m.value}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AnimatePresence mode="wait">

                {/* ─── OVERVIEW ─────────────────────────────────────────────────────── */}
                {activeTab === 'OVERVIEW' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-8 space-y-8">
                            <Card className="rounded-[3rem] border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                                <div className="relative z-10 p-10 space-y-8">
                                    <div className="flex justify-between items-center flex-wrap gap-4">
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tighter uppercase italic">Projection <span className="text-emerald-gradient">Croissance 2026</span></h3>
                                            <p className="text-slate-400 text-sm font-medium">Analyse prédictive basée sur l'historique Q4 2025.</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {['1M', '3M', 'YTD', 'ALL'].map(t => (
                                                <button key={t} onClick={() => setTimeFilter(t)} className={cn(
                                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                    timeFilter === t ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 text-slate-400 hover:bg-white/10"
                                                )}>{t}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-64 flex items-end justify-between gap-3 pt-10 px-4">
                                        {[40, 65, 45, 80, 55, 90, 70, 100, 85].map((h, i) => (
                                            <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    transition={{ duration: 1, delay: i * 0.1 }}
                                                    className={cn(
                                                        "w-full rounded-t-2xl relative group-hover:scale-110 transition-transform duration-300",
                                                        i === 7 ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]" : "bg-white/10 group-hover:bg-white/20"
                                                    )}
                                                    style={{ height: `${h}%` }}
                                                />
                                                <span className="text-[9px] font-bold text-slate-500 uppercase">
                                                    {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep'][i]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            {/* Live Transaction Feed preview */}
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Flux de Trésorerie Live</h3>
                                    </div>
                                    <Button variant="ghost" className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-500" onClick={() => setActiveTab('FLUX')}>Voir tout →</Button>
                                </CardHeader>
                                <div className="divide-y divide-slate-50">
                                    {transactions.slice(0, 4).map((t) => (
                                        <div key={t.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", t.type === 'in' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400")}>
                                                    {t.provider === 'WAVE' ? <Zap className="h-5 w-5" /> :
                                                     t.provider === 'ORANGE_MONEY' ? <Smartphone className="h-5 w-5" /> :
                                                     t.type === 'in' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">{t.desc}</p>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{t.cat} · {t.date}</p>
                                                        {t.status === 'PENDING' && <span className="text-[8px] font-black bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full uppercase">En attente</span>}
                                                        {t.status === 'SUCCESS' && <span className="text-[8px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase">OK</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className={cn("text-sm font-black", t.type === 'in' ? "text-emerald-600" : "text-slate-700")}>{t.amount} FCFA</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-emerald-600 text-white p-10 space-y-8 relative overflow-hidden group">
                                <div className="absolute -right-10 -bottom-10 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700"><Target className="h-64 w-64" /></div>
                                <div className="relative z-10 space-y-6">
                                    <h3 className="text-lg font-black tracking-tighter uppercase italic opacity-80">Objectif Mensuel</h3>
                                    <p className="text-5xl font-black tracking-tighter">82%</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">12.4M / 15M FCFA</p>
                                    <Progress value={82} className="h-3 bg-white/20" />
                                    <p className="text-[11px] font-medium leading-relaxed opacity-80 italic">
                                        "Excellent Docteur. +12% vs Jan 2025. Poursuivez les cas d'implantologie pour maximiser la marge."
                                    </p>
                                </div>
                            </Card>

                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Répartition Charges</h3>
                                    <PieChart className="h-5 w-5 text-indigo-500" />
                                </div>
                                {[
                                    { label: "Achats Cliniques", val: 45, color: "bg-indigo-500" },
                                    { label: "Salaires & RH", val: 30, color: "bg-purple-500" },
                                    { label: "Loyer & Charges", val: 15, color: "bg-slate-300" },
                                    { label: "Marketing", val: 10, color: "bg-emerald-400" },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                                            <span>{item.label}</span><span>{item.val}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.val}%` }} transition={{ delay: 0.5 + i * 0.1 }} className={cn("h-full rounded-full", item.color)} />
                                        </div>
                                    </div>
                                ))}
                            </Card>

                            {/* Quick pay button */}
                            <button
                                onClick={() => setActiveTab('PAIEMENT')}
                                className="w-full p-8 bg-slate-900 rounded-[3rem] flex flex-col items-center text-center space-y-3 hover:bg-slate-800 transition-colors group"
                            >
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 bg-yellow-400 rounded-2xl flex items-center justify-center">
                                        <Zap className="h-5 w-5 text-slate-900" />
                                    </div>
                                    <div className="h-10 w-10 bg-orange-500 rounded-2xl flex items-center justify-center">
                                        <Smartphone className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wave & Orange Money</p>
                                <p className="text-lg font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">Encaisser & Sécuriser →</p>
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ─── PAIEMENT ─────────────────────────────────────────────────────── */}
                {activeTab === 'PAIEMENT' && (
                    <motion.div key="paiement" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-7 space-y-6">

                            {/* Provider Selector */}
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-6">
                                <div>
                                    <h3 className="text-lg font-black tracking-tighter uppercase">Mode d'Encaissement</h3>
                                    <p className="text-xs text-slate-400 font-bold mt-1">Choisissez le moyen de paiement mobile du patient.</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Wave */}
                                    <button
                                        onClick={() => setPaymentProvider('WAVE')}
                                        className={cn(
                                            "flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 transition-all",
                                            paymentProvider === 'WAVE' ? "border-yellow-400 bg-yellow-50 shadow-lg" : "border-slate-100 hover:border-slate-200 bg-white"
                                        )}
                                    >
                                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-black", paymentProvider === 'WAVE' ? "bg-yellow-400" : "bg-slate-50")}>
                                            Ξ
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-black uppercase tracking-widest">Wave</p>
                                            <p className="text-[9px] text-slate-400 font-bold mt-0.5">0.9% frais</p>
                                        </div>
                                        {paymentProvider === 'WAVE' && <CheckCircle2 className="h-4 w-4 text-yellow-500" />}
                                    </button>

                                    {/* Orange Money */}
                                    <button
                                        onClick={() => setPaymentProvider('ORANGE_MONEY')}
                                        className={cn(
                                            "flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 transition-all",
                                            paymentProvider === 'ORANGE_MONEY' ? "border-orange-400 bg-orange-50 shadow-lg" : "border-slate-100 hover:border-slate-200 bg-white"
                                        )}
                                    >
                                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center font-black text-2xl", paymentProvider === 'ORANGE_MONEY' ? "bg-orange-500 text-white" : "bg-slate-50")}>
                                            OM
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-black uppercase tracking-widest">Orange Money</p>
                                            <p className="text-[9px] text-slate-400 font-bold mt-0.5">1.8% frais</p>
                                        </div>
                                        {paymentProvider === 'ORANGE_MONEY' && <CheckCircle2 className="h-4 w-4 text-orange-500" />}
                                    </button>

                                    {/* Carte */}
                                    <button
                                        onClick={() => setPaymentProvider('CARD')}
                                        className={cn(
                                            "flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 transition-all",
                                            paymentProvider === 'CARD' ? "border-indigo-400 bg-indigo-50 shadow-lg" : "border-slate-100 hover:border-slate-200 bg-white"
                                        )}
                                    >
                                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center", paymentProvider === 'CARD' ? "bg-indigo-500" : "bg-slate-50")}>
                                            <CreditCard className={cn("h-6 w-6", paymentProvider === 'CARD' ? "text-white" : "text-slate-400")} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-black uppercase tracking-widest">Carte CB</p>
                                            <p className="text-[9px] text-slate-400 font-bold mt-0.5">2.9% frais</p>
                                        </div>
                                        {paymentProvider === 'CARD' && <CheckCircle2 className="h-4 w-4 text-indigo-500" />}
                                    </button>
                                </div>
                            </Card>

                            {/* Payment Form */}
                            <AnimatePresence mode="wait">
                                {payStatus === 'IDLE' || payStatus === 'ERROR' ? (
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-6">
                                            <h3 className="text-base font-black tracking-tighter uppercase">Détails de la Transaction</h3>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Montant (FCFA) *</label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Ex: 125000"
                                                        value={paymentAmount}
                                                        onChange={e => setPaymentAmount(e.target.value)}
                                                        className="h-14 rounded-2xl border-slate-200 text-lg font-black focus-visible:ring-emerald-500"
                                                        min="100"
                                                    />
                                                    {paymentAmount && (
                                                        <p className="text-xs text-slate-400 font-bold pl-2">
                                                            = {parseInt(paymentAmount || '0').toLocaleString('fr-FR')} FCFA
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nom du Patient *</label>
                                                    <Input
                                                        placeholder="Ex: Mamadou Diallo"
                                                        value={patientName}
                                                        onChange={e => setPatientName(e.target.value)}
                                                        className="h-14 rounded-2xl border-slate-200 focus-visible:ring-emerald-500 font-bold"
                                                    />
                                                </div>

                                                {paymentProvider === 'ORANGE_MONEY' && (
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">N° Orange du Patient *</label>
                                                        <div className="flex gap-3">
                                                            <div className="h-14 px-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center text-sm font-black text-slate-500">+221</div>
                                                            <Input
                                                                placeholder="77 XXX XX XX"
                                                                value={patientPhone}
                                                                onChange={e => setPatientPhone(e.target.value.replace(/\D/g, ''))}
                                                                className="h-14 rounded-2xl border-slate-200 flex-1"
                                                                maxLength={9}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Référence Facture (optionnel)</label>
                                                    <Input
                                                        placeholder="Ex: INV-2026-042"
                                                        value={invoiceRef}
                                                        onChange={e => setInvoiceRef(e.target.value)}
                                                        className="h-14 rounded-2xl border-slate-200 focus-visible:ring-emerald-500"
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                onClick={initiatePayment}
                                                className={cn(
                                                    "w-full h-16 rounded-[2rem] font-black uppercase text-[12px] tracking-widest shadow-2xl transition-all",
                                                    paymentProvider === 'WAVE' ? "bg-yellow-400 text-slate-900 hover:bg-yellow-300 shadow-yellow-400/30" :
                                                    paymentProvider === 'ORANGE_MONEY' ? "bg-orange-500 text-white hover:bg-orange-400 shadow-orange-500/30" :
                                                    "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30"
                                                )}
                                            >
                                                <Send className="h-5 w-5 mr-3" />
                                                {paymentProvider === 'WAVE' ? 'Créer Session Wave' :
                                                 paymentProvider === 'ORANGE_MONEY' ? 'Initier Paiement Orange Money' :
                                                 'Générer Lien Carte CB'}
                                            </Button>

                                            {payStatus === 'ERROR' && (
                                                <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                                                    <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
                                                    <p className="text-xs font-bold text-rose-700">Erreur lors de la connexion. Vérifiez vos clés API dans les variables d'environnement.</p>
                                                </div>
                                            )}
                                        </Card>
                                    </motion.div>
                                ) : payStatus === 'LOADING' ? (
                                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-16 flex flex-col items-center justify-center space-y-8">
                                            <div className="relative">
                                                <div className="h-24 w-24 rounded-full border-4 border-white/10 animate-spin border-t-emerald-400" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {paymentProvider === 'WAVE' ? <Zap className="h-8 w-8 text-yellow-400" /> : <Smartphone className="h-8 w-8 text-orange-400" />}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-black uppercase tracking-widest">Connexion {paymentProvider === 'WAVE' ? 'Wave' : 'Orange Money'}...</p>
                                                <p className="text-slate-400 text-sm mt-2">Création de la session de paiement sécurisée.</p>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ) : payStatus === 'SUCCESS' && payResult ? (
                                    <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                        <Card className={cn(
                                            "rounded-[3rem] border-none shadow-2xl p-10 space-y-8 text-white overflow-hidden relative",
                                            paymentProvider === 'WAVE' ? "bg-gradient-to-br from-yellow-500 to-yellow-400" :
                                            paymentProvider === 'ORANGE_MONEY' ? "bg-gradient-to-br from-orange-600 to-orange-400" :
                                            "bg-gradient-to-br from-indigo-600 to-indigo-500"
                                        )}>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <CheckCircle2 className="h-6 w-6 text-white" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Session Créée</span>
                                                        <span className={cn(
                                                            "text-[9px] font-black uppercase px-2 py-0.5 rounded-full",
                                                            payResult.mode === 'LIVE' ? "bg-white/20" : "bg-black/20"
                                                        )}>
                                                            {payResult.mode === 'LIVE' ? '● LIVE' : '◎ SANDBOX'}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-3xl font-black tracking-tighter">
                                                        {parseInt(paymentAmount).toLocaleString('fr-FR')} FCFA
                                                    </h3>
                                                    <p className="text-white/70 text-sm font-bold mt-1">{patientName}</p>
                                                </div>
                                                <Button variant="ghost" onClick={resetPayment} className="text-white/60 hover:text-white">
                                                    <XCircle className="h-5 w-5" />
                                                </Button>
                                            </div>

                                            <div className="bg-white/10 rounded-[2rem] p-6 space-y-4">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Référence Transaction</p>
                                                <div className="flex items-center gap-3">
                                                    <p className="text-sm font-mono font-black flex-1 break-all">{payResult.transactionId}</p>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white shrink-0" onClick={() => copyToClipboard(payResult.transactionId, "Référence")}>
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {payResult.paymentUrl && (
                                                <div className="space-y-3">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Lien de Paiement Patient</p>
                                                    <div className="bg-white/10 rounded-[2rem] p-4 flex items-center gap-3">
                                                        <p className="text-xs font-mono text-white/80 flex-1 break-all">{payResult.paymentUrl}</p>
                                                        <div className="flex gap-2 shrink-0">
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white" onClick={() => copyToClipboard(payResult.paymentUrl!, "Lien Wave")}>
                                                                <Copy className="h-4 w-4" />
                                                            </Button>
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white" onClick={() => window.open(payResult.paymentUrl, '_blank')}>
                                                                <ExternalLink className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    {payResult.mode === 'LIVE' && (
                                                        <Button
                                                            className="w-full h-14 rounded-2xl bg-white font-black uppercase text-[11px] tracking-widest shadow-2xl"
                                                            style={{ color: paymentProvider === 'WAVE' ? '#1a1a1a' : '#ea580c' }}
                                                            onClick={() => window.open(payResult.paymentUrl, '_blank')}
                                                        >
                                                            <ExternalLink className="h-4 w-4 mr-2" />
                                                            Ouvrir la page de paiement
                                                        </Button>
                                                    )}
                                                </div>
                                            )}

                                            {payResult.ussdCode && (
                                                <div className="bg-white/10 rounded-[2rem] p-6 space-y-3">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{payResult.otpInstruction}</p>
                                                    <div className="flex items-center gap-3">
                                                        <code className="text-lg font-black font-mono">{payResult.ussdCode}</code>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white" onClick={() => copyToClipboard(payResult.ussdCode!, "Code USSD")}>
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            <p className="text-xs text-white/60 italic">{payResult.message}</p>

                                            <Button onClick={resetPayment} variant="ghost" className="w-full text-white/70 hover:text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10">
                                                + Nouveau paiement
                                            </Button>
                                        </Card>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </div>

                        {/* Right config panel */}
                        <div className="col-span-12 lg:col-span-5 space-y-6">
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white p-10 space-y-8">
                                <div className="flex items-center gap-3">
                                    <Wifi className="h-5 w-5 text-emerald-400" />
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Statut des Passerelles</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: "Wave Sénégal", endpoint: "api.wave.com", configured: !!process.env.NEXT_PUBLIC_WAVE_CONFIGURED, color: "text-yellow-400", envKey: "WAVE_API_KEY" },
                                        { name: "Orange Money OM Pay", endpoint: "api.orange-sonatel.com", configured: false, color: "text-orange-400", envKey: "ORANGE_MONEY_CLIENT_ID" },
                                        { name: "Webhook Receiver", endpoint: "/api/payment/webhook", configured: true, color: "text-emerald-400", envKey: "" },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex items-center justify-between">
                                            <div>
                                                <p className={cn("text-xs font-black uppercase tracking-widest", s.color)}>{s.name}</p>
                                                <p className="text-[10px] font-mono text-slate-500 mt-1">{s.endpoint}</p>
                                                {s.envKey && <p className="text-[9px] font-mono text-slate-600 mt-0.5">env: {s.envKey}</p>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className={cn("h-2 w-2 rounded-full animate-pulse", i === 2 ? "bg-emerald-500" : "bg-amber-500")} />
                                                <span className="text-[9px] font-black uppercase text-slate-400">
                                                    {i === 2 ? "Actif" : "Sandbox"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-[2rem]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Config Requise</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 leading-relaxed">
                                        Pour activer les vrais paiements, ajoutez dans Vercel → Settings → Environment Variables :
                                    </p>
                                    <div className="mt-3 space-y-1">
                                        {['WAVE_API_KEY=wave_sk_prod_...', 'ORANGE_MONEY_CLIENT_ID=...', 'ORANGE_MONEY_CLIENT_SECRET=...', 'ORANGE_MONEY_PIN_CODE=...'].map(k => (
                                            <div key={k} className="flex items-center gap-2">
                                                <code className="text-[9px] font-mono text-emerald-400">{k}</code>
                                                <Button size="icon" variant="ghost" className="h-5 w-5 text-slate-600 hover:text-white" onClick={() => copyToClipboard(k.split('=')[0], "Clé")}>
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Statistiques Paiements Mobiles</h3>
                                {[
                                    { label: "Wave — Taux de succès", val: "98.2%", trend: "+0.4%", icon: Zap, color: "text-yellow-500" },
                                    { label: "Orange Money — Délai moyen", val: "3.2s", trend: "-0.8s", icon: Smartphone, color: "text-orange-500" },
                                    { label: "Total encaissé (Mois)", val: "6.8M FCFA", trend: "+18%", icon: TrendingUp, color: "text-emerald-500" },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <s.icon className={cn("h-5 w-5", s.color)} />
                                            <span className="text-[10px] font-black uppercase text-slate-500">{s.label}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-slate-900">{s.val}</p>
                                            <p className="text-[9px] font-bold text-emerald-600">{s.trend}</p>
                                        </div>
                                    </div>
                                ))}
                            </Card>
                        </div>
                    </motion.div>
                )}

                {/* ─── FLUX LIVE ────────────────────────────────────────────────────── */}
                {activeTab === 'FLUX' && (
                    <motion.div key="flux" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                            <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Toutes les Transactions</h3>
                                    <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">{transactions.length} opérations</span>
                                </div>
                                <Button variant="outline" className="rounded-2xl text-[10px] font-black uppercase text-slate-400 border-slate-200">
                                    <Download className="mr-2 h-4 w-4" /> Exporter CSV
                                </Button>
                            </CardHeader>
                            <div className="divide-y divide-slate-50">
                                {transactions.map((t) => (
                                    <motion.div
                                        key={t.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm",
                                                t.provider === 'WAVE' ? "bg-yellow-100 text-yellow-600" :
                                                t.provider === 'ORANGE_MONEY' ? "bg-orange-100 text-orange-600" :
                                                t.type === 'in' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                                            )}>
                                                {t.provider === 'WAVE' ? <Zap className="h-5 w-5" /> :
                                                 t.provider === 'ORANGE_MONEY' ? <Smartphone className="h-5 w-5" /> :
                                                 t.type === 'in' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{t.desc}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{t.cat} · {t.date}</p>
                                                    <span className="text-[9px] font-mono text-slate-300">#{t.id}</span>
                                                    {t.status === 'PENDING' && (
                                                        <span className="text-[8px] font-black bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                                                            <Clock className="h-2 w-2" /> En attente
                                                        </span>
                                                    )}
                                                    {t.status === 'SUCCESS' && (
                                                        <span className="text-[8px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                                                            <CheckCircle2 className="h-2 w-2" /> Confirmé
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn("text-base font-black", t.type === 'in' ? "text-emerald-600" : "text-slate-700")}>{t.amount} FCFA</span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" onClick={() => copyToClipboard(t.id, "Référence")}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
