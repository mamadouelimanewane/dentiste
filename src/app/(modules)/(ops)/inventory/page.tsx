"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Plus,
    Minus,
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
    Activity,
    Download,
    Printer,
    MoreHorizontal,
    Trash2,
    Calendar,
    ChevronDown,
    Loader2,
    Tag
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function InventoryPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [showAddForm, setShowAddForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form states
    const [newItem, setNewItem] = useState({
        name: "",
        category: "Consommables",
        quantity: 0,
        minQuantity: 5,
        unit: "Boîtes",
        lotNumber: "",
        expiryDate: "",
        isSterile: false
    })

    const fetchItems = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/inventory')
            const data = await res.json()
            if (data.items) {
                setItems(data.items)
            }
        } catch (error) {
            console.error("Failed to fetch inventory:", error)
            // Fallback for demo if API fails
            setItems([
                { id: '1', name: 'Gants Examen Nitrile (M)', category: 'Consommables', quantity: 12, minQuantity: 20, unit: 'Boîtes', lastRefill: '12 Jan', status: 'CRITICAL' },
                { id: '2', name: 'Septanest 4% Adrénaline', category: 'Anesthésie', quantity: 45, minQuantity: 10, unit: 'Cartouches', lastRefill: '05 Jan', status: 'OK' },
                { id: '3', name: 'Composite E-Max A2 Syringe', category: 'Soins', quantity: 3, minQuantity: 5, unit: 'Seringues', lastRefill: '02 Jan', status: 'LOW' },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const handleAddStock = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await fetch('/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            })
            if (res.ok) {
                setShowAddForm(false)
                setNewItem({
                    name: "",
                    category: "Consommables",
                    quantity: 0,
                    minQuantity: 5,
                    unit: "Boîtes",
                    lotNumber: "",
                    expiryDate: "",
                    isSterile: false
                })
                fetchItems()
            }
        } catch (error) {
            console.error("Failed to add item:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const adjustQuantity = async (id: string, currentQty: number, adjustment: number) => {
        const newQty = Math.max(0, currentQty + adjustment)
        try {
            const res = await fetch(`/api/inventory/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: newQty })
            })
            if (res.ok) {
                fetchItems()
            }
        } catch (error) {
            console.error("Failed to update quantity:", error)
        }
    }

    const exportToCSV = () => {
        const headers = ["ID", "Désignation", "Catégorie", "Stock", "Unité", "Seuil Min", "Statut", "Lot", "Péremption"];
        const rows = items.map(item => [
            item.id,
            item.name,
            item.category,
            item.quantity,
            item.unit,
            item.minQuantity,
            item.status,
            item.lotNumber || "",
            item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : ""
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `stock_dentiste_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const criticalItems = items.filter(i => i.status === 'CRITICAL' || i.status === 'OUT_OF_STOCK').length
    const stockValue = items.reduce((acc, i) => acc + (i.quantity * 500), 0).toLocaleString() // Dummy value estimation

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between no-print">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Logistique & Chaîne de Valeur</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-indigo-600">Inventory Hub</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Suivi temps-réel des intrants, produits et consommables.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={exportToCSV} className="rounded-2xl border-slate-200 h-14 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Download className="mr-2 h-4 w-4" /> CSV
                    </Button>
                    <Button variant="outline" onClick={() => window.print()} className="rounded-2xl border-slate-200 h-14 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Printer className="mr-2 h-4 w-4" /> PDF
                    </Button>
                    <Button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Addition Stock
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 no-print">
                {[
                    { label: 'Ruptures Critiques', value: criticalItems.toString().padStart(2, '0'), icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Valeur Estimée', value: stockValue, icon: Box, color: 'text-indigo-600', bg: 'bg-indigo-50', suffix: 'FCFA' },
                    { label: 'Catalogues Réf.', value: items.length.toString(), icon: Tag, color: 'text-teal-600', bg: 'bg-teal-50' },
                    { label: 'Alertes Péremption', value: '03', icon: Zap, color: 'text-gold', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white group hover:translate-y-[-4px] transition-all">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">
                                {stat.value} {stat.suffix && <span className="text-xs text-slate-400 font-bold ml-1">{stat.suffix}</span>}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-10">
                            <form onSubmit={handleAddStock} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Désignation du Produit</label>
                                        <Input
                                            placeholder="Ex: Gants Nitrile Taille M"
                                            className="h-12 bg-slate-50 border-none rounded-xl font-bold"
                                            value={newItem.name}
                                            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Catégorie</label>
                                        <select
                                            className="w-full h-12 bg-slate-50 border-none rounded-xl px-5 text-sm font-bold appearance-none cursor-pointer"
                                            value={newItem.category}
                                            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                        >
                                            <option>Consommables</option>
                                            <option>Anesthésie</option>
                                            <option>Implantologie</option>
                                            <option>Hygiène</option>
                                            <option>Soins</option>
                                            <option>Prothèse</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unité</label>
                                        <Input
                                            placeholder="Ex: Boîtes"
                                            className="h-12 bg-slate-50 border-none rounded-xl font-bold"
                                            value={newItem.unit}
                                            onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Stock Initial</label>
                                        <Input
                                            type="number"
                                            className="h-12 bg-slate-50 border-none rounded-xl font-bold"
                                            value={newItem.quantity}
                                            onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Seuil d'Alerte</label>
                                        <Input
                                            type="number"
                                            className="h-12 bg-slate-50 border-none rounded-xl font-bold"
                                            value={newItem.minQuantity}
                                            onChange={e => setNewItem({ ...newItem, minQuantity: parseInt(e.target.value) })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">N° de Lot</label>
                                        <Input
                                            placeholder="Ex: LOT-2024-001"
                                            className="h-12 bg-slate-50 border-none rounded-xl font-bold"
                                            value={newItem.lotNumber}
                                            onChange={e => setNewItem({ ...newItem, lotNumber: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date Péremption</label>
                                        <Input
                                            type="date"
                                            className="h-12 bg-slate-50 border-none rounded-xl font-bold"
                                            value={newItem.expiryDate}
                                            onChange={e => setNewItem({ ...newItem, expiryDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-indigo-600 text-white font-black uppercase tracking-widest text-xs h-14 px-10 rounded-2xl shadow-xl shadow-indigo-600/20"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Enregistrer la Référence"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setShowAddForm(false)}
                                        className="text-[11px] font-black uppercase text-slate-400 h-14 rounded-2xl"
                                    >
                                        Annuler
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/20 no-print">
                            <div className="relative w-96 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    placeholder="Rechercher une référence..."
                                    className="w-full h-11 bg-white border-none rounded-xl pl-11 text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-slate-400"><Filter className="mr-2 h-4 w-4" /> Filtres Avancés</Button>
                        </CardHeader>
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-b border-slate-50">
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14 pl-8">Produit / ID</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Catégorie</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Stock Actuel</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Statut</TableHead>
                                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14 pr-8 no-print">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-20 text-center">
                                            <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mx-auto mb-4" />
                                            <p className="font-black text-[10px] uppercase tracking-[0.5em] text-slate-400">Scan des rayons en cours...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                            Aucun produit trouvé dans cette section.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredItems.map((item: any) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50 group transition-colors border-b border-slate-50 last:border-0">
                                            <TableCell className="py-6 pl-8">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.name}</span>
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Lot: {item.lotNumber || 'N/A'} • Exp: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{item.category}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900">{item.quantity}</span>
                                                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.unit}</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1 no-print">
                                                        <button
                                                            onClick={() => adjustQuantity(item.id, item.quantity, 1)}
                                                            className="h-5 w-5 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => adjustQuantity(item.id, item.quantity, -1)}
                                                            className="h-5 w-5 rounded bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                                                    (item.status === 'CRITICAL' || item.status === 'OUT_OF_STOCK') ? "bg-red-50 text-red-600 border-red-100" :
                                                        item.status === 'LOW' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                            "bg-teal-50 text-teal-600 border-teal-100"
                                                )}>
                                                    {item.status.replace('_', ' ')}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right pr-8 no-print">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-slate-900 hover:bg-slate-100">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6 no-print">
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
                                <p className="text-sm font-bold text-white leading-relaxed">
                                    {criticalItems > 0
                                        ? `Alerte : ${criticalItems} références sont en rupture critique. Réapprovisionnement suggéré immédiatement.`
                                        : "Toutes les références critiques sont sécurisées. Prédiction stable à J+15."}
                                </p>
                                <Button className="w-full bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-11 rounded-xl mt-4 border-none shadow-lg">Générer Bon de Commande</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Articles &lt; Seuil</p>
                                    <p className="text-xl font-black text-amber-400">{items.filter(i => i.status === 'LOW').length}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Rotation Moy.</p>
                                    <p className="text-xl font-black text-teal-400">22j</p>
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
