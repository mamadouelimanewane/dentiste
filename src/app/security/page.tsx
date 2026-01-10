"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    ShieldAlert,
    History,
    Lock,
    UserCheck,
    FileArchive,
    Database,
    Eye,
    AlertTriangle,
    CheckCircle2,
    Search,
    Fingerprint,
    HardDrive,
    Trash2,
    Info,
    RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SecurityPage() {
    const [logs, setLogs] = useState([
        { id: 1, user: 'Dr. Aere Lao', action: 'EXPORT_DATABASE', target: 'Tous les Patients', status: 'CRITICAL', time: '14:22', ip: '192.168.1.12' },
        { id: 2, user: 'Secrétariat', action: 'READ_FILE', target: 'Mamadou Diallo / Radio X', status: 'INFO', time: '14:15', ip: '192.168.1.45' },
        { id: 3, user: 'Dr. Martin', action: 'SIGN_DOCUMENT', target: 'Devis #244', status: 'SUCCESS', time: '13:58', ip: '192.168.1.18' },
        { id: 4, user: 'Système', action: 'BACKUP_COMPLETED', target: 'Cloud External', status: 'SUCCESS', time: '04:00', ip: 'internal' },
    ])

    const [conflicts, setConflicts] = useState([
        { id: 1, type: 'Lien Familial Staff', entity: 'Patiente Marie Faye', details: 'Épouse de l\'Assistant Médical', severity: 'MEDIUM' },
        { id: 2, type: 'Doublon Identité', entity: 'M. Mamadou Diallo / M. J. Aere Lao', details: 'Risque de dossier patient scindé', severity: 'LOW' },
    ])

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-red-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Sécurité & Conformité Lab</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Bunker <span className="text-gold">Compliance & Audit</span></h1>
                    <p className="text-slate-500 font-medium">Tracé intégral, chiffrement AES-256 et gestion des habilitations.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold bg-white"><Database className="mr-2 h-4 w-4 text-accent" /> Export Coffre-fort</Button>
                    <Button className="bg-red-600 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-2xl px-8 shadow-xl shadow-red-200">
                        <ShieldAlert className="h-4 w-4 mr-2" /> Alertes de Sécurité
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Audit Log Table */}
                <div className="col-span-12 lg:col-span-8">
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/20">
                            <div>
                                <CardTitle className="text-base font-black tracking-tighter flex items-center gap-2">
                                    <History className="h-5 w-5 text-slate-400" /> Journal d'Audit Temps Réel
                                </CardTitle>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Traçabilité totale (NF Z42-013)</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400"><Search className="h-5 w-5" /></Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-50">
                                {logs.map(log => (
                                    <div key={log.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "h-10 w-10 rounded-full flex items-center justify-center font-black text-[10px]",
                                                log.status === 'CRITICAL' ? "bg-red-100 text-red-600" :
                                                    log.status === 'SUCCESS' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"
                                            )}>
                                                {log.status === 'CRITICAL' ? <AlertTriangle className="h-5 w-5" /> : <Fingerprint className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{log.action}</p>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                    <span>Propulsé par {log.user}</span>
                                                    <span>•</span>
                                                    <span>IP: {log.ip}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-slate-800 tracking-tighter">{log.target}</p>
                                            <p className="text-[10px] font-bold text-slate-400">{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Conflict Checker & Security Stats */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    {/* CONFLICT CHECKER */}
                    <Card className="rounded-[2.5rem] border-none shadow-luxury bg-slate-950 text-white p-8 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <UserCheck className="h-32 w-32" />
                        </div>
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-accent mb-6">Gestion des Conflits d'Intérêts</CardTitle>
                        <div className="space-y-4">
                            {conflicts.map(c => (
                                <div key={c.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 group hover:border-accent/40 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{c.type}</span>
                                        <div className={cn("h-2 w-2 rounded-full", c.severity === 'MEDIUM' ? 'bg-orange-500' : 'bg-blue-400')} />
                                    </div>
                                    <p className="text-xs font-black text-white mb-1">{c.entity}</p>
                                    <p className="text-[10px] text-slate-400 font-medium italic">{c.details}</p>
                                </div>
                            ))}
                            <Button className="w-full bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl mt-2 hover:bg-white/10">Scanner la base complète</Button>
                        </div>
                    </Card>

                    {/* STORAGE & RETENTION */}
                    <Card className="rounded-[2rem] border-none shadow-luxury bg-white border border-slate-100 p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Archives & Conservation</h3>
                            <FileArchive className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-3xl font-black text-slate-900 tracking-tighter">18.4 GB</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Données chiffrées AES-256</p>
                                </div>
                                <HardDrive className="h-8 w-8 text-slate-100" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                    <span>Rétention légale (10 ans+)</span>
                                    <span>84% Capacité</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-900 rounded-full" style={{ width: '84%' }}></div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest h-11 border-slate-100 rounded-xl">
                                <Trash2 className="h-4 w-4 mr-2" /> Purger les expirés
                            </Button>
                        </div>
                    </Card>

                    {/* EXTERNAL BACKUP */}
                    <Card className="rounded-[2rem] border-none shadow-luxury bg-gradient-to-br from-teal-500 to-teal-700 text-white p-8 relative overflow-hidden">
                        <div className="absolute -bottom-8 -right-8 opacity-20 transform -rotate-12">
                            <RefreshCw className="h-32 w-32" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Backup Externalisé</span>
                        </div>
                        <h3 className="text-lg font-black tracking-tight mb-2">Cloud Synchro Actif</h3>
                        <p className="text-xs text-white/80 font-medium leading-relaxed">Dernière sauvegarde réussie vers le serveur distant sécurisé il y a 4 heures.</p>
                        <Button className="mt-6 bg-white text-teal-700 font-black uppercase text-[10px] tracking-widest h-10 rounded-xl w-full border-none hover:bg-teal-50 shadow-lg">Lancer manuellement</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

