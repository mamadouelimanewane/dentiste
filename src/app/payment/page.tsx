"use client"

import { useState } from 'react'
import { CreditCard, Smartphone, CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign, ArrowRight, QrCode, Banknote, RefreshCw, Download, Filter } from 'lucide-react'

const PAYMENT_METHODS = [
    { id: 'wave', name: 'Wave', logo: '🌊', color: 'from-blue-500 to-blue-600', fee: '0.5%', delay: 'Instantané', popular: true },
    { id: 'orange', name: 'Orange Money', logo: '🟠', color: 'from-orange-500 to-orange-600', fee: '1%', delay: 'Instantané', popular: true },
    { id: 'free', name: 'Free Money', logo: '💚', color: 'from-green-500 to-green-600', fee: '0.8%', delay: 'Instantané', popular: false },
    { id: 'card', name: 'Carte Bancaire', logo: '💳', color: 'from-slate-700 to-slate-900', fee: '2.5%', delay: '2-3 jours', popular: false },
    { id: 'cash', name: 'Espèces', logo: '💵', color: 'from-teal-500 to-teal-600', fee: '0%', delay: 'Immédiat', popular: false },
]

const UNPAID_INVOICES = [
    { id: 'F-2026-089', patient: 'Amadou Diallo', amount: 85000, dueDate: '2026-02-10', daysOverdue: 8, type: 'Détartrage + Consultation', status: 'overdue' },
    { id: 'F-2026-091', patient: 'Fatou Mbaye', amount: 150000, dueDate: '2026-02-15', daysOverdue: 3, type: 'Couronne Céramique', status: 'overdue' },
    { id: 'F-2026-094', patient: 'Ibrahima Sow', amount: 45000, dueDate: '2026-02-20', daysOverdue: 0, type: 'Consultation', status: 'pending' },
    { id: 'F-2026-097', patient: 'Mariama Diop', amount: 320000, dueDate: '2026-02-25', daysOverdue: 0, type: 'Implant Dentaire', status: 'pending' },
    { id: 'F-2026-099', patient: 'Ousmane Ndiaye', amount: 75000, dueDate: '2026-03-01', daysOverdue: 0, type: 'Blanchiment', status: 'pending' },
]

const RECENT_PAYMENTS = [
    { id: 'P-001', patient: 'Aissatou Ba', amount: 95000, method: 'Wave', date: '18 Fév 2026', status: 'success' },
    { id: 'P-002', patient: 'Cheikh Diop', amount: 200000, method: 'Orange Money', date: '17 Fév 2026', status: 'success' },
    { id: 'P-003', patient: 'Rokhaya Fall', amount: 45000, method: 'Espèces', date: '17 Fév 2026', status: 'success' },
    { id: 'P-004', patient: 'Modou Gueye', amount: 180000, method: 'Carte', date: '16 Fév 2026', status: 'failed' },
]

export default function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState('wave')
    const [amount, setAmount] = useState('')
    const [phone, setPhone] = useState('')
    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState(false)
    const [activeTab, setActiveTab] = useState<'pay' | 'unpaid' | 'history'>('pay')

    const handlePayment = async () => {
        if (!amount || !phone) return
        setProcessing(true)
        await new Promise(r => setTimeout(r, 2000))
        setProcessing(false)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        setAmount('')
        setPhone('')
    }

    const totalUnpaid = UNPAID_INVOICES.reduce((sum, inv) => sum + inv.amount, 0)
    const overdueAmount = UNPAID_INVOICES.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-1 w-8 bg-slate-900 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Encaissement & Recouvrement</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Paiement <span className="text-teal-600">en Ligne</span></h1>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Encaissé ce mois', value: '3 850 000 FCFA', icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50' },
                    { label: 'Impayés total', value: `${(totalUnpaid / 1000).toFixed(0)}K FCFA`, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'En retard', value: `${(overdueAmount / 1000).toFixed(0)}K FCFA`, icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
                    { label: 'Taux recouvrement', value: '87.3%', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
                ].map(stat => (
                    <div key={stat.label} className={`${stat.bg} rounded-[2rem] p-5 flex items-center gap-4`}>
                        <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className={`text-lg font-black ${stat.color}`}>{stat.value}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl w-fit">
                {[
                    { id: 'pay', label: 'Encaisser' },
                    { id: 'unpaid', label: `Impayés (${UNPAID_INVOICES.length})` },
                    { id: 'history', label: 'Historique' },
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                        className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'pay' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Payment Form */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
                        <h2 className="font-black text-slate-900 text-lg uppercase tracking-tight">Nouveau Paiement</h2>

                        {/* Method Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mode de Paiement</label>
                            <div className="grid grid-cols-2 gap-3">
                                {PAYMENT_METHODS.map(method => (
                                    <button key={method.id} onClick={() => setSelectedMethod(method.id)}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedMethod === method.id ? 'border-accent bg-accent/5' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-2xl">{method.logo}</span>
                                            {method.popular && <span className="text-[9px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full">Populaire</span>}
                                        </div>
                                        <p className="font-black text-slate-900 text-sm">{method.name}</p>
                                        <p className="text-[10px] text-slate-400">Frais: {method.fee} • {method.delay}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Montant (FCFA)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full h-14 bg-slate-50 rounded-2xl text-2xl font-black text-slate-900 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/20 border border-transparent focus:border-accent/30"
                                />
                            </div>
                            <div className="flex gap-2">
                                {[25000, 50000, 100000, 150000].map(preset => (
                                    <button key={preset} onClick={() => setAmount(String(preset))}
                                        className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black text-slate-600 transition-all">
                                        {(preset / 1000).toFixed(0)}K
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Phone (for mobile money) */}
                        {['wave', 'orange', 'free'].includes(selectedMethod) && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Numéro de Téléphone</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="+221 7X XXX XX XX"
                                        className="w-full h-12 bg-slate-50 rounded-xl text-sm font-bold text-slate-900 pl-11 pr-4 focus:outline-none border border-transparent focus:border-accent/30"
                                    />
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                                <p className="text-sm font-bold text-teal-700">Paiement traité avec succès !</p>
                            </div>
                        )}

                        <button onClick={handlePayment} disabled={processing || !amount}
                            className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                            {processing ? (
                                <><RefreshCw className="h-5 w-5 animate-spin" /> Traitement en cours...</>
                            ) : (
                                <><CheckCircle className="h-5 w-5" /> Encaisser {amount ? `${parseInt(amount).toLocaleString()} FCFA` : ''}</>
                            )}
                        </button>
                    </div>

                    {/* QR Payment */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 text-white">
                            <h3 className="font-black text-lg uppercase tracking-tight mb-2">Paiement par QR Code</h3>
                            <p className="text-slate-400 text-sm mb-6">Le patient scanne le QR code avec son application mobile pour payer instantanément.</p>
                            <div className="bg-white rounded-2xl p-6 flex items-center justify-center mx-auto w-48 h-48">
                                <div className="grid grid-cols-7 gap-0.5">
                                    {Array.from({ length: 49 }).map((_, i) => (
                                        <div key={i} className={`h-4 w-4 rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-white'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                                    <Download className="h-4 w-4 mx-auto" />
                                </button>
                                <button className="flex-1 py-3 bg-accent hover:bg-accent/90 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                                    Partager le lien
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-slate-100 p-6">
                            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-4">Paiements récents</h3>
                            <div className="space-y-3">
                                {RECENT_PAYMENTS.slice(0, 3).map(p => (
                                    <div key={p.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{p.patient}</p>
                                            <p className="text-xs text-slate-400">{p.method} • {p.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-slate-900 text-sm">{p.amount.toLocaleString()} FCFA</p>
                                            <span className={`text-[9px] font-black ${p.status === 'success' ? 'text-teal-600' : 'text-red-500'}`}>
                                                {p.status === 'success' ? '✓ Réussi' : '✗ Échoué'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'unpaid' && (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest">Factures Impayées</h2>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-200 transition-all">
                                <Filter className="h-3.5 w-3.5" /> Filtrer
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all">
                                Relance Groupée
                            </button>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {UNPAID_INVOICES.map(inv => (
                            <div key={inv.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-all">
                                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${inv.status === 'overdue' ? 'bg-red-100' : 'bg-orange-100'}`}>
                                    {inv.status === 'overdue' ? <AlertCircle className="h-5 w-5 text-red-600" /> : <Clock className="h-5 w-5 text-orange-600" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-black text-slate-900 text-sm">{inv.patient}</p>
                                        <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{inv.id}</span>
                                        {inv.status === 'overdue' && (
                                            <span className="text-[9px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-full">+{inv.daysOverdue}j de retard</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400">{inv.type} • Échéance: {inv.dueDate}</p>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <p className="font-black text-slate-900">{inv.amount.toLocaleString()} FCFA</p>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black text-slate-600 transition-all">Relancer</button>
                                        <button className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black transition-all">Encaisser</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest">Historique des Paiements</h2>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-200 transition-all">
                            <Download className="h-3.5 w-3.5" /> Exporter CSV
                        </button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {RECENT_PAYMENTS.map(p => (
                            <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-all">
                                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${p.status === 'success' ? 'bg-teal-100' : 'bg-red-100'}`}>
                                    {p.status === 'success' ? <CheckCircle className="h-5 w-5 text-teal-600" /> : <AlertCircle className="h-5 w-5 text-red-600" />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-slate-900 text-sm">{p.patient}</p>
                                    <p className="text-xs text-slate-400">{p.method} • {p.date} • {p.id}</p>
                                </div>
                                <p className={`font-black text-lg ${p.status === 'success' ? 'text-teal-600' : 'text-red-500'}`}>
                                    {p.status === 'success' ? '+' : ''}{p.amount.toLocaleString()} FCFA
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
