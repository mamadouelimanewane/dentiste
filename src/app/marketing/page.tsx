"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Megaphone,
    Search,
    TrendingUp,
    MessageSquare,
    Facebook,
    Instagram,
    Twitter,
    Globe,
    Star,
    Zap,
    Users,
    Calendar,
    ArrowUpRight,
    BarChart3,
    Plus,
    CheckCircle2,
    Sparkles,
    Smartphone,
    Mail,
    PenTool
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function MarketingHub() {
    const [activeTab, setActiveTab] = useState('OVERVIEW')

    const channels = [
        { id: 'GOOGLE', name: 'Google My Business', score: '4.9', icon: Globe, color: 'text-blue-500' },
        { id: 'INSTAGRAM', name: 'Instagram Studio', followers: '12.4k', icon: Instagram, color: 'text-pink-500' },
        { id: 'WHATSAPP', name: 'WhatsApp VIP', active: '850', icon: MessageSquare, color: 'text-green-500' },
        { id: 'SMS', name: 'SMS Campaigns', rate: '98%', icon: Smartphone, color: 'text-slate-900' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Megaphone className="h-4 w-4 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Elite Growth & Visibility</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Marketing <span className="text-indigo-600">IA Hub</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Pilotage de votre e-réputation, acquisition patient et campagnes automatisées par IA.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <BarChart3 className="mr-2 h-4 w-4" /> Analyse ROI
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Plus className="mr-2 h-5 w-5" /> Nouvelle Campagne
                    </Button>
                </div>
            </div>

            {/* Channel Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {channels.map((channel) => (
                    <Card key={channel.id} className="rounded-[2.5rem] border-none shadow-luxury bg-white group hover:translate-y-[-4px] transition-all overflow-hidden">
                        <CardContent className="p-8 text-center space-y-4">
                            <div className={cn("h-16 w-16 mx-auto rounded-3xl flex items-center justify-center bg-slate-50 mb-2 transition-transform group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white", channel.color)}>
                                <channel.icon className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">{channel.name}</h3>
                                <p className="text-2xl font-black text-slate-900 tracking-tighter">{channel.score || channel.followers || channel.active || channel.rate}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* AI Reputation & Reviews */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="rounded-[4rem] border-none shadow-2xl bg-white overflow-hidden">
                        <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/30">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter uppercase">Gestion de l'E-Réputation IA</CardTitle>
                                <CardDescription className="text-sm font-medium text-slate-400 mt-1">Réponses automatiques aux avis Google et analyse des sentiments.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">IA Active</span>
                            </div>
                        </CardHeader>
                        <div className="p-0">
                            {[
                                { user: "Jean Valjean", rating: 5, comment: "Le Dr. Lao est d'une douceur incroyable. La clinique est magnifique.", response: "Merci Jean pour votre confiance. Nous sommes ravis que votre expérience chez DentoPrestige ait été à la hauteur de vos attentes.", date: "Il y a 2h" },
                                { user: "Fatou Binetou", rating: 4, comment: "Très pro, juste un peu d'attente au secrétariat.", response: "Merci pour votre retour Fatou. Nous optimisons actuellement notre flux d'accueil pour réduire ce temps d'attente.", date: "Il y a 5h" },
                            ].map((review, i) => (
                                <div key={i} className="p-10 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-xs text-indigo-600">
                                                {review.user.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{review.user}</p>
                                                <div className="flex gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={cn("h-3 w-3", i < review.rating ? "text-gold fill-gold" : "text-slate-200")} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-300 uppercase">{review.date}</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-600 italic px-4 border-l-2 border-indigo-100 mb-6 leading-relaxed">
                                        "{review.comment}"
                                    </p>
                                    <div className="bg-indigo-950 text-white p-6 rounded-[2.5rem] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Zap className="h-20 w-20" />
                                        </div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Sparkles className="h-3 w-3 text-gold" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gold">AI Smart Response</span>
                                        </div>
                                        <p className="text-xs font-semibold leading-relaxed text-indigo-100">
                                            {review.response}
                                        </p>
                                        <Button variant="ghost" className="text-white/40 hover:text-white text-[9px] font-black uppercase mt-4 p-0">Modifier la réponse</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Social Post Generator */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-black tracking-tighter uppercase italic">Instagram Studio</h3>
                                <PenTool className="h-5 w-5 text-pink-500" />
                            </div>
                            <div className="aspect-square bg-slate-100 rounded-[2.5rem] flex items-center justify-center overflow-hidden relative group">
                                <img src="https://images.unsplash.com/photo-1542610123-e813979d3e56?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button className="bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl">Générer Caption IA</Button>
                                </div>
                            </div>
                            <div className="space-y-4 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prochain Post Suggéré</p>
                                <p className="text-xs font-bold text-slate-600 leading-relaxed italic">
                                    "Découvrez comment le Smile Design Studio a transformé le sourire de Jean."
                                </p>
                                <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest shadow-xl">Publier Maintenant</Button>
                            </div>
                        </Card>

                        <Card className="rounded-[3rem] border-none shadow-luxury bg-indigo-950 text-white p-10 space-y-8 text-center relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 opacity-10">
                                <Megaphone className="h-40 w-40" />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto border border-white/20">
                                    <MessageSquare className="h-8 w-8 text-gold" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">WhatsApp VIP Broadcast</h3>
                                    <p className="text-sm font-medium text-indigo-200">
                                        Envoyez en un clic une campagne VIP de rappel de détartrage à 45 patients "Haut de Gamme" dont le dernier rdv date de 12 mois.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gold animate-pulse">
                                    Potentiel CA : +1,250,000 FCFA
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-white text-indigo-950 font-black uppercase text-[10px] tracking-widest shadow-2xl">Lancer Campagne</Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Right Sidebar - Analytics & Trends */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Marketing Intelligence</h3>
                            <TrendingUp className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Taux de Conversion Acquisition</span>
                                    <span className="text-teal-600 font-black text-xs">+12%</span>
                                </div>
                                <div className="h-16 flex items-end gap-1">
                                    {[20, 45, 30, 60, 40, 80, 50, 90].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex-1 bg-indigo-500/20 group-hover:bg-indigo-500 rounded-t-sm"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: 'Avis Positifs (Google)', val: '98%', color: 'bg-teal-500' },
                                    { label: 'CTR Instagram Ads', val: '4.2%', color: 'bg-indigo-500' },
                                    { label: 'Ouverture WhatsApp', val: '92%', color: 'bg-green-500' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-1.5 w-1.5 rounded-full", stat.color)} />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</span>
                                        </div>
                                        <span className="text-[11px] font-black text-slate-900">{stat.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-gold text-white p-10 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <Star className="h-24 w-24 fill-white" />
                        </div>
                        <div className="relative z-10 space-y-6 text-center">
                            <h3 className="text-xl font-black tracking-tighter uppercase italic leading-none">Devenez Praticien "Dento-Elite"</h3>
                            <p className="text-[11px] font-semibold text-white/90 leading-relaxed italic">
                                "Votre score de réputation moyen sur Dakar est dans le top 1% des cliniques dentaires privées. Continuez ainsi pour débloquer le badge Trust-Pro."
                            </p>
                            <Button className="w-full bg-white text-gold font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-xl">Voir mes badges</Button>
                        </div>
                    </Card>

                    <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[3rem] flex flex-col items-center text-center space-y-4">
                        <Users className="h-8 w-8 text-indigo-400" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 leading-none mb-1">Nouveaux Prospects</p>
                            <p className="text-2xl font-black text-slate-900">12 <span className="text-xs font-bold text-slate-400">ce mois</span></p>
                        </div>
                        <Button
                            className="bg-indigo-600 text-white font-black uppercase text-[9px] tracking-widest h-10 px-6 rounded-xl"
                            onClick={() => window.location.href = '/patients'}
                        >
                            Voir les leads CRM
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
