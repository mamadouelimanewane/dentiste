"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Brain, 
    X, 
    MessageSquare, 
    Send, 
    Sparkles, 
    Zap, 
    TrendingUp, 
    Users, 
    Calendar,
    ChevronRight,
    Bot,
    Minus,
    Maximize2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/useRole'

type Message = {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    type?: 'insight' | 'action' | 'text'
}

export function EliteCompanion() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const { role: userRole, user } = useRole()
    const scrollRef = useRef<HTMLDivElement>(null)

    const welcomeMessages = {
        OWNER: "Bonjour Directeur. J'ai analysé les performances du cabinet ce matin. Le taux d'occupation est de 85% et nous avons 3 nouveaux patients VIP en attente de validation.",
        DENTIST: "Bonjour Docteur. Votre agenda est complet aujourd'hui. N'oubliez pas l'analyse IA pour la radio panoramique de M. Diallo prévue à 14h30.",
        ACCOUNTANT: "Bonjour. Les flux Wave de ce matin ont été réconciliés. Il reste 2 factures en attente de paiement pour le fournisseur Labo ProDakar.",
        ASSISTANT: "Bonjour. La stérilisation du cycle 4 est terminée. Pensez à valider le journal de traçabilité.",
        CLIENT: "Bienvenue dans votre espace VIP. Comment puis-je vous aider avec vos rendez-vous aujourd'hui ?"
    }

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcome = welcomeMessages[userRole as keyof typeof welcomeMessages] || "Bonjour. Comment puis-je vous aider ?"
            setMessages([{
                id: '1',
                role: 'assistant',
                content: welcome,
                timestamp: new Date(),
                type: 'insight'
            }])
        }
    }, [isOpen, userRole])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsTyping(true)

        // Simulated AI Response logic based on role
        setTimeout(() => {
            let aiResponse = "Je traite votre demande avec les modèles neuronaux d'Elite Core..."
            
            if (input.toLowerCase().includes('chiffre') || input.toLowerCase().includes('argent')) {
                aiResponse = "Le chiffre d'affaires prévisionnel pour ce mois est de 14.5M FCFA, en hausse de 12% par rapport au mois dernier. Voulez-vous voir le détail dans la Financial War Room ?"
            } else if (input.toLowerCase().includes('radio') || input.toLowerCase().includes('panoramique')) {
                aiResponse = "J'ai détecté une lésion carieuse suspecte en zone 46 sur la radio panoramique de M. Diallo. j'ai marqué cette zone dans le Radio Lab."
            } else if (input.toLowerCase().includes('rendez-vous') || input.toLowerCase().includes('agenda')) {
                aiResponse = "Votre prochain rendez-vous est avec Mme Sow à 10:30 pour une pose de facettes E-Max."
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date(),
                type: 'insight'
            }
            setMessages(prev => [...prev, botMsg])
            setIsTyping(false)
        }, 1500)
    }

    if (!isOpen) {
        return (
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 h-16 w-16 bg-slate-900 text-white rounded-[2rem] shadow-2xl z-[100] flex items-center justify-center border-4 border-emerald-500/20 group overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Brain className="h-7 w-7 relative z-10 animate-pulse" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white animate-bounce" />
            </motion.button>
        )
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    height: isMinimized ? '80px' : '600px',
                    width: isMinimized ? '300px' : '400px'
                }}
                exit={{ y: 100, opacity: 0, scale: 0.9 }}
                className={cn(
                    "fixed bottom-8 right-8 bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-[-20px_20px_60px_rgba(0,0,0,0.5)] z-[100] flex flex-col overflow-hidden backdrop-blur-xl",
                    isMinimized && "cursor-pointer"
                )}
                onClick={() => isMinimized && setIsMinimized(false)}
            >
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-emerald-600/20 to-indigo-600/20 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-900 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                            <Brain className="h-5 w-5 text-emerald-400 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-xs font-black text-white uppercase tracking-widest italic">Elite <span className="text-emerald-400">Companion</span></h3>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-black text-emerald-500/80 uppercase tracking-[0.2em]">Neural Engine V2.4</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="h-8 w-8 text-white/40 hover:text-white">
                            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="h-8 w-8 text-white/40 hover:text-red-400">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Messages Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent)]"
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.role === 'assistant' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={cn(
                                        "flex flex-col max-w-[85%]",
                                        msg.role === 'assistant' ? "self-start" : "self-end items-end"
                                    )}
                                >
                                    <div className={cn(
                                        "p-4 rounded-[1.5rem] text-sm",
                                        msg.role === 'assistant' 
                                            ? "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none" 
                                            : "bg-emerald-600 text-white rounded-tr-none shadow-lg shadow-emerald-600/20"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[8px] font-bold text-slate-500 mt-2 uppercase tracking-widest">
                                        {msg.role === 'assistant' ? 'Elite AI' : 'Vous'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex flex-col self-start p-4 bg-white/5 border border-white/10 rounded-[1.5rem] rounded-tl-none">
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                className="h-1 w-1 bg-emerald-500 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Suggestions */}
                        <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
                            {[
                                { label: 'Perf. Financière', icon: TrendingUp },
                                { label: 'Status Stérilisation', icon: Zap },
                                { label: 'Alerte Stocks', icon: Users },
                            ].map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(s.label)}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-emerald-600/20 hover:border-emerald-500/30 transition-all whitespace-nowrap"
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 shrink-0">
                            <div className="relative group">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Posez une question à l'Elite Companion..."
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-14 text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                                />
                                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500/40 group-focus-within:text-emerald-500 transition-colors" />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
