"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Diamond, Eye, EyeOff, Lock, Mail, Sparkles, Shield, Stethoscope, Users, ClipboardList } from 'lucide-react'

const DEMO_ACCOUNTS = [
    { role: 'OWNER', name: 'Dr. Aere Lao', email: 'admin@dentoprestige.sn', password: 'admin123', color: 'from-red-500 to-rose-600', icon: Shield, label: 'Administrateur' },
    { role: 'DENTIST', name: 'Dr. Fatou Diallo', email: 'dentiste@dentoprestige.sn', password: 'dentiste123', color: 'from-blue-500 to-indigo-600', icon: Stethoscope, label: 'Praticien' },
    { role: 'ASSISTANT', name: 'Aminata Sow', email: 'assistant@dentoprestige.sn', password: 'assistant123', color: 'from-teal-500 to-emerald-600', icon: Users, label: 'Assistant(e)' },
    { role: 'SECRETARY', name: 'Moussa Ndiaye', email: 'secretaire@dentoprestige.sn', password: 'secretaire123', color: 'from-purple-500 to-violet-600', icon: ClipboardList, label: 'Secrétaire' },
]

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        await new Promise(r => setTimeout(r, 800))

        const account = DEMO_ACCOUNTS.find(a => a.email === email && a.password === password)
        if (account) {
            localStorage.setItem('dp_user', JSON.stringify({ name: account.name, role: account.role, email: account.email }))
            router.push('/dashboard')
        } else {
            setError('Identifiants incorrects. Utilisez un compte de démonstration ci-dessous.')
        }
        setLoading(false)
    }

    const fillDemo = (account: typeof DEMO_ACCOUNTS[0]) => {
        setEmail(account.email)
        setPassword(account.password)
        setError('')
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Branding */}
                <div className="hidden lg:block space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                            <Diamond className="h-6 w-6 text-accent" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white uppercase">Dento<span className="text-accent">Prestige</span></span>
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-white tracking-tighter leading-tight">
                            La plateforme<br />
                            <span className="text-accent">dentaire</span><br />
                            de prestige
                        </h1>
                        <p className="text-slate-400 mt-4 font-medium leading-relaxed">
                            Gérez votre cabinet avec l'intelligence artificielle. Documentation automatique, agenda intelligent, facturation OHADA.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Patients gérés', value: '1,247' },
                            { label: 'Temps économisé', value: '5h/jour' },
                            { label: 'Satisfaction', value: '98.2%' },
                            { label: 'Uptime', value: '99.9%' },
                        ].map(stat => (
                            <div key={stat.label} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-2xl font-black text-white">{stat.value}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Login Form */}
                <div className="space-y-6">
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <Diamond className="h-8 w-8 text-accent" />
                        <span className="text-xl font-black tracking-tighter text-white uppercase">Dento<span className="text-accent">Prestige</span></span>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Connexion</h2>
                            <p className="text-slate-400 text-sm mt-1">Accédez à votre espace de travail</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium pl-11 pr-4 focus:outline-none focus:border-accent/50 transition-colors placeholder:text-slate-600"
                                        placeholder="votre@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mot de passe</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium pl-11 pr-12 focus:outline-none focus:border-accent/50 transition-colors placeholder:text-slate-600"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <p className="text-xs font-bold text-red-400">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                            >
                                {loading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <><Sparkles className="h-4 w-4" /> Accéder au Cabinet</>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Demo Accounts */}
                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Comptes de démonstration</p>
                        <div className="grid grid-cols-2 gap-3">
                            {DEMO_ACCOUNTS.map(account => (
                                <button
                                    key={account.role}
                                    onClick={() => fillDemo(account)}
                                    className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl text-left transition-all"
                                >
                                    <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${account.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                                        <account.icon className="h-4 w-4 text-white" />
                                    </div>
                                    <p className="text-xs font-black text-white">{account.label}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{account.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
