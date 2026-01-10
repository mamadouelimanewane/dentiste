"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    BookOpen,
    Lightbulb,
    BookCheck,
    Users,
    Search,
    Plus,
    MapSegments,
    Award,
    Zap,
    Star,
    ChevronRight,
    TrendingUp,
    Bookmark,
    ShieldCheck,
    Library
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function KnowledgePage() {
    const [activeTab, setActiveTab] = useState<'BASE' | 'PLAYBOOKS' | 'SKILLS'>('BASE')

    const knowledgeItems = [
        { id: 1, title: 'Protocole Hygiène post-COVID-24', category: 'Hygiène', update: '12 Jan 2026', author: 'Dr. Aere Lao' },
        { id: 2, title: 'Guide Technique Sinus Lift 3D', category: 'Chirurgie', update: '08 Jan 2026', author: 'Dr. Martin' },
        { id: 3, title: 'Convention Collective Cabinet 2026', category: 'RH/Légal', update: '04 Jan 2026', author: 'Admin' },
    ]

    const playbooks = [
        { id: 1, title: 'Gestion Litige : Défaut de Signature Devis', cases: 14, success: '98%', status: 'PREMIUM' },
        { id: 2, title: 'Procédure Urgence : Complication Hémorragique', cases: 4, success: '100%', status: 'CRITICAL' },
        { id: 3, title: 'Négociation Fournisseurs Implants', cases: 22, success: '85%', status: 'STRATEGIC' },
    ]

    const skills = [
        { name: 'Dr. Mamadou Diallo', specialties: ['Implantologie', 'Sinus Lift'], level: 'Senior Partner', avatar: 'JD' },
        { name: 'Dr. Sarah Martin', specialties: ['Orthodontie Invisalign', 'Pédodontie'], level: 'Associate', avatar: 'SM' },
        { name: 'Alice Faye', specialties: ['Gestion Relation Patient', 'Assistance Chirurgicale'], level: 'Elite Assistant', avatar: 'AF' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Patrimoine Intellectuel</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Knowledge <span className="text-gold">Management Center</span></h1>
                    <p className="text-slate-500 font-medium">Gestion des savoirs, playbooks stratégiques et cartographie des talents.</p>
                </div>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl">
                    {(['BASE', 'PLAYBOOKS', 'SKILLS'] as const).map(tab => (
                        <Button
                            key={tab}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "rounded-xl px-6 text-[11px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'BASE' ? 'Base Documentaire' : tab === 'PLAYBOOKS' ? 'Playbooks' : 'Compétences'}
                        </Button>
                    ))}
                </div>
            </div>

            {activeTab === 'BASE' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Search & Categories */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input
                                    placeholder="Rechercher une procédure, un article ou un protocole..."
                                    className="h-16 pl-14 pr-32 bg-white border-none shadow-luxury rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus-visible:ring-accent"
                                />
                                <Button className="absolute right-2 top-2 h-12 px-6 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-xl">IA Search</Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {knowledgeItems.map(item => (
                                    <Card key={item.id} className="rounded-[2rem] border-none shadow-luxury bg-white group hover:scale-[1.02] transition-all overflow-hidden">
                                        <CardContent className="p-8 space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                                                    <Library className="h-6 w-6" />
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 px-3 py-1 rounded-full group-hover:bg-amber-100 group-hover:text-amber-700 transition-all">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-gold transition-colors">{item.title}</h3>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
                                                    <span>Édité par {item.author}</span>
                                                    <span>•</span>
                                                    <span>{item.update}</span>
                                                </div>
                                            </div>
                                            <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-accent transition-all">Lire le document →</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Recent & Stats */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white p-8">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-gold mb-6 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" /> Top Consultations
                                </CardTitle>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex gap-4 items-center group cursor-pointer">
                                            <div className="text-2xl font-black text-white/10 group-hover:text-gold/50 transition-colors">0{i}</div>
                                            <div className="flex-1 border-b border-white/5 pb-2">
                                                <p className="text-xs font-bold text-white group-hover:text-gold transition-colors">Gestion Post-Opératoire Prothèse</p>
                                                <p className="text-[9px] text-slate-500 font-medium">45 vues cette semaine</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card className="rounded-[2.5rem] border-none shadow-luxury bg-amber-50 p-8 border border-amber-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Lightbulb className="h-5 w-5 text-amber-600" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Contribution</span>
                                </div>
                                <h3 className="text-sm font-black text-slate-900 leading-tight mb-4">Votre patrimoine documentaire est composé de 425 procédures validées.</h3>
                                <Button className="w-full bg-slate-900 text-white font-black uppercase tracking-widest text-[9px] h-11 rounded-xl">Partager un savoir</Button>
                            </Card>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'PLAYBOOKS' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="col-span-2 rounded-[3rem] border-none shadow-luxury bg-slate-950 p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <BookCheck className="h-40 w-40 text-accent" />
                        </div>
                        <div className="relative z-10 space-y-4 max-w-2xl">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Playbooks Stratégiques</span>
                            <h2 className="text-3xl font-black text-white tracking-tighter">Réduisez l'incertitude opérationnelle.</h2>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">Les playbooks sont des guides décisionnels "étape par étape" pour les situations complexes ou récurrentes (contentieux, urgences vitales, négociations).</p>
                        </div>
                    </Card>

                    {playbooks.map(pb => (
                        <Card key={pb.id} className="rounded-[2.5rem] border-none shadow-luxury bg-white group hover:scale-[1.01] transition-all overflow-hidden border border-slate-50">
                            <CardContent className="p-10 flex gap-8">
                                <div className="space-y-1 text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taux Succès</p>
                                    <p className="text-4xl font-black text-teal-600">{pb.success}</p>
                                    <div className="pt-4">
                                        <div className={cn(
                                            "h-14 w-1 bg-slate-100 rounded-full mx-auto relative overflow-hidden",
                                        )}>
                                            <div className="h-full bg-teal-500 w-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <span className={cn(
                                            "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                                            pb.status === 'CRITICAL' ? "bg-red-50 text-red-700 border-red-100" :
                                                pb.status === 'STRATEGIC' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                                                    "bg-gold/10 text-gold border-gold/20"
                                        )}>
                                            {pb.status}
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                            <Bookmark className="h-3 w-3" /> {pb.cases} cas réels
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{pb.title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Algorithme décisionnel basé sur la jurisprudence interne et les standards ISO.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button className="flex-1 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest h-11 rounded-xl shadow-lg">Lancer le Playbook</Button>
                                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-200"><ChevronRight className="h-5 w-5 text-slate-400" /></Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {activeTab === 'SKILLS' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl font-black tracking-tighter text-slate-900">Cartographie des Compétences</h2>
                                <p className="text-slate-500 text-sm font-medium">Visualisez l'expertise collective de votre cabinet pour optimiser vos soins complexes.</p>
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-100 font-bold bg-white"><Users className="mr-2 h-4 w-4" /> Gérer l'équipe</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {skills.map(s => (
                                <div key={s.name} className="p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-luxury transition-all relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                                        <Award className="h-20 w-20" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-14 w-14 rounded-2xl bg-slate-900 text-gold flex items-center justify-center font-black text-xl">
                                            {s.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 tracking-tight">{s.name}</h4>
                                            <p className="text-[10px] font-black text-accent uppercase tracking-widest">{s.level}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expertises Validées</p>
                                        <div className="flex flex-wrap gap-2">
                                            {s.specialties.map(spec => (
                                                <span key={spec} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 flex items-center gap-1.5">
                                                    <Star className="h-3 w-3 text-gold fill-gold" /> {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                                        <span className="text-[10px] font-black text-teal-600 uppercase flex items-center gap-1.5">
                                            <ShieldCheck className="h-3 w-3" /> Certifié 2026
                                        </span>
                                        <Button variant="ghost" className="h-auto p-0 text-[10px] font-black uppercase text-slate-400 hover:text-slate-900">Voir Profil complet</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 p-8 text-white">
                            <h3 className="text-xs font-black uppercase tracking-widest text-accent mb-6">Indice de Maîtrise Digitale</h3>
                            <div className="flex items-end gap-6 h-32">
                                {[30, 60, 45, 90, 75].map((val, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                                        <div className="w-full bg-white/5 rounded-t-lg relative overflow-hidden" style={{ height: `${val}%` }}>
                                            <div className="absolute inset-0 bg-accent/40" />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500">T{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-8 border border-slate-100 flex items-center gap-8">
                            <div className="h-24 w-24 rounded-full border-[10px] border-teal-500 flex items-center justify-center">
                                <span className="text-2xl font-black text-slate-900">88%</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Efficience Collective</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">Couverture des compétences critiques pour l'implantologie complexe.</p>
                                <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase tracking-widest text-accent mt-2">Détails de la cartographie →</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}

