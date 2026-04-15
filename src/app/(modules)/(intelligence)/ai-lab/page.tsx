"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    BrainCircuit,
    Sparkles,
    FileSearch,
    Zap,
    ShieldCheck,
    Scale,
    AlertCircle,
    Search,
    RefreshCw,
    Scan,
    FileText,
    Brain,
    Lock,
    Eye,
    ChevronRight,
    Tag,
    History
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AILabPage() {
    const [query, setQuery] = useState("")
    const [isThinking, setIsThinking] = useState(false)
    const [activeAiTool, setActiveAiTool] = useState<'DISCOVERY' | 'RISK' | 'PROCESSOR'>('DISCOVERY')

    const documents = [
        { id: 1, name: 'Radio Panoramique - Aere Lao', category: 'Radiologie', pii: 'OK', status: 'PROCESSED', summary: 'Absence de pathologie apicale, résorption osseuse modérée sur 16.' },
        { id: 2, name: 'Consentement Chirurgie', category: 'Administratif', pii: 'DETECTED', status: 'ALERT', summary: 'Signature présente, mais mention du risque allergique manquante.' },
        { id: 3, name: 'Compte-rendu Labo', category: 'Analyses', pii: 'OK', status: 'PENDING', summary: '' },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Elite Cognitive Lab</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">AI <span className="text-gold">Automation & Science</span></h1>
                    <p className="text-slate-500 font-medium">Analyse sémantique, E-Discovery et prédiction de risques cliniques.</p>
                </div>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl">
                    {(['DISCOVERY', 'RISK', 'PROCESSOR'] as const).map(tab => (
                        <Button
                            key={tab}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "rounded-xl px-6 text-[11px] font-black uppercase tracking-widest transition-all",
                                activeAiTool === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                            onClick={() => setActiveAiTool(tab)}
                        >
                            {tab === 'DISCOVERY' ? 'E-Discovery' : tab === 'RISK' ? 'Analyse Risques' : 'Auto-Classification'}
                        </Button>
                    ))}
                </div>
            </div>

            {activeAiTool === 'DISCOVERY' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white overflow-hidden p-10 relative">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <BrainCircuit className="h-40 w-40 text-accent" />
                        </div>
                        <div className="relative z-10 space-y-8 max-w-3xl">
                            <div>
                                <h2 className="text-2xl font-black tracking-tighter text-white mb-2">Deep Discovery Engine</h2>
                                <p className="text-slate-400 text-sm font-medium">Recherchez instantanément dans des milliers de documents par concept sémantique (ex: "complications post-implantatoires chez les fumeurs").</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                    <Input
                                        placeholder="Concept, pathologie, jurisprudence interne..."
                                        className="h-16 pl-12 bg-white/5 border-white/10 rounded-2xl text-white focus-visible:ring-accent"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                                <Button className="h-16 px-10 bg-accent text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/20">
                                    {isThinking ? <RefreshCw className="h-5 w-5 animate-spin" /> : 'Lancer l\'Analyse'}
                                </Button>
                            </div>
                            <div className="flex gap-6 pt-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-teal-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Filtrage PII Actif</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-indigo-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Auto-Tagging par IA</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {documents.map(doc => (
                            <Card key={doc.id} className="rounded-3xl border-none shadow-luxury bg-white group hover:scale-[1.02] transition-all overflow-hidden">
                                <CardHeader className="p-6 border-b border-slate-50 flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-10 w-10 rounded-xl flex items-center justify-center",
                                            doc.status === 'PROCESSED' ? "bg-teal-50 text-teal-600" : "bg-red-50 text-red-600"
                                        )}>
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 line-clamp-1">{doc.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.category}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 group-hover:text-slate-900 transition-colors"><Eye className="h-4 w-4" /></Button>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="bg-slate-50/50 rounded-2xl p-4 text-[11px] font-medium text-slate-600 leading-relaxed italic">
                                        {doc.summary || "Document en attente d'indexation..."}
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex gap-1">
                                            <span className={cn(
                                                "text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase border",
                                                doc.pii === 'OK' ? "bg-green-50 text-green-700 border-green-100" : "bg-red-100 text-red-700 border-red-200"
                                            )}>
                                                {doc.pii === 'OK' ? 'SANS PII' : '⚠️ PII DÉTECTÉ'}
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-black text-slate-400">Jusqu'à 98% Confidence</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeAiTool === 'RISK' && (
                <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="col-span-12 lg:col-span-7 space-y-6">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white p-10">
                            <CardHeader className="p-0 mb-8">
                                <CardTitle className="text-xl font-black tracking-tighter flex items-center gap-2">
                                    <Scale className="h-6 w-6 text-indigo-600" /> Analyse de Risque & Prédiction
                                </CardTitle>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base de jurisprudence et éthique dentaire</p>
                            </CardHeader>
                            <div className="space-y-8">
                                <div className="p-6 rounded-[2rem] bg-indigo-50 border border-indigo-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <AlertCircle className="h-5 w-5 text-indigo-600" />
                                        <h3 className="text-sm font-black text-slate-900 uppercase">Alerte IA Compliance</h3>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                        L'analyse sémantique du dossier <span className="font-bold">#412-23</span> indique une divergence entre le protocole clinique appliqué et le consentement signé par le patient.
                                    </p>
                                    <div className="mt-4 flex gap-4">
                                        <div className="flex-1 bg-white p-4 rounded-2xl border border-indigo-200 text-center">
                                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Risque de Litige</p>
                                            <p className="text-xl font-black text-red-600">MODÉRÉ (62%)</p>
                                        </div>
                                        <div className="flex-1 bg-white p-4 rounded-2xl border border-indigo-200 text-center">
                                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Prédiction Issue</p>
                                            <p className="text-xl font-black text-teal-600">MÉDIATION</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Suggestion de Jurisprudence Interne</h4>
                                    {[
                                        { title: 'Affaire Aere Lao (2023) - Défaut d\'information', outcome: 'Action requise : Compléter consentement', icon: History },
                                        { title: 'Protocole Implantatoire 3D - Norme ISO 2026', outcome: 'Standard respecté', icon: ShieldCheck },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white border hover:border-indigo-100 transition-all group cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <item.icon className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                                <span className="text-xs font-bold text-slate-700">{item.title}</span>
                                            </div>
                                            <span className="text-[9px] font-black uppercase text-indigo-500">{item.outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="col-span-12 lg:col-span-5 space-y-6">
                        <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white p-8">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-accent mb-6 flex items-center justify-between">
                                Smart Redaction Helper
                                <Sparkles className="h-4 w-4" />
                            </CardTitle>
                            <div className="space-y-6">
                                <p className="text-xs text-slate-400 leading-relaxed">Générez un contrat de collaboration ou une clause d'exclusion spécifique basée sur vos données historiques.</p>
                                <div className="space-y-3">
                                    <Button className="w-full bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl h-12 hover:bg-white/10 flex justify-between px-6">
                                        Contrat de Collaboration
                                        <ChevronRight className="h-4 w-4 text-accent" />
                                    </Button>
                                    <Button className="w-full bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl h-12 hover:bg-white/10 flex justify-between px-6">
                                        Avenant Temps Partagé
                                        <ChevronRight className="h-4 w-4 text-accent" />
                                    </Button>
                                </div>
                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Auto-Drafting Actif</span>
                                    </div>
                                    <p className="text-[9px] text-slate-500 font-bold italic">Système entraîné sur 450 actes juridiques dentaires.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}

            {activeAiTool === 'PROCESSOR' && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-12 space-y-8 bg-slate-50/50">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tighter text-slate-900 mb-2">Auto-Classification Pipeline</h3>
                                    <p className="text-slate-500 text-sm font-medium">Glissez un document pour le classer instantanément avec analyse PII et extraction sémantique.</p>
                                </div>
                                <div className="aspect-video bg-white border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                                    <Scan className="h-12 w-12 mb-4 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                    <p className="text-xs font-black uppercase tracking-widest">Déposer des documents ici</p>
                                    <p className="text-[10px] font-bold mt-1">PDF, JPG, PNG jusqu'à 20MB</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Queue de Traitement</span>
                                        <span className="text-[10px] font-black text-indigo-600">2 documents restants</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-12 space-y-8">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Dernières Actions Automation</h4>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Classification', desc: 'Scan Panoramique → Radiologie (Confiance 99%)', time: 'Il y a 2m', icon: Zap },
                                        { label: 'PII Scrubbing', desc: 'Nettoyage des données patient sur Doc #45', time: 'Il y a 5m', icon: Lock },
                                        { label: 'Smart Indexing', desc: 'Extraction mots-clés : "Péri-implantite", "Hygiène"', time: 'Il y a 12m', icon: Tag },
                                    ].map((action, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mt-1">
                                                <action.icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">{action.label}</p>
                                                <p className="text-[10px] font-medium text-slate-500 leading-tight mb-1">{action.desc}</p>
                                                <p className="text-[9px] font-black text-indigo-400 uppercase">{action.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}

