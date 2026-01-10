"use client"

import { useState } from 'react'
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns'
import { fr } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Video,
    Calendar as CalendarIcon,
    MoreVertical,
    Search,
    Filter,
    Users,
    MapPin,
    Bell,
    Zap,
    Clock,
    Stethoscope,
    ShieldCheck,
    Activity,
    UserCheck,
    ListFilter,
    LayoutGrid
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AgendaPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<'WEEK' | 'DAY' | 'RESOURCE'>('WEEK')
    const [activeLocation, setActiveLocation] = useState('CABINET_DAKAR')

    // Always start week on Monday
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
    const weekDays = Array.from({ length: 6 }).map((_, i) => addDays(startDate, i)) // Mon-Sat

    const hours = Array.from({ length: 11 }).map((_, i) => 8 + i) // 8h - 18h

    const locations = [
        { id: 'CABINET_DAKAR', name: 'Elite Dakar Plateau' },
        { id: 'CABINET_ALMADIES', name: 'Almadies Health Center' },
    ]

    return (
        <div className="flex h-full flex-col p-8 space-y-8 bg-slate-50 overflow-hidden">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-accent rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Synchronisation Multi-Sites</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-gold">Planner Pro</span></h1>
                    <p className="text-slate-500 font-medium">Gestion intelligente des ressources, rappels multi-canaux et liste d'attente IA.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Location Selector */}
                    <Card className="bg-white border-none shadow-luxury rounded-2xl p-1 flex items-center">
                        {locations.map(loc => (
                            <Button
                                key={loc.id}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "rounded-xl px-4 text-[10px] font-black uppercase tracking-widest h-9",
                                    activeLocation === loc.id ? "bg-slate-900 text-white" : "text-slate-400"
                                )}
                                onClick={() => setActiveLocation(loc.id)}
                            >
                                <MapPin className="h-3 w-3 mr-2" /> {loc.name}
                            </Button>
                        ))}
                    </Card>

                    <div className="flex items-center bg-white rounded-2xl border shadow-luxury p-1">
                        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-slate-400" onClick={() => setCurrentDate(subWeeks(currentDate, 1))}>
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <div className="px-6 text-sm font-black capitalize text-slate-900 tracking-tight min-w-[140px] text-center">
                            {format(currentDate, 'MMMM yyyy', { locale: fr })}
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-slate-400" onClick={() => setCurrentDate(addWeeks(currentDate, 1))}>
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>

                    <Button className="bg-slate-900 text-white font-black uppercase tracking-widest text-xs h-14 rounded-2xl px-8 shadow-xl hover:bg-slate-800 transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Réserver Créneau
                    </Button>
                </div>
            </div>

            {/* Quick Actions & Filters Bar */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">
                        <LayoutGrid className="h-4 w-4 mr-2" /> Vue Ressource
                    </Button>
                    <Button variant="outline" className="rounded-xl border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">
                        <Zap className="h-4 w-4 mr-2 text-gold" /> Liste d'attente (3)
                    </Button>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-xl border border-teal-100">
                        <Bell className="h-4 w-4 text-teal-600" />
                        <span className="text-[10px] font-black uppercase text-teal-700">Rappels J+1 : 85% Confirmés</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 border-none rounded-[3rem] bg-white shadow-luxury overflow-hidden flex flex-col relative border border-slate-100">
                {/* Header Row */}
                <div className="flex border-b border-slate-50 bg-slate-50/10">
                    <div className="w-24 border-r border-slate-50 flex flex-col items-center justify-center p-6 shrink-0">
                        <Clock className="h-5 w-5 text-slate-300" />
                    </div>
                    {weekDays.map(day => {
                        const isToday = format(day, 'ddMMyyyy') === format(new Date(), 'ddMMyyyy')
                        return (
                            <div key={day.toISOString()} className={cn("flex-1 p-6 text-center border-r border-slate-50 last:border-0", isToday ? "bg-slate-50/60" : "hover:bg-slate-50/30")}>
                                <div className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-1.5", isToday ? "text-accent" : "text-slate-400")}>
                                    {format(day, 'EEE', { locale: fr }).replace('.', '')}
                                </div>
                                <div className={cn("text-3xl font-black tracking-tighter", isToday ? "text-slate-900" : "text-slate-700")}>
                                    {format(day, 'd', { locale: fr })}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Grid Container */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                    {hours.map(hour => (
                        <div key={hour} className="flex h-40 border-b border-slate-50 last:border-0 relative hover:bg-slate-50/10 transition-colors">
                            {/* Time Label */}
                            <div className="w-24 border-r border-slate-50 bg-slate-50/20 flex flex-col items-center justify-start pt-8 text-[11px] text-slate-400 sticky left-0 font-black z-30 shrink-0">
                                <span className="text-slate-900">{hour}:00</span>
                                <span className="text-[8px] opacity-40 mt-1">30 min</span>
                            </div>

                            {/* Day Columns */}
                            {weekDays.map((_, dayIndex) => (
                                <div key={dayIndex} className="flex-1 border-r border-slate-50 last:border-0 relative">
                                    {/* Guideline for half hour */}
                                    <div className="absolute top-1/2 w-full border-t border-dashed border-slate-50/50 pointer-events-none" />
                                </div>
                            ))}

                            {/* Mock Appointments */}

                            {/* Tuesday RDV - Double Resource Surgery */}
                            {hour === 10 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute bg-slate-950 text-white rounded-[2rem] p-6 z-20 cursor-pointer shadow-2xl border border-white/5 group hover:ring-2 hover:ring-accent hover:ring-offset-4 overflow-hidden"
                                    style={{
                                        left: `calc(6rem + (100% - 6rem) / 6 * 1 + 12px)`,
                                        width: `calc((100% - 6rem) / 6 - 24px)`,
                                        height: '140%', // Dynamic time: 1.5 hours
                                        top: '10%'
                                    }}
                                >
                                    <div className="absolute right-[-10px] top-[-10px] opacity-20 group-hover:scale-125 transition-transform duration-500">
                                        <Activity className="h-24 w-24 text-accent" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-[8px] font-black uppercase tracking-widest border border-accent/20">Bloc Onyx</span>
                                    </div>
                                    <div className="font-black text-base tracking-tight mb-1">Mamadou Diallo</div>
                                    <div className="text-[10px] text-slate-400 font-bold">Implant #16 • 90m</div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                <div className="h-7 w-7 rounded-lg bg-teal-500 flex items-center justify-center text-[9px] font-black border-2 border-slate-950">DM</div>
                                                <div className="h-7 w-7 rounded-lg bg-indigo-500 flex items-center justify-center text-[9px] font-black border-2 border-slate-950">AF</div>
                                            </div>
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Duo Actif</span>
                                        </div>
                                        <div className="h-6 w-6 rounded-full bg-teal-500/10 flex items-center justify-center">
                                            <ShieldCheck className="h-3 w-3 text-teal-500" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Wednesday RDV - Quick Checkup with Reminder status */}
                            {hour === 14 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute bg-white text-slate-900 rounded-[2rem] p-6 z-20 cursor-pointer shadow- luxury border border-slate-100 group hover:bg-slate-50 transition-all"
                                    style={{
                                        left: `calc(6rem + (100% - 6rem) / 6 * 2 + 12px)`,
                                        width: `calc((100% - 6rem) / 6 - 24px)`,
                                        height: '45%', // Short appointment: 30 min
                                        top: '10%'
                                    }}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-black text-sm tracking-tight text-slate-950 line-clamp-1">Marie Sarr</div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-teal-500" title="Rappel Confirmé" />
                                            <Bell className="h-3 w-3 text-teal-600" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Consultation • G-1</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Wednesday RDV 2 - Invisalign Review */}
                            {hour === 15 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute bg-indigo-50 text-indigo-900 rounded-[2rem] p-6 z-20 cursor-pointer border border-indigo-100 group overflow-hidden"
                                    style={{
                                        left: `calc(6rem + (100% - 6rem) / 6 * 2 + 12px)`,
                                        width: `calc((100% - 6rem) / 6 - 24px)`,
                                        height: '75%', // 45 min
                                        top: '10%'
                                    }}
                                >
                                    <div className="absolute right-[-20px] top-[-20px] opacity-10">
                                        <Zap className="h-20 w-20" />
                                    </div>
                                    <h4 className="font-black text-sm tracking-tight">Oumar Sy</h4>
                                    <p className="text-[9px] font-black uppercase text-indigo-500 tracking-[0.2em] mt-1">Ortho Aligneurs • 45m</p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <div className="h-6 w-6 rounded-lg bg-indigo-600/10 flex items-center justify-center">
                                            <UserCheck className="h-3.5 w-3.5 text-indigo-600" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-tighter">Dr. Diallo</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}

                    {/* Time Marker */}
                    <div className="absolute left-24 right-0 h-[1px] bg-red-500/50 z-40 border-t border-red-500 pointer-events-none" style={{ top: '35%' }}>
                        <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-red-500 rounded-full border-2 border-white shadow-md" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={cn(className)}>{children}</div>
}

