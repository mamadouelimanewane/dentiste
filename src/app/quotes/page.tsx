"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Plus,
    FileText,
    CheckCircle,
    X,
    PenTool,
    Download,
    Printer,
    Calculator,
    ShieldCheck,
    ArrowRight,
    Star,
    Sparkles,
    Trash2,
    Calendar,
    ChevronDown,
    Wallet
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function QuotesPage() {
    const [id, setId] = useState('QUO-2026-001')
    const [patient, setPatient] = useState('Jean Valjean')

    const [options, setOptions] = useState([
        {
            id: 'A',
            name: 'Option Premium (Implantologie)',
            price: '1,250,000',
            items: [
                { desc: 'Implant Nobel Biocare 4.3', qty: 1, unit: '850,000' },
                { desc: 'Couronne sur Implant Zircone', qty: 1, unit: '400,000' }
            ],
            status: 'RECOMMENDED'
        },
        {
            id: 'B',
            name: 'Option Conservatrice (Bridge)',
            price: '850,000',
            items: [
                { desc: 'Bridge 3 éléments Céramo-métal', qty: 1, unit: '750,000' },
                { desc: 'Préparation piliers', qty: 2, unit: '50,000' }
            ],
            status: 'SECONDARY'
        }
    ])

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between no-print">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-gold rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Commercial & Plans de Traitement</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Générateur de <span className="text-gold">Devis De Luxe</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Propositions multi-options, calcul de reste à charge et signature biométrique.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Calendar className="mr-2 h-4 w-4" /> Historique Devis
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouveau Devis
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Devis Configurator */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10">
                        <div className="flex justify-between items-start mb-10 border-b pb-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{id}</h3>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">En cours de rédaction pour</span>
                                    <span className="text-sm font-black text-slate-900">{patient}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900">
                                    <Printer className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900">
                                    <Download className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-12">
                            {options.map((opt, i) => (
                                <div key={opt.id} className={cn(
                                    "rounded-[2.5rem] p-8 border-2 transition-all",
                                    opt.status === 'RECOMMENDED' ? "border-gold/20 bg-gold/[0.02]" : "border-slate-100 bg-white"
                                )}>
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-black",
                                                opt.status === 'RECOMMENDED' ? "bg-gold text-white" : "bg-slate-100 text-slate-400"
                                            )}>
                                                {opt.id}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-slate-900">{opt.name}</h4>
                                                {opt.status === 'RECOMMENDED' && <span className="text-[9px] font-black uppercase tracking-widest text-gold">Suggéré par le Docteur</span>}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-slate-900">{opt.price} FCFA</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Montant Total TTC</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {opt.items.map((item, j) => (
                                            <div key={j} className="flex items-center justify-between text-sm py-3 border-b border-slate-50 last:border-0">
                                                <span className="font-bold text-slate-700">{item.desc}</span>
                                                <div className="flex items-center gap-10">
                                                    <span className="text-slate-400">x{item.qty}</span>
                                                    <span className="font-black text-slate-900">{item.unit}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Modifier l'option →</Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white flex justify-between items-center no-print">
                            <div className="flex items-center gap-6">
                                <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/10">
                                    <PenTool className="h-8 w-8 text-gold" />
                                </div>
                                <div>
                                    <p className="text-xl font-black tracking-tight">Signature Électronique</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Biométrie Tactile Sécurisée</p>
                                </div>
                            </div>
                            <Button className="bg-gold text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl shadow-gold/20 hover:bg-gold/90 transition-all">
                                Lancer Signature Client
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right Intelligence Panel */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8 space-y-8">
                        <div className="flex items-center gap-3">
                            <Calculator className="h-5 w-5 text-indigo-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Intelligence Financière</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Reste à Charge (Option A)</p>
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-2xl font-black text-slate-900 tracking-tighter">450,000</span>
                                    <span className="text-[10px] font-bold text-slate-400">FCFA</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-bold text-slate-500">
                                        <span>Part Mutuelle (Estimée)</span>
                                        <span>800,000</span>
                                    </div>
                                    <div className="h-1.5 bg-white rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full" style={{ width: '65%' }} />
                                    </div>
                                </div>
                            </div>

                            <Card className="rounded-[2rem] border-none shadow-lg bg-indigo-900 text-white p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Sparkles className="h-20 w-20" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calculator className="h-4 w-4 text-gold" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200 uppercase">Échelonnement Suggéré</span>
                                    </div>
                                    <p className="text-sm font-bold leading-relaxed mb-4 italic">
                                        "Pour l'Option A, un paiement en 4 fois de 112,500 FCFA maximisera le taux d'acceptation."
                                    </p>
                                    <Button className="w-full bg-white text-indigo-900 font-black uppercase text-[9px] tracking-widest h-10 rounded-xl">
                                        Générer Échéancier
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Consentement & Légal</h3>
                            <ShieldCheck className="h-4 w-4 text-teal-600" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: 'Note d\'Information Pré-Op', status: 'Inclus', icon: CheckCircle },
                                { name: 'Questionnaire Médical', status: 'À jour', icon: CheckCircle },
                                { name: 'Conditions d\'Annulation', status: 'Inclus', icon: CheckCircle },
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{doc.name}</span>
                                    <doc.icon className="h-4 w-4 text-teal-500" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-8 text-center space-y-4">
                        <div className="h-16 w-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10">
                            <Star className="h-8 w-8 text-gold" />
                        </div>
                        <h3 className="text-base font-black tracking-tighter text-white">Lancer l'Expérience VIP</h3>
                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed">Envoyer ce devis interactif directement sur le portail patient ou par WhatsApp.</p>
                        <Button className="w-full bg-gold text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl shadow-xl shadow-gold/20">
                            Envoyer via Portails
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
