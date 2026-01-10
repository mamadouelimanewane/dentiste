"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Printer, Trash2, User, Euro } from "lucide-react"
import { useState } from "react"

const COMMON_PROCEDURES = [
    { name: "Consultation dentaire", price: 23 },
    { name: "Détartrage", price: 28.92 },
    { name: "Traitement d'une carie", price: 50 },
    { name: "Couronne céramo-métallique", price: 550 },
    { name: "Implant dentaire", price: 1200 },
]

type QuoteItem = {
    id: string
    description: string
    quantity: number
    unitPrice: number
    total: number
}

export default function CreateQuotePage() {
    const [items, setItems] = useState<QuoteItem[]>([])
    const [currentItem, setCurrentItem] = useState({ description: "", quantity: 1, unitPrice: 0 })

    const addItem = () => {
        if (!currentItem.description) return
        const total = currentItem.quantity * currentItem.unitPrice
        setItems([...items, { ...currentItem, total, id: crypto.randomUUID() }])
        setCurrentItem({ description: "", quantity: 1, unitPrice: 0 })
    }

    const removeItem = (id: string) => {
        setItems(items.filter(i => i.id !== id))
    }

    const totalAmount = items.reduce((acc, item) => acc + item.total, 0)

    const loadProcedure = (name: string, price: number) => {
        setCurrentItem({ description: name, quantity: 1, unitPrice: price })
    }

    return (
        <div className="flex h-full p-8 gap-8">
            {/* Editor Side */}
            <div className="flex-1 space-y-6 overflow-y-auto pr-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Nouveau Devis</h1>
                    <p className="text-slate-500">Créez une proposition de soins détaillée</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <User className="h-4 w-4" /> Patient
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un patient..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Mamadou Diallo</SelectItem>
                                <SelectItem value="2">Marie Curie</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Ajouter un acte</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {COMMON_PROCEDURES.map(p => (
                                <Button
                                    key={p.name}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => loadProcedure(p.name, p.price)}
                                    className="bg-slate-50"
                                >
                                    {p.name}
                                </Button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label>Description de l'acte</Label>
                            <Input
                                placeholder="Désignation de l'intervention"
                                value={currentItem.description}
                                onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Quantité</Label>
                                <Input
                                    type="number"
                                    value={currentItem.quantity}
                                    onChange={e => setCurrentItem({ ...currentItem, quantity: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Prix Unitaire (€)</Label>
                                <Input
                                    type="number"
                                    value={currentItem.unitPrice}
                                    onChange={e => setCurrentItem({ ...currentItem, unitPrice: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={addItem}>
                            <Plus className="mr-2 h-4 w-4" /> Ajouter au devis
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Preview Side */}
            <div className="w-[21cm] bg-white shadow-2xl border p-12 flex flex-col text-sm hidden lg:flex h-fit sticky top-8 min-h-[29.7cm] scale-75 origin-top-right">
                {/* Header Letterhead */}
                <div className="flex justify-between items-start border-b pb-8 mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-teal-800 tracking-tighter">DENTISTE<span className="text-slate-900">APP</span></h2>
                        <div className="text-slate-900 font-bold text-lg mt-4">Dr. Aere Lao</div>
                        <p className="text-slate-600">Chirurgien Dentiste</p>
                        <p className="text-slate-500 text-xs">123 Avenue de la République, 75011 Paris</p>
                        <p className="text-slate-500 text-xs">Tél: 01 23 45 67 89</p>
                    </div>
                    <div className="text-right">
                        <div className="bg-slate-900 text-white px-4 py-2 text-xl font-bold mb-4 inline-block">DEVIS</div>
                        <p className="font-bold">N° DEV-2024-001</p>
                        <p className="text-slate-500">Date : {new Date().toLocaleDateString('fr-FR')}</p>
                        <p className="text-slate-500">Validité : 3 mois</p>
                    </div>
                </div>

                {/* Patient Info */}
                <div className="mb-12 flex justify-between">
                    <div>
                        <p className="text-xs uppercase text-slate-400 font-bold mb-1">Destinataire</p>
                        <p className="font-bold text-lg">M. Mamadou Diallo</p>
                        <p className="text-slate-600">75011 Paris</p>
                    </div>
                </div>

                {/* Content Table */}
                <div className="flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-900 text-slate-400 text-xs uppercase">
                                <th className="py-4 font-bold">Désignation des actes</th>
                                <th className="py-4 font-bold text-right">Qté</th>
                                <th className="py-4 font-bold text-right">Unit.</th>
                                <th className="py-4 font-bold text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-900">
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center text-slate-300 italic">
                                        Aucun acte sélectionné
                                    </td>
                                </tr>
                            )}
                            {items.map((item) => (
                                <tr key={item.id} className="border-b group relative">
                                    <td className="py-4 font-medium">
                                        {item.description}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute -left-8 top-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                    <td className="py-4 text-right">{item.quantity}</td>
                                    <td className="py-4 text-right">{item.unitPrice.toFixed(2)} €</td>
                                    <td className="py-4 text-right font-bold">{item.total.toFixed(2)} €</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="mt-8 flex justify-end">
                    <div className="w-64 space-y-2">
                        <div className="flex justify-between text-slate-500">
                            <span>Total HT</span>
                            <span>{totalAmount.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                            <span>TVA (0%)</span>
                            <span>0.00 €</span>
                        </div>
                        <div className="flex justify-between text-xl font-black border-t-2 border-slate-900 pt-2">
                            <span>TOTAL</span>
                            <span className="text-teal-700">{totalAmount.toFixed(2)} €</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-20 flex justify-between items-end border-t pt-8">
                    <div className="text-[10px] text-slate-400 max-w-xs uppercase leading-tight">
                        Ce devis est établi sous réserve de modifications cliniques. <br />
                        Signature précédée de la mention "Bon pour accord"
                    </div>
                    <div className="text-center w-64">
                        <div className="h-24 mb-2 bg-slate-50 rounded border border-dashed border-slate-200"></div>
                        <p className="font-bold text-xs uppercase tracking-widest text-slate-400">Cachet et Signature</p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-8 right-8">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white shadow-2xl rounded-full px-8 py-6 h-auto text-lg font-bold">
                    <Printer className="mr-3 h-6 w-6" /> Émettre le Devis
                </Button>
            </div>
        </div>
    )
}

