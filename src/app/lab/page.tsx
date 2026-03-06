"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { addDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    FlaskConical,
    Truck,
    Clock,
    FileUp,
    Palette,
    Box,
    ChevronRight,
    Search,
    Filter,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Library,
    Layers,
    Shapes,
    Sparkles,
    Eye,
    Loader2,
    Plus,
    FileText,
    Settings,
    Shield,
    BarChart3,
    ArrowDownToLine,
    Download
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function LabPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [labWorks, setLabWorks] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<'WORKS' | 'CATALOG' | 'STOCKS'>('WORKS')
    const [patients, setPatients] = useState<any[]>([])
    const [selectedWork, setSelectedWork] = useState<any>(null)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isShadeGuideOpen, setIsShadeGuideOpen] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState<any>(null)
    const [isAuditOpen, setIsAuditOpen] = useState(false)
    const [isAlertsOpen, setIsAlertsOpen] = useState(false)
    const [isPdfOpen, setIsPdfOpen] = useState(false)
    const [workFormData, setWorkFormData] = useState({
        patientId: '',
        labName: 'DentiLab Pro 3D',
        type: 'Couronne Zircone',
        material: 'Zircone Multicouche High-Trans',
        shade: 'A2',
        dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
        notes: ''
    })

    const fetchPatients = async () => {
        try {
            const res = await fetch('/api/patients')
            const data = await res.json()
            if (Array.isArray(data)) setPatients(data)
        } catch (e) { console.error(e) }
    }

    const fetchLabWorks = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/lab')
            const data = await res.json()
            if (Array.isArray(data)) setLabWorks(data)
        } catch (error) {
            console.error("Failed to fetch lab works:", error)
            setLabWorks([
                { id: '1', patientName: 'Sophie Faye', labName: 'DentiLab Pro 3D', type: 'Couronne Zircone', status: 'IN_TRANSIT', dueDate: '2026-03-14', material: 'Zircone', shade: 'A2' },
                { id: '2', patientName: 'Mamadou Diallo', labName: 'Elite Ortho Lab', type: 'Guide Chirurgical', status: 'RECEIVED', dueDate: '2026-03-05', material: 'Résine 3D', shade: 'Clear' },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateWork = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!workFormData.patientId) return toast.error("Sélectionnez un patient")

        try {
            const res = await fetch('/api/lab', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workFormData)
            })
            if (res.ok) {
                toast.success("Travail de laboratoire envoyé !")
                setIsAddOpen(false)
                fetchLabWorks()
            }
        } catch (e) { toast.error("Erreur d'envoi") }
    }

    useEffect(() => {
        fetchLabWorks()
        fetchPatients()
    }, [])

    const materials = [
        { name: 'Zircone Multicouche High-Trans', category: 'Céramique', properties: 'Hautement esthétique, 1200MPa' },
        { name: 'E-Max Press', category: 'Céramique Vitreuse', properties: 'Translucidité naturelle' },
        { name: 'Titane Grade 5', category: 'Métal', properties: 'Bio-compatible, Haute résistance' },
        { name: 'PMMA High-Quality', category: 'Temporaire', properties: 'Longue durée (jusqu\'à 6 mois)' },
    ]

    const shades = ['A1', 'A2', 'A3', 'A3.5', 'B1', 'B2', 'C1', 'D2', 'Bleach 1']

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Liaison Labo & CFAO Digitale</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Prosthetics <span className="text-gold">Lab Center</span></h1>
                    <p className="text-slate-500 font-medium">Gestion des flux numériques (STL), suivi des travaux et catalogue de matériaux.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                        {(['WORKS', 'CATALOG', 'STOCKS'] as const).map(tab => (
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
                                {tab === 'WORKS' ? 'En Cours' : tab === 'CATALOG' ? 'Matériaux' : 'Stocks'}
                            </Button>
                        ))}
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl px-8 shadow-xl hover:scale-105 transition-all"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Nouveau Travail
                    </Button>
                </div>
            </div>

            {/* Creation Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-8 border-none shadow-luxury">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 tracking-tighter">Nouveau <span className="text-gold">Travail Labo</span></DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateWork} className="space-y-6 mt-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Patient</label>
                            <Select value={workFormData.patientId} onValueChange={(val) => setWorkFormData({ ...workFormData, patientId: val })}>
                                <SelectTrigger className="rounded-xl h-12 border-slate-100 bg-slate-50/50">
                                    <SelectValue placeholder="Sélectionner un patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {patients.map(p => (
                                        <SelectItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Laboratoire</label>
                                <Input
                                    value={workFormData.labName}
                                    onChange={(e) => setWorkFormData({ ...workFormData, labName: e.target.value })}
                                    className="rounded-xl h-12 border-slate-100 bg-slate-50/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Type de Travail</label>
                                <Input
                                    value={workFormData.type}
                                    onChange={(e) => setWorkFormData({ ...workFormData, type: e.target.value })}
                                    className="rounded-xl h-12 border-slate-100 bg-slate-50/50"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Teinte (VITA)</label>
                                <Input
                                    value={workFormData.shade}
                                    onChange={(e) => setWorkFormData({ ...workFormData, shade: e.target.value })}
                                    className="rounded-xl h-12 border-slate-100 bg-slate-50/50 uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date Livraison</label>
                                <Input
                                    type="date"
                                    value={workFormData.dueDate}
                                    onChange={(e) => setWorkFormData({ ...workFormData, dueDate: e.target.value })}
                                    className="rounded-xl h-12 border-slate-100 bg-slate-50/50"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-14 bg-slate-900 text-gold font-black uppercase tracking-widest rounded-2xl shadow-xl mt-4">Transmettre au Laboratoire</Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Detail Dialog */}
            <Dialog open={!!selectedWork} onOpenChange={() => setSelectedWork(null)}>
                <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-none shadow-luxury text-slate-900">
                    {selectedWork && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-[1.5rem] bg-gold/10 flex items-center justify-center">
                                    <FlaskConical className="h-8 w-8 text-gold" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">{selectedWork.patientName}</h2>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dossier #{selectedWork.id.slice(0, 5)}</span>
                                </div>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Travail</span>
                                    <span className="text-xs font-bold">{selectedWork.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matériau</span>
                                    <span className="text-xs font-bold">{selectedWork.material || 'Standard'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teinte</span>
                                    <span className="text-xs font-bold text-gold">{selectedWork.shade || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Dépôt</span>
                                    <span className="text-xs font-bold">{format(new Date(selectedWork.sentDate || new Date()), 'dd MMM yyyy', { locale: fr })}</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1 h-12 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase" onClick={() => toast.success("Notification de rappel envoyée au labo")}>Rappel Labo</Button>
                                <Button variant="outline" className="flex-1 h-12 border-slate-100 rounded-xl text-[10px] font-black uppercase text-red-500 hover:bg-red-50" onClick={() => toast.error("Action irréversible : contactez l'admin")}>Annuler</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <AnimatePresence mode="wait">
                {activeTab === 'WORKS' && (
                    <motion.div
                        key="works"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-12 gap-8"
                    >
                        {/* Task List */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                    <div className="relative w-72">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input placeholder="Rechercher patient ou labo..." className="pl-10 h-10 bg-slate-50 border-none rounded-xl text-xs font-bold" />
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-slate-400"><Filter className="mr-2 h-4 w-4" /> Trier par Date</Button>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-slate-50">
                                        {isLoading ? (
                                            <div className="p-20 text-center">
                                                <Loader2 className="h-10 w-10 animate-spin text-amber-500 mx-auto mb-4" />
                                                <p className="font-black text-[10px] uppercase tracking-[0.5em] text-slate-400">Scan des commandes en cours...</p>
                                            </div>
                                        ) : labWorks.length === 0 ? (
                                            <div className="p-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                                Aucun travail de laboratoire en cours.
                                            </div>
                                        ) : labWorks.map(work => (
                                            <div key={work.id} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedWork(work)}>
                                                <div className="flex items-center gap-6">
                                                    <div className={cn(
                                                        "h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black",
                                                        work.status === 'RECEIVED' ? "bg-teal-50 text-teal-600" :
                                                            work.status === 'IN_TRANSIT' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                                                    )}>
                                                        {work.status === 'RECEIVED' ? <CheckCircle2 className="h-6 w-6" /> : <Truck className="h-6 w-6" />}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{work.patientName}</h3>
                                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{work.type} • {work.shade || 'Teinte standard'}</p>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1.5 bg-slate-900/5 px-2.5 py-1 rounded-lg">
                                                                <Palette className="h-3 w-3 text-slate-400" />
                                                                <span className="text-[9px] font-black text-slate-500 uppercase">{work.material || 'Zircone'}</span>
                                                            </div>
                                                            <span className="text-[9px] font-bold text-slate-300">Lab: {work.labName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-10">
                                                    <div className="text-right">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Livraison Prévue</p>
                                                        <p className="text-base font-black text-slate-900 flex items-center gap-2 justify-end">
                                                            <Clock className="h-4 w-4 text-accent" /> {work.dueDate ? new Date(work.dueDate).toLocaleDateString() : 'Non définie'}
                                                        </p>
                                                    </div>
                                                    <Button variant="outline" size="icon" className="h-10 w-10 border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all">
                                                        <ChevronRight className="h-5 w-5 text-slate-400" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Stats & CFAO Sync */}
                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Layers className="h-32 w-32 text-accent" />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                                            <Shapes className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Status Gateway CFAO</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Cloud Sync STL', status: 'Online', color: 'text-teal-400' },
                                            { label: 'Liaison Labo Pro', status: 'Encrypted', color: 'text-blue-400' },
                                            { label: 'File d\'attente', status: '3 fichiers', color: 'text-accent' },
                                        ].map((s, i) => (
                                            <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-slate-500">{s.label}</span>
                                                <span className={s.color}>{s.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => {
                                            toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
                                                loading: 'Synchronisation Cloud...',
                                                success: 'iTero v2.5 Synchronisé',
                                                error: 'Erreur Cloud'
                                            })
                                        }}
                                        className="w-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl hover:bg-white/10"
                                    >
                                        Synchroniser Scanner ITero
                                    </Button>
                                </div>
                            </Card>

                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 border border-slate-50">
                                <div className="flex items-center gap-3 mb-6">
                                    <Palette className="h-5 w-5 text-indigo-500" />
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Sélecteur de Teintes Smart</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {shades.slice(0, 6).map(s => (
                                        <div
                                            key={s}
                                            className="flex flex-col items-center gap-2 cursor-pointer group"
                                            onClick={() => {
                                                setWorkFormData(prev => ({ ...prev, shade: s }))
                                                toast.success(`Teinte ${s} sélectionnée pour le prochain travail`)
                                            }}
                                        >
                                            <div className={cn(
                                                "h-12 w-full rounded-xl bg-gradient-to-br from-[#f8f1e0] to-[#e8dcc0] border transition-all flex items-center justify-center shadow-sm",
                                                workFormData.shade === s ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-100 group-hover:border-accent"
                                            )}>
                                                <span className="text-[10px] font-black text-slate-900/40">{s}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    variant="link"
                                    className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 mt-4"
                                    onClick={() => setIsShadeGuideOpen(true)}
                                >
                                    Voir Nuancier Complet →
                                </Button>
                            </Card>
                        </div>
                    </motion.div>
                )}

                {/* Shade Guide Dialog */}
                <Dialog open={isShadeGuideOpen} onOpenChange={setIsShadeGuideOpen}>
                    <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10 border-none shadow-luxury bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tighter">Guide de Teintes <span className="text-gold">VITA Pan</span></DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            {shades.map(s => (
                                <div key={s} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => {
                                    setWorkFormData({ ...workFormData, shade: s })
                                    toast.success(`Teinte ${s} sélectionnée pour le prochain travail`)
                                    setIsShadeGuideOpen(false)
                                }}>
                                    <div className="h-16 w-full rounded-2xl bg-gradient-to-br from-[#f8f1e0] to-[#e8dcc0] border border-slate-100 group-hover:border-gold transition-all shadow-sm flex items-center justify-center">
                                        <span className="text-xs font-black text-slate-900/60 tracking-wider">{s}</span>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sélect.</span>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Material Detail Dialog */}
                <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
                    <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-none shadow-luxury bg-white">
                        {selectedMaterial && (
                            <div className="space-y-6">
                                <div className="h-20 w-20 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-500">
                                    <Library className="h-10 w-10" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{selectedMaterial.name}</h2>
                                    <p className="text-amber-500 font-bold uppercase text-[10px] tracking-widest">{selectedMaterial.category}</p>
                                </div>
                                <div className="space-y-4 pt-4 border-t border-slate-50">
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                        <span className="text-[10px] font-black uppercase text-slate-400">Propriétés</span>
                                        <span className="text-xs font-bold text-slate-700">{selectedMaterial.properties}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        Ce matériau est certifié DentoPrestige Elite pour les restaurations de haute précision.
                                        Compatible avec les scanners intra-oraux (iTero, 3Shape) et l'usinage CFAO 5 axes.
                                    </p>
                                </div>
                                <Button className="w-full h-12 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px]" onClick={() => setIsPdfOpen(true)}>Visualiser Fiche PDF</Button>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* PDF Preview Dialog */}
                <Dialog open={isPdfOpen} onOpenChange={setIsPdfOpen}>
                    <DialogContent className="sm:max-w-[800px] h-[85vh] rounded-[2.5rem] p-0 border-none shadow-luxury bg-slate-100 overflow-hidden flex flex-col">
                        <div className="bg-slate-900 p-6 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <FileText className="h-6 w-6 text-gold" />
                                <div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-xs">Aperçu du Document Technique</h3>
                                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-tight">{selectedMaterial?.name || 'Fiche Technique'}.pdf</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-white hover:bg-white/10"
                                    onClick={() => {
                                        const textContent = `ELITE LABS PRO - Certification & Standards Digitaux\n\nFiche Spécifications : ${selectedMaterial?.name}\nCatégorie : ${selectedMaterial?.category}\nPropriétés : ${selectedMaterial?.properties}\n\nRésistance flexure : 1200 MPa\nTranslucidité : 49% (Gradient)\nCompatibilité: iTero, Cerec, 3Shape\n\nDocument Confidentiel - Usage Professionnel Uniquement`;
                                        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${selectedMaterial?.name.replace(/\s+/g, '_')}_Elite_Spec.txt`;
                                        a.click();
                                        toast.success("Document exporté au format Texte (.txt)");
                                    }}
                                >
                                    <Download className="h-4 w-4 mr-2" /> Télécharger (.txt)
                                </Button>
                                <Button size="sm" className="bg-gold text-slate-900 font-black" onClick={() => setIsPdfOpen(false)}>Fermer</Button>
                            </div>
                        </div>
                        <div className="flex-1 p-12 overflow-y-auto bg-white m-4 rounded-2xl shadow-inner scrollbar-hide">
                            <div className="max-w-2xl mx-auto space-y-12">
                                <div className="flex justify-between items-start border-b-4 border-slate-900 pb-8">
                                    <div>
                                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">ELITE LABS <span className="text-gold">PRO</span></h1>
                                        <p className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.3em]">Certification & Standards Digitaux</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="bg-slate-900 text-white px-3 py-1 text-[8px] font-black rounded-full mb-2">REF: EL-PRO-{selectedMaterial?.name.slice(0, 3).toUpperCase()}-2026</p>
                                        <p className="text-[10px] font-bold text-slate-500">{format(new Date(), 'dd MMMM yyyy', { locale: fr })}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                        <Shield className="h-6 w-6 text-gold" />
                                        Fiche Spécifications : {selectedMaterial?.name}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase text-slate-400 border-l-2 border-gold pl-3">Paramètres Physiques</p>
                                            <ul className="space-y-2 text-xs font-medium text-slate-600">
                                                <li className="flex justify-between"><span>Résistance Flexion :</span> <span className="font-black text-slate-900">1200 MPa</span></li>
                                                <li className="flex justify-between"><span>Translucidité :</span> <span className="font-black text-slate-900">49% (Gradient)</span></li>
                                                <li className="flex justify-between"><span>Coefficient Expansion :</span> <span className="font-black text-slate-900">10.5 x 10^-6/K</span></li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase text-slate-400 border-l-2 border-gold pl-3">Compatibilité Système</p>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary" className="bg-slate-50">iTero Certified</Badge>
                                                <Badge variant="secondary" className="bg-slate-50">Cerec Connect</Badge>
                                                <Badge variant="secondary" className="bg-slate-50">3Shape Ready</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-slate-50 rounded-3xl space-y-4 border border-dashed border-slate-200">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Description du Protocole</p>
                                    <p className="text-sm text-slate-700 leading-relaxed text-center font-medium">
                                        Le {selectedMaterial?.name} utilise une technologie multicouche avancée pour reproduire les gradients naturels de l'émail à la dentine.
                                        Usinage recommandé sous irrigation avec fraises diamantées grain fin. Frittage à 1530°C pour une stabilité optimale.
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-8">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm overflow-hidden relative group">
                                            <FlaskConical className="h-10 w-10 text-slate-200" />
                                            <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-12 border-t border-slate-100 flex justify-between items-center opacity-50">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 bg-gold rounded-full" />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Elite Dental Network</span>
                                    </div>
                                    <span className="text-[8px] font-black text-slate-400 italic">Document Confidentiel - Usage Professionnel Uniquement</span>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Audit Inventory Dialog */}
                <Dialog open={isAuditOpen} onOpenChange={setIsAuditOpen}>
                    <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] p-10 border-none shadow-luxury bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
                                <BarChart3 className="h-8 w-8 text-indigo-500" />
                                Audit de <span className="text-indigo-500">l'Inventaire Labo</span>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="mt-8 space-y-8">
                            <div className="grid grid-cols-3 gap-4">
                                <Card className="p-6 rounded-3xl bg-slate-50 border-none shadow-none">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Taux Rotation</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tight">84%</p>
                                    <Progress value={84} className="h-1 mt-3 bg-slate-200" />
                                </Card>
                                <Card className="p-6 rounded-3xl bg-slate-50 border-none shadow-none">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Valeur Stock</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tight">4.2M</p>
                                    <Badge className="bg-teal-50 text-teal-600 border-none mt-2 shadow-none text-[8px]">+12% / m-1</Badge>
                                </Card>
                                <Card className="p-6 rounded-3xl bg-slate-50 border-none shadow-none">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Alertes Actives</p>
                                    <p className="text-2xl font-black text-red-600 tracking-tight">03</p>
                                    <p className="text-[8px] font-bold text-red-400 mt-2 uppercase tracking-wide">Action Requise</p>
                                </Card>
                            </div>

                            <div className="rounded-3xl border border-slate-100 overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow className="border-slate-100 hover:bg-transparent">
                                            <TableHead className="text-[10px] font-black uppercase text-slate-400 px-6 py-4">Matériau</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase text-slate-400 px-6 py-4">Consommation</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase text-slate-400 px-6 py-4">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="px-6 py-4 font-black text-slate-900 text-xs">Blocs Zircone</TableCell>
                                            <TableCell className="px-6 py-4">
                                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-teal-500 h-full w-[70%]" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4"><Badge className="bg-teal-50 text-teal-600 border-none shadow-none text-[9px]">Stable</Badge></TableCell>
                                        </TableRow>
                                        <TableRow className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="px-6 py-4 font-black text-slate-900 text-xs">Résine Guide 3D</TableCell>
                                            <TableCell className="px-6 py-4">
                                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-red-500 h-full w-[92%]" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4"><Badge className="bg-red-50 text-red-600 border-none shadow-none text-[9px]">Critique</Badge></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <Button
                                className="w-full h-14 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-indigo-700 transition-all hover:scale-[1.02]"
                                onClick={() => {
                                    const texte = `ELITE LABS PRO - Audit d'Inventaire\n\nTaux de Rotation: 84%\nValeur Stock: 4.2M (+12% / m-1)\nAlertes Actives: 03\n\n- Blocs Zircone : Stable (70%)\n- Résine Guide 3D : Critique (92% consommé)\n\nDocument Confidentiel - Généré le ${format(new Date(), 'dd/MM/yyyy')}`;
                                    const blob = new Blob([texte], { type: 'text/plain;charset=utf-8' });
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `Audit_Labo_${format(new Date(), 'dd_MM_yyyy')}.txt`;
                                    a.click();
                                    toast.success("Rapport d'audit téléchargé avec succès");
                                }}
                            >
                                Générer Rapport PDF Complet
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Alerts Configuration Dialog */}
                <Dialog open={isAlertsOpen} onOpenChange={setIsAlertsOpen}>
                    <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-none shadow-luxury bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
                                <Settings className="h-8 w-8 text-amber-500" />
                                Config <span className="text-amber-500">Smart Alert</span>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="mt-8 space-y-8">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-black text-slate-900 text-xs">Seuil de Réapprovisionnement</p>
                                        <p className="text-[10px] font-medium text-slate-500 italic">Déclenche un bon de commande auto.</p>
                                    </div>
                                    <span className="bg-slate-100 px-3 py-1 rounded-lg font-black text-xs text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4">15% restants</span>
                                </div>
                                <Progress value={15} className="h-2 bg-slate-100" />
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Canaux de Notification</p>
                                {[
                                    { label: 'E-mail Labo Pro', desc: 'Rapports hebdomadaires', active: true },
                                    { label: 'WhatsApp Elite', desc: 'Alertes critiques J+0', active: true },
                                    { label: 'SMS Fournisseur', desc: 'Commandes en attente', active: false },
                                ].map((channel, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:border-amber-200 transition-all">
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 tracking-tight">{channel.label}</p>
                                            <p className="text-[9px] font-medium text-slate-400">{channel.desc}</p>
                                        </div>
                                        <div className={cn(
                                            "h-5 w-10 rounded-full p-1 transition-colors cursor-pointer",
                                            channel.active ? "bg-amber-500" : "bg-slate-200"
                                        )}>
                                            <div className={cn(
                                                "h-3 w-3 bg-white rounded-full transition-transform",
                                                channel.active ? "translate-x-5" : "translate-x-0"
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full h-14 bg-slate-900 text-gold font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
                                Sauvegarder Config
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {activeTab === 'CATALOG' && (
                    <motion.div
                        key="catalog"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {materials.map(m => (
                            <Card key={m.name} className="rounded-[2rem] border-none shadow-luxury bg-white p-8 space-y-4 group hover:scale-[1.02] transition-all border border-slate-50">
                                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                                    <Library className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-900 tracking-tight">{m.name}</h3>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">{m.category}</span>
                                </div>
                                <p className="text-[10px] font-medium text-slate-500 leading-relaxed border-t border-slate-50 pt-4">{m.properties}</p>
                                <Button
                                    variant="ghost"
                                    className="w-full text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 p-0 h-auto self-end"
                                    onClick={() => setSelectedMaterial(m)}
                                >
                                    Consulter Fiche Technique
                                </Button>
                            </Card>
                        ))}
                        <Card
                            className="rounded-[2rem] border-dashed border-2 border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 cursor-pointer hover:bg-slate-50 hover:border-slate-900 hover:text-slate-900 transition-all group"
                            onClick={() => {
                                toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
                                    loading: 'Connexion à DentoShop API...',
                                    success: 'Catalogue Fournisseurs synchronisé',
                                    error: 'Erreur réseau'
                                });
                            }}
                        >
                            <Plus className="h-8 w-8 mb-2 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-center">Ajouter au Catalogue</span>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'STOCKS' && (
                    <motion.div
                        key="stocks"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: 'Dents Temporaires (Lot)', qty: 45, unit: 'pcs', alert: false },
                                { name: 'Résine PMMA Temporaire', qty: 2, unit: 'blocs', alert: true },
                                { name: 'Ciment Temporaire Sans Eugenol', qty: 12, unit: 'tubes', alert: false },
                            ].map((s, i) => (
                                <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 flex items-center gap-6">
                                    <div className={cn(
                                        "h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-black",
                                        s.alert ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-900"
                                    )}>
                                        {s.qty}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-slate-900 tracking-tight">{s.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.unit}</p>
                                        {s.alert && (
                                            <div className="mt-2 flex items-center gap-1.5 text-red-600">
                                                <AlertCircle className="h-3 w-3" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Stock Faible</span>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Box className="h-40 w-40" />
                            </div>
                            <div className="relative z-10 space-y-6 max-w-2xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200">Gestion Intelligent des Temporaires</span>
                                <h2 className="text-3xl font-black tracking-tighter">Inventaire & Traçabilité J+0.</h2>
                                <p className="text-indigo-100 text-sm font-medium leading-relaxed">Suivez chaque élément prothétique provisoire installé. Le système alerte automatiquement le patient et le laboratoire si le port d'une temporaire dépasse la limite recommandée.</p>
                                <div className="flex gap-4">
                                    <Button className="bg-white text-indigo-600 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 shadow-xl hover:bg-slate-50 transition-all" onClick={() => setIsAuditOpen(true)}>
                                        <BarChart3 className="h-4 w-4 mr-2" /> Audit Inventaire
                                    </Button>
                                    <Button className="bg-indigo-400 text-white border border-indigo-300 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 hover:bg-indigo-500 transition-all" onClick={() => setIsAlertsOpen(true)}>
                                        <Settings className="h-4 w-4 mr-2" /> Configuration Alertes
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}



