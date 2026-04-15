"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Car, Hotel, MapPin, Navigation, Smartphone, 
    Gift, Star, Clock, User, Phone, Globe,
    ShieldCheck, Bell, MessageSquare, Briefcase, Plane,
    Trash2, Plus, ArrowRight, Sparkles, Map as MapIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ConciergeBioLogistique() {
    const [activeService, setActiveService] = useState('LOGISTICS')
    
    const patientsInTransit = [
        { id: 'VIP-992', name: 'Jean Valjean', status: 'IN_TRANSIT', eta: '4 min', provider: 'DentoBlack Limo', location: 'Corniche Ouest', type: 'PICKUP' },
        { id: 'VIP-881', name: 'Marie Curie', status: 'PENDING', eta: '15:30', provider: 'Hôtel Terrou-Bi', location: 'Check-out in progress', type: 'LODGING' },
    ]

    return (
        <div className="min-h-screen bg-slate-50 p-8 space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-10 rounded-[3rem] shadow-luxury border border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Integrated Fleet & Guest Policy</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Concierge <span className="text-emerald-gradient">Bio-Logistique</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl px-10 shadow-xl shadow-emerald-500/20">
                        <Plus className="mr-2 h-4 w-4" /> Nouvel Itinéraire VIP
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Real-time Tracking Map View (Simulated) */}
                <Card className="lg:col-span-8 rounded-[4rem] border-none shadow-luxury bg-white overflow-hidden relative min-h-[600px]">
                    <div className="absolute inset-0 bg-slate-100">
                        {/* Mock Map Image */}
                        <img 
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/80" />
                    </div>

                    <div className="relative z-10 p-10 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-xl font-black uppercase tracking-tight italic flex items-center gap-3">
                                <Navigation className="h-6 w-6 text-emerald-600 animate-pulse" /> Live Fleet Tracking
                            </h2>
                            <div className="flex gap-2 bg-white/50 backdrop-blur-md p-2 rounded-2xl border border-white">
                                <Button variant="ghost" className="h-10 rounded-xl text-[9px] font-black uppercase tracking-widest bg-white shadow-sm">Vue Globale</Button>
                                <Button variant="ghost" className="h-10 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400">Arrivées Prévues</Button>
                            </div>
                        </div>

                        {/* Vehicle Markers */}
                        <div className="flex-1 relative">
                            {patientsInTransit.map((p, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute cursor-pointer group"
                                    style={{ top: `${30 + i * 20}%`, left: `${40 + i * 15}%` }}
                                >
                                    <div className="relative">
                                        <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                                            {p.type === 'PICKUP' ? <Car className="h-6 w-6" /> : <Hotel className="h-6 w-6" />}
                                        </div>
                                        <div className="absolute left-16 top-0 bg-white p-4 rounded-2xl shadow-luxury border border-slate-100 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.provider}</p>
                                            <p className="text-sm font-black text-slate-900 mb-1">{p.name}</p>
                                            <p className="text-[10px] font-bold text-emerald-600 uppercase">Arrivée dans {p.eta}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Legend / Status Bar */}
                        <div className="mt-auto bg-slate-900 text-white rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl">
                            <div className="flex gap-10 text-center">
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Pickups Actifs</p>
                                    <p className="text-xl font-black">02</p>
                                </div>
                                <div className="h-10 w-[1px] bg-white/10" />
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Hébergements VIP</p>
                                    <p className="text-xl font-black">05</p>
                                </div>
                                <div className="h-10 w-[1px] bg-white/10" />
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Retards</p>
                                    <p className="text-xl font-black text-red-400">00</p>
                                </div>
                            </div>
                            <Button className="bg-white/10 hover:bg-white/20 text-white rounded-xl h-12 px-6 font-black uppercase text-[10px] tracking-widest">
                                Ouvrir Dashboard Logistique
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Sidebar - Guest Services */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-base font-black uppercase tracking-tight">Services Conciergerie</CardTitle>
                            <CardDescription className="text-xs font-medium text-slate-400">Automatisation des protocoles d'accueil.</CardDescription>
                        </CardHeader>
                        <div className="space-y-4">
                            {[
                                { name: 'DentoBlack Pickup', desc: 'Transfert aéroport / domicile.', icon: Car, status: 'ACTIF', color: 'slate' },
                                { name: 'Elite Stay Lodging', desc: 'Réservation suite partenaire.', icon: Hotel, status: 'ACTIF', color: 'emerald' },
                                { name: 'Smart Alerting', desc: 'Sms automatique à 1km du cabinet.', icon: Bell, status: 'CONFIGURÉ', color: 'blue' },
                                { name: 'Bio-Refresh Kit', desc: 'Coffret bien-être à l\'arrivée.', icon: Gift, status: 'AUTOMATIQUE', color: 'purple' },
                            ].map((service, i) => (
                                <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center bg-white shadow-sm transition-all group-hover:scale-110")}>
                                            <service.icon className="h-5 w-5 text-slate-900" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 uppercase">{service.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400">{service.desc}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-indigo-700 to-indigo-900 text-white p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                            <Plane className="h-40 w-40" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">International Elite Flow</h3>
                        <p className="text-2xl font-black mb-6 tracking-tight italic uppercase">Gérez vos patients <span className="text-indigo-400">étrangers</span> sans aucune friction.</p>
                        <Button className="w-full bg-white text-indigo-900 rounded-2xl h-14 font-black uppercase text-[10px] tracking-widest shadow-2xl border-none">
                            Lancer Assistant Voyage
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
