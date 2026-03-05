"use client"

import { useState, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Plus, MoreHorizontal, Clock, Activity, Zap, Bot, Filter,
    ChevronRight, Trash2, X, GripVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Priority = 'HIGH' | 'MEDIUM' | 'LOW'
type ColumnId = 'VISIT_UPCOMING' | 'TREATMENT_PLAN' | 'PROCEDURE' | 'FOLLOW_UP'

interface Patient {
    id: number
    name: string
    status: ColumnId
    priority: Priority
    date: string
    procedure: string
}

const COLUMNS: { id: ColumnId; title: string; color: string; bg: string }[] = [
    { id: 'VISIT_UPCOMING', title: 'Consultation Initiale', color: 'bg-indigo-500', bg: 'bg-indigo-50' },
    { id: 'TREATMENT_PLAN', title: 'Plan de Soin / Devis', color: 'bg-amber-500', bg: 'bg-amber-50' },
    { id: 'PROCEDURE', title: 'En Traitement', color: 'bg-teal-500', bg: 'bg-teal-50' },
    { id: 'FOLLOW_UP', title: 'Suivi Post-Op', color: 'bg-fuchsia-500', bg: 'bg-fuchsia-50' },
]

const PRIORITY_COLORS: Record<Priority, string> = {
    HIGH: 'bg-rose-500',
    MEDIUM: 'bg-amber-500',
    LOW: 'bg-teal-500',
}
const PRIORITY_TEXT: Record<Priority, string> = {
    HIGH: 'text-rose-600',
    MEDIUM: 'text-amber-600',
    LOW: 'text-teal-600',
}

const INITIAL_PATIENTS: Patient[] = [
    { id: 1, name: 'Jean Valjean', status: 'VISIT_UPCOMING', priority: 'HIGH', date: 'Auj, 14:00', procedure: 'Implant 16' },
    { id: 2, name: 'Moussa Diouf', status: 'TREATMENT_PLAN', priority: 'MEDIUM', date: 'Demain, 09:00', procedure: 'Orthodontie' },
    { id: 3, name: 'Adja Kone', status: 'PROCEDURE', priority: 'HIGH', date: 'En cours', procedure: 'Extraction 48' },
    { id: 4, name: 'Awa Ndiaye', status: 'FOLLOW_UP', priority: 'LOW', date: 'Hier', procedure: 'Contrôle Blanchiment' },
    { id: 5, name: 'Oumar Sy', status: 'VISIT_UPCOMING', priority: 'MEDIUM', date: 'Auj, 16:30', procedure: 'Détartrage' },
]

export default function WorkflowPage() {
    const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS)
    const [draggingId, setDraggingId] = useState<number | null>(null)
    const [overColumn, setOverColumn] = useState<ColumnId | null>(null)
    const [addingIn, setAddingIn] = useState<ColumnId | null>(null)
    const [newName, setNewName] = useState('')
    const [newProcedure, setNewProcedure] = useState('')
    const [newPriority, setNewPriority] = useState<Priority>('MEDIUM')
    const [menuOpen, setMenuOpen] = useState<number | null>(null)
    const dragPatient = useRef<Patient | null>(null)
    const nextId = useRef(100)

    // ────────── Drag handlers ──────────
    const onDragStart = (p: Patient) => {
        dragPatient.current = p
        setDraggingId(p.id)
    }
    const onDragOver = (e: React.DragEvent, colId: ColumnId) => {
        e.preventDefault()
        setOverColumn(colId)
    }
    const onDrop = (colId: ColumnId) => {
        if (!dragPatient.current) return
        setPatients(prev =>
            prev.map(p => p.id === dragPatient.current!.id ? { ...p, status: colId } : p)
        )
        setDraggingId(null)
        setOverColumn(null)
        dragPatient.current = null
    }
    const onDragEnd = () => {
        setDraggingId(null)
        setOverColumn(null)
        dragPatient.current = null
    }

    // ────────── Quick add ──────────
    const confirmAdd = (colId: ColumnId) => {
        if (!newName.trim()) return
        const p: Patient = {
            id: nextId.current++,
            name: newName.trim(),
            status: colId,
            priority: newPriority,
            date: 'Auj',
            procedure: newProcedure.trim() || 'Consultation',
        }
        setPatients(prev => [...prev, p])
        setNewName('')
        setNewProcedure('')
        setNewPriority('MEDIUM')
        setAddingIn(null)
    }

    // ────────── Move right ──────────
    const moveRight = (p: Patient) => {
        const idx = COLUMNS.findIndex(c => c.id === p.status)
        if (idx < COLUMNS.length - 1) {
            setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, status: COLUMNS[idx + 1].id } : pt))
        }
        setMenuOpen(null)
    }

    // ────────── Delete ──────────
    const deletePatient = (id: number) => {
        setPatients(prev => prev.filter(p => p.id !== id))
        setMenuOpen(null)
    }

    return (
        <div className="p-8 space-y-10 max-w-full mx-auto pb-40" onClick={() => setMenuOpen(null)}>
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Clinical Operations Engine</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                        Elite <span className="text-indigo-600">Workflow Manager</span>
                    </h1>
                    <p className="text-slate-500 font-medium tracking-tight">
                        Pilotage du parcours patient — glissez-déposez les cartes pour changer d'étape.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-12 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Filter className="mr-2 h-4 w-4" /> Filtres
                    </Button>
                    <Button
                        className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-12 shadow-lg"
                        onClick={() => setAddingIn('VISIT_UPCOMING')}
                    >
                        <Plus className="mr-2 h-5 w-5" /> Ajouter
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {COLUMNS.map(col => {
                    const count = patients.filter(p => p.status === col.id).length
                    return (
                        <Card key={col.id} className="rounded-[2rem] border-none shadow-lg bg-white p-6 flex flex-col items-center text-center">
                            <div className={cn("h-1.5 w-12 rounded-full mb-3", col.color)} />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{col.title}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">
                                {count} <span className="text-xs font-bold text-slate-300">Patients</span>
                            </p>
                        </Card>
                    )
                })}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-x-auto pb-6">
                {COLUMNS.map(col => {
                    const colPatients = patients.filter(p => p.status === col.id)
                    const isOver = overColumn === col.id
                    return (
                        <div
                            key={col.id}
                            className={cn(
                                "space-y-4 min-w-[270px] rounded-[2rem] p-4 transition-all duration-200",
                                isOver ? cn(col.bg, "ring-2 ring-offset-2 ring-indigo-300") : "bg-slate-50"
                            )}
                            onDragOver={e => onDragOver(e, col.id)}
                            onDrop={() => onDrop(col.id)}
                        >
                            {/* Column Header */}
                            <div className="flex items-center justify-between px-2 pb-3 border-b-2 border-white">
                                <div className="flex items-center gap-2">
                                    <span className={cn("h-2 w-2 rounded-full", col.color)} />
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-600">{col.title}</h3>
                                </div>
                                <span className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-slate-500 shadow">
                                    {colPatients.length}
                                </span>
                            </div>

                            {/* Cards */}
                            <AnimatePresence>
                                {colPatients.map(p => (
                                    <motion.div
                                        key={p.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        draggable
                                        onDragStart={() => onDragStart(p)}
                                        onDragEnd={onDragEnd}
                                        className={cn(
                                            "bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100",
                                            "hover:shadow-lg hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing group relative",
                                            draggingId === p.id && "opacity-40 rotate-2"
                                        )}
                                    >
                                        {/* Priority + menu */}
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className={cn("h-2 w-2 rounded-full", PRIORITY_COLORS[p.priority])} />
                                                <span className={cn("text-[9px] font-black uppercase tracking-widest", PRIORITY_TEXT[p.priority])}>
                                                    {p.priority}
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <Button
                                                    variant="ghost" size="icon"
                                                    className="h-6 w-6 text-slate-300 group-hover:text-slate-600"
                                                    onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === p.id ? null : p.id) }}
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                                {menuOpen === p.id && (
                                                    <div
                                                        className="absolute right-0 top-7 z-50 bg-white shadow-xl rounded-2xl border border-slate-100 p-2 flex flex-col gap-1 min-w-[160px]"
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        <button
                                                            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl"
                                                            onClick={() => moveRight(p)}
                                                        >
                                                            <ChevronRight className="h-3 w-3 text-indigo-500" /> Étape suivante
                                                        </button>
                                                        <button
                                                            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl"
                                                            onClick={() => deletePatient(p.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3" /> Supprimer
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Patient info */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 font-black text-xs flex-shrink-0">
                                                {p.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{p.name}</p>
                                                <p className="text-[10px] font-bold text-indigo-600 uppercase">{p.procedure}</p>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2 text-slate-400">
                                            <Clock className="h-3 w-3" />
                                            <span className="text-[9px] font-black uppercase">{p.date}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Quick Add Form / Button */}
                            {addingIn === col.id ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-[1.5rem] p-4 shadow-lg border border-indigo-100 space-y-3"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <Input
                                        placeholder="Nom du patient"
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        className="rounded-xl text-sm font-bold border-slate-200"
                                        onKeyDown={e => { if (e.key === 'Enter') confirmAdd(col.id) }}
                                        autoFocus
                                    />
                                    <Input
                                        placeholder="Soin (ex: Détartrage)"
                                        value={newProcedure}
                                        onChange={e => setNewProcedure(e.target.value)}
                                        className="rounded-xl text-sm font-bold border-slate-200"
                                        onKeyDown={e => { if (e.key === 'Enter') confirmAdd(col.id) }}
                                    />
                                    <div className="flex gap-2">
                                        {(['HIGH', 'MEDIUM', 'LOW'] as Priority[]).map(pr => (
                                            <button
                                                key={pr}
                                                onClick={() => setNewPriority(pr)}
                                                className={cn(
                                                    "flex-1 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 transition-all",
                                                    newPriority === pr
                                                        ? pr === 'HIGH' ? 'border-rose-400 bg-rose-50 text-rose-600'
                                                            : pr === 'MEDIUM' ? 'border-amber-400 bg-amber-50 text-amber-600'
                                                                : 'border-teal-400 bg-teal-50 text-teal-600'
                                                        : 'border-slate-100 text-slate-400 bg-white'
                                                )}
                                            >{pr}</button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            className="flex-1 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase"
                                            onClick={() => confirmAdd(col.id)}
                                        >Ajouter</Button>
                                        <Button
                                            variant="ghost" size="icon"
                                            className="rounded-xl text-slate-400"
                                            onClick={() => { setAddingIn(null); setNewName(''); setNewProcedure('') }}
                                        ><X className="h-4 w-4" /></Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <Button
                                    variant="ghost"
                                    className="w-full h-12 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-slate-400 font-black uppercase text-[10px] tracking-widest hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
                                    onClick={() => setAddingIn(col.id)}
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Quick Add
                                </Button>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* AI Insight Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-slate-100">
                <div className="md:col-span-8 flex items-center gap-8">
                    <div className="h-20 w-20 rounded-[2.5rem] bg-indigo-950 flex items-center justify-center text-white shrink-0 shadow-2xl">
                        <Bot className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-600">AI Workflow Optimization</span>
                        <p className="text-base font-bold text-slate-900 max-w-2xl leading-snug">
                            "Le Dr. Lao a 15 min de retard. L'IA suggère de décaler la consultation de Mme Ndiaye de 20 min pour fluidifier le flux."
                        </p>
                        <div className="flex gap-3 pt-1">
                            <Button className="h-8 px-5 rounded-xl bg-slate-900 text-white font-black uppercase text-[9px] tracking-widest">
                                Appliquer
                            </Button>
                            <Button variant="ghost" className="h-8 px-5 rounded-xl text-slate-400 font-black uppercase text-[9px] tracking-widest">
                                Ignorer
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white flex justify-between items-center relative overflow-hidden">
                    <div className="absolute -right-4 top-0 opacity-10"><Zap className="h-28 w-28" /></div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Automatisations Actives</p>
                        <p className="text-2xl font-black text-white">{patients.length * 3} <span className="text-xs font-bold text-teal-400">Actions IA</span></p>
                    </div>
                    <Button size="icon" className="h-12 w-12 rounded-2xl bg-white text-slate-950 shadow-xl hover:bg-slate-100">
                        <Activity className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
