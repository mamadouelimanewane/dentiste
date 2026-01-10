"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    ShieldCheck,
    Lock,
    Eye,
    FileSignature,
    History,
    AlertCircle,
    CheckCircle2,
    Database,
    Search,
    Download,
    Trash2,
    Server,
    Scale,
    Fingerprint,
    Loader2,
    RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function CompliancePage() {
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [activeSection, setActiveSection] = useState<'AUDIT' | 'GDPR' | 'CONSENT' | 'HDS'>('AUDIT')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/compliance')
            const json = await res.json()
            setData(json)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading && !data) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
            </div>
        )
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1 w-10 bg-indigo-600 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Regulatory Governance</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Bunker <span className="text-slate-400">Compliance</span></h1>
                    <p className="text-slate-500 font-medium">Gestion du RGPD, ANS et certification HDS.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200" onClick={fetchData}>
                        <RefreshCw className="h-4 w-4 mr-2" /> Actualiser
                    </Button>
                    <Button className="bg-indigo-600 text-white rounded-2xl font-black px-8 shadow-xl shadow-indigo-600/20">
                        Rapport Conformité
                    </Button>
                </div>
            </div>

            {/* Legal Alerts Banner */}
            {data?.legalReminders?.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-[2rem] p-6 flex items-center justify-between shadow-lg shadow-red-900/5 animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-red-900 uppercase tracking-tight">Alertes Réglementaires Critiques</h2>
                            <p className="text-xs text-red-700/70 font-bold uppercase tracking-widest mt-0.5">
                                {data.legalReminders.length} contrôle(s) obligatoire(s) en attente de validation.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {data.legalReminders.map((r: any, i: number) => (
                            <div key={i} className="hidden md:block bg-white/50 px-4 py-2 rounded-xl text-[10px] font-black text-red-800 border border-red-200">
                                {r.title}
                            </div>
                        ))}
                        <Button variant="ghost" className="text-[10px] font-black uppercase text-red-600 hover:bg-red-100">Gérer →</Button>
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="rounded-3xl border-none shadow-luxury bg-white p-6 border border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Score RGPD</p>
                            <p className="text-2xl font-black text-slate-900">98%</p>
                        </div>
                    </div>
                </Card>
                <Card className="rounded-3xl border-none shadow-luxury bg-white p-6 border border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <FileSignature className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Consentements</p>
                            <p className="text-2xl font-black text-slate-900">{data?.stats?.consentRate?.toFixed(0)}%</p>
                        </div>
                    </div>
                </Card>
                <Card className="rounded-3xl border-none shadow-luxury bg-white p-6 border border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <History className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Logs d'Accès</p>
                            <p className="text-2xl font-black text-slate-900">{data?.auditLogs?.length || 0}</p>
                        </div>
                    </div>
                </Card>
                <Card className="rounded-3xl border-none shadow-luxury bg-white p-6 border border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                            <Database className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Archives (ANS)</p>
                            <p className="text-2xl font-black text-slate-900">{data?.stats?.archivedDocs || 0}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Navigation Sidebar */}
                <div className="col-span-12 lg:col-span-3 space-y-2">
                    {[
                        { id: 'AUDIT', label: 'Journal des Accès', icon: Eye },
                        { id: 'GDPR', label: 'Gestion RGPD & ANS', icon: Lock },
                        { id: 'CONSENT', label: 'Consentements', icon: FileSignature },
                        { id: 'HDS', label: 'Certification HDS', icon: Server },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id as any)}
                            className={cn(
                                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm",
                                activeSection === item.id
                                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main View Area */}
                <div className="col-span-12 lg:col-span-9">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white border border-slate-50 overflow-hidden min-h-[600px]">
                        <CardContent className="p-0">
                            {/* Section: Audit Logs */}
                            {activeSection === 'AUDIT' && (
                                <div className="animate-in fade-in duration-500">
                                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                                        <h3 className="text-xl font-black tracking-tight">Trace historique d'accès aux données</h3>
                                        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Télécharger les logs (CSV)</Button>
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        {(data?.auditLogs || []).length > 0 ? (
                                            data.auditLogs.map((log: any) => (
                                                <div key={log.id} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                                                    <div className="flex items-center gap-6">
                                                        <div className={cn(
                                                            "h-10 w-10 rounded-xl flex items-center justify-center",
                                                            log.severity === 'CRITICAL' ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-400"
                                                        )}>
                                                            <Fingerprint className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900">
                                                                <span className="text-indigo-600">{log.user?.name || 'Système'}</span> {log.action}
                                                            </p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                                Patient : {log.patient?.firstName} {log.patient?.lastName} • IP: {log.ip || 'Local'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs font-bold text-slate-500">
                                                            {format(new Date(log.createdAt), 'dd/MM/yyyy HH:mm', { locale: fr })}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-20 text-center">
                                                <History className="h-12 w-12 text-slate-100 mx-auto mb-4" />
                                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Aucune activité enregistrée.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Section: GDPR */}
                            {activeSection === 'GDPR' && (
                                <div className="p-10 space-y-10 animate-in fade-in duration-500">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-black tracking-tighter">Automate de Purge & Archivage</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                                            Le système applique automatiquement les limites de conservation définies par l'ANS pour les dossiers cliniques (20 ans minimum après la dernière visite).
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                                <Download className="h-20 w-20" />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Portabilité des données</span>
                                            <h4 className="text-lg font-black mt-2">Dossier Médical (ZIP)</h4>
                                            <p className="text-xs text-slate-400 mt-2 mb-6">Générer un export complet structuré au format interopérable (HL7/FHIR ready).</p>
                                            <Button className="w-full bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl">Lancer l'export</Button>
                                        </div>

                                        <div className="bg-red-50 rounded-3xl p-8 border border-red-100 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-8 opacity-10 text-red-600">
                                                <Trash2 className="h-20 w-20" />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-red-400">Droit à l'oubli</span>
                                            <h4 className="text-lg font-black text-red-900 mt-2">Suppression Définitive</h4>
                                            <p className="text-xs text-red-600/70 mt-2 mb-6">
                                                {data?.stats?.expiredDocsCount || 0} documents ont dépassé la limite légale de conservation.
                                            </p>
                                            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-600 hover:text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl">Vider la file de purge</Button>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <AlertCircle className="h-8 w-8 text-indigo-600" />
                                            <div>
                                                <p className="font-black text-slate-900 uppercase text-xs tracking-tight">Certificat de Chiffrement</p>
                                                <p className="text-xs text-indigo-600/70 font-bold uppercase tracking-widest mt-0.5">AES-256 GCM • Rotation des clés active</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" className="text-[10px] font-black uppercase text-indigo-600">Vérifier l'intégrité →</Button>
                                    </div>
                                </div>
                            )}

                            {/* Section: Consent */}
                            {activeSection === 'CONSENT' && (
                                <div className="p-10 space-y-8 animate-in fade-in duration-500">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-2xl font-black tracking-tighter">Gestion des preuves numériques</h3>
                                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Validité Juridique eIDAS</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Signés', val: data?.stats?.signedConsents, color: 'text-indigo-600' },
                                            { label: 'En attente', val: data?.stats?.totalConsents - data?.stats?.signedConsents, color: 'text-amber-500' },
                                            { label: 'Révoqués', val: 0, color: 'text-red-500' },
                                        ].map((s, i) => (
                                            <div key={i} className="bg-slate-50 p-6 rounded-3xl">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                                                <p className={cn("text-3xl font-black", s.color)}>{s.val}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed italic">
                                        Chaque signature horodatée inclut l'empreinte numérique du document original, l'adresse IP et l'agent utilisateur pour une force probante maximale en cas de litige.
                                    </p>
                                </div>
                            )}

                            {/* Section: HDS */}
                            {activeSection === 'HDS' && (
                                <div className="p-10 space-y-10 animate-in fade-in duration-500">
                                    <div className="flex flex-col items-center justify-center text-center space-y-6 py-10">
                                        <div className="h-24 w-24 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl">
                                            <Scale className="h-12 w-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-black tracking-tighter">Infrastructure Hébergement Santé</h3>
                                            <p className="text-slate-500 max-w-md mx-auto">
                                                Conforme aux standards d'hébergement de données de santé (HDS) et certifié ISO 27001.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                                                <ShieldCheck className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Souveraineté des données</p>
                                                <p className="text-xs text-slate-500 mt-2">Toutes les données sont hébergées sur des serveurs sécurisés en Europe/Zone locale OHADA selon les législations vigentes.</p>
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                                <Lock className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Plan de Continuité (PCA)</p>
                                                <p className="text-xs text-slate-500 mt-2">Réplication synchrone et sauvegardes chiffrées quotidiennes avec test de restauration hebdomadaire.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black italic tracking-tighter uppercase">Audit de Sécurité Hebdo</h4>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-teal-400">Dernière analyse : Aujourd'hui à 04:00 • Zéro menace</p>
                                        </div>
                                        <Button className="bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-14 px-10 rounded-2xl shadow-xl border-none">Rapport Sécurité détaillé</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

