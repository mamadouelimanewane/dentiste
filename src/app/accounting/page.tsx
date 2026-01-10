"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, TrendingUp, TrendingDown, Receipt, FileText, ArrowRight, Wallet, PieChart, Activity, Clock, ShieldCheck, Plus, Sparkles, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export default function AccountingPage() {
    const [metrics, setMetrics] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('/api/accounting/metrics')
                const data = await res.json()
                setMetrics(data)
            } finally {
                setIsLoading(false)
            }
        }
        fetchMetrics()
    }, [])

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-accent" />
                    <p className="font-black text-[10px] uppercase tracking-[0.5em] text-slate-400">Accès au Grand Livre OHADA...</p>
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
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Finance & Pilotage</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Gestion <span className="text-gold">SYSCOA / OHADA</span></h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold"><Receipt className="mr-2 h-4 w-4" /> Grand Livre</Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-6 rounded-xl uppercase tracking-widest text-xs h-11">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Écritture
                    </Button>
                </div>
            </div>

            {/* Financial Intelligence Dash */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Trésorerie Disponible', value: (metrics?.treasury || 0).toLocaleString(), sub: '+12% ce mois', icon: Wallet, color: 'text-teal-600', trend: 'up' },
                    { label: 'Créances Patients (411)', value: '850 000', sub: 'Action requise : 12 dossiers', icon: Activity, color: 'text-orange-600', trend: 'neutral' },
                    { label: 'Résultat Net (131)', value: (metrics?.netResult || 0).toLocaleString(), sub: 'Bénéfice provisoire', icon: TrendingUp, color: 'text-indigo-600', trend: 'up' },
                    { label: 'Dettes Fournisseurs (401)', value: '320 000', sub: 'Prochaine échéance : 15 janv.', icon: TrendingDown, color: 'text-red-500', trend: 'down' },
                ].map((stat, i) => (
                    <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white group hover:scale-[1.02] transition-all">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{stat.value} <span className="text-xs text-slate-400">FCFA</span></div>
                            <div className={cn("text-[10px] font-bold flex items-center gap-1",
                                stat.trend === 'up' ? 'text-teal-600' :
                                    stat.trend === 'down' ? 'text-red-500' : 'text-slate-400'
                            )}>
                                {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : stat.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : null}
                                {stat.sub}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Profitability Analysis (AI Powered) */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <PieChart className="h-32 w-32" />
                        </div>
                        <CardHeader className="p-8 border-b border-white/5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl font-black tracking-tighter">Analyse de Rentabilité Avancée</CardTitle>
                                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Calculateur de Performance par Cabinet</p>
                                </div>
                                <Button className="bg-white/10 hover:bg-white/20 text-white rounded-full h-8 px-4 text-[10px] font-black uppercase tracking-widest border border-white/10">
                                    <Sparkles className="h-3 w-3 mr-2 text-accent" /> IA Insights
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rentabilité par Matière</h4>
                                    {[
                                        { label: 'Prothèse & Implantologie', value: 68, color: 'bg-accent' },
                                        { label: 'Soins Conservateurs', value: 42, color: 'bg-indigo-500' },
                                        { label: 'Orthodontie', value: 55, color: 'bg-teal-500' },
                                    ].map(item => (
                                        <div key={item.label} className="space-y-1.5">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                                                <span>{item.label}</span>
                                                <span className="text-white">{item.value}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Optimisation Suggérée (IA)</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                        « Les soins de type <span className="text-white">Prothèse</span> dégagent une marge de 22% supérieure à la moyenne.
                                        Augmenter la disponibilité horaire pour ces actes pourrait améliorer votre Résultat Net de <span className="text-green-400">15%</span> d'ici le trimestre prochain. »
                                    </p>
                                    <Button variant="link" className="text-accent text-[9px] font-black uppercase tracking-widest h-auto p-0 hover:text-white transition-colors">
                                        Voir le rapport complet →
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white">
                        <CardHeader className="border-b bg-slate-50/5 p-8 flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-black flex items-center gap-2 tracking-tighter">
                                <FileText className="h-5 w-5 text-slate-400" /> Flux de Trésorerie Prévisionnel
                            </CardTitle>
                            <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[9px] font-black uppercase border border-teal-100 italic tracking-widest">
                                Trésorerie positive
                            </span>
                        </CardHeader>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-2">
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Journal</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Code</TableHead>
                                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14">Débit (FCFA)</TableHead>
                                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14">Crédit (FCFA)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(metrics?.journals || []).map((j: any) => (
                                    <TableRow key={j.code} className="hover:bg-slate-50 group transition-colors">
                                        <TableCell className="font-bold py-5">{j.name}</TableCell>
                                        <TableCell><span className={cn("px-2 py-0.5 rounded text-[10px] font-black", j.color)}>{j.code}</span></TableCell>
                                        <TableCell className="text-right font-bold">{j.debit}</TableCell>
                                        <TableCell className="text-right font-black group-hover:text-gold transition-colors">{j.credit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                {/* Right Column: Key Contacts & Alerts */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2rem] border-none shadow-luxury bg-white border border-slate-100">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Parties Prenantes & Labs</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {[
                                    { name: 'Labo Dentaire Expert', type: 'Prothésiste', status: '5 Encaissements', icon: ShieldCheck },
                                    { name: 'Fournisseur MedTech', type: 'Consommables', status: 'Facture en attente', icon: Wallet },
                                    { name: 'Assurance Santé +', type: 'Tiers Payant', status: 'Relance 48h', icon: Clock },
                                ].map((s, i) => (
                                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                                            <s.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 group-hover:text-accent transition-colors">{s.name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{s.type}</span>
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">• {s.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4">
                                <Button variant="ghost" className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">
                                    Voir tout l'écosystème →
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] border-none shadow-luxury bg-white border border-slate-100">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trésorerie Prévisionnelle</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-2xl font-black tracking-tighter text-slate-900">{(metrics?.treasury || 0).toLocaleString()}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Projection à J+60</p>
                                </div>
                                <div className="h-12 w-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <p className="text-[10px] font-medium text-slate-500 italic">Basé sur les journaux VT, CA et BQ synchronisés.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

