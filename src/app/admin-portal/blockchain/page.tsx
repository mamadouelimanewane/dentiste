"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    ShieldCheck, Lock, Binary, Database, Clock, 
    CheckCircle2, AlertCircle, FileText, Share2, 
    Download, RefreshCw, Hash, Cpu, Key, ExternalLink,
    Zap, Fingerprint, Activity, Server
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function BlockchainMedicalLedger() {
    const [isVerifying, setIsVerifying] = useState(false)
    const [activeNodes, setActiveNodes] = useState(8)
    
    const ledgerEntries = [
        { id: 'BLK-00921', hash: '0x882...fa12', action: 'SIGN_CONSENT', user: 'Jean Valjean', time: '14/03/2026 18:45', status: 'CONFIRMED' },
        { id: 'BLK-00920', hash: '0x321...bc89', action: 'TREATMENT_START', user: 'Dr. Aere Lao', time: '14/03/2026 10:30', status: 'CONFIRMED' },
        { id: 'BLK-00919', hash: '0xef4...1192', action: 'DATA_ENCRYPTION', user: 'System IA', time: '14/03/2026 09:12', status: 'CONFIRMED' },
        { id: 'BLK-00918', hash: '0xdd1...aa54', action: 'AUDIT_LOG', user: 'Admin Elite', time: '13/03/2026 23:58', status: 'CONFIRMED' },
    ]

    const verifyChain = () => {
        setIsVerifying(true)
        setTimeout(() => setIsVerifying(false), 2500)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 space-y-10 font-mono">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            <Lock className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.5em]">Immutable Medical Registry</span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                        Blockchain <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Medical Ledger</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <Button onClick={verifyChain} disabled={isVerifying} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl h-14 px-10 font-black uppercase text-[10px] tracking-widest border-none shadow-2xl shadow-emerald-600/20">
                        {isVerifying ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                        {isVerifying ? 'Verifying Integrity...' : 'Vérifier la Chaîne'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Node Network Visualizer */}
                <Card className="lg:col-span-12 rounded-[3.5rem] border-none bg-slate-900 p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Binary className="h-64 w-64 text-emerald-500" />
                    </div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Total Blocks', value: '14,228', icon: Database, color: 'text-emerald-500' },
                            { label: 'Nodes Actifs', value: activeNodes, icon: Server, color: 'text-blue-500' },
                            { label: 'Uptime Réseau', value: '99.99%', icon: Activity, color: 'text-indigo-500' },
                            { label: 'Dernier Hash', value: '0x882...fa12', icon: Hash, color: 'text-slate-500' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-black/20 rounded-[2rem] p-6 border border-white/5 group hover:border-emerald-500/30 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                </div>
                                <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Ledger entries */}
                <Card className="lg:col-span-8 rounded-[3.5rem] border-none bg-white text-slate-900 overflow-hidden shadow-luxury">
                    <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight italic">Registres de <span className="text-emerald-600">Confiance</span></CardTitle>
                            <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Audit Trail horodaté et inviolable</CardDescription>
                        </div>
                        <Button variant="ghost" className="text-emerald-600 font-black uppercase text-[10px] tracking-widest">Télécharger le Ledger Manifest</Button>
                    </CardHeader>
                    <div className="p-0 divide-y divide-slate-50">
                        {ledgerEntries.map((entry, i) => (
                            <motion.div 
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 flex items-center justify-between hover:bg-slate-50 transition-all group"
                            >
                                <div className="flex items-center gap-8">
                                    <div className="h-14 w-14 bg-slate-950 rounded-2xl flex items-center justify-center text-emerald-400">
                                        <Binary className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="text-lg font-black text-slate-900 tracking-tight">{entry.action}</p>
                                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-lg text-[8px] font-black uppercase">{entry.status}</span>
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hash: {entry.hash} • By {entry.user}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-slate-900">{entry.time}</p>
                                    <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1">
                                        Explorer <ExternalLink className="h-3 w-3" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>

                {/* Verification Panel */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="rounded-[3rem] border-none bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                            <Fingerprint className="h-40 w-40 text-emerald-500" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">Zero-Knowledge Audit</h3>
                        <p className="text-2xl font-black italic tracking-tighter uppercase leading-tight">
                            Certifiez vos actes médicaux par la <span className="text-emerald-400">Preuve Numérique</span>.
                        </p>
                        <div className="space-y-4 pt-4">
                            {[
                                { label: 'Proof of Existence', status: 'ACTIVE' },
                                { label: 'Patient Ownership', status: 'VERIFIED' },
                                { label: 'Cross-Node Sync', status: '9/12 Nodes' },
                            ].map((p, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-slate-400">{p.label}</span>
                                    <span className="text-emerald-500">{p.status}</span>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full bg-white text-slate-950 rounded-2xl h-14 font-black uppercase text-[10px] tracking-widest mt-6">
                            Générer Certificat Elite
                        </Button>
                    </Card>

                    <Card className="rounded-[3rem] border-none bg-white text-slate-900 p-8 border border-slate-100 italic">
                        <div className="flex items-center gap-4 mb-4">
                            <Binary className="h-6 w-6 text-indigo-600" />
                            <h4 className="text-xs font-black uppercase tracking-widest">Note Technologique</h4>
                        </div>
                        <p className="text-[11px] font-medium leading-relaxed text-slate-500">
                            "Chaque interaction clinique au sein du réseau DentoPrestige est automatiquement minée dans notre ledger privé Hyperledger Fabric, garantissant une protection juridique totale contre toute contestation d'acte ou de consentement."
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}
