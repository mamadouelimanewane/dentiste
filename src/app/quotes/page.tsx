"use client"

import { useState, useEffect } from 'react'
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
    Wallet,
    Loader2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function QuotesPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [quotes, setQuotes] = useState<any[]>([])
    const [activeQuote, setActiveQuote] = useState<any>(null)

    const fetchQuotes = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/quotes')
            const data = await res.json()
            if (Array.isArray(data)) {
                setQuotes(data)
                if (data.length > 0) setActiveQuote(data[0])
            }
        } catch (error) {
            console.error("Failed to fetch quotes:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchQuotes()
    }, [])

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
                        <Calendar className="mr-2 h-4 w-4" /> Historique ({quotes.length})
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouveau Devis
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-10 w-10 animate-spin text-gold mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Génération du flux financier...</p>
                </div>
            ) : !activeQuote ? (
                <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                    <FileText className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                    <h2 className="text-xl font-black text-slate-900">Aucun devis actif</h2>
                    <p className="text-slate-400 text-sm font-bold uppercase mt-2 tracking-widest">Commencez par créer un nouveau plan de traitement.</p>
                </div>
            ) : (
                <div className="grid grid-cols-12 gap-10">
                    {/* Devis Configurator */}
                    <div className="col-span-12 lg:col-span-8 space-y-8">
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10">
                            <div className="flex justify-between items-start mb-10 border-b pb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{activeQuote.id.substring(0, 8).toUpperCase()}</h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="h-2 w-2 rounded-full bg-teal-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Devis pour</span>
                                        <span className="text-sm font-black text-slate-900">{activeQuote.patient?.firstName} {activeQuote.patient?.lastName}</span>
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
                                <div className="rounded-[2.5rem] p-8 border-2 border-gold/20 bg-gold/[0.02] transition-all">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-black bg-gold text-white">
                                                A
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-slate-900">{activeQuote.title}</h4>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-gold">{activeQuote.status}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-slate-900">{activeQuote.total.toLocaleString()} FCFA</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Montant Total TTC</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm py-3 border-b border-slate-50 last:border-0">
                                            <span className="font-bold text-slate-700">Traitement prothétique / Chirurgical</span>
                                            <div className="flex items-center gap-10">
                                                <span className="text-slate-400">x1</span>
                                                <span className="font-black text-slate-900">{activeQuote.total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Détails de l'acte →</Button>
                                    </div>
                                </div>
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
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Reste à Charge Estimé</p>
                                    <div className="flex justify-between items-end mb-4">
                                        <span className="text-2xl font-black text-slate-900 tracking-tighter">{(activeQuote.total * 0.3).toLocaleString()}</span>
                                        <span className="text-[10px] font-bold text-slate-400">FCFA</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[9px] font-bold text-slate-500">
                                            <span>Part Mutuelle (Estimée 70%)</span>
                                            <span>{(activeQuote.total * 0.7).toLocaleString()}</span>
                                        </div>
                                        <div className="h-1.5 bg-white rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-500 rounded-full" style={{ width: '70%' }} />
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
                                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Échelonnement Suggéré</span>
                                        </div>
                                        <p className="text-sm font-bold leading-relaxed mb-4 italic">
                                            "Pour ce montant, un paiement en 3 fois maximisera le taux d'acceptation."
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
            )}
        </div>
    )
}
