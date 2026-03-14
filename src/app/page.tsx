"use client"

import { motion } from "framer-motion"
import { 
    Diamond, 
    ShieldCheck, 
    Zap, 
    ArrowRight, 
    ArrowRightCircle, 
    Sparkles, 
    UserCircle, 
    Globe, 
    Stethoscope, 
    Wallet, 
    User,
    ChevronRight,
    Star,
    LayoutDashboard,
    Smartphone
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
    return (
        <div className="relative min-h-screen w-full bg-[#030712] text-slate-200 overflow-x-hidden">
            {/* SEO & Meta (Next.js automatically handles this if exported as metadata, but since it's a client component we use a separate layout or just standard tags if needed. Here we focus on UI) */}
            
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px]" />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Diamond className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">
                            Dento<span className="text-emerald-500">Prestige</span>
                        </span>
                        <span className="text-[8px] font-black tracking-[.4em] text-emerald-500/80 uppercase -mt-1">Elite Management</span>
                    </div>
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Features</Link>
                    <Link href="#roles" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Accès</Link>
                    <Link href="#contact" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Support</Link>
                </div>

                <Link href="/login">
                    <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                        Connexion
                    </button>
                </Link>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 pt-12 pb-24 px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 space-y-8 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                        <Sparkles className="h-4 w-4 text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Next Gen Dental OS v4.0</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                        L'Excellence <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 animate-gradient">
                            Opérationnelle
                        </span>
                    </h1>
                    
                    <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Pilotage intégral pour cabinets dentaires d'élite. IA prédictive, 
                        gestion financière haute-fidélité et expérience patient redéfinie.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                        <Link href="#roles">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 shadow-2xl shadow-emerald-600/20 transition-all"
                            >
                                Découvrir les Accès
                                <ArrowRightCircle className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-[#030712] bg-slate-800 overflow-hidden shadow-xl">
                                        <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" width={40} height={40} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3 w-3 fill-emerald-500 text-emerald-500" />)}
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">+500 Cliniques Actives</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 relative"
                >
                    <div className="relative group">
                        {/* Radiant Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                        
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                            <Image 
                                src="/images/hero-preview.png" 
                                alt="Dashboard Preview" 
                                width={800} 
                                height={600} 
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Glass Overlay Elements */}
                            <div className="absolute top-4 left-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Zap className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">IA Diagnostic</div>
                                        <div className="text-xs font-bold text-white">99.8% Précision</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-4 right-4 p-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="h-2 w-16 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-4/5 bg-emerald-500" />
                                    </div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Optimisation Flux</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Access Sector (Roles) */}
            <section id="roles" className="relative z-10 py-24 px-6 md:px-12 bg-white/[0.02] border-y border-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Choisissez votre <span className="text-emerald-500">Portail</span></h2>
                        <p className="text-slate-500 max-w-xl mx-auto text-sm uppercase font-bold tracking-[0.2em]">Accès direct aux modules opérationnels</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Admin / Dentist */}
                        <AccessCard 
                            icon={<Stethoscope className="h-8 w-8" />}
                            title="Dashboard Praticien"
                            description="Pilotage clinique, agenda intelligent et gestion des dossiers médicaux."
                            href="/dashboard"
                            color="emerald"
                            badge="admin@dentoprestige.sn"
                        />
                        
                        {/* Financial / Compta */}
                        <AccessCard 
                            icon={<Wallet className="h-8 w-8" />}
                            title="Espace Comptabilité"
                            description="Facturation OHADA, suivi des règlements et rapports financiers temps-réel."
                            href="/accounting"
                            color="blue"
                            badge="compta@dentoprestige.sn"
                        />
                        
                        {/* Patient Portal */}
                        <AccessCard 
                            icon={<UserCircle className="h-8 w-8" />}
                            title="Portail Patient VIP"
                            description="Consultation des rendez-vous, paiements en ligne et suivi post-opératoire."
                            href="/portal"
                            color="indigo"
                            badge="Accès Patient"
                        />
                    </div>
                    
                    <div className="flex justify-center">
                        <Link href="/mobile/comptable">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
                                <Smartphone className="h-4 w-4 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Version Mobile Comptable</span>
                                <ChevronRight className="h-4 w-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <div className="relative z-10 py-12 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-black uppercase tracking-[0.3em]">AES-256 SECURE</span>
                </div>
                <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <span className="text-sm font-black uppercase tracking-[0.3em]">HDS COMPLIANT</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm font-black uppercase tracking-[0.3em]">AI DRIVEN</span>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 opacity-50">
                        <Diamond className="h-5 w-5" />
                        <span className="text-sm font-black tracking-widest uppercase italic">DentoPrestige <span className="text-emerald-500">Elite</span></span>
                    </div>
                    
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                        &copy; 2026 DentoPrestige Solutions. Tous droits réservés.
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Signé Numériquement : <span className="text-white italic">Dr. Aere Lao</span></p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function AccessCard({ icon, title, description, href, color, badge }: any) {
    const colorClasses: any = {
        emerald: "from-emerald-600/20 to-emerald-900/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 shadow-emerald-500/5",
        blue: "from-blue-600/20 to-blue-900/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 shadow-blue-500/5",
        indigo: "from-indigo-600/20 to-indigo-900/10 border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 shadow-indigo-500/5"
    }

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative h-full"
        >
            <Link href={href} className="block h-full">
                <div className={`h-full p-8 rounded-[2rem] bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-lg flex flex-col items-start justify-between gap-8 transition-all duration-500 shadow-2xl`}>
                    <div className="space-y-6">
                        <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                            {icon}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
                        </div>
                    </div>
                    
                    <div className="w-full flex items-center justify-between">
                        <div className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5 text-slate-500">
                            {badge}
                        </div>
                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white text-white group-hover:text-emerald-950 transition-all">
                            <ArrowRight className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

