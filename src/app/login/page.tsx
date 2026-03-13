"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
    Diamond, Eye, EyeOff, Lock, Mail, Sparkles, Shield, 
    Stethoscope, Users, ClipboardList, DollarSign, 
    ChevronRight, Globe, Zap, Heart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

const DEMO_ACCOUNTS = [
    { role: 'OWNER', name: 'Dr. Aere Lao', email: 'admin@dentoprestige.sn', password: 'admin123', color: 'from-emerald-500 to-teal-600', icon: Shield, label: 'Administrateur' },
    { role: 'DENTIST', name: 'Dr. Fatou Diallo', email: 'dentiste@dentoprestige.sn', password: 'dentiste123', color: 'from-blue-500 to-indigo-600', icon: Stethoscope, label: 'Praticien' },
    { role: 'ASSISTANT', name: 'Aminata Sow', email: 'assistant@dentoprestige.sn', password: 'assistant123', color: 'from-amber-400 to-orange-500', icon: Users, label: 'Assistant(e)' },
    { role: 'SECRETARY', name: 'Moussa Ndiaye', email: 'secretaire@dentoprestige.sn', password: 'secretaire123', color: 'from-purple-500 to-rose-600', icon: ClipboardList, label: 'Secrétaire' },
]

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('admin@dentoprestige.sn')
    const [password, setPassword] = useState('••••••••')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Bypass réel via navigation directe puisque le middleware est désactivé pour la démo
        setTimeout(() => {
            router.push('/dashboard')
        }, 1500)
    }

    const fillDemo = (account: typeof DEMO_ACCOUNTS[0]) => {
        setEmail(account.email)
        setPassword(account.password)
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-[#050A0A] flex flex-col lg:flex-row relative overflow-y-auto lg:overflow-hidden font-sans">
            
            {/* Background Layer: Animated Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            </div>

            {/* Left Section: Immersive Brand & Stats */}
            <div className="relative z-10 w-full lg:w-[55%] p-8 lg:p-20 flex flex-col justify-between overflow-y-visible">
                <div className="space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-12 lg:mb-16"
                    >
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 p-[1px] shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                            <div className="h-full w-full rounded-2xl bg-[#0A1212] flex items-center justify-center">
                                <Diamond className="h-7 w-7 text-emerald-400" />
                            </div>
                        </div>
                        <div>
                            <span className="text-2xl font-black tracking-tighter text-white uppercase block leading-none">Dento<span className="text-emerald-500 italic">Prestige</span></span>
                            <span className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-[0.4em]">Elite Management</span>
                        </div>
                    </motion.div>

                    <div className="space-y-8 max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                                La plateforme<br />
                                <span className="text-emerald-500 italic">dentaire</span><br />
                                de prestige
                            </h1>
                            <p className="text-slate-400 mt-8 text-lg font-medium leading-relaxed max-w-lg">
                                Gérez votre cabinet avec l'intelligence artificielle. <br />
                                <span className="text-white/60">Documentation automatique, agenda intelligent, facturation OHADA.</span>
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 gap-4 lg:gap-6 pt-4"
                        >
                            {[
                                { label: 'Patients gérés', value: '1,247', icon: Users },
                                { label: 'Temps économisé', value: '5h/jour', icon: Zap },
                                { label: 'Satisfaction', value: '98.2%', icon: Heart },
                                { label: 'Uptime', value: '99.9%', icon: Globe },
                            ].map((stat, i) => (
                                <div key={stat.label} className="group relative">
                                    <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-emerald-500/5 transition-colors rounded-3xl" />
                                    <div className="relative p-5 lg:p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] hover:border-emerald-500/30 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3 lg:mb-4">
                                            <stat.icon className="h-5 w-5 text-emerald-500" />
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        </div>
                                        <p className="text-2xl lg:text-3xl font-black text-white tracking-tighter">{stat.value}</p>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="pt-12 hidden lg:block">
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                        <Shield className="h-3 w-3 text-emerald-500" /> 
                        SÉCURISÉ PAR DENTOPRESTIGE ECORE AI · v4.2.0
                    </p>
                </div>
            </div>

            {/* Right Section: Login & Visual */}
            <div className="relative z-20 w-full lg:w-[45%] flex items-center justify-center p-6 lg:p-12 min-h-screen">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-md relative"
                >
                    {/* Visual Card Background */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 blur-3xl rounded-[3rem] opacity-50" />
                    
                    <div className="relative bg-[#0A1212]/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 lg:p-10 shadow-2xl overflow-hidden">
                        
                        {/* Decorative top bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-black text-white tracking-tight">Connexion</h2>
                            <p className="text-slate-400 text-sm mt-2 font-medium">Accédez à votre espace de travail</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-4">Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center">
                                        <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full h-16 bg-[#0E1818] border border-white/10 rounded-[1.5rem] text-white text-base font-medium pl-14 pr-4 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-700"
                                        placeholder="votre@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-4">Mot de passe</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center">
                                        <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full h-16 bg-[#0E1818] border border-white/10 rounded-[1.5rem] text-white text-base font-medium pl-14 pr-16 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-700"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-[13px] rounded-[1.5rem] transition-all duration-300 disabled:opacity-50 overflow-hidden shadow-[0_10px_30px_rgba(16,185,129,0.3)] cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <div className="relative flex items-center justify-center gap-3">
                                    {loading ? (
                                        <div className="flex gap-1.5 items-center">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                                                    className="h-2 w-2 rounded-full bg-slate-950"
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <>Accéder au Cabinet <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="mt-12 space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 text-center">Accès Rapide Démo</p>
                            <div className="grid grid-cols-2 gap-3">
                                {DEMO_ACCOUNTS.map(acc => (
                                    <button
                                        key={acc.role}
                                        type="button"
                                        onClick={() => fillDemo(acc)}
                                        className="flex flex-col items-center gap-3 p-4 bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 rounded-[1.5rem] transition-all group cursor-pointer"
                                    >
                                        <div className={cn(
                                            "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg",
                                            acc.color
                                        )}>
                                            <acc.icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-white uppercase tracking-tight">{acc.label}</p>
                                            <p className="text-[9px] font-bold text-slate-500 truncate">{acc.name}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function RefreshLoader() {
    return (
        <div className="flex gap-1 items-center">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                    className="h-2 w-2 rounded-full bg-slate-950"
                />
            ))}
        </div>
    )
}
