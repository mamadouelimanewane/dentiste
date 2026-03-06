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
    Calendar as CalendarIcon,
    MapPin,
    Bell,
    Zap,
    Clock,
    Stethoscope,
    Activity,
    LayoutGrid,
    RefreshCw
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function AgendaPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [activeLocation, setActiveLocation] = useState('CABINET_DAKAR')
    const [isLoading, setIsLoading] = useState(true)
    const [appointments, setAppointments] = useState<any[]>([])
    const [currentTime, setCurrentTime] = useState(new Date())

    // Booking form state
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [patients, setPatients] = useState<any[]>([])
    const [formData, setFormData] = useState({
        patientId: '',
        title: '',
        type: 'CONSULTATION',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '09:00',
        duration: '30',
        isSurgery: false
    })

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    // Always start week on Monday
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i)) // Mon-Sun
    const hours = Array.from({ length: 12 }).map((_, i) => 8 + i) // 8h - 19h

    const locations = [
        { id: 'CABINET_DAKAR', name: 'Elite Dakar Plateau' },
        { id: 'CABINET_ALMADIES', name: 'Almadies Health Center' },
    ]

    const fetchPatients = async () => {
        try {
            const res = await fetch('/api/patients')
            const data = await res.json()
            if (Array.isArray(data)) setPatients(data)
        } catch (e) {
            console.error(e)
        }
    }

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
        fetchPatients()
    }, [])

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.patientId || !formData.title) {
            toast.error("Veuillez remplir tous les champs obligatoires")
            return
        }

        setIsSaving(true)
        try {
            const startStr = `${formData.date}T${formData.time}:00`
            const startDateObj = new Date(startStr)
            const endDateObj = new Date(startDateObj.getTime() + parseInt(formData.duration) * 60000)

            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientId: formData.patientId,
                    title: formData.title,
                    type: formData.type,
                    start: startDateObj.toISOString(),
                    end: endDateObj.toISOString(),
                    isSurgery: formData.type === 'SURGERY',
                    siteId: activeLocation
                })
            })

            if (res.ok) {
                toast.success("Rendez-vous réservé avec succès")
                setIsBookingOpen(false)
                fetchAppointments()
                // Reset form
                setFormData({
                    ...formData,
                    patientId: '',
                    title: '',
                })
            } else {
                toast.error("Erreur lors de la réservation")
            }
        } catch (e) {
            toast.error("Erreur de connexion au serveur")
        } finally {
            setIsSaving(false)
        }
    }

    const getAppPosition = (app: any) => {
        const start = new Date(app.start)
        const end = new Date(app.end)

        // Use ISO string comparison to bypass timezone issues for day check
        const appDay = format(start, 'yyyy-MM-dd')
        const dayIndex = weekDays.findIndex(d => format(d, 'yyyy-MM-dd') === appDay)

        if (dayIndex === -1) return null

        const hour = start.getHours()
        const minutes = start.getMinutes()
        const durationMin = (end.getTime() - start.getTime()) / (60 * 1000)

        // hour row is 160px
        const top = (minutes / 60) * 160
        const height = (durationMin / 60) * 160
        const left = `calc(6rem + (100% - 6rem) / 7 * ${dayIndex})`
        const width = `calc((100% - 6rem) / 7)`

        return { top, height, left, width, hourStart: hour }
    }

    const getCurrentTimePosition = () => {
        const h = currentTime.getHours()
        const m = currentTime.getMinutes()
        if (h < 8 || h >= 20) return null

        const hourIndex = h - 8
        const top = (hourIndex * 160) + (m / 60) * 160
        return top
    }

    const currentTimePos = getCurrentTimePosition()

    const waitingList = patients.filter(p => !p.workflowStatus || p.workflowStatus === 'VISIT_UPCOMING')

    const visibleAppointments = appointments.filter(app => {
        const start = new Date(app.start)
        const appDay = format(start, 'yyyy-MM-dd')
        const matchesWeek = weekDays.some(d => format(d, 'yyyy-MM-dd') === appDay)
        const matchesSite = !app.siteId || app.siteId === activeLocation || activeLocation === 'ALL'
        return matchesWeek && matchesSite
    })

    return (
        <div className="flex h-screen flex-col p-8 space-y-8 bg-slate-50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-gold rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Synchronisation Multi-Sites</span>
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

                    <Button
                        onClick={() => setIsBookingOpen(true)}
                        className="bg-slate-900 text-white font-black uppercase tracking-widest text-xs h-14 rounded-2xl px-8 shadow-xl hover:scale-105 transition-all"
                    >
                        <Plus className="mr-2 h-5 w-5 text-gold" /> Réserver Créneau
                    </Button>
                </div>
            </div>

            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white rounded-[2rem] border-none shadow-luxury">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tight text-slate-900">
                            Nouveau <span className="text-gold">Rendez-vous</span>
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleBooking} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Patient</label>
                            <Select value={formData.patientId} onValueChange={(v) => {
                                const p = patients.find(pat => pat.id === v)
                                setFormData({ ...formData, patientId: v, title: p ? `Consultation ${p.firstName}` : '' })
                            }}>
                                <SelectTrigger className="rounded-xl border-slate-100 bg-slate-50/50 h-12">
                                    <SelectValue placeholder="Sélectionner un patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {patients.map(p => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.firstName} {p.lastName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Titre / Motif</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="ex: Détartrage, Pose implant..."
                                className="rounded-xl border-slate-100 bg-slate-50/50 h-12"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Type de Soin</label>
                                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                                    <SelectTrigger className="rounded-xl border-slate-100 bg-slate-50/50 h-10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CONSULTATION">Consultation</SelectItem>
                                        <SelectItem value="SURGERY">Chirurgie</SelectItem>
                                        <SelectItem value="ESTHETIC">Esthétique</SelectItem>
                                        <SelectItem value="EMERGENCY">Urgence</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Durée (min)</label>
                                <Input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="rounded-xl border-slate-100 bg-slate-50/50 h-10"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="rounded-xl border-slate-100 bg-slate-50/50 h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Heure</label>
                                <Input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="rounded-xl border-slate-100 bg-slate-50/50 h-10"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-slate-900 text-gold font-black uppercase tracking-widest h-14 rounded-2xl shadow-xl mt-4"
                        >
                            {isSaving ? "Enregistrement..." : "Confirmer la Réservation"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="flex-1 flex gap-8 min-h-0">
                {/* Left Sidebar: Waiting List */}
                <div className="w-80 flex flex-col gap-6 shrink-0">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-luxury border border-slate-100 flex-1 flex flex-col overflow-hidden">
                        <div className="flex items-center gap-2 mb-6 shrink-0">
                            <Zap className="h-4 w-4 text-gold animate-pulse" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Liste d'Attente</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-4">
                            {waitingList.length === 0 ? (
                                <div className="text-center py-12 px-4 italic text-slate-300 text-[10px] font-bold uppercase">
                                    Aucun patient en attente de rendez-vous
                                </div>
                            ) : waitingList.map(p => (
                                <button
                                    key={p.id}
                                    className="w-full text-left p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-gold hover:bg-white transition-all active:scale-95 flex flex-col gap-1"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            patientId: p.id,
                                            title: `Consultation ${p.firstName}`,
                                            date: format(new Date(), 'yyyy-MM-dd')
                                        })
                                        setIsBookingOpen(true)
                                        toast.info(`Planification de ${p.firstName}...`, {
                                            description: "Complétez le formulaire pour valider le créneau.",
                                            duration: 3000
                                        })
                                    }}
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs font-black text-slate-800">{p.firstName} {p.lastName}</p>
                                        <div className="h-6 px-2 rounded-full bg-gold/10 flex items-center justify-center text-[7px] font-black text-gold group-hover:bg-gold group-hover:text-white transition-colors uppercase tracking-widest">
                                            Planifier
                                        </div>
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                        {p.phone || 'Pas de numéro'}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-[3rem] text-white flex flex-col gap-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Volume Hebdo</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black text-gold">{visibleAppointments.length}</span>
                                    <span className="text-[10px] font-bold uppercase opacity-60 mb-2">RDV</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-white/20 hover:text-gold hover:bg-white/5 rounded-xl transition-all"
                                onClick={() => { fetchAppointments(); fetchPatients(); }}
                            >
                                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                            </Button>
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-white/40 uppercase">Total Base</span>
                                <span className="text-white/80">{appointments.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="flex-1 border-none rounded-[3rem] bg-white shadow-luxury overflow-hidden flex flex-col relative border border-slate-100">
                    {/* Day Headers */}
                    <div className="flex border-b border-slate-50 bg-slate-50/10 shrink-0">
                        <div className="w-24 border-r border-slate-50 flex flex-col items-center justify-center p-6 shrink-0 bg-slate-50/20">
                            <CalendarIcon className="h-5 w-5 text-slate-300" />
                        </div>
                        {weekDays.map(day => {
                            const isToday = format(day, 'ddMMyyyy') === format(new Date(), 'ddMMyyyy')
                            return (
                                <div key={day.toISOString()} className={cn("flex-1 p-6 text-center border-r border-slate-50 last:border-0", isToday ? "bg-gold/5" : "hover:bg-slate-50/30 transition-colors")}>
                                    <div className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-1.5", isToday ? "text-gold" : "text-slate-400")}>
                                        {format(day, 'EEE', { locale: fr }).replace('.', '')}
                                    </div>
                                    <div className={cn("text-3xl font-black tracking-tighter", isToday ? "text-slate-900" : "text-slate-700")}>
                                        {format(day, 'd', { locale: fr })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto no-scrollbar relative">
                        {isLoading && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md">
                                <RefreshCw className="h-12 w-12 animate-spin text-gold mb-4" />
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Initialisation Elite Planner...</p>
                            </div>
                        )}

                        <div className="relative min-h-[1920px]">
                            {hours.map(hour => (
                                <div key={hour} className="flex h-40 border-b border-slate-50 last:border-0 relative group">
                                    <div className="w-24 border-r border-slate-50 bg-slate-50/20 flex flex-col items-center justify-start pt-8 text-[11px] text-slate-400 sticky left-0 font-black z-30 shrink-0">
                                        <span className="text-slate-900">{hour}:00</span>
                                    </div>

                                    {weekDays.map((_, dayIndex) => (
                                        <div key={dayIndex} className="flex-1 border-r border-slate-50 last:border-0 relative">
                                            <div className="absolute top-1/2 w-full border-t border-dashed border-slate-100 pointer-events-none" />
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Appointments Overlay */}
                            {visibleAppointments.map(app => {
                                const pos = getAppPosition(app)
                                if (!pos) return null
                                const isSurgery = app.isSurgery

                                return (
                                    <motion.div
                                        key={app.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={cn(
                                            "absolute rounded-[2.5rem] p-6 z-20 cursor-pointer shadow-xl border-2 overflow-hidden group transition-all hover:scale-[1.02] hover:shadow-2xl hover:z-30",
                                            isSurgery ? "bg-slate-950 text-white border-gold/50" : "bg-white text-slate-900 border-slate-100"
                                        )}
                                        style={{
                                            left: `calc(${pos.left} + 12px)`,
                                            width: `calc(${pos.width} - 24px)`,
                                            height: `${pos.height - 8}px`,
                                            top: `${(pos.hourStart - 8) * 160 + pos.top + 4}px`
                                        }}
                                    >
                                        <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-150 transition-transform duration-700">
                                            {isSurgery ? <Activity className="h-24 w-24 text-gold" /> : <Stethoscope className="h-24 w-24 text-slate-200" />}
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={cn("h-2 w-2 rounded-full", isSurgery ? "bg-gold animate-pulse" : "bg-indigo-400")} />
                                            <span className={cn("text-[8px] font-black uppercase tracking-widest", isSurgery ? "text-gold" : "text-slate-400")}>
                                                {app.type || 'Soin'}
                                            </span>
                                        </div>
                                        <div className="font-black text-sm tracking-tight mb-1 truncate">
                                            {app.patient ? `${app.patient.firstName} ${app.patient.lastName}` : 'Patient VIP'}
                                        </div>
                                        <div className={cn("text-[9px] font-bold line-clamp-1 opacity-70", isSurgery ? "text-slate-400" : "text-slate-500")}>
                                            {app.title}
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {/* Current Time Line */}
                            {currentTimePos !== null && (
                                <div
                                    className="absolute left-24 right-0 h-[3px] bg-red-500 z-40 pointer-events-none transition-all duration-1000"
                                    style={{ top: `${currentTimePos}px` }}
                                >
                                    <div className="absolute -left-1.5 -top-1.5 h-4 w-4 bg-red-500 rounded-full border-4 border-white shadow-xl" />
                                    <div className="absolute left-6 top-2 bg-red-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg">
                                        {format(currentTime, 'HH:mm')}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
