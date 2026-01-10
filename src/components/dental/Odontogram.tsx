"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Baby, User, Info, Check, X, Pencil, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type ToothState = 'HEALTHY' | 'CARIES' | 'CROWN' | 'MISSING' | 'PLANNED' | 'EXTRACTED' | 'IMPLANT'

interface ToothProps {
    number: number
    state?: ToothState
    isSelected: boolean
    onClick: () => void
    isPediatric?: boolean
}

function Tooth({ number, state = 'HEALTHY', isSelected, onClick, isPediatric }: ToothProps) {
    const states: Record<ToothState, { color: string, icon?: React.ReactNode }> = {
        HEALTHY: { color: "bg-white" },
        CARIES: { color: "bg-red-500", icon: <div className="text-[8px] font-black text-white">X</div> },
        CROWN: { color: "bg-amber-400" },
        MISSING: { color: "bg-slate-200 opacity-30" },
        PLANNED: { color: "bg-teal-200" },
        EXTRACTED: { color: "bg-slate-400", icon: <X className="h-3 w-3 text-white" /> },
        IMPLANT: { color: "bg-indigo-500", icon: <div className="text-[8px] font-black text-white">I</div> }
    }

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "w-10 h-16 border rounded-xl flex flex-col items-center justify-between p-1 cursor-pointer transition-all shadow-sm relative group",
                isSelected ? "ring-4 ring-accent/30 border-accent shadow-luxury" : "border-slate-200 hover:border-accent/40 bg-white",
                state === 'MISSING' && "opacity-20 grayscale",
                isPediatric && "h-12 w-8"
            )}
        >
            <span className={cn(
                "text-[9px] font-black transition-colors",
                isSelected ? "text-accent" : "text-slate-400 group-hover:text-slate-600"
            )}>{number}</span>

            <div className={cn(
                "w-full flex-1 rounded-lg border border-slate-100 flex items-center justify-center relative overflow-hidden transition-colors duration-500",
                states[state].color
            )}>
                {states[state].icon}
                {state === 'CROWN' && <div className="absolute top-0 left-0 w-full h-1/3 bg-white/30" />}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
            </div>

            <div className="flex gap-0.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-50" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-50" />
            </div>

            {isSelected && (
                <motion.div
                    layoutId="tooth-active"
                    className="absolute -inset-1 border-2 border-accent rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
        </motion.div>
    )
}

export function Odontogram({
    toothStates = {},
    onToothStateChange
}: {
    toothStates?: Record<number, ToothState>,
    onToothStateChange?: (number: number, state: ToothState) => void
}) {
    const [view, setView] = useState<'ADULT' | 'PEDIATRIC'>('ADULT')
    const [selectedTooth, setSelectedTooth] = useState<number | null>(null)

    const handleToothClick = (n: number) => {
        setSelectedTooth(n)
    }

    const changeToothState = (state: ToothState) => {
        if (selectedTooth) {
            onToothStateChange?.(selectedTooth, state)
        }
    }

    // quadrants: 1: UR, 2: UL, 3: LL, 4: LR
    const adultQ1 = [18, 17, 16, 15, 14, 13, 12, 11]
    const adultQ2 = [21, 22, 23, 24, 25, 26, 27, 28]
    const adultQ3 = [38, 37, 36, 35, 34, 33, 32, 31]
    const adultQ4 = [48, 47, 46, 45, 44, 43, 42, 41]

    const childQ1 = [55, 54, 53, 52, 51]
    const childQ2 = [61, 62, 63, 64, 65]
    const childQ3 = [75, 74, 73, 72, 71]
    const childQ4 = [85, 84, 83, 82, 81]

    const q1 = view === 'ADULT' ? adultQ1 : childQ1
    const q2 = view === 'ADULT' ? adultQ2 : childQ2
    const q3 = view === 'ADULT' ? adultQ3 : childQ3
    const q4 = view === 'ADULT' ? adultQ4 : childQ4

    return (
        <div className="flex flex-col items-center gap-10 p-10 bg-white/80 backdrop-blur-xl rounded-[3rem] border border-white shadow-luxury select-none w-full max-w-5xl">
            {/* View Toggle */}
            <div className="flex justify-between items-center w-full mb-4">
                <div className="flex bg-slate-100 p-1 rounded-2xl border">
                    <button
                        onClick={() => setView('ADULT')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                            view === 'ADULT' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <User className="h-3 w-3" /> Denture Adulte
                    </button>
                    <button
                        onClick={() => setView('PEDIATRIC')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                            view === 'PEDIATRIC' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <Baby className="h-3 w-3" /> Denture Temporaire
                    </button>
                </div>

                <div className="flex gap-4">
                    {Object.entries({
                        'CARIES': 'bg-red-500',
                        'CROWN': 'bg-amber-400',
                        'PLANNED': 'bg-teal-200',
                        'MISSING': 'bg-slate-200',
                        'IMPLANT': 'bg-indigo-500'
                    }).map(([label, color]) => (
                        <div key={label} className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                            <div className={cn("w-2 h-2 rounded-full", color)} />
                            <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative w-full overflow-x-auto py-8">
                <div className="min-w-fit mx-auto space-y-16">
                    {/* Upper Row */}
                    <div className="flex gap-16 justify-center">
                        <div className="flex gap-2">
                            {q1.map(n => <Tooth key={n} number={n} state={toothStates[n]} isSelected={selectedTooth === n} onClick={() => handleToothClick(n)} isPediatric={view === 'PEDIATRIC'} />)}
                        </div>
                        <div className="flex gap-2">
                            {q2.map(n => <Tooth key={n} number={n} state={toothStates[n]} isSelected={selectedTooth === n} onClick={() => handleToothClick(n)} isPediatric={view === 'PEDIATRIC'} />)}
                        </div>
                    </div>

                    {/* Lower Row */}
                    <div className="flex gap-16 justify-center">
                        <div className="flex gap-2">
                            {q4.map(n => <Tooth key={n} number={n} state={toothStates[n]} isSelected={selectedTooth === n} onClick={() => handleToothClick(n)} isPediatric={view === 'PEDIATRIC'} />)}
                        </div>
                        <div className="flex gap-2">
                            {q3.map(n => <Tooth key={n} number={n} state={toothStates[n]} isSelected={selectedTooth === n} onClick={() => handleToothClick(n)} isPediatric={view === 'PEDIATRIC'} />)}
                        </div>
                    </div>
                </div>

                {/* Vertical Divider (Mirror Line) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-100 -translate-x-1/2 border-dashed border-l pointer-events-none" />
            </div>

            {/* Quick Action Menu */}
            <AnimatePresence>
                {selectedTooth && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="w-full max-w-2xl bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                                <span className="text-xl font-black">{selectedTooth}</span>
                            </div>
                            <div>
                                <p className="text-xs font-black text-white/50 uppercase tracking-widest">Action Clinique</p>
                                <p className="text-sm font-bold text-white">Dent {selectedTooth} - {view === 'ADULT' ? 'Définitive' : 'Temporaire'}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {[
                                { state: 'HEALTHY' as ToothState, label: 'Saine', icon: Check, color: 'hover:bg-green-500' },
                                { state: 'CARIES' as ToothState, label: 'Carie', icon: X, color: 'hover:bg-red-500' },
                                { state: 'CROWN' as ToothState, label: 'Couronne', icon: Pencil, color: 'hover:bg-amber-400' },
                                { state: 'IMPLANT' as ToothState, label: 'Implant', icon: Plus, color: 'hover:bg-indigo-500' },
                                { state: 'MISSING' as ToothState, label: 'Absente', icon: Info, color: 'hover:bg-slate-700' },
                            ].map((btn) => (
                                <Button
                                    key={btn.state}
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => changeToothState(btn.state)}
                                    className={cn(
                                        "h-10 px-4 rounded-xl text-white/70 hover:text-white transition-all flex items-center gap-2",
                                        btn.color,
                                        toothStates[selectedTooth] === btn.state && "bg-white/10 text-white ring-1 ring-white/20"
                                    )}
                                >
                                    <btn.icon className="h-3 w-3" />
                                    <span className="text-[10px] font-black uppercase">{btn.label}</span>
                                </Button>
                            ))}
                        </div>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-white/30 hover:text-white"
                            onClick={() => setSelectedTooth(null)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

