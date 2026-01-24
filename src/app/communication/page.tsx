"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    MessageSquare,
    Mail,
    Smartphone,
    Bell,
    Send,
    Calendar,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    Loader2,
    Plus,
    Settings,
    Zap,
    Users,
    TrendingUp,
    Download,
    Eye,
    Filter,
    Search,
    Phone
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

type MessageType = 'SMS' | 'WHATSAPP' | 'EMAIL'
type MessageCategory = 'REMINDER' | 'POST_OP' | 'RECALL' | 'EDUCATION' | 'BILLING' | 'DOCUMENT'

export default function CommunicationPage() {
    const [activeTab, setActiveTab] = useState<'SEND' | 'HISTORY' | 'AUTOMATION' | 'ANALYTICS'>('SEND')
    const [messageType, setMessageType] = useState<MessageType>('WHATSAPP')
    const [selectedPatients, setSelectedPatients] = useState<string[]>([])
    const [messageContent, setMessageContent] = useState('')
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSending, setIsSending] = useState(false)
    const [showTemplates, setShowTemplates] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/communication/logs')
                const json = await res.json()
                setData(json)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const messageTemplates = {
        REMINDER: [
            {
                title: "Rappel RDV J-2",
                content: "Bonjour {patient}, nous vous rappelons votre rendez-vous le {date} à {heure} avec Dr. Aere Lao. Confirmez en répondant OUI. Clinique Dentaire Aere Lao ☎️ +221 XX XXX XX XX"
            },
            {
                title: "Rappel RDV J-1",
                content: "Bonjour {patient}, votre rendez-vous est prévu demain à {heure}. N'oubliez pas d'apporter votre carte vitale. À demain ! 🦷"
            }
        ],
        POST_OP: [
            {
                title: "Instructions Post-Op Immédiat",
                content: "Bonjour {patient}, suite à votre intervention, voici les consignes : ❄️ Appliquer de la glace 10min/h pendant 6h. 💊 Antalgiques toutes les 6h. 🚫 Pas d'effort physique 48h. Urgence ? Appelez-nous."
            },
            {
                title: "Suivi Post-Op J+3",
                content: "Bonjour {patient}, comment vous sentez-vous 3 jours après l'intervention ? Douleur, saignement ou gonflement anormal ? N'hésitez pas à nous contacter. 📞"
            }
        ],
        DOCUMENT: [
            {
                title: "Envoi Devis",
                content: "Bonjour {patient}, votre devis de soins est disponible. Consultez-le sur votre portail patient : {lien}. Pour toute question, contactez-nous. 📄"
            },
            {
                title: "Envoi Facture",
                content: "Bonjour {patient}, votre facture du {date} est disponible. Montant : {montant} FCFA. Téléchargez-la ici : {lien}. Merci de votre confiance ! 💳"
            }
        ],
        RECALL: [
            {
                title: "Rappel Contrôle Annuel",
                content: "Bonjour {patient}, votre dernier contrôle date de plus d'un an. Prenez RDV pour votre bilan annuel et détartrage. Votre sourire mérite le meilleur ! 😊 Réservez : {lien}"
            }
        ]
    }

    const handleSendMessage = async () => {
        if (!messageContent || selectedPatients.length === 0) return

        setIsSending(true)
        try {
            // Simulation d'envoi
            await new Promise(resolve => setTimeout(resolve, 2000))
            alert(`Message ${messageType} envoyé à ${selectedPatients.length} patient(s) !`)
            setMessageContent('')
            setSelectedPatients([])
        } finally {
            setIsSending(false)
        }
    }

    const useTemplate = (template: string) => {
        setMessageContent(template)
        setShowTemplates(false)
    }

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
                    <p className="font-black text-[10px] uppercase tracking-[0.5em] text-slate-400">Chargement Communication Hub...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-teal-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500">Communication Multicanal</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                        WhatsApp <span className="text-teal-600">&</span> SMS Hub
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Gestion automatisée des rendez-vous, rappels et documents patients</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold">
                        <Settings className="mr-2 h-4 w-4" /> Paramètres
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white font-black px-6 rounded-xl uppercase tracking-widest text-xs h-11">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Campagne
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Messages Envoyés (30j)', value: data?.stats?.totalSent || '1,247', icon: Send, color: 'text-teal-600', bg: 'bg-teal-50' },
                    { label: 'Taux de Délivrabilité', value: data?.stats?.deliveryRate || '98.5%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Confirmations RDV', value: '94%', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Coût Moyen/Message', value: '25 FCFA', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", stat.bg)}>
                                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                                </div>
                            </div>
                            <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
                {(['SEND', 'HISTORY', 'AUTOMATION', 'ANALYTICS'] as const).map(tab => (
                    <Button
                        key={tab}
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "rounded-xl px-6 text-[10px] font-black uppercase tracking-widest transition-all",
                            activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        )}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'SEND' ? '📤 Envoyer' : tab === 'HISTORY' ? '📜 Historique' : tab === 'AUTOMATION' ? '⚡ Automatisation' : '📊 Analytique'}
                    </Button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'SEND' && (
                    <motion.div
                        key="send"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-12 gap-8"
                    >
                        {/* Message Composer */}
                        <div className="col-span-12 lg:col-span-8">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white">
                                <CardHeader className="p-8 border-b border-slate-50">
                                    <CardTitle className="text-lg font-black tracking-tighter">Composer un Message</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    {/* Channel Selection */}
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Canal de Communication</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { type: 'WHATSAPP' as MessageType, icon: MessageSquare, label: 'WhatsApp', color: 'text-green-600', bg: 'bg-green-50' },
                                                { type: 'SMS' as MessageType, icon: Smartphone, label: 'SMS', color: 'text-blue-600', bg: 'bg-blue-50' },
                                                { type: 'EMAIL' as MessageType, icon: Mail, label: 'Email', color: 'text-purple-600', bg: 'bg-purple-50' },
                                            ].map(channel => (
                                                <button
                                                    key={channel.type}
                                                    onClick={() => setMessageType(channel.type)}
                                                    className={cn(
                                                        "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                                                        messageType === channel.type
                                                            ? `border-${channel.color.replace('text-', '')} ${channel.bg}`
                                                            : "border-slate-100 hover:border-slate-200"
                                                    )}
                                                >
                                                    <channel.icon className={cn("h-8 w-8", messageType === channel.type ? channel.color : "text-slate-400")} />
                                                    <span className={cn("text-xs font-black uppercase tracking-widest", messageType === channel.type ? "text-slate-900" : "text-slate-400")}>
                                                        {channel.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Template Selection */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowTemplates(!showTemplates)}
                                                className="text-[10px] font-black uppercase text-teal-600"
                                            >
                                                <FileText className="mr-2 h-3 w-3" /> Modèles
                                            </Button>
                                        </div>

                                        {showTemplates && (
                                            <div className="mb-4 p-4 bg-slate-50 rounded-2xl space-y-2 max-h-60 overflow-y-auto">
                                                {Object.entries(messageTemplates).map(([category, templates]) => (
                                                    <div key={category}>
                                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">{category}</p>
                                                        {templates.map((template, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => useTemplate(template.content)}
                                                                className="w-full text-left p-3 bg-white rounded-xl hover:bg-teal-50 transition-colors mb-2 border border-slate-100"
                                                            >
                                                                <p className="text-xs font-bold text-slate-900">{template.title}</p>
                                                                <p className="text-[10px] text-slate-500 line-clamp-1 mt-1">{template.content}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <Textarea
                                            value={messageContent}
                                            onChange={(e) => setMessageContent(e.target.value)}
                                            placeholder="Tapez votre message ici... Utilisez {patient}, {date}, {heure} pour personnaliser"
                                            className="min-h-[200px] rounded-2xl border-slate-200 text-sm font-medium resize-none"
                                        />
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-[10px] font-bold text-slate-400">
                                                {messageContent.length} caractères {messageType === 'SMS' && `• ${Math.ceil(messageContent.length / 160)} SMS`}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400">
                                                Coût estimé: {selectedPatients.length * (messageType === 'WHATSAPP' ? 15 : 25)} FCFA
                                            </p>
                                        </div>
                                    </div>

                                    {/* Recipients */}
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Destinataires</label>
                                        <div className="flex gap-3">
                                            <Input
                                                placeholder="Rechercher un patient..."
                                                className="flex-1 rounded-xl border-slate-200"
                                            />
                                            <Button variant="outline" className="rounded-xl">
                                                <Filter className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="mt-4 p-4 bg-slate-50 rounded-2xl">
                                            <p className="text-xs font-bold text-slate-600">
                                                {selectedPatients.length === 0 ? "Aucun patient sélectionné" : `${selectedPatients.length} patient(s) sélectionné(s)`}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Send Button */}
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!messageContent || selectedPatients.length === 0 || isSending}
                                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black uppercase tracking-widest text-xs h-14 rounded-2xl shadow-xl"
                                    >
                                        {isSending ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" /> Envoyer Maintenant
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-gradient-to-br from-teal-600 to-teal-700 text-white p-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-5 w-5 text-yellow-300" />
                                        <h3 className="text-xs font-black uppercase tracking-widest">Actions Rapides</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Rappels RDV Demain', count: 12, icon: Calendar },
                                            { label: 'Confirmations en attente', count: 8, icon: Clock },
                                            { label: 'Suivis Post-Op', count: 5, icon: Bell },
                                            { label: 'Factures à envoyer', count: 15, icon: FileText },
                                        ].map((action, i) => (
                                            <button
                                                key={i}
                                                className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all flex items-center justify-between group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <action.icon className="h-4 w-4" />
                                                    <span className="text-xs font-bold">{action.label}</span>
                                                </div>
                                                <span className="text-xs font-black bg-white/20 px-2 py-1 rounded-full">{action.count}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Conseils d'Optimisation</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                        <p className="text-xs font-bold text-green-900">✅ Meilleur taux d'ouverture WhatsApp: 98%</p>
                                        <p className="text-[10px] text-green-700 mt-1">Privilégiez WhatsApp pour les rappels urgents</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <p className="text-xs font-bold text-blue-900">💡 Envoi optimal: 9h-18h</p>
                                        <p className="text-[10px] text-blue-700 mt-1">Évitez les envois après 20h</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'HISTORY' && (
                    <motion.div
                        key="history"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white">
                            <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-black tracking-tighter">Historique des Communications</CardTitle>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="rounded-xl">
                                        <Download className="mr-2 h-3 w-3" /> Exporter
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-50">
                                    {(data?.logs || []).map((log: any) => (
                                        <div key={log.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "h-12 w-12 rounded-2xl flex items-center justify-center",
                                                    log.type === 'WHATSAPP' ? "bg-green-50 text-green-600" :
                                                        log.type === 'SMS' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                                                )}>
                                                    {log.type === 'WHATSAPP' ? <MessageSquare className="h-5 w-5" /> :
                                                        log.type === 'SMS' ? <Smartphone className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-black text-slate-900">{log.patient}</h3>
                                                    <p className="text-xs text-slate-500 font-medium">{log.content}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                                        {log.category} • {log.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                    log.status === 'DELIVERED' ? "bg-green-100 text-green-700" :
                                                        log.status === 'OPENED' ? "bg-teal-100 text-teal-700" :
                                                            log.status === 'SENT' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                                                )}>
                                                    {log.status}
                                                </div>
                                                <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'AUTOMATION' && (
                    <motion.div
                        key="automation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {[
                            {
                                title: "Rappels RDV Automatiques",
                                description: "Envoi automatique J-2 et J-1 avant le rendez-vous",
                                active: true,
                                stats: "142 envois ce mois",
                                icon: Calendar,
                                color: "teal"
                            },
                            {
                                title: "Instructions Post-Opératoires",
                                description: "Envoi immédiat après intervention + suivi J+3",
                                active: true,
                                stats: "28 envois ce mois",
                                icon: Bell,
                                color: "blue"
                            },
                            {
                                title: "Rappels Contrôle Annuel",
                                description: "Détection automatique patients > 12 mois",
                                active: false,
                                stats: "Désactivé",
                                icon: Clock,
                                color: "purple"
                            },
                            {
                                title: "Envoi Factures Automatique",
                                description: "Envoi via portail patient après chaque consultation",
                                active: true,
                                stats: "89 envois ce mois",
                                icon: FileText,
                                color: "green"
                            },
                        ].map((automation, i) => (
                            <Card key={i} className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={cn(
                                        "h-14 w-14 rounded-2xl flex items-center justify-center",
                                        `bg-${automation.color}-50 text-${automation.color}-600`
                                    )}>
                                        <automation.icon className="h-7 w-7" />
                                    </div>
                                    <div className={cn(
                                        "h-6 w-12 rounded-full transition-all cursor-pointer",
                                        automation.active ? "bg-teal-500" : "bg-slate-200"
                                    )}>
                                        <div className={cn(
                                            "h-6 w-6 rounded-full bg-white shadow-sm transition-all",
                                            automation.active ? "translate-x-6" : "translate-x-0"
                                        )} />
                                    </div>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">{automation.title}</h3>
                                <p className="text-sm text-slate-600 font-medium mb-4">{automation.description}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{automation.stats}</p>
                                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-teal-600">
                                        Configurer
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'ANALYTICS' && (
                    <motion.div
                        key="analytics"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Taux d\'Ouverture WhatsApp', value: '98.2%', trend: '+2.4%', color: 'text-green-600' },
                                { label: 'Taux d\'Ouverture SMS', value: '94.5%', trend: '+1.2%', color: 'text-blue-600' },
                                { label: 'Taux de Confirmation RDV', value: '91.8%', trend: '+5.1%', color: 'text-purple-600' },
                            ].map((metric, i) => (
                                <Card key={i} className="rounded-3xl border-none shadow-luxury bg-white p-6">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{metric.label}</p>
                                    <div className="flex items-end justify-between">
                                        <p className={cn("text-3xl font-black tracking-tight", metric.color)}>{metric.value}</p>
                                        <p className="text-xs font-bold text-teal-600">{metric.trend}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                            <h3 className="text-lg font-black tracking-tighter mb-6">Performance par Canal (30 derniers jours)</h3>
                            <div className="space-y-6">
                                {[
                                    { channel: 'WhatsApp', sent: 847, delivered: 832, opened: 816, color: 'bg-green-500' },
                                    { channel: 'SMS', sent: 324, delivered: 312, opened: 295, color: 'bg-blue-500' },
                                    { channel: 'Email', sent: 156, delivered: 142, opened: 98, color: 'bg-purple-500' },
                                ].map((channel, i) => (
                                    <div key={i}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-black text-slate-900">{channel.channel}</span>
                                            <span className="text-xs font-bold text-slate-500">{channel.sent} envoyés</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full", channel.color)}
                                                style={{ width: `${(channel.opened / channel.sent) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between mt-1 text-[10px] font-bold text-slate-400">
                                            <span>Délivrés: {channel.delivered}</span>
                                            <span>Ouverts: {channel.opened} ({Math.round((channel.opened / channel.sent) * 100)}%)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
