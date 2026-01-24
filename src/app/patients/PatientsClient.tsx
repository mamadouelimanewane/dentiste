"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Plus,
    Search,
    MoreHorizontal,
    FileText,
    Calendar,
    Download,
    Printer,
    Users,
    Activity,
    Star,
    ArrowRight,
    Filter,
    ArrowUpRight,
    UserCheck
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type PatientData = {
    id: string
    firstName: string
    lastName: string
    email: string | null
    phone: string | null
    updatedAt: Date
}

export default function PatientsClient({ initialPatients = [] }: { initialPatients: PatientData[] }) {
    const [searchTerm, setSearchTerm] = useState("")

    // Robust safety: ensures we don't crash if names are missing or null
    const getSafeInitial = (name?: string) => {
        if (!name || name.length === 0) return "?"
        return name[0].toUpperCase()
    }

    const filteredPatients = (initialPatients || []).filter(p => {
        const first = (p.firstName || "").toLowerCase()
        const last = (p.lastName || "").toLowerCase()
        const phone = p.phone || ""
        const email = (p.email || "").toLowerCase()
        const search = searchTerm.toLowerCase()

        return last.includes(search) ||
            first.includes(search) ||
            phone.includes(search) ||
            email.includes(search)
    })

    const exportPatientsCSV = () => {
        if (!initialPatients.length) return
        const headers = ["ID", "Prénom", "Nom", "Email", "Téléphone"];
        const rows = initialPatients.map(p => [
            p.id,
            p.firstName,
            p.lastName,
            p.email || "",
            p.phone || ""
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `patients_dentiste_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between no-print">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                        <Users className="h-8 w-8 text-gold" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-1 w-8 bg-gold rounded-full"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Clinical Database Live</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Gestion <span className="text-gold">Patients Elite</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Accès sécurisé aux dossiers médicaux, historiques et traçabilité des soins.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={exportPatientsCSV} className="rounded-2xl border-slate-200 h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Inscrire un Patient
                    </Button>
                </div>
            </div>

            {/* Stats Overview for Patients */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="p-8 flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <UserCheck className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Patients</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">{initialPatients.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white">
                    <CardContent className="p-8 flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                            <Star className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nouveaux ce mois</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">12</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white">
                    <CardContent className="p-8 flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-teal-400 border border-white/5">
                            <Activity className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status Base de Données</p>
                            <p className="text-2xl font-black text-white tracking-tighter uppercase italic">Optimisée IA</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-6 bg-white p-4 rounded-[2rem] border shadow-sm no-print">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-gold transition-colors" />
                    <Input
                        placeholder="Rechercher par nom, téléphone ou email..."
                        className="h-14 pl-14 pr-6 rounded-2xl bg-slate-50 border-none text-sm font-bold placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-100 bg-slate-50 p-0 text-slate-400 hover:text-slate-900">
                    <Filter className="h-5 w-5" />
                </Button>
            </div>

            {/* Patient Table with Elite Styling */}
            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-b border-slate-50 hover:bg-transparent">
                            <TableHead className="w-[350px] font-black text-[10px] uppercase tracking-widest h-16 pl-10">Patient & Dossier</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-widest h-16">Coordonnées</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-widest h-16">Dernière Mise à Jour</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-widest h-16 text-right pr-10">Détails</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {filteredPatients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-40">
                                        <div className="flex flex-col items-center gap-2 opacity-30">
                                            <Users className="h-10 w-10 text-slate-300" />
                                            <p className="text-[10px] font-black uppercase tracking-widest">Aucun patient dans le registre</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPatients.map((patient, i) => (
                                    <motion.tr
                                        key={patient.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 group transition-all"
                                    >
                                        <TableCell className="py-6 pl-10">
                                            <div className="flex items-center gap-5">
                                                <div className="h-14 w-14 rounded-[1.2rem] bg-slate-950 flex items-center justify-center text-white font-black text-sm shadow-xl shadow-slate-200 group-hover:scale-105 transition-all">
                                                    {getSafeInitial(patient.firstName)}{getSafeInitial(patient.lastName)}
                                                </div>
                                                <div>
                                                    <p className="text-base font-black text-slate-900 group-hover:text-gold transition-colors">{patient.firstName} {patient.lastName}</p>
                                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Dossier #{patient.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-slate-700">{patient.phone || <span className="opacity-20 italic">Non renseigné</span>}</p>
                                                <p className="text-[11px] font-medium text-slate-400 italic">{patient.email || '-'}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                                                    <Calendar className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-600">
                                                        {patient.updatedAt ? format(new Date(patient.updatedAt), 'd MMM yyyy', { locale: fr }) : '-'}
                                                    </p>
                                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Dernière Action</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <Link href={`/patients/${patient.id}`}>
                                                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-slate-300 hover:text-gold hover:bg-gold/5 transition-all">
                                                    <ArrowUpRight className="h-5 w-5" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

