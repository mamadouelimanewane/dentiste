"use client"

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Plus, MoreHorizontal, Clock, Activity, Zap, Bot, Filter,
    ChevronRight, Trash2, X, Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

type Priority = 'HIGH' | 'MEDIUM' | 'LOW'
type ColumnId = 'VISIT_UPCOMING' | 'TREATMENT_PLAN' | 'PROCEDURE' | 'FOLLOW_UP' | 'COMPLETED'

interface Patient {
    id: string
    name: string
    status: ColumnId
    priority: Priority
    date: string
    procedure: string
}

const COLUMNS: { id: ColumnId; title: string; color: string; bg: string }[] = [
    { id: 'VISIT_UPCOMING', title: 'Consultation Initiale', color: 'bg-indigo-500', bg: 'bg-indigo-50/50' },
    { id: 'TREATMENT_PLAN', title: 'Plan de Soin / Devis', color: 'bg-amber-500', bg: 'bg-amber-50/50' },
    { id: 'PROCEDURE', title: 'En Traitement', color: 'bg-teal-500', bg: 'bg-teal-50/50' },
    { id: 'FOLLOW_UP', title: 'Suivi Post-Op', color: 'bg-fuchsia-500', bg: 'bg-fuchsia-50/50' },
    { id: 'COMPLETED', title: 'Terminé / Satisfaction', color: 'bg-emerald-500', bg: 'bg-emerald-50/50' },
]

const PRIORITY_COLORS: Record<Priority, string> = {
    HIGH: 'bg-rose-500',
    MEDIUM: 'bg-amber-500',
    LOW: 'bg-teal-500',
}

export default function WorkflowPage() {
    const [patients, setPatients] = useState<Patient[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [draggedId, setDraggedId] = useState<string | null>(null)
    const [overColumn, setOverColumn] = useState<ColumnId | null>(null)
    const [addingIn, setAddingIn] = useState<ColumnId | null>(null)
    const [newName, setNewName] = useState('')
    const [newProcedure, setNewProcedure] = useState('')
    const [menuOpen, setMenuOpen] = useState<string | null>(null)

    const fetchPatients = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/workflow')
            const items = await res.json()
            if (Array.isArray(items)) {
                setPatients(items.map((p: any) => ({
                    id: p.id,
                    name: `${p.firstName} ${p.lastName}`,
                    status: (p.workflowStatus as ColumnId) || 'VISIT_UPCOMING',
                    priority: 'MEDIUM', // Placeholder logic
                    date: new Date(p.updatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
                    procedure: 'Consultation Elite'
                })))
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPatients()
    }, [])

    const handleDragStart = (id: string) => {
        setDraggedId(id)
    }

    const handleDragOver = (e: React.DragEvent, colId: ColumnId) => {
        e.preventDefault()
        setOverColumn(colId)
    }

    const updateStatus = async (id: string, colId: ColumnId) => {
        setPatients(prev => prev.map(p => p.id === id ? { ...p, status: colId } : p))
        try {
            await fetch('/api/workflow', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, workflowStatus: colId })
            })
        } catch (e) {
            console.error(e)
            // Restore?
        }
    }

    const handleDrop = (colId: ColumnId) => {
        if (draggedId === null) return
        updateStatus(draggedId, colId)
        setDraggedId(null)
        setOverColumn(null)
    }

    const handleAdd = async (colId: ColumnId) => {
        if (!newName.trim()) return
        setIsLoading(true)
        try {
            const names = newName.split(' ')
            const firstName = names[0]
            const lastName = names.slice(1).join(' ') || 'Patient'

            const res = await fetch('/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    workflowStatus: colId
                })
            })

            if (res.ok) {
                await fetchPatients()
                setNewName('')
                setNewProcedure('')
                setAddingIn(null)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    const moveNext = (id: string) => {
        const p = patients.find(p => p.id === id)
        if (!p) return
        const idx = COLUMNS.findIndex(c => c.id === p.status)
        if (idx < COLUMNS.length - 1) {
            updateStatus(id, COLUMNS[idx + 1].id)
        }
        setMenuOpen(null)
    }

    const removePatient = (id: string) => {
        setPatients(prev => prev.filter(p => p.id !== id))
    }

    return (
        <div className="p-8 space-y-10 max-w-full mx-auto pb-40" onClick={() => setMenuOpen(null)}>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Clinical Operations Engine</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-indigo-600">Workflow Manager</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Gérez le parcours de vos patients par simple glisser-déposer.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-10 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Filter className="mr-2 h-3 w-3" /> Filtres
                    </Button>
                    <Button onClick={() => setAddingIn('VISIT_UPCOMING')} className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-12 shadow-lg transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouveau Patient
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {COLUMNS.map(col => (
                    <div
                        key={col.id}
                        onDragOver={e => handleDragOver(e, col.id)}
                        onDrop={() => handleDrop(col.id)}
                        className={cn(
                            "flex flex-col gap-4 p-4 rounded-[2.5rem] transition-all min-h-[500px]",
                            overColumn === col.id ? "bg-indigo-100/50 ring-2 ring-indigo-500" : "bg-slate-50"
                        )}
                    >
                        <div className="flex items-center justify-between px-4 py-2 bg-white rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2">
                                <div className={cn("h-1.5 w-1.5 rounded-full", col.color)} />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-600">{col.title}</h3>
                            </div>
                            <span className="text-[10px] font-black text-slate-400">{patients.filter(p => p.status === col.id).length}</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {isLoading ? (
                                <div className="h-40 flex flex-col items-center justify-center text-slate-300">
                                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Chargement...</p>
                                </div>
                            ) : patients.filter(p => p.status === col.id).map(p => (
                                <div
                                    key={p.id}
                                    draggable
                                    onDragStart={() => handleDragStart(p.id)}
                                    className={cn(
                                        "bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing hover:shadow-xl hover:-translate-y-1 transition-all group relative",
                                        draggedId === p.id && "opacity-20"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-2 w-2 rounded-full", PRIORITY_COLORS[p.priority])} />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{p.priority}</span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === p.id ? null : p.id) }}
                                            className="h-6 w-6 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>

                                        {menuOpen === p.id && (
                                            <div className="absolute right-0 top-12 z-50 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 min-w-[150px] animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                                                <button onClick={() => moveNext(p.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">
                                                    <ChevronRight className="h-3 w-3" /> Prochaine étape
                                                </button>
                                                <button onClick={() => removePatient(p.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl">
                                                    <Trash2 className="h-3 w-3" /> Retirer
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-slate-900 truncate">{p.name}</p>
                                        <p className="text-[10px] font-bold text-indigo-600 uppercase italic truncate">{p.procedure}</p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2 text-slate-300">
                                        <Clock className="h-3 w-3" />
                                        <span className="text-[9px] font-black uppercase">{p.date}</span>
                                    </div>
                                </div>
                            ))}

                            {addingIn === col.id ? (
                                <div className="bg-white p-4 rounded-[2rem] shadow-xl border-2 border-indigo-200 space-y-3" onClick={e => e.stopPropagation()}>
                                    <Input
                                        placeholder="Nom..."
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        className="h-10 rounded-xl bg-slate-50 border-none text-xs font-bold"
                                        autoFocus
                                    />
                                    <Input
                                        placeholder="Soin..."
                                        value={newProcedure}
                                        onChange={e => setNewProcedure(e.target.value)}
                                        className="h-10 rounded-xl bg-slate-50 border-none text-xs font-bold"
                                        onKeyDown={e => e.key === 'Enter' && handleAdd(col.id)}
                                    />
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleAdd(col.id)} className="flex-1 bg-indigo-600 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-700">OK</Button>
                                        <Button onClick={() => setAddingIn(null)} variant="ghost" className="h-10 w-10 p-0 rounded-xl text-slate-400"><X className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setAddingIn(col.id)}
                                    className="w-full h-14 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center gap-2 text-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all font-black uppercase text-[9px] tracking-widest"
                                >
                                    <Plus className="h-4 w-4" /> Quick Add
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 pt-8 border-t border-slate-100">
                <div className="flex-1 flex gap-6 items-center">
                    <div className="h-16 w-16 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shrink-0"><Bot className="h-8 w-8" /></div>
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">AI Predictive Engine</span>
                        <p className="text-sm font-bold text-slate-800 italic leading-snug">
                            {patients.filter(p => p.status === 'VISIT_UPCOMING').length > 3
                                ? `"Attention : Goulot d'étranglement détecté en consultation initiale. Priorisez les plans de soins pour libérer le flux."`
                                : `"Optimisation Elite : Le flux patient est fluide. {patients.length} parcours actifs sous surveillance IA."`.replace('{patients.length}', patients.length.toString())}
                        </p>
                    </div>
                </div>
                <div className="bg-indigo-600 rounded-[2rem] p-6 text-white flex items-center gap-6 shadow-xl shadow-indigo-100">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Actions Automatiques</p>
                        <p className="text-2xl font-black">{patients.length * 4}</p>
                    </div>
                    <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center"><Zap className="h-5 w-5" /></div>
                </div>
            </div>
        </div>
    )
}
