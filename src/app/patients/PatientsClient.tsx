"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, MoreHorizontal, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

// Define a type for the patient that matches what we'll pass from the server
// (Relaxed type for now to match the Prisma return)
type PatientData = {
    id: string
    firstName: string
    lastName: string
    email: string | null
    phone: string | null
    updatedAt: Date
    // Add other fields as needed
}

export default function PatientsClient({ initialPatients }: { initialPatients: PatientData[] }) {
    const [searchTerm, setSearchTerm] = useState("")

    // Client-side filtering
    const filteredPatients = initialPatients.filter(p =>
        p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.phone && p.phone.includes(searchTerm)) ||
        (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Patients</h1>
                    <p className="text-slate-500">Gérez vos dossiers patients (Dossier Médical, Facturation, Historique)</p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Nouveau Patient
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-xl border shadow-sm">
                <div className="pl-3">
                    <Search className="text-slate-400 h-5 w-5" />
                </div>
                <Input
                    placeholder="Rechercher un patient (nom, téléphone, email)..."
                    className="border-none shadow-none focus-visible:ring-0 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[300px]">Patient</TableHead>
                            <TableHead>Coordonnées</TableHead>
                            <TableHead>Dernier RDV</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-slate-500">
                                    Aucun patient trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                        {filteredPatients.map((patient) => (
                            <TableRow key={patient.id} className="hover:bg-slate-50/50 cursor-pointer">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
                                            {patient.firstName[0]}{patient.lastName[0]}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{patient.firstName} {patient.lastName}</div>
                                            <div className="text-xs text-slate-500">Dossier #{patient.id.slice(0, 8)}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-slate-700">{patient.phone || '-'}</div>
                                    <div className="text-xs text-slate-500">{patient.email || '-'}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Calendar className="h-3 w-3" />
                                        {format(new Date(patient.updatedAt), 'd MMM yyyy', { locale: fr })}
                                    </div>
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/patients/${patient.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

