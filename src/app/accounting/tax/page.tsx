"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    FileText, Calculator, ShieldCheck, Download, 
    ArrowUpRight, AlertCircle, RefreshCw, BarChart3,
    BookOpen, Scale, Landmark, PieChart, Info, CheckCircle,
    Zap, Sparkles, FolderDown, ArrowRight, Table as TableIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function OHADATaxEngine() {
    const [auditStatus, setAuditStatus] = useState('READY')
    const [isGenerating, setIsGenerating] = useState(false)

    const runTaxAudit = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setAuditStatus('COMPLIANT')
        }, 4000)
    }

    const taxDocuments = [
        { name: 'Liasse Fiscale OHADA 2025', type: 'DSF', status: 'READY', lastUpdate: '2h ago' },
        { name: 'Tableau de Passage de Résultat', type: 'COMPTA', status: 'READY', lastUpdate: 'Hier' },
        { name: 'État de la TVA Mensuel', type: 'TAX', status: 'READY', lastUpdate: '14/03' },
        { name: 'Bilan Simplifié SYSCOHADA', type: 'FINANCE', status: 'DRAFT', lastUpdate: '2 jours' },
    ]

    return (
        <div className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto pb-40">
            {/* Tax Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 bg-indigo-950 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Scale className="h-64 w-64 text-indigo-400" />
                </div>
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
                            <Landmark className="h-6 w-6 text-white animate-pulse" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Conformité SYSCOHADA / OHADA</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Advanced <span className="text-emerald-400">Tax Engine</span></h1>
                    <p className="text-indigo-200 font-medium italic max-w-lg leading-relaxed">
                        Génération automatisée des liasses fiscales et documents de synthèse pour le Sénégal. Précision comptable certifiée par IA.
                    </p>
                </div>
                <div className="relative z-10 flex gap-4 w-full md:w-auto">
                    <Button onClick={runTaxAudit} disabled={isGenerating} className="h-16 px-10 rounded-2xl bg-white text-indigo-950 font-black uppercase text-[10px] tracking-widest hover:bg-emerald-50 transition-all shadow-xl">
                        {isGenerating ? "Audit Fiscal en cours..." : "Lancer Audit Fiscal"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Compliance Panel */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Compliance Meter */}
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-10 relative overflow-hidden">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-8">
                            <h2 className="text-xl font-black uppercase tracking-tight italic">Status <span className="text-indigo-600">Comptable Elite</span></h2>
                            {auditStatus === 'COMPLIANT' && (
                                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100">
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Certifié Conforme</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                             <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Risque Fiscal</p>
                                <p className="text-4xl font-black text-emerald-600 italic tracking-tight">FAIBLE</p>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full w-[15%] bg-emerald-500 rounded-full" />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Écart Compta/Banque</p>
                                <p className="text-4xl font-black text-slate-900 italic tracking-tight">0.05%</p>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full w-[5%] bg-indigo-500 rounded-full" />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Couverture TVA</p>
                                <p className="text-4xl font-black text-indigo-600 italic tracking-tight">TOTAL</p>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full w-full bg-indigo-600 rounded-full" />
                                </div>
                             </div>
                        </div>
                    </Card>

                    {/* Document Storage */}
                    <Card className="rounded-[4rem] border-none shadow-luxury bg-white p-12 space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black italic tracking-tighter uppercase">Vault de <span className="text-emerald-600">Synthèse Fiscale</span></h3>
                            <Button variant="ghost" className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">Tout Télécharger</Button>
                        </div>
                        <div className="space-y-4">
                            {taxDocuments.map((doc, i) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-2xl border border-transparent hover:border-slate-100 transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className="h-16 w-16 rounded-[1.5rem] bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <FileText className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-black text-slate-900 tracking-tight italic">{doc.name}</p>
                                            <div className="flex gap-4 mt-1">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Format {doc.type}</span>
                                                <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest italic leading-none">{doc.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-bold text-slate-300 italic group-hover:text-slate-400">{doc.lastUpdate}</span>
                                        <Button size="icon" className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all">
                                            <Download className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar Metrics */}
                <div className="lg:col-span-4 space-y-10">
                     <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white p-10 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                            <Calculator className="h-40 w-40 text-emerald-500" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">Financial Summary</span>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1 italic">Résultat Prévisionnel</p>
                                <p className="text-4xl font-black tracking-tighter text-white uppercase italic">12.4M <span className="text-xs text-white/40">FCFA</span></p>
                            </div>
                            <div className="h-[1px] w-full bg-white/10" />
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-white/60 italic">IS à Provisionner</span>
                                    <span className="text-sm font-black text-emerald-400">3.7M FCFA</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-white/60 italic">Seuil Rentabilité</span>
                                    <span className="text-sm font-black text-emerald-400">Atteint</span>
                                </div>
                            </div>
                            <Button className="w-full h-14 rounded-2xl bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl">Simuler Clôture Exercice</Button>
                        </div>
                     </Card>

                     <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Vérifications OHADA</h3>
                        <div className="space-y-4">
                             {[
                                { label: 'Conformité SYSCOHADA', ok: true },
                                { label: 'Validation Grand Livre', ok: true },
                                { label: 'Audit Ecritures Anormales', ok: false, warning: '3 détections' },
                                { label: 'Vérification Pièces GED', ok: true },
                             ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                                    <span className="text-[10px] font-black text-slate-700 uppercase italic leading-none">{item.label}</span>
                                    {item.ok ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <div className="px-2 py-0.5 bg-rose-50 text-rose-500 rounded-full text-[8px] font-black uppercase">{item.warning}</div>}
                                </div>
                             ))}
                        </div>
                     </Card>

                     <div className="p-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[3rem] text-white space-y-4 relative overflow-hidden group">
                         <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform">
                             <Landmark className="h-40 w-40" />
                         </div>
                         <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none">Export Expert-Comptable</h3>
                         <p className="text-[11px] font-medium opacity-80 leading-relaxed italic">
                             "Tous les documents sont prêts au format attendu par votre cabinet comptable au Sénégal."
                         </p>
                         <Button variant="outline" className="w-full h-12 rounded-2xl border-white/40 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10">Envoyer l'Accès Audit</Button>
                     </div>
                </div>
            </div>

            <AnimatePresence>
                {isGenerating && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-indigo-950/90 backdrop-blur-2xl flex items-center justify-center p-8">
                        <div className="max-w-xl w-full text-center space-y-10">
                            <div className="relative h-48 w-48 mx-auto">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute inset-0 border-[4px] border-emerald-500/10 rounded-full border-t-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Landmark className="h-16 w-16 text-white animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">Legal Neural <span className="text-emerald-400">Scanner</span></h3>
                                <div className="flex flex-col gap-2">
                                    <p className="text-indigo-200 text-sm font-medium animate-pulse">Audit complet des écritures SYSCOHADA...</p>
                                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Optimisation fiscale via moteur neural DentoPrestige</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
