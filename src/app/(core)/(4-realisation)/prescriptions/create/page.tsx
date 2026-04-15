"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Printer, Trash2, User, Loader2, CheckCircle2, FileText, ArrowLeft, History, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

const COMMON_DRUGS = [
    { name: "Amoxicilline", dosage: "500 mg", defaultInstructions: "1 comprimé matin et soir" },
    { name: "Paracétamol", dosage: "1000 mg", defaultInstructions: "1 comprimé toutes les 6 heures si douleur" },
    { name: "Ibuprofène", dosage: "400 mg", defaultInstructions: "1 comprimé au milieu des repas" },
    { name: "Bain de bouche Eludril", dosage: "", defaultInstructions: "3 fois par jour après brossage" },
    { name: "Prednisolone", dosage: "20 mg", defaultInstructions: "3 comprimés le matin pendant 3 jours" },
]

type Patient = {
    id: string
    firstName: string
    lastName: string
    dob: string | null
}

type PrescriptionItem = {
    id: string
    name: string
    dosage: string
    duration: string
    instructions: string
}

export default function CreatePrescriptionPage() {
    const router = useRouter()
    const [patients, setPatients] = useState<Patient[]>([])
    const [selectedPatientId, setSelectedPatientId] = useState<string>("")
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [items, setItems] = useState<PrescriptionItem[]>([])
    const [notes, setNotes] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [isLoadingPatients, setIsLoadingPatients] = useState(true)

    const [currentDrug, setCurrentDrug] = useState({ name: "", dosage: "", duration: "", instructions: "" })

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch('/api/patients')
                const data = await res.json()
                setPatients(data)
            } finally {
                setIsLoadingPatients(false)
            }
        }
        fetchPatients()
    }, [])

    useEffect(() => {
        if (selectedPatientId) {
            const p = patients.find(p => p.id === selectedPatientId)
            setSelectedPatient(p || null)
        }
    }, [selectedPatientId, patients])

    const addDrug = () => {
        if (!currentDrug.name) return
        setItems([...items, { ...currentDrug, id: crypto.randomUUID() }])
        setCurrentDrug({ name: "", dosage: "", duration: "", instructions: "" })
    }

    const removeDrug = (id: string) => {
        setItems(items.filter(i => i.id !== id))
    }

    const loadQuickDrug = (drugName: string) => {
        const drug = COMMON_DRUGS.find(d => d.name === drugName)
        if (drug) {
            setCurrentDrug({
                name: drug.name,
                dosage: drug.dosage,
                duration: "5 jours",
                instructions: drug.defaultInstructions
            })
        }
    }

    const handleSave = async () => {
        if (!selectedPatientId || items.length === 0) return
        setIsSaving(true)
        try {
            const res = await fetch('/api/prescriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientId: selectedPatientId,
                    items,
                    notes
                })
            })
            if (res.ok) {
                router.push('/prescriptions')
                router.refresh()
            }
        } catch (error) {
            console.error("Save error:", error)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#f8fafc] p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <Link href="/prescriptions" className="text-xs font-black text-slate-400 flex items-center gap-2 hover:text-accent transition-colors mb-4 uppercase tracking-[0.2em]">
                            <ArrowLeft className="h-3 w-3" /> Retour à l'historique
                        </Link>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Éditeur d'<span className="text-gold">Ordonnance</span></h1>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="rounded-xl border-slate-200 font-bold bg-white h-12 shadow-sm"><History className="mr-2 h-4 w-4" /> Modèles récents</Button>
                        <Button
                            disabled={isSaving || !selectedPatientId || items.length === 0}
                            onClick={handleSave}
                            className="bg-slate-950 text-white hover:bg-slate-800 font-black px-8 rounded-xl uppercase tracking-widest text-xs h-12 shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Printer className="mr-2 h-4 w-4 text-gold" />}
                            Sauvegarder & Imprimer
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                    {/* Input Side */}
                    <div className="xl:col-span-4 space-y-6">
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-white overflow-hidden">
                            <CardHeader className="bg-slate-50/50 pb-4 border-b">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <User className="h-3 w-3" /> Identification Patient
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <Select onValueChange={setSelectedPatientId} value={selectedPatientId}>
                                    <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-slate-50 focus:ring-accent/20">
                                        <SelectValue placeholder="Choisir un patient..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {isLoadingPatients ? (
                                            <div className="p-4 flex justify-center"><Loader2 className="h-4 w-4 animate-spin" /></div>
                                        ) : (
                                            patients.map(p => (
                                                <SelectItem key={p.id} value={p.id} className="rounded-lg">
                                                    {p.firstName} {p.lastName}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                            <CardHeader className="bg-slate-50/50 pb-4 border-b">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <Plus className="h-3 w-3" /> Prescription Médicamenteuse
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {/* Quick Picks - Gold Buttons */}
                                <div className="space-y-3">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Favoris Dr. Aere Lao</p>
                                    <div className="flex flex-wrap gap-2">
                                        {COMMON_DRUGS.map(d => (
                                            <button
                                                key={d.name}
                                                onClick={() => loadQuickDrug(d.name)}
                                                className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-[10px] font-black border border-teal-100 hover:bg-teal-100 transition-all uppercase tracking-tighter"
                                            >
                                                {d.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Médicament</Label>
                                        <Input
                                            className="h-11 rounded-xl bg-slate-50 border-slate-100"
                                            placeholder="Ex: Amoxicilline"
                                            value={currentDrug.name}
                                            onChange={e => setCurrentDrug({ ...currentDrug, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Dosage</Label>
                                            <Input
                                                className="h-11 rounded-xl bg-slate-50 border-slate-100"
                                                placeholder="Ex: 500mg"
                                                value={currentDrug.dosage}
                                                onChange={e => setCurrentDrug({ ...currentDrug, dosage: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Durée</Label>
                                            <Input
                                                className="h-11 rounded-xl bg-slate-50 border-slate-100"
                                                placeholder="Ex: 7 jours"
                                                value={currentDrug.duration}
                                                onChange={e => setCurrentDrug({ ...currentDrug, duration: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Posologie / Instructions</Label>
                                        <Input
                                            className="h-11 rounded-xl bg-slate-50 border-slate-100"
                                            placeholder="Ex: 1 matin et soir"
                                            value={currentDrug.instructions}
                                            onChange={e => setCurrentDrug({ ...currentDrug, instructions: e.target.value })}
                                        />
                                    </div>
                                    <Button
                                        onClick={addDrug}
                                        className="w-full h-11 bg-accent text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-accent/20 hover:scale-[1.02] transition-transform"
                                    >
                                        <Plus className="mr-2 h-3 w-3" /> Ajouter à la liste
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Preview Side - Stationery Style */}
                    <div className="xl:col-span-8">
                        <div className="bg-white shadow-2xl rounded-[3rem] p-16 min-h-[1000px] relative border border-slate-100 flex flex-col overflow-hidden">
                            {/* Watermark/Decorative Element */}
                            <div className="absolute -top-20 -right-20 opacity-[0.03] rotate-12 pointer-events-none">
                                <Sparkles className="h-96 w-96 text-slate-900" />
                            </div>

                            {/* Header Letterhead */}
                            <div className="flex justify-between items-start border-b pb-12 mb-16">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black text-slate-950 tracking-tighter">Dr. Aere Lao ARNAUD</h2>
                                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-4">Chirurgien Dentiste • Diplômé d'État</p>
                                    <div className="text-[11px] font-bold text-slate-400 space-y-0.5 uppercase tracking-widest">
                                        <p>123 Avenue de la République, 75011 Paris</p>
                                        <p>Tél: 01 23 45 67 89 • contact@dentiste.app</p>
                                        <p className="text-slate-300">N° RPPS : 10123456789</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 inline-block">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Paris, le</p>
                                        <p className="text-base font-black text-slate-900">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Info Section */}
                            <div className="mb-16 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 inline-block min-w-[300px]">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Prescription pour :</p>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : "........................................"}
                                </h3>
                                {selectedPatient?.dob && (
                                    <p className="text-xs font-bold text-slate-500 mt-1 italic">Né(e) le {new Date(selectedPatient.dob).toLocaleDateString('fr-FR')}</p>
                                )}
                            </div>

                            {/* Rx Content */}
                            <div className="flex-1 space-y-10 pl-4 relative">
                                <div className="absolute left-0 top-0 text-7xl font-black text-slate-100 pointer-events-none opacity-50">Rx</div>

                                <AnimatePresence mode="popLayout">
                                    {items.length === 0 ? (
                                        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-300 space-y-4">
                                            <FileText className="h-12 w-12 opacity-20" />
                                            <p className="text-sm font-bold italic">Aucun médicament ajouté à l'ordonnance</p>
                                        </div>
                                    ) : (
                                        items.map((item, idx) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="relative group group/item pl-12"
                                            >
                                                <div className="absolute left-0 top-1.5 h-6 w-6 rounded-lg bg-slate-950 text-white flex items-center justify-center text-[10px] font-black">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                                                            {item.name} <span className="text-accent ml-2">{item.dosage}</span>
                                                        </h4>
                                                        <p className="text-sm font-bold text-slate-600 mt-1 italic italic">
                                                            {item.instructions}
                                                        </p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                                                            Pendant {item.duration}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeDrug(item.id)}
                                                        className="h-8 w-8 rounded-full bg-red-50 text-red-400 opacity-0 group-hover/item:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer / Signature Area */}
                            <div className="mt-20 flex justify-between items-end border-t pt-12 border-slate-100">
                                <div className="space-y-4 max-w-[400px]">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notes de sortie</p>
                                        <textarea
                                            placeholder="Observations facultatives..."
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            className="w-full bg-slate-50 rounded-xl p-4 text-xs font-bold border-none h-24 focus:ring-accent/10 resize-none italic"
                                        />
                                    </div>
                                    <div className="text-[9px] text-slate-300 font-bold leading-relaxed uppercase tracking-tighter">
                                        ORDONNANCE DIGITALE CERTIFIÉE • VALIDE POUR 3 MOIS <br />
                                        MEMBER D'UNE ASSOCIATION DE GESTION AGRÉÉE • N° ADELI : 751234567
                                    </div>
                                </div>

                                <div className="text-center w-64 space-y-4 pb-4">
                                    <div className="h-24 w-full border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center">
                                        <CheckCircle2 className="h-8 w-8 text-slate-100" />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cachet & Signature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

