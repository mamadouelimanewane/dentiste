"use client"

import { useState } from 'react'
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Monitor, MessageSquare, Users, Clock, Calendar, Star, ChevronRight, Wifi, Camera } from 'lucide-react'

const UPCOMING_SESSIONS = [
    { id: 1, patient: 'Amadou Diallo', time: '14:00', duration: 30, type: 'Consultation', status: 'scheduled', avatar: 'AD' },
    { id: 2, patient: 'Fatou Mbaye', time: '14:45', duration: 20, type: 'Suivi Post-Op', status: 'scheduled', avatar: 'FM' },
    { id: 3, patient: 'Ibrahima Sow', time: '15:30', duration: 45, type: 'Urgence', status: 'waiting', avatar: 'IS' },
]

const PAST_SESSIONS = [
    { id: 4, patient: 'Mariama Diop', date: '17 Fév 2026', duration: 25, type: 'Consultation', rating: 5 },
    { id: 5, patient: 'Ousmane Ndiaye', date: '16 Fév 2026', duration: 30, type: 'Suivi', rating: 4 },
    { id: 6, patient: 'Aissatou Ba', date: '15 Fév 2026', duration: 20, type: 'Urgence', rating: 5 },
]

export default function TeleconsultationPage() {
    const [activeSession, setActiveSession] = useState(false)
    const [videoOn, setVideoOn] = useState(true)
    const [micOn, setMicOn] = useState(true)
    const [screenShare, setScreenShare] = useState(false)
    const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming')

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-slate-900 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Médecine à Distance</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Télé<span className="text-blue-600">consultation</span></h1>
                </div>
                <button
                    onClick={() => setActiveSession(!activeSession)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeSession ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {activeSession ? <><PhoneOff className="h-4 w-4" /> Terminer la Session</> : <><Video className="h-4 w-4" /> Démarrer une Session</>}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Sessions ce mois', value: '47', icon: Video, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Patients consultés', value: '38', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50' },
                    { label: 'Durée moyenne', value: '28 min', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Satisfaction', value: '4.9/5', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map(stat => (
                    <div key={stat.label} className={`${stat.bg} rounded-[2rem] p-5 flex items-center gap-4`}>
                        <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Area */}
                <div className="lg:col-span-2 space-y-4">
                    {activeSession ? (
                        <div className="bg-slate-950 rounded-[2rem] overflow-hidden aspect-video relative">
                            {/* Main Video */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {videoOn ? (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="h-24 w-24 rounded-full bg-blue-600/20 border-2 border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                                                <span className="text-3xl font-black text-blue-400">IS</span>
                                            </div>
                                            <p className="text-white font-black">Ibrahima Sow</p>
                                            <div className="flex items-center gap-2 justify-center mt-2">
                                                <Wifi className="h-3 w-3 text-teal-400" />
                                                <span className="text-xs text-teal-400 font-bold">Connexion stable</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <VideoOff className="h-12 w-12 text-slate-600" />
                                        <p className="text-slate-500 font-bold text-sm">Vidéo désactivée</p>
                                    </div>
                                )}
                            </div>

                            {/* Self Preview */}
                            <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-800 rounded-xl border-2 border-white/10 flex items-center justify-center overflow-hidden">
                                <div className="text-center">
                                    <Camera className="h-6 w-6 text-slate-500 mx-auto" />
                                    <p className="text-[9px] text-slate-500 mt-1">Vous</p>
                                </div>
                            </div>

                            {/* Session Timer */}
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-white text-xs font-black">12:34</span>
                            </div>

                            {/* Controls */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                                <button onClick={() => setMicOn(!micOn)}
                                    className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-500 text-white'}`}>
                                    {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                                </button>
                                <button onClick={() => setVideoOn(!videoOn)}
                                    className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${videoOn ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-500 text-white'}`}>
                                    {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                                </button>
                                <button onClick={() => setScreenShare(!screenShare)}
                                    className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${screenShare ? 'bg-blue-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
                                    <Monitor className="h-5 w-5" />
                                </button>
                                <button className="h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all">
                                    <MessageSquare className="h-5 w-5" />
                                </button>
                                <button onClick={() => setActiveSession(false)}
                                    className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all">
                                    <PhoneOff className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-950 rounded-[2rem] aspect-video flex flex-col items-center justify-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                                <Video className="h-10 w-10 text-blue-400" />
                            </div>
                            <div className="text-center">
                                <p className="text-white font-black text-lg">Aucune session active</p>
                                <p className="text-slate-500 text-sm mt-1">Démarrez une session ou rejoignez un patient en attente</p>
                            </div>
                            <button onClick={() => setActiveSession(true)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">
                                Démarrer maintenant
                            </button>
                        </div>
                    )}

                    {/* Session Notes */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-6">
                        <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-3">Notes de Session</h3>
                        <textarea
                            className="w-full h-24 bg-slate-50 rounded-xl p-4 text-sm text-slate-700 focus:outline-none resize-none border border-slate-100 focus:border-blue-200 transition-colors"
                            placeholder="Notez vos observations cliniques, prescriptions, recommandations..."
                        />
                        <div className="flex gap-3 mt-3">
                            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest">Sauvegarder</button>
                            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest">Générer Ordonnance</button>
                        </div>
                    </div>
                </div>

                {/* Sessions Panel */}
                <div className="space-y-4">
                    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                        <div className="flex border-b border-slate-100">
                            {(['upcoming', 'history'] as const).map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'}`}>
                                    {tab === 'upcoming' ? 'À venir' : 'Historique'}
                                </button>
                            ))}
                        </div>

                        <div className="divide-y divide-slate-50">
                            {activeTab === 'upcoming' ? UPCOMING_SESSIONS.map(session => (
                                <div key={session.id} className="p-4 hover:bg-slate-50 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 ${session.status === 'waiting' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                                            {session.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-slate-900 text-sm">{session.patient}</p>
                                            <p className="text-xs text-slate-400">{session.type} • {session.duration} min</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-slate-700">{session.time}</p>
                                            {session.status === 'waiting' && (
                                                <span className="text-[9px] font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">En attente</span>
                                            )}
                                        </div>
                                    </div>
                                    {session.status === 'waiting' && (
                                        <button onClick={() => setActiveSession(true)}
                                            className="w-full mt-3 py-2 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                            <Video className="h-3.5 w-3.5" /> Rejoindre
                                        </button>
                                    )}
                                </div>
                            )) : PAST_SESSIONS.map(session => (
                                <div key={session.id} className="p-4 hover:bg-slate-50 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-black text-slate-900 text-sm">{session.patient}</p>
                                            <p className="text-xs text-slate-400">{session.type} • {session.date}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < session.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
