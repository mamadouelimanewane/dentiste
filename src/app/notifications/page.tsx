"use client"

import { useState, useEffect } from 'react'
import { Bell, X, CheckCircle, AlertCircle, Clock, Calendar, DollarSign, Users, MessageSquare, Stethoscope, ChevronRight, Settings, Trash2 } from 'lucide-react'

export type NotificationType = 'appointment' | 'payment' | 'patient' | 'alert' | 'message' | 'system'

export interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    time: string
    read: boolean
    priority: 'high' | 'medium' | 'low'
    action?: string
}

const INITIAL_NOTIFICATIONS: Notification[] = [
    { id: '1', type: 'appointment', title: 'RDV dans 30 minutes', message: 'Ibrahima Sow — Extraction molaire — Salle 1', time: 'Il y a 2 min', read: false, priority: 'high', action: '/agenda' },
    { id: '2', type: 'payment', title: 'Paiement reçu', message: 'Aissatou Ba a payé 95 000 FCFA via Wave', time: 'Il y a 15 min', read: false, priority: 'medium', action: '/payment' },
    { id: '3', type: 'alert', title: 'Stock critique', message: 'Anesthésique Lidocaïne — Seuil minimum atteint (2 unités)', time: 'Il y a 1h', read: false, priority: 'high', action: '/inventory' },
    { id: '4', type: 'patient', title: 'Nouveau patient enregistré', message: 'Rokhaya Fall — Référée par Dr. Diallo', time: 'Il y a 2h', read: true, priority: 'low', action: '/patients' },
    { id: '5', type: 'message', title: 'Message de Aminata Sow', message: 'La stérilisation de la salle 2 est terminée', time: 'Il y a 3h', read: true, priority: 'low', action: '/messages' },
    { id: '6', type: 'payment', title: 'Facture en retard', message: 'Fatou Mbaye — F-2026-091 — 3 jours de retard', time: 'Il y a 5h', read: true, priority: 'high', action: '/payment' },
    { id: '7', type: 'system', title: 'Sauvegarde automatique', message: 'Backup cloud HDS effectué avec succès — 2.3 GB', time: 'Il y a 8h', read: true, priority: 'low' },
    { id: '8', type: 'appointment', title: 'Rappel envoyé', message: '12 SMS de rappel envoyés pour les RDV de demain', time: 'Hier 18:00', read: true, priority: 'medium' },
]

const TYPE_CONFIG = {
    appointment: { icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
    payment: { icon: DollarSign, color: 'text-teal-600', bg: 'bg-teal-100' },
    patient: { icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    alert: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
    message: { icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-100' },
    system: { icon: Settings, color: 'text-slate-600', bg: 'bg-slate-100' },
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
    const [filter, setFilter] = useState<'all' | NotificationType>('all')

    const unreadCount = notifications.filter(n => !n.read).length

    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    const deleteNotif = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id))

    const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter)

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-slate-900 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Centre d'Alertes</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Notifications</h1>
                        {unreadCount > 0 && (
                            <span className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center text-white font-black text-sm">{unreadCount}</span>
                        )}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={markAllRead}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 transition-all">
                        <CheckCircle className="h-3.5 w-3.5" /> Tout marquer lu
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { id: 'all', label: 'Tout' },
                    { id: 'appointment', label: 'RDV' },
                    { id: 'payment', label: 'Paiements' },
                    { id: 'alert', label: 'Alertes' },
                    { id: 'message', label: 'Messages' },
                    { id: 'patient', label: 'Patients' },
                    { id: 'system', label: 'Système' },
                ].map(f => (
                    <button key={f.id} onClick={() => setFilter(f.id as any)}
                        className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${filter === f.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}>
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
                {filtered.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-[2rem] border border-slate-100">
                        <Bell className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                        <p className="font-black text-slate-400 text-sm">Aucune notification</p>
                    </div>
                ) : (
                    filtered.map(notif => {
                        const config = TYPE_CONFIG[notif.type]
                        return (
                            <div key={notif.id}
                                className={`group flex items-start gap-4 p-5 rounded-[1.5rem] border transition-all cursor-pointer ${notif.read ? 'bg-white border-slate-100 hover:border-slate-200' : 'bg-blue-50/50 border-blue-100 hover:border-blue-200'}`}
                                onClick={() => markRead(notif.id)}>
                                <div className={`h-11 w-11 rounded-2xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                                    <config.icon className={`h-5 w-5 ${config.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className={`font-black text-sm ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</p>
                                        {!notif.read && <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />}
                                        {notif.priority === 'high' && (
                                            <span className="text-[9px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Urgent</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                                    <p className="text-[10px] text-slate-400 mt-1 font-bold">{notif.time}</p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {notif.action && (
                                        <a href={notif.action} className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all">
                                            <ChevronRight className="h-4 w-4 text-slate-500" />
                                        </a>
                                    )}
                                    <button onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id) }}
                                        className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-red-100 flex items-center justify-center transition-all">
                                        <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-500" />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
