"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    BookOpen,
    Search,
    ChevronRight,
    LayoutDashboard,
    Users,
    Calendar,
    Activity,
    DollarSign,
    ShieldCheck,
    FileCheck,
    HardDrive,
    Brain,
    Scale,
    FileText,
    Zap,
    Globe,
    PieChart,
    Settings,
    MessageSquare,
    Briefcase,
    HelpCircle,
    Mic,
    Radiation,
    Sparkles,
    Star,
    ArrowRight,
    Printer,
    Download
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function DocumentationPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeSection, setActiveSection] = useState('TABLEAU DE BORD')

    const manualItems = [
        {
            id: '1',
            title: '1. TABLEAU DE BORD',
            icon: LayoutDashboard,
            description: "Le centre de pilotage de votre cabinet. Il offre une vision synthétique et immédiate de l'activité, des urgences et de la performance globale.",
            content: {
                kpis: [
                    { label: "Chiffre d'Affaires", detail: "Affiche le montant total hors taxes qui a été facturé par le cabinet sur la période sélectionnée." },
                    { label: "Patients Actifs", detail: "Indique le nombre exact de dossiers patients actuellement en cours de traitement au sein de la clinique." },
                    { label: "Prochains Rendez-vous", detail: "Rappelle le nombre d'événements (consultations ou interventions) inscrits à l'agenda pour la journée en cours." },
                    { label: "Taux d'Acceptation Devis", detail: "Exprime en pourcentage le succès de vos propositions de plans de traitement." }
                ],
                visuals: [
                    { label: "Évolution du CA", detail: "Présente une courbe temporelle permettant de comparer vos revenus d'un mois à l'autre." },
                    { label: "Répartition par Acte", detail: "Un diagramme circulaire qui segmente votre activité par spécialité (Implantologie, Orthodontie, Soins, etc.)." }
                ],
                feed: "Liste chronologique affichant les dernières interventions sur la plateforme (ajout de radios, création de dossiers ou validation de devis)."
            }
        },
        {
            id: '2',
            title: '2. DOSSIERS PATIENTS',
            icon: Users,
            description: "Le cœur de votre production clinique. Ce module centralise toutes les fiches patients, leurs radios, leurs plans de traitement et leur facturation.",
            content: {
                list: [
                    { label: "Référence", detail: "Identifiant unique du patient permettant un archivage et une recherche rapide (ex: PAT-2026-001)." },
                    { label: "Nom du Patient", detail: "Identité complète et photo pour une reconnaissance immédiate au fauteuil." },
                    { label: "Plan de Traitement", detail: "Précise les actes prévus et les options de soins validées." },
                    { label: "Statut Clinique", detail: "Indicateur visuel du cycle de soin (En cours, En attente de prothèse, Terminé, Urgence)." }
                ]
            }
        },
        {
            id: '3',
            title: '3. BASE CRM PATIENTS',
            icon: Star,
            description: "Votre base de données CRM. Gérez vos contacts, antécédents médicaux et historique complet de la relation patient.",
            content: {
                details: [
                    { label: "Identité & KYC", detail: "Nom complet, photo, et documents d'identité pour la conformité administrative." },
                    { label: "Coordonnées Directes", detail: "Affichage de l'adresse e-mail et du numéro de téléphone principal pour un contact WhatsApp rapide." },
                    { label: "Volume de Soins", detail: "Historique des actes effectués et récurrence des visites." },
                    { label: "Solde Débiteur", detail: "Montant des honoraires restant à percevoir, permettant de surveiller le risque créance." }
                ]
            }
        },
        {
            id: '4',
            title: '4. AGENDA DYNAMIQUE',
            icon: Calendar,
            description: "Votre gestionnaire de temps synchronisé. Il gère vos rendez-vous, interventions au bloc et délais de laboratoire.",
            content: {
                categories: [
                    { label: "Interventions Bloc (Code Rouge)", detail: "Marque les chirurgies complexes (Implants, Greffes) avec infos de matériel." },
                    { label: "Consultations (Code Bleu)", detail: "Liste les bilans, détartrages et rdv de contrôle." },
                    { label: "Délai Labo (Code Orange)", detail: "Rappelle les dates butoirs pour la réception des prothèses (Couronnes, Bridges)." }
                ]
            }
        },
        {
            id: '5',
            title: '5. BLOC ET CHIRURGIE',
            icon: Activity,
            description: "Le suivi spécifique des procédures chirurgicales. Connecté au monitoring patient et à la traçabilité.",
            content: {
                details: [
                    { label: "Planning Opératoire", detail: "Liste filtrable par salle ou praticien permettant de grouper vos interventions." },
                    { label: "Détails Procéduraux", detail: "Affaire : Rappel du titre de l'intervention et du matériel stérile associé." },
                    { label: "Compte-rendu Post-Op", detail: "Zone de saisie pour noter immédiatement les suites de l'intervention." }
                ]
            }
        },
        {
            id: '11',
            title: '11. ASSISTANT IA (DENTO-AI)',
            icon: Brain,
            description: "Votre copilote intelligent (LexAI pour Dentistes) pour l'analyse diagnostique et la rédaction automatique.",
            content: {
                features: [
                    { label: "Console Conversationnelle", detail: "Interface interactive où vous pouvez poser vos questions cliniques complexes." },
                    { label: "Bibliothèque de Scénarios", detail: "Propose des commandes pré-enregistrées pour générer des ordonnances ou résumer des dossiers." },
                    { label: "Historique Neural", detail: "Permet de retrouver les conseils ou analyses de radios précédemment fournis par l'IA." }
                ]
            }
        },
        {
            id: '12',
            title: '12. AI RADIO LAB',
            icon: Radiation,
            description: "Outil d'analyse stratégique des radios et clichés cliniques (Scanner Adverse pour la dentisterie).",
            content: {
                features: [
                    { label: "Scanner Neural (OCR/Image)", detail: "Zone pour importer les clichés DICOM et STL pour analyse automatique." },
                    { label: "Diagnostic Stratégique", detail: "Détection de failles : Identification par l'IA des caries suspectes ou manques de densité osseuse." },
                    { label: "Propositions de Soins", detail: "Liste de contre-arguments cliniques et protocoles suggérés pour votre plan de traitement." }
                ]
            }
        },
        {
            id: '13',
            title: '13. GÉNÉRATEUR DE DEVIS',
            icon: FileCheck,
            description: "Outil d'automatisation des plans de traitement multi-options (Legal Design appliqué à la dentisterie).",
            content: {
                features: [
                    { label: "Catalogue de Modèles Maîtres", detail: "Liste des types d'actes automatisés (Pose implants, Prothèse amovible, Orthodontie)." },
                    { label: "Questionnaire Intelligent", detail: "Champs dynamiques à remplir qui adaptent automatiquement les clauses du devis et les explications pédagogiques." }
                ]
            }
        },
        {
            id: '18',
            title: '18. FINANCE STRATÉGIQUE',
            icon: Target,
            description: "Analyse financière avancée pour les associés du cabinet (War Room).",
            content: {
                features: [
                    { label: "Analyse de Rentabilité", detail: "Détail précis de la marge générée pour chaque acte complexe (Implant vs Prothèse)." },
                    { label: "Projecteur de Flux", detail: "Graphe prédictif de votre trésorerie à 30, 60 et 90 jours basé sur les encaissements mutuelles et patients." }
                ]
            }
        }
    ]

    const filteredItems = manualItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const activeItem = manualItems.find(item => item.title === activeSection) || manualItems[0]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between no-print">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-gold rounded-3xl flex items-center justify-center text-white shadow-xl shadow-gold/20">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-1 w-8 bg-gold rounded-full"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Knowledge & Training Suite</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Documentation <span className="text-gold">Elite Vault</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Manuel de formation approfondi basé sur le standard LexPremium ERP.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-8 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white">
                        <Printer className="mr-2 h-4 w-4" /> Imprimer le Manuel
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        <Download className="mr-2 h-5 w-5" /> Télécharger PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Manual Navigation Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-8 no-print">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-6">
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Rechercher dans le manuel..."
                                className="pl-12 h-12 rounded-2xl bg-slate-50 border-none text-[11px] font-bold uppercase tracking-widest"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
                            {filteredItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.title)}
                                    className={cn(
                                        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group",
                                        activeSection === item.title
                                            ? "bg-slate-900 text-white shadow-xl translate-x-1"
                                            : "hover:bg-slate-50 text-slate-600"
                                    )}
                                >
                                    <item.icon className={cn("h-5 w-5 shrink-0", activeSection === item.title ? "text-gold" : "text-slate-300 group-hover:text-slate-900")} />
                                    <span className="text-[11px] font-black uppercase tracking-tight">{item.title}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white p-10 text-center space-y-6">
                        <div className="h-20 w-20 rounded-[2rem] bg-gold/10 flex items-center justify-center mx-auto border border-gold/30">
                            <Zap className="h-10 w-10 text-gold" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tighter uppercase italic text-white leading-none mb-2">Masterclass Vidéo</h3>
                            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                                Regardez nos tutoriels vidéo immersifs pour maîtriser chaque module en moins de 5 minutes.
                            </p>
                        </div>
                        <Button className="w-full bg-gold text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl">Lancer l'Académie</Button>
                    </Card>
                </div>

                {/* Content Area */}
                <div className="col-span-12 lg:col-span-8 space-y-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="rounded-[4rem] border-none shadow-2xl bg-white p-16 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
                                    <activeItem.icon className="h-96 w-96 text-slate-950" />
                                </div>

                                <div className="relative z-10 space-y-12">
                                    <div className="space-y-4 pb-12 border-b border-slate-100">
                                        <div className="inline-flex items-center gap-3 bg-gold/10 text-gold px-6 py-2 rounded-full">
                                            <activeItem.icon className="h-4 w-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Guide du Module</span>
                                        </div>
                                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">{activeItem.title}</h2>
                                        <p className="text-xl font-semibold text-slate-500 leading-relaxed max-w-3xl italic">
                                            {activeItem.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {activeItem.content.kpis && (
                                            <div className="col-span-2 space-y-8">
                                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Cartes de Synthèse (KPI)</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {activeItem.content.kpis.map((kpi: any) => (
                                                        <div key={kpi.label} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                                                            <p className="text-sm font-black text-slate-900 mb-2 group-hover:text-gold transition-colors">{kpi.label}</p>
                                                            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{kpi.detail}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeItem.content.list && (
                                            <div className="col-span-2 space-y-8">
                                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Éléments de l'Interface</h4>
                                                <div className="space-y-4">
                                                    {activeItem.content.list.map((item: any) => (
                                                        <div key={item.label} className="flex gap-6 p-6 hover:bg-slate-50 rounded-3xl transition-all">
                                                            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-md shrink-0">
                                                                <ArrowRight className="h-4 w-4 text-gold" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-slate-900">{item.label}</p>
                                                                <p className="text-[11px] font-medium text-slate-500 mt-1">{item.detail}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeItem.content.features && (
                                            <div className="col-span-2 space-y-8">
                                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Fonctionnalités Clés</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {activeItem.content.features.map((f: any) => (
                                                        <div key={f.label} className="space-y-3">
                                                            <div className="flex items-center gap-3">
                                                                <Sparkles className="h-4 w-4 text-gold" />
                                                                <span className="text-sm font-black text-slate-900">{f.label}</span>
                                                            </div>
                                                            <p className="text-[11px] font-medium text-slate-500 leading-relaxed pl-7 border-l-2 border-gold/20">
                                                                {f.detail}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-12 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                <HelpCircle className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Besoin d'aide ?</p>
                                                <p className="text-xs font-bold text-slate-900">Consulter la FAQ Experte</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" className="text-gold font-black uppercase text-[10px] tracking-[0.2em] group">
                                            Module Suivant
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Quick navigation to other points mentioned in documentation but not fully listed above for UI brevity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: '22. COMPTABILITÉ SYSCOHADA', icon: Calculator, color: 'hover:text-emerald-500' },
                            { title: '24. IA PRÉDICTIVE', icon: Zap, color: 'hover:text-yellow-500' },
                            { title: '31. SÉCURITÉ & CONFLITS', icon: ShieldCheck, color: 'hover:text-rose-500' },
                            { title: '34. RH & TALENTS', icon: Briefcase, color: 'hover:text-blue-500' },
                        ].map(extra => (
                            <button key={extra.title} className={cn("p-6 bg-white rounded-3xl shadow-sm border border-transparent hover:border-gold/30 transition-all text-left flex items-center gap-4 group", extra.color)}>
                                <extra.icon className="h-5 w-5 text-slate-300 group-hover:scale-110 transition-transform" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors leading-tight">{extra.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Calculator(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <line x1="8" x2="16" y1="6" y2="6" />
            <line x1="16" x2="16" y1="14" y2="18" />
            <path d="M16 10h.01" />
            <path d="M12 10h.01" />
            <path d="M8 10h.01" />
            <path d="M12 14h.01" />
            <path d="M8 14h.01" />
            <path d="M12 18h.01" />
            <path d="M8 18h.01" />
        </svg>
    )
}
