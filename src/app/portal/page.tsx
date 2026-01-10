"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Diamond,
    FileText,
    Calendar,
    ShieldCheck,
    CreditCard,
    MessageCircle,
    Image as ImageIcon,
    Download,
    Eye,
    ChevronRight,
    Star
} from "lucide-react"

export default function PatientPortal() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Navigation */}
            <nav className="bg-slate-950 text-white px-8 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <Diamond className="h-6 w-6 text-accent" />
                    <span className="text-lg font-black tracking-tighter uppercase">Dento<span className="text-accent">Prestige</span> Patient</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black">Mamadou Diallo</p>
                        <p className="text-[9px] font-bold text-accent uppercase tracking-widest">Patient Privilège</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-black text-sm">
                        JD
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-8 space-y-12">
                <header>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Votre Espace Privé ✨</h1>
                    <p className="text-slate-500 font-medium">Consultez vos documents, rendez-vous et signez vos consentements en toute sécurité.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left: Quick Actions & Appointments */}
                    <div className="md:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="rounded-3xl border-none shadow-luxury bg-white group cursor-pointer hover:scale-[1.02] transition-all">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <Calendar className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">Prendre RDV</p>
                                        <p className="text-xs text-slate-500">Agenda en ligne disponible</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="rounded-3xl border-none shadow-luxury bg-white group cursor-pointer hover:scale-[1.02] transition-all">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                                        <CreditCard className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">Payer Factures</p>
                                        <p className="text-xs text-slate-500">Paiement sécurisé en ligne</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Next Appointment Card */}
                        <Card className="rounded-[3rem] border-none shadow-2xl bg-slate-950 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Star className="h-32 w-32 text-accent" />
                            </div>
                            <CardContent className="p-10 space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/30">Prochain Rendez-vous</span>
                                </div>
                                <div>
                                    <h3 className="text-5xl font-black tracking-tighter mb-2 text-gold">Mardi 14 Janvier</h3>
                                    <p className="text-xl font-bold text-slate-400">À 10h30 avec le Dr. Aere Lao</p>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <Button className="bg-accent text-white font-black px-8 rounded-xl h-12 uppercase tracking-widest text-xs">Confirmer Présence</Button>
                                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-black px-8 rounded-xl h-12 uppercase tracking-widest text-xs">Reporter</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Documents Section */}
                        <div className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 border-b pb-4">Mes Documents Récents</h2>
                            <div className="space-y-3">
                                {[
                                    { name: 'Devis Implantation Phase 2', type: 'SIGNATURE QUALIFIÉE', color: 'text-accent bg-accent/10 border-accent/20', icon: ShieldCheck, provider: 'Yousign' },
                                    { name: 'Ordonnance Post-Opératoire', type: 'PDF', color: 'text-blue-600 bg-blue-50 border-blue-100', icon: FileText },
                                    { name: 'Facture #2025-001', type: 'PAYÉ', color: 'text-green-600 bg-green-50 border-green-100', icon: CreditCard },
                                ].map((doc, i) => (
                                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-slate-300 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center border", doc.color)}>
                                                <doc.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-black text-slate-800">{doc.name}</p>
                                                    {doc.provider && (
                                                        <span className="text-[7px] font-black bg-blue-900 text-white px-1.5 py-0.5 rounded tracking-tighter uppercase">{doc.provider}</span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {doc.type.includes('SIGNATURE') && (
                                                <Button size="sm" className="bg-slate-900 text-white font-black text-[10px] uppercase rounded-full px-4">Signer par {doc.provider}</Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-slate-950"><Download className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-slate-950"><Eye className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar Info */}
                    <div className="md:col-span-4 space-y-6">
                        <Card className="rounded-[2rem] border-none shadow-luxury bg-white">
                            <CardHeader className="border-b pb-4">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-500">Contact Cabinet 24/7</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-slate-950 rounded-xl flex items-center justify-center text-accent">
                                            <MessageCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase">Messagerie Sécurisée</p>
                                            <p className="text-sm font-bold text-slate-900">Ouvrir une discussion</p>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-slate-950 text-white font-black uppercase text-[10px] tracking-widest rounded-xl h-10">Envoyer un Message</Button>
                                </div>
                                <div className="pt-6 border-t border-slate-50 space-y-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">En cas d'urgence</p>
                                    <p className="text-lg font-black text-red-600 tracking-tighter">01 23 45 67 89</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-[2rem] border-none shadow-luxury bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white overflow-hidden">
                            <CardContent className="p-8 space-y-4 relative">
                                <div className="absolute -bottom-4 -right-4 opacity-10">
                                    <ImageIcon className="h-24 w-24" />
                                </div>
                                <p className="text-[10px] font-black text-accent uppercase tracking-widest">Dernier Cliché Radio</p>
                                <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-all">
                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Cliquer pour Agrandir</p>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 italic">"Radio panoramique effectuée le 12/10/2024"</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}

