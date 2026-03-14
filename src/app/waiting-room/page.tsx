"use client"

import { useState, useEffect } from 'react'
import { Clock, Users, CheckCircle, AlertCircle, QrCode, Bell, ChevronRight, Wifi, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

const ANNOUNCEMENTS = [
    "Bienvenue à la Clinique DentoPrestige — Votre santé bucco-dentaire est notre priorité",
    "Rappel : Désinfectez vos mains à l'entrée de la salle de soins",
    "Nouveau service : Téléconsultation disponible — Demandez à la réception",
    "Prochain contrôle annuel ? Prenez rendez-vous en ligne sur notre portail patient",
]

export default function WaitingRoomPage() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [queue, setQueue] = useState<any[]>([])
    const [announcementIdx, setAnnouncementIdx] = useState(0)
    const [showQR, setShowQR] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    // Check if the appointment is today
    const isToday = (dateString: string) => {
        const d = new Date(dateString);
        const today = new Date();
        return d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
    };

    const fetchQueue = async () => {
        try {
            const res = await fetch('/api/appointments')
            const data = await res.json()
            if (Array.isArray(data)) {
                // Map the data to only show today's appointments that are not fully completed for tracking, or show all for tracking.
                const todayApps = data
                    .filter(app => isToday(app.start))
                    .map(app => {
                        // Calculate wait time based on difference from start time and current time
                        const start = new Date(app.start)
                        const diffInMin = Math.round((new Date().getTime() - start.getTime()) / 60000)

                        return {
                            id: app.id,
                            name: app.patient ? `${app.patient.firstName} ${app.patient.lastName}` : 'Patient',
                            time: start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                            type: app.type,
                            // Map normal db status to local ui statuses
                            status: app.status === 'IN_PROGRESS' ? 'in-progress' :
                                app.status === 'DONE' ? 'done' :
                                    app.status === 'ARRIVED' ? 'arrived' : 'waiting',
                            waitTime: diffInMin > 0 ? diffInMin : 0,
                            room: app.siteId || 'Cabinet'
                        }
                    })
                setQueue(todayApps)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Polling and live timers
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setAnnouncementIdx(i => (i + 1) % ANNOUNCEMENTS.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        fetchQueue()
        const polling = setInterval(fetchQueue, 5000) // Poll every 5s for realtime updates
        return () => clearInterval(polling)
    }, [])

    const callNext = async () => {
        if (isUpdating) return
        setIsUpdating(true)
        try {
            // Find current in-progress and mark as done
            const inProgress = queue.find(p => p.status === 'in-progress')
            if (inProgress) {
                await fetch(`/api/appointments/${inProgress.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'DONE' })
                })
            }

            // Find next waiting and mark as in-progress
            const nextWaiting = queue.find(p => p.status === 'waiting' || p.status === 'arrived')
            if (nextWaiting) {
                await fetch(`/api/appointments/${nextWaiting.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'IN_PROGRESS' })
                })

                // Play notification sound
                try {
                    const speech = new SpeechSynthesisUtterance(`${nextWaiting.name}, veuillez vous rendre en ${nextWaiting.room}.`);
                    speech.lang = 'fr-FR';
                    window.speechSynthesis.speak(speech);
                } catch (e) { }
            }

            await fetchQueue()
        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

    const activePatients = queue.filter(p => p.status === 'in-progress')
    const waitingPatients = queue.filter(p => p.status === 'waiting')

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-slate-900 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Gestion Flux Patient</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Salle d'Attente <span className="text-emerald-gradient">Digitale</span></h1>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowQR(!showQR)}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
                        <QrCode className="h-4 w-4" /> QR Check-in
                    </button>
                    <button onClick={callNext} disabled={isUpdating}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20",
                            isUpdating ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
                        )}>
                        {isUpdating ? <Activity className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
                        Appeler Suivant
                    </button>
                </div>
            </div>

            {/* Live Clock + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1 bg-slate-950 rounded-[2rem] p-6 text-white flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 mb-1">
                        <Wifi className="h-3 w-3 text-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Heure en direct</span>
                    </div>
                    <p className="text-4xl font-black tracking-tighter text-white">
                        {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                        {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>
                {[
                    { label: 'En cours de soin', value: activePatients.length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Activity },
                    { label: 'En attente', value: waitingPatients.length, color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock },
                    { label: 'Arrivés (non appelés)', value: queue.filter(p => p.status === 'arrived').length, color: 'text-blue-600', bg: 'bg-blue-50', icon: Users },
                ].map(stat => (
                    <div key={stat.label} className={`${stat.bg} rounded-[2rem] p-6 flex items-center gap-4`}>
                        <div className={`h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-sm`}>
                            <stat.icon className={`h-7 w-7 ${stat.color}`} />
                        </div>
                        <div>
                             <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* QR Code Panel */}
            {showQR && (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg p-8 flex items-center gap-8">
                    <div className="h-32 w-32 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <div className="grid grid-cols-5 gap-0.5 p-2">
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i} className={`h-3 w-3 rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-slate-900'}`} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Check-in QR Code</h3>
                        <p className="text-sm text-slate-500 mt-1 max-w-md">
                            Les patients scannent ce code à leur arrivée pour s'enregistrer automatiquement dans la file d'attente. Affichez-le à la réception ou à l'entrée.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest">Imprimer</button>
                            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest">Afficher en grand</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Announcement Banner */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 overflow-hidden">
                <Bell className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <p className="text-sm font-bold text-slate-700 transition-all duration-500">{ANNOUNCEMENTS[announcementIdx]}</p>
            </div>

            {/* Queue Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">File d'Attente du Jour</h2>
                    <span className="text-xs font-bold text-slate-400">{queue.filter(p => p.status !== 'done').length} patients restants</span>
                </div>
                <div className="divide-y divide-slate-50">
                    {queue.map((patient, i) => (
                        <div key={patient.id} className={`flex items-center gap-4 px-6 py-4 transition-all ${patient.status === 'in-progress' ? 'bg-teal-50' : patient.status === 'done' ? 'opacity-40' : 'hover:bg-slate-50'}`}>
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">{i + 1}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <p className="font-black text-slate-900 text-sm">{patient.name}</p>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{patient.type}</span>
                                </div>
                                <p className="text-xs text-slate-400">RDV {patient.time} • {patient.room}</p>
                            </div>
                            <div className="text-right">
                                {patient.status === 'in-progress' && (
                                    <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                                        <Activity className="h-3 w-3 animate-pulse" /> En soin
                                    </span>
                                )}
                                {patient.status === 'waiting' && (
                                    <span className="text-xs font-bold text-orange-600">~{patient.waitTime} min</span>
                                )}
                                {patient.status === 'arrived' && (
                                    <span className="flex items-center gap-1 text-xs font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                                        <CheckCircle className="h-3 w-3" /> Arrivé
                                    </span>
                                )}
                                {patient.status === 'done' && (
                                    <span className="flex items-center gap-1 text-xs font-black text-slate-400">
                                        <CheckCircle className="h-3 w-3" /> Terminé
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
