import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, FileCheck, FileText } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Input } from "@/components/ui/input"

export default async function QuotesPage() {
    const quotes = await prisma.quote.findMany({
        include: {
            patient: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Devis</h1>
                    <p className="text-slate-500">Gérez et suivez vos propositions de soins</p>
                </div>
                <Link href="/quotes/create">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Nouveau Devis
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-xl border shadow-sm">
                <div className="pl-3">
                    <Search className="text-slate-400 h-5 w-5" />
                </div>
                <Input
                    placeholder="Rechercher un devis..."
                    className="border-none shadow-none focus-visible:ring-0 text-base"
                />
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead>N° Devis</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Montant Total</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {quotes.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-slate-500">
                                    Aucun devis trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                        {quotes.map((quote) => (
                            <TableRow key={quote.id}>
                                <TableCell className="font-medium text-slate-900">
                                    DEV-{quote.id.slice(0, 6).toUpperCase()}
                                </TableCell>
                                <TableCell>
                                    {format(new Date(quote.createdAt), 'd MMM yyyy', { locale: fr })}
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{quote.patient.firstName} {quote.patient.lastName}</div>
                                </TableCell>
                                <TableCell className="font-bold">
                                    {quote.total.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
                                </TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${quote.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                                        quote.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                        {quote.status === 'ACCEPTED' ? 'Accepté' :
                                            quote.status === 'REJECTED' ? 'Refusé' : 'Brouillon'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon">
                                            <FileText className="h-4 w-4" />
                                        </Button>
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

