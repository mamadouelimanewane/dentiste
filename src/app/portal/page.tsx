"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    User,
    Calendar,
    FileText,
    MessageSquare,
    CreditCard,
    Download,
    Bell,
    ShieldCheck,
    Star,
    Clock,
    ImageIcon,
    Stethoscope,
    Phone,
    MapPin,
    ExternalLink,
    X,
    CheckCircle2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function PatientPortal() {
    const [activeTab, setActiveTab] = useState('DASHBOARD')

    const patientData = {
        name: "Jean Valjean",
        patientId: "PAT-2026-882",
        nextAppointment: {
            date: "12 fév. 2026",
            time: "10:30",
            type: "Détartrage & Contrôle",
            doctor: "Dr. Aere Lao"
        },
        balance: "45,000 FCFA",
        recentDocuments: [
            { name: "Radiographie Panoramique", date: "24 janv. 2026", type: "IMAGE" },
            { name: "Devis - Implantologie", date: "20 janv. 2026", type: "PDF" },
            { name: "Ordonnance Post-Op", date: "15 déc. 2025", type: "PDF" }
        ],
        loyaltyPoints: 1250
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-20 font-sans">
            {/* Top Navigation / Branding */}
            <div className="w-full bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black italic">
                        AL
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-slate-900 tracking-tighter">Clinique <span className="text-gold">Aere Lao</span></h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portail Patient VIP</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative cursor-pointer h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                        <Bell className="h-5 w-5" />
                        <div className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-slate-800 transition-all">
                        <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-black">JV</div>
                        <span className="text-[11px] font-black uppercase tracking-widest">Jean V.</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl p-8 grid grid-cols-12 gap-10 mt-6">
                {/* Sidebar Navigation */}
                <div className="col-span-12 lg:col-span-3 space-y-2">
                    {[
                        { id: 'DASHBOARD', name: 'Vue d\'ensemble', icon: Stethoscope },
                        { id: 'APPOINTMENTS', name: 'Rendez-vous', icon: Calendar },
                        { id: 'DOCUMENTS', name: 'Mes Documents', icon: FileText },
                        { id: 'BILLING', name: 'Facturation', icon: CreditCard },
                        { id: 'MESSAGES', name: 'Messages', icon: MessageSquare },
                        { id: 'SETTINGS', name: 'Profil & Sécurité', icon: User },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab.id
                                    ? "bg-slate-900 text-white shadow-xl translate-x-1"
                                    : "text-slate-500 hover:bg-white hover:text-slate-900"
                            )}
                        >
                            <tab.icon className={cn("h-5 w-5", activeTab === tab.id ? "text-gold" : "text-slate-400")} />
                            {tab.name}
                        </button>
                    ))}

                    <div className="pt-10">
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-6 relative overflow-hidden">
                            <div className="absolute -bottom-4 -right-4 opacity-10">
                                <Star className="h-24 w-24" />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-widest mb-4">Programme Fidélité</h3>
                            <p className="text-3xl font-black mb-1">{patientData.loyaltyPoints}</p>
                            <p className="text-[9px] font-bold text-indigo-100 uppercase tracking-widest">Points accumulés</p>
                            <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest h-10 mt-6 rounded-xl">
                                Échanger mes points
                            </Button>
                        </Card>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-span-12 lg:col-span-9 space-y-10">
                    <AnimatePresence mode="wait">
                        {activeTab === 'DASHBOARD' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                {/* Welcome Hero */}
                                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-10 opacity-10">
                                        <ShieldCheck className="h-64 w-64 text-white" />
                                    </div>
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-teal-500 rounded-full text-[9px] font-black uppercase tracking-widest">Patient VIP Elite</span>
                                            <span className="text-slate-400 text-xs font-bold">Bienvenue chez vous.</span>
                                        </div>
                                        <h2 className="text-5xl font-black tracking-tighter max-w-xl">
                                            Bonjour, <span className="text-gold">{patientData.name}</span>.
                                        </h2>
                                        <p className="text-slate-400 text-base font-medium leading-relaxed max-w-md">
                                            Votre santé dentaire est notre priorité absolue. Retrouvez ici tous vos soins, documents et rendez-vous en temps réel.
                                        </p>
                                        <div className="flex gap-4 pt-4">
                                            <Button className="bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl">
                                                Prendre Rendez-vous
                                            </Button>
                                            <Button variant="outline" className="border-white/20 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 hover:bg-white/5">
                                                Contacter le Cabinet
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="h-12 w-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prochain RDV</p>
                                                <p className="text-sm font-black text-slate-900">{patientData.nextAppointment.date}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-slate-500">{patientData.nextAppointment.type} à {patientData.nextAppointment.time}</p>
                                    </Card>

                                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="h-12 w-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                                                <CreditCard className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Facture en attente</p>
                                                <p className="text-sm font-black text-slate-900">{patientData.balance}</p>
                                            </div>
                                        </div>
                                        <Button variant="link" className="p-0 h-auto text-amber-600 text-[10px] font-black uppercase tracking-widest">
                                            Régler maintenant →
                                        </Button>
                                    </Card>

                                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                                <Download className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernière Radio</p>
                                                <p className="text-sm font-black text-slate-900">Panoramique 2D</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-slate-500">Prise le 24 janv. 2026</p>
                                    </Card>
                                </div>

                                {/* Recent Docs & Activity */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                            <CardTitle className="text-base font-black uppercase tracking-tight">Documents Récents</CardTitle>
                                            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tout voir</Button>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="divide-y divide-slate-50">
                                                {patientData.recentDocuments.map((doc, i) => (
                                                    <div key={i} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                                {doc.type === 'IMAGE' ? <ImageIcon className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-slate-900">{doc.name}</p>
                                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.date}</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-slate-900">
                                                            <Download className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10">
                                        <CardHeader className="p-0 mb-8 border-none">
                                            <CardTitle className="text-base font-black uppercase tracking-tight">Édu-Conseil IA</CardTitle>
                                            <CardDescription className="text-xs font-medium text-slate-400">Conseils personnalisés pour votre sourire.</CardDescription>
                                        </CardHeader>
                                        <div className="space-y-6">
                                            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2rem]">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <ShieldCheck className="h-5 w-5 text-indigo-600" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Protocole Post-Traitement</span>
                                                </div>
                                                <p className="text-xs font-bold text-indigo-900 leading-relaxed italic">
                                                    "Pour optimiser les résultats de votre blanchiment, nous recommandons d'éviter les aliments colorés (café, curry) pendant les prochaines 48 heures."
                                                </p>
                                            </div>
                                            <div className="bg-teal-50 border border-teal-100 p-6 rounded-[2rem]">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">Santé Gencives</span>
                                                </div>
                                                <p className="text-xs font-bold text-teal-900 leading-relaxed italic">
                                                    "Excellent ! Vos gencives montrent une nette amélioration. Continuez l'usage quotidien du jet dentaire."
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'APPOINTMENTS' && (
                            <motion.div
                                key="appointments"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                    <div className="p-10 border-b border-slate-50 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Historique des Rendez-vous</h2>
                                            <p className="text-sm font-medium text-slate-400">Retrouvez le détail de toutes vos visites au cabinet.</p>
                                        </div>
                                        <Button className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8">
                                            Nouveau RDV
                                        </Button>
                                    </div>
                                    <div className="p-0">
                                        <div className="divide-y divide-slate-50">
                                            {[
                                                { date: "15 déc. 2025", type: "Chirurgie Implantaire", doctor: "Dr. Aere Lao", price: "450,000 FCFA", status: "Terminé" },
                                                { date: "02 nov. 2025", type: "Détartrage & Polissage", doctor: "Dr. Aere Lao", price: "35,000 FCFA", status: "Terminé" },
                                                { date: "10 oct. 2025", type: "Consultation & Bilan", doctor: "Dr. Aere Lao", price: "15,000 FCFA", status: "Terminé" },
                                            ].map((rdv, i) => (
                                                <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                                    <div className="flex items-center gap-6">
                                                        <div className="h-16 w-16 bg-white border border-slate-100 rounded-3xl shadow-sm flex flex-col items-center justify-center p-2">
                                                            <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{rdv.date.split(' ')[1]}</span>
                                                            <span className="text-xl font-black text-slate-900">{rdv.date.split(' ')[0]}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-lg font-black text-slate-900 tracking-tight">{rdv.type}</p>
                                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{rdv.doctor} • {rdv.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">{rdv.status}</span>
                                                        <Button variant="ghost" size="icon" className="rounded-full">
                                                            <ArrowRight className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Cabinet Info Footer (VIP Portal) */}
            <div className="w-full max-w-6xl px-8 mt-10">
                <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex gap-4">
                        <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assistance Téléphonique</p>
                            <p className="text-sm font-black text-slate-900">+221 33 800 00 00</p>
                            <p className="text-[10px] font-bold text-teal-600 uppercase mt-1">Ligne Urgence 24h/24</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Localisation</p>
                            <p className="text-sm font-black text-slate-900">Avenue Léopold Sédar Senghor, Dakar</p>
                            <Button variant="link" className="p-0 h-auto text-indigo-600 text-[10px] font-black uppercase mt-1">Ouvrir Google Maps →</Button>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sécurité des Données</p>
                            <p className="text-sm font-black text-slate-900">Chiffrement AES-256 HDS</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 italic">Vos données sont stockées au Sénégal sur des serveurs certifiés santé.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
