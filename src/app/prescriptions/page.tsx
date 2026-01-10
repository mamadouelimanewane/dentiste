import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, FileText, Search } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Input } from "@/components/ui/input"

export default async function PrescriptionsPage() {
    const prescriptions = await prisma.prescription.findMany({
        include: {
            patient: true,
            items: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-teal-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500">Pharmacie & Suivi</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Gestion des <span className="text-teal-600">Ordonnances</span></h1>
                </div>
                <Link href="/prescriptions/create">
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-6 rounded-xl uppercase tracking-widest text-xs h-11 shadow-luxury">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Ordonnance
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border shadow-luxury">
                <div className="pl-3">
                    <Search className="text-slate-400 h-5 w-5" />
                </div>
                <Input
                    placeholder="Rechercher par patient ou médicament..."
                    className="border-none shadow-none focus-visible:ring-0 text-sm font-medium"
                />
            </div>

            <div className="bg-white rounded-[2rem] border-none shadow-luxury overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-b border-slate-100">
                            <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Date</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Patient</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Médicament(s)</TableHead>
                            <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prescriptions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-48 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
                                    Aucune ordonnance émise pour le moment.
                                </TableCell>
                            </TableRow>
                        )}
                        {prescriptions.map((p) => (
                            <TableRow key={p.id} className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
                                <TableCell className="font-bold text-slate-900 py-6">
                                    {format(new Date(p.createdAt), 'd MMM yyyy', { locale: fr })}
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{p.patient.firstName} {p.patient.lastName}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-slate-500">
                                        {p.items.map(i => i.medicationName).join(', ')}
                                        {p.items.length > 2 && '...'}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <FileText className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

