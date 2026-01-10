"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Plus,
    Package,
    AlertTriangle,
    ArrowRight,
    History,
    Search,
    Filter,
    ShieldCheck,
    Zap,
    Box,
    TrendingDown,
    RefreshCw,
    ScanLine,
    Activity
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function InventoryPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState<any[]>([])

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch('/api/inventory') // Assuming this exists or will be handled
                const data = await res.json()
                setItems(data.items || [])
            } catch (p) {
                // Fallback to demo items
                setItems([
                    { id: '1', name: 'Gants Examen Nitrile (M)', category: 'Consommables', quantity: 12, minQuantity: 20, unit: 'Boîtes', lastRefill: '12 Jan', status: 'CRITICAL' },
                    { id: '2', name: 'Septanest 4% Adrénaline', category: 'Anesthésie', quantity: 45, minQuantity: 10, unit: 'Cartouches', lastRefill: '05 Jan', status: 'OK' },
                    { id: '3', name: 'Composite E-Max A2 Syringe', category: 'Soins', quantity: 3, minQuantity: 5, unit: 'Seringues', lastRefill: '02 Jan', status: 'LOW' },
                    { id: '4', name: 'Implants Nobel Biocare 4.3', category: 'Implantologie', quantity: 8, minQuantity: 5, unit: 'Unités', lastRefill: '10 Jan', status: 'OK' },
                ])
            } finally {
                setIsLoading(false)
            }
        }
        fetchItems()
    }, [])

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Logistique & Chaîne de Valeur</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-indigo-600">Inventory Hub</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Suivi temps-réel, IoT Ready et alertes intelligentes de rupture.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:shadow-md transition-all">
                        <History className="mr-2 h-4 w-4" /> Historique Flux
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Ajouter Facture
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Ruptures Critiques', value: '02', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Valeur du Stock', value: '4.2M', icon: Box, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Articles Scannés', value: '148', icon: ScanLine, color: 'text-teal-600', bg: 'bg-teal-50' },
                    { label: 'Rotation Moyenne', value: '22j', icon: Zap, color: 'text-gold', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white group hover:translate-y-[-4px] transition-all">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/20">
                            <div className="relative w-96 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input placeholder="Rechercher une référence..." className="w-full h-11 bg-white border-none rounded-xl pl-11 text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm" />
                            </div>
                            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-slate-400"><Filter className="mr-2 h-4 w-4" /> Filtres Avancés</Button>
                        </CardHeader>
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-b border-slate-50">
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14 pl-8">Référence</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Catégorie</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Stock</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Statut</TableHead>
                                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14 pr-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item: any) => (
                                    <TableRow key={item.id} className="hover:bg-slate-50/50 group transition-colors border-b border-slate-50 last:border-0">
                                        <TableCell className="py-6 pl-8">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.name}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mis à jour {item.lastRefill}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{item.category}</span>
                                        </TableCell>
                                        <TableCell className="font-black text-slate-900">
                                            {item.quantity} <span className="text-[10px] text-slate-400 font-bold uppercase">{item.unit}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={cn(
                                                "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                                                item.status === 'CRITICAL' ? "bg-red-50 text-red-600 border-red-100" :
                                                    item.status === 'LOW' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                        "bg-teal-50 text-teal-600 border-teal-100"
                                            )}>
                                                {item.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2rem] border-none shadow-luxury bg-slate-950 text-white p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Activity className="h-40 w-40" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-8 flex items-center justify-between">
                            Analyse de Consommation
                            <TrendingDown className="h-4 w-4" />
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Prédiction IA Rupture</p>
                                <p className="text-sm font-bold text-white leading-relaxed">Le stock de <span className="text-indigo-400">Gants Nitrile (M)</span> sera épuisé dans <span className="text-red-400">4 jours</span> basé sur votre agenda.</p>
                                <Button className="w-full bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-11 rounded-xl mt-4 border-none shadow-lg">Commander Auto</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Coût ce mois</p>
                                    <p className="text-xl font-black">2.1M <span className="text-[10px] text-slate-500">FCFA</span></p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Variation</p>
                                    <p className="text-xl font-black text-teal-400">-12%</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[2rem] border-none shadow-luxury bg-white p-8 border border-slate-100">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
                            Traçabilité Sterile Scan
                            <ShieldCheck className="h-4 w-4 text-teal-500" />
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Autoclave A-01', status: 'VALIDÉ', time: 'Il y a 2h' },
                                { name: 'Bac Décontamination', status: 'ACTIVE', time: 'En cours' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-slate-100 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                            <RefreshCw className={cn("h-4 w-4", s.status === 'ACTIVE' ? "animate-spin text-indigo-500" : "text-teal-500")} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{s.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">{s.time}</p>
                                        </div>
                                    </div>
                                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full", s.status === 'VALIDÉ' ? "bg-teal-50 text-teal-600" : "bg-indigo-50 text-indigo-600")}>{s.status}</span>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 mt-6 h-10 hover:text-slate-900 transition-colors">Consulter le registre →</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

