"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Hash, Lock, Plus, Search, Paperclip, Smile, Phone, Video, MoreHorizontal, Circle } from 'lucide-react'

const CHANNELS = [
    { id: 'general', name: 'Général', type: 'public', unread: 3 },
    { id: 'clinique', name: 'Clinique', type: 'public', unread: 0 },
    { id: 'urgences', name: 'Urgences', type: 'public', unread: 1 },
    { id: 'admin', name: 'Administration', type: 'private', unread: 0 },
]

const TEAM = [
    { id: 1, name: 'Dr. Fatou Diallo', role: 'Praticien', status: 'online', avatar: 'FD' },
    { id: 2, name: 'Aminata Sow', role: 'Assistante', status: 'online', avatar: 'AS' },
    { id: 3, name: 'Moussa Ndiaye', role: 'Secrétaire', status: 'away', avatar: 'MN' },
    { id: 4, name: 'Dr. Ibrahima Ba', role: 'Praticien', status: 'offline', avatar: 'IB' },
]

const INITIAL_MESSAGES: Record<string, any[]> = {
    general: [
        { id: 1, author: 'Dr. Fatou Diallo', avatar: 'FD', time: '09:15', text: 'Bonjour à tous ! La salle 2 est disponible pour les urgences ce matin.', role: 'Praticien' },
        { id: 2, author: 'Aminata Sow', avatar: 'AS', time: '09:18', text: 'Merci Dr. Diallo. J\'ai préparé le matériel de stérilisation.', role: 'Assistante' },
        { id: 3, author: 'Moussa Ndiaye', avatar: 'MN', time: '09:22', text: 'Rappel : 3 patients en attente de confirmation pour cet après-midi.', role: 'Secrétaire' },
        { id: 4, author: 'Dr. Aere Lao', avatar: 'DR', time: '09:30', text: 'Réunion d\'équipe à 13h00 en salle de pause. Ordre du jour : protocoles de stérilisation mis à jour.', role: 'Admin' },
    ],
    urgences: [
        { id: 1, author: 'Moussa Ndiaye', avatar: 'MN', time: '10:05', text: '🚨 Patient en urgence : douleur intense molaire supérieure droite. Arrivée dans 15 min.', role: 'Secrétaire' },
    ],
    clinique: [],
    admin: [],
}

export default function MessagesPage() {
    const [activeChannel, setActiveChannel] = useState('general')
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [input, setInput] = useState('')
    const [search, setSearch] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, activeChannel])

    const sendMessage = () => {
        if (!input.trim()) return
        const newMsg = {
            id: Date.now(),
            author: 'Dr. Aere Lao',
            avatar: 'DR',
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            text: input,
            role: 'Admin',
            isMe: true,
        }
        setMessages(prev => ({ ...prev, [activeChannel]: [...(prev[activeChannel] || []), newMsg] }))
        setInput('')
    }

    const statusColor = (status: string) => {
        if (status === 'online') return 'bg-teal-500'
        if (status === 'away') return 'bg-yellow-500'
        return 'bg-slate-400'
    }

    const currentChannel = CHANNELS.find(c => c.id === activeChannel)

    return (
        <div className="flex h-[calc(100vh-5rem)] bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm mx-6 mb-6">
            {/* Sidebar */}
            <div className="w-64 bg-slate-950 flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Rechercher..."
                            className="w-full h-9 bg-white/5 border border-white/10 rounded-xl text-white text-xs pl-9 pr-3 focus:outline-none focus:border-white/20 placeholder:text-slate-600"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-6">
                    {/* Channels */}
                    <div>
                        <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Canaux</span>
                            <button className="text-slate-500 hover:text-white transition-colors"><Plus className="h-3.5 w-3.5" /></button>
                        </div>
                        {CHANNELS.map(ch => (
                            <button key={ch.id} onClick={() => setActiveChannel(ch.id)}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${activeChannel === ch.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                                {ch.type === 'public' ? <Hash className="h-3.5 w-3.5 flex-shrink-0" /> : <Lock className="h-3.5 w-3.5 flex-shrink-0" />}
                                <span className="text-xs font-bold flex-1">{ch.name}</span>
                                {ch.unread > 0 && (
                                    <span className="h-4 w-4 bg-accent rounded-full text-[9px] font-black text-white flex items-center justify-center">{ch.unread}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Team Members */}
                    <div>
                        <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Équipe</span>
                        </div>
                        {TEAM.map(member => (
                            <button key={member.id}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                                <div className="relative flex-shrink-0">
                                    <div className="h-7 w-7 rounded-full bg-slate-700 flex items-center justify-center text-[9px] font-black text-white">{member.avatar}</div>
                                    <div className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${statusColor(member.status)}`} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold truncate">{member.name}</p>
                                    <p className="text-[9px] text-slate-600 truncate">{member.role}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Hash className="h-5 w-5 text-slate-400" />
                        <div>
                            <h2 className="font-black text-slate-900 text-sm">{currentChannel?.name}</h2>
                            <p className="text-[10px] text-slate-400">{messages[activeChannel]?.length || 0} messages</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="h-8 w-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all">
                            <Phone className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all">
                            <Video className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {(messages[activeChannel] || []).length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <Hash className="h-12 w-12 text-slate-200 mb-3" />
                            <p className="font-black text-slate-400 text-sm">Aucun message dans #{currentChannel?.name}</p>
                            <p className="text-xs text-slate-300 mt-1">Soyez le premier à écrire !</p>
                        </div>
                    ) : (
                        (messages[activeChannel] || []).map((msg: any) => (
                            <div key={msg.id} className={`flex items-start gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 ${msg.isMe ? 'bg-accent' : 'bg-slate-700'}`}>
                                    {msg.avatar}
                                </div>
                                <div className={`max-w-md ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-black text-slate-700">{msg.author}</span>
                                        <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{msg.role}</span>
                                        <span className="text-[9px] text-slate-400">{msg.time}</span>
                                    </div>
                                    <div className={`px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed ${msg.isMe ? 'bg-accent text-white rounded-tr-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-2">
                        <button className="text-slate-400 hover:text-slate-600 transition-colors"><Paperclip className="h-4 w-4" /></button>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                            placeholder={`Message #${currentChannel?.name}...`}
                            className="flex-1 bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
                        />
                        <button className="text-slate-400 hover:text-slate-600 transition-colors"><Smile className="h-4 w-4" /></button>
                        <button onClick={sendMessage}
                            className="h-8 w-8 bg-accent rounded-xl flex items-center justify-center text-white hover:bg-accent/90 transition-all">
                            <Send className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
