"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Folder,
    File,
    Search,
    Upload,
    MoreVertical,
    Download,
    Share2,
    Trash2,
    FileText,
    Image as ImageIcon,
    ChevronRight,
    Filter,
    Clock,
    ShieldCheck,
    Star,
    LayoutGrid,
    List,
    FolderPlus,
    Tag,
    HardDrive
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function GEDPage() {
    const [view, setView] = useState<'GRID' | 'LIST'>('GRID')
    const [path, setPath] = useState(['Racine', 'Patients'])

    const folders = [
        { name: 'Radiographies 3D', count: 12, size: '2.4 GB' },
        { name: 'Devis & Factures', count: 45, size: '120 MB' },
        { name: 'Protocoles HN', count: 8, size: '45 MB' },
        { name: 'Consentements', count: 124, size: '85 MB' }
    ]

    const files = [
        { name: 'Panoramique_Valjean_2026.dicom', type: 'DICOM', size: '45 MB', date: 'Aujourd\'hui 10:30', user: 'Dr. Lao' },
        { name: 'Devis_Implant_Premium_v2.pdf', type: 'PDF', size: '1.2 MB', date: 'Hier 14:22', user: 'Dr. Lao' },
        { name: 'Photo_Portrait_Preop.jpg', type: 'IMAGE', size: '8.4 MB', date: '20 Jan 2026', user: 'Fatou D.' },
        { name: 'Contrat_Maintenance_Scanner.pdf', type: 'PDF', size: '2.4 MB', date: '15 Jan 2026', user: 'Admin' }
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <HardDrive className="h-4 w-4 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Enterprise Doc Management</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">GED <span className="text-indigo-600">Elite Vault</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Gestion documentaire sécurisée, indexation intelligente et archivage légal.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Tag className="mr-2 h-4 w-4" /> Gérer les Tags
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Upload className="mr-2 h-5 w-5" /> Importer Documents
                    </Button>
                </div>
            </div>

            {/* GED Toolbar */}
            <div className="bg-white border rounded-[2.5rem] p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4 flex-1 max-w-xl">
                    <div className="flex items-center gap-2 px-6 py-2">
                        {path.map((p, i) => (
                            <div key={p} className="flex items-center gap-2">
                                <span className={cn(
                                    "text-xs font-black uppercase tracking-widest transition-colors cursor-pointer",
                                    i === path.length - 1 ? "text-slate-900" : "text-slate-400 hover:text-indigo-600"
                                )}>{p}</span>
                                {i < path.length - 1 && <ChevronRight className="h-3 w-3 text-slate-300" />}
                            </div>
                        ))}
                    </div>
                    <div className="h-8 w-[1px] bg-slate-100" />
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Rechercher un document, un patient, une date..." className="border-none bg-transparent h-10 text-xs font-bold pl-12" />
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4">
                    <Button variant="ghost" size="icon" onClick={() => setView('GRID')} className={cn("h-10 w-10 rounded-xl", view === 'GRID' && "bg-slate-100 text-indigo-600")}><LayoutGrid className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setView('LIST')} className={cn("h-10 w-10 rounded-xl", view === 'LIST' && "bg-slate-100 text-indigo-600")}><List className="h-4 w-4" /></Button>
                    <div className="h-8 w-[1px] bg-slate-100 mx-2" />
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl"><Filter className="h-4 w-4" /></Button>
                    <Button variant="ghost" className="h-10 font-black text-[10px] uppercase tracking-widest gap-2 text-indigo-600"><FolderPlus className="h-4 w-4" /> Nouveau Dossier</Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Main Content Area */}
                <div className="col-span-12 lg:col-span-9 space-y-10">
                    {/* Folders Section */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">Dossiers Récents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {folders.map(folder => (
                                <Card key={folder.name} className="rounded-[2.5rem] border-none shadow-luxury bg-white group hover:translate-y-[-4px] transition-all cursor-pointer">
                                    <CardContent className="p-8 space-y-4">
                                        <div className="h-14 w-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <Folder className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 tracking-tight">{folder.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{folder.count} éléments • {folder.size}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Files Section */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">Documents</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {files.map(file => (
                                <div key={file.name} className="bg-white p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer border border-transparent hover:border-indigo-100">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-14 w-14 rounded-2xl flex items-center justify-center transition-all",
                                            file.type === 'PDF' ? "bg-rose-50 text-rose-500" : file.type === 'DICOM' ? "bg-indigo-50 text-indigo-500" : "bg-teal-50 text-teal-500"
                                        )}>
                                            {file.type === 'PDF' ? <FileText className="h-6 w-6" /> : file.type === 'IMAGE' ? <ImageIcon className="h-6 w-6" /> : <File className="h-6 w-6" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{file.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{file.type}</span>
                                                <span className="h-1 w-1 rounded-full bg-slate-200" />
                                                <span className="text-[10px] font-bold text-slate-400">{file.size}</span>
                                                <span className="h-1 w-1 rounded-full bg-slate-200" />
                                                <span className="text-[10px] font-bold text-slate-400">Ajouté par {file.user}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <span className="text-[10px] font-black text-slate-300">{file.date}</span>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:text-indigo-600 hover:bg-indigo-50"><Download className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:text-indigo-600 hover:bg-indigo-50"><Share2 className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Info & Stats */}
                <div className="col-span-12 lg:col-span-3 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Stockage Elite Cloud</h3>
                            <ShieldCheck className="h-5 w-5 text-teal-500" />
                        </div>
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">1.2 TB</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Utilisé sur 5 TB</p>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '24%' }} />
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: 'Imagerie DICOM', val: '850 GB', color: 'bg-indigo-600' },
                                    { label: 'Documents PDF', val: '120 GB', color: 'bg-rose-500' },
                                    { label: 'Photos Cliniques', val: '230 GB', color: 'bg-teal-500' },
                                ].map(s => (
                                    <div key={s.label} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-1.5 w-1.5 rounded-full", s.color)} />
                                            <span className="text-[10px] font-bold text-slate-500">{s.label}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-900">{s.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Star className="h-5 w-5 text-gold fill-gold" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest">Favoris Mobiles</h3>
                        </div>
                        <div className="space-y-4">
                            {['Fiche_Secu_Postop.pdf', 'Guide_Hygiene_VR.mp4'].map(f => (
                                <div key={f} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="text-[10px] font-bold truncate max-w-[120px]">{f}</span>
                                    <ChevronRight className="h-3 w-3 text-white/40" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[3rem] flex flex-col items-center text-center space-y-4">
                        <Clock className="h-8 w-8 text-indigo-300" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Dernier Indexation IA</p>
                            <p className="text-sm font-black text-indigo-900">À l'instant</p>
                            <p className="text-[9px] font-medium text-indigo-600 mt-2 leading-relaxed">
                                Le moteur IA a classé 12 nouveaux documents automatiquement.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
