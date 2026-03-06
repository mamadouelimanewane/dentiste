"use client"

import { useState, useEffect } from 'react'
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
    LayoutGrid,
    Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AgendaPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [activeLocation, setActiveLocation] = useState('CABINET_DAKAR')
    const [isLoading, setIsLoading] = useState(true)
    const [appointments, setAppointments] = useState<any[]>([])

    // Always start week on Monday
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
    const weekDays = Array.from({ length: 6 }).map((_, i) => addDays(startDate, i)) // Mon-Sat
    const hours = Array.from({ length: 11 }).map((_, i) => 8 + i) // 8h - 18h

    const locations = [
        { id: 'CABINET_DAKAR', name: 'Elite Dakar Plateau' },
        { id: 'CABINET_ALMADIES', name: 'Almadies Health Center' },
    ]

    const fetchAppointments = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/appointments')
            const data = await res.json()
            if (Array.isArray(data)) {
                setAppointments(data)
            }
        } catch (error) {
            console.error("Failed to fetch appointments:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAppointments()
    }, [])

    const getAppPosition = (app: any) => {
        const start = new Date(app.start)
        const end = new Date(app.end)
        const dayIndex = weekDays.findIndex(d => format(d, 'yyyy-MM-dd') === format(start, 'yyyy-MM-dd'))

        if (dayIndex === -1) return null

        const hour = start.getHours()
        const minutes = start.getMinutes()
        const durationMin = (end.getTime() - start.getTime()) / (60 * 1000)

        // hour row is 160px
        const top = (minutes / 60) * 160
        const height = (durationMin / 60) * 160
        const left = `calc(6rem + (100% - 6rem) / 6 * ${dayIndex})`
        const width = `calc((100% - 6rem) / 6 - 24px)`

        return { top, height, left, width, hourStart: hour }
    }

    return (
        <div className="flex h-screen flex-col p-8 space-y-8 bg-slate-50 overflow-hidden">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-accent rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Synchronisation Multi-Sites</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-gold">Planner Pro</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Gestion intelligente des ressources et rappels multi-canaux.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white border-none shadow-luxury rounded-2xl p-1 flex items-center">
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
                    </div>

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

                    <Button className="bg-slate-900 text-white font-black uppercase tracking-widest text-xs h-14 rounded-2xl px-8 shadow-xl">
                        <Plus className="mr-2 h-5 w-5" /> Réserver Créneau
                    </Button>
                </div>
            </div>

            <div className="flex justify-between items-center shrink-0">
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">
                        <LayoutGrid className="h-4 w-4 mr-2" /> Vue Ressource
                    </Button>
                    <Button variant="outline" className="rounded-xl border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">
                        < Zap className="h-4 w-4 mr-2 text-gold" /> Liste d'attente
                    </Button>
                </div>
                <div className="bg-teal-50 px-4 py-2 rounded-xl border border-teal-100 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-teal-600" />
                    <span className="text-[10px] font-black uppercase text-teal-700">{appointments.length} RDV cette semaine</span>
                </div>
            </div>

            <div className="flex-1 border-none rounded-[3rem] bg-white shadow-luxury overflow-hidden flex flex-col relative border border-slate-100">
                <div className="flex border-b border-slate-50 bg-slate-50/10 shrink-0">
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

                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                    {isLoading ? (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
                            <Loader2 className="h-12 w-12 animate-spin text-gold mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Chargement de l'agenda...</p>
                        </div>
                    ) : null}

                    {hours.map(hour => (
                        <div key={hour} className="flex h-40 border-b border-slate-50 last:border-0 relative hover:bg-slate-50/10 transition-colors">
                            <div className="w-24 border-r border-slate-50 bg-slate-50/20 flex flex-col items-center justify-start pt-8 text-[11px] text-slate-400 sticky left-0 font-black z-30 shrink-0">
                                <span className="text-slate-900">{hour}:00</span>
                                <span className="text-[8px] opacity-40 mt-1">30 min</span>
                            </div>

                            {weekDays.map((_, dayIndex) => (
                                <div key={dayIndex} className="flex-1 border-r border-slate-50 last:border-0 relative">
                                    <div className="absolute top-1/2 w-full border-t border-dashed border-slate-50/50 pointer-events-none" />
                                </div>
                            ))}

                            {appointments.map(app => {
                                const pos = getAppPosition(app)
                                if (!pos || pos.hourStart !== hour) return null
                                const isSurgery = app.isSurgery

                                return (
                                    <motion.div
                                        key={app.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={cn(
                                            "absolute rounded-[2rem] p-4 z-20 cursor-pointer shadow-xl border overflow-hidden group transition-all",
                                            isSurgery ? "bg-slate-950 text-white border-white/5" : "bg-white text-slate-900 border-slate-100 hover:bg-slate-50"
                                        )}
                                        style={{
                                            left: `calc(${pos.left} + 12px)`,
                                            width: pos.width,
                                            height: `${pos.height}px`,
                                            top: `${pos.top}px`
                                        }}
                                    >
                                        <div className="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-125 transition-transform duration-500">
                                            {isSurgery ? <Activity className="h-16 w-16 text-accent" /> : <Clock className="h-16 w-16 text-slate-200" />}
                                        </div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border",
                                                isSurgery ? "bg-accent/20 text-accent border-accent/20" : "bg-slate-100 text-slate-500 border-slate-200"
                                            )}>{app.type || 'Soin'}</span>
                                        </div>
                                        <div className="font-black text-xs tracking-tight line-clamp-1">
                                            {app.patient ? `${app.patient.firstName} ${app.patient.lastName}` : 'Patient Inconnu'}
                                        </div>
                                        <div className={cn("text-[8px] font-bold mt-0.5 truncate", isSurgery ? "text-slate-400" : "text-slate-500")}>{app.title}</div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    ))}

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
