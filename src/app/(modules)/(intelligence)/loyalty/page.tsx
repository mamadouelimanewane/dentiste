"use client"

import { useState } from 'react'
import { Star, Gift, Trophy, TrendingUp, Users, Heart, Crown, Award, ChevronRight, Calendar, Phone, Mail } from 'lucide-react'

const LOYALTY_PATIENTS = [
    { id: 1, name: 'Amadou Diallo', points: 2450, tier: 'Gold', visits: 12, lastVisit: '15 Fév 2026', birthday: '12 Mars', avatar: 'AD', spent: 485000 },
    { id: 2, name: 'Fatou Mbaye', points: 1820, tier: 'Silver', visits: 8, lastVisit: '10 Fév 2026', birthday: '25 Avr', avatar: 'FM', spent: 320000 },
    { id: 3, name: 'Ibrahima Sow', points: 3100, tier: 'Platinum', visits: 18, lastVisit: '18 Fév 2026', birthday: '3 Juin', avatar: 'IS', spent: 720000 },
    { id: 4, name: 'Mariama Diop', points: 950, tier: 'Bronze', visits: 4, lastVisit: '5 Fév 2026', birthday: '17 Juil', avatar: 'MD', spent: 145000 },
    { id: 5, name: 'Ousmane Ndiaye', points: 4200, tier: 'Platinum', visits: 24, lastVisit: '17 Fév 2026', birthday: '8 Août', avatar: 'ON', spent: 980000 },
]

const REWARDS = [
    { id: 1, name: 'Détartrage Offert', points: 500, category: 'Soin', icon: '🦷', available: true },
    { id: 2, name: 'Blanchiment -30%', points: 1000, category: 'Esthétique', icon: '✨', available: true },
    { id: 3, name: 'Consultation Gratuite', points: 300, category: 'Consultation', icon: '🩺', available: true },
    { id: 4, name: 'Kit Hygiène Premium', points: 200, category: 'Cadeau', icon: '🎁', available: true },
    { id: 5, name: 'Implant -15%', points: 2000, category: 'Chirurgie', icon: '🔧', available: false },
    { id: 6, name: 'Orthodontie -20%', points: 1500, category: 'Orthodontie', icon: '😁', available: true },
]

const TIER_CONFIG = {
    Bronze: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', min: 0, max: 999 },
    Silver: { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', min: 1000, max: 1999 },
    Gold: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', min: 2000, max: 2999 },
    Platinum: { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', min: 3000, max: 99999 },
}

export default function LoyaltyPage() {
    const [activeTab, setActiveTab] = useState<'patients' | 'rewards' | 'campaigns'>('patients')
    const [search, setSearch] = useState('')

    const filteredPatients = LOYALTY_PATIENTS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    const upcomingBirthdays = LOYALTY_PATIENTS.filter(p => {
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
        return p.birthday.includes('Mars') || p.birthday.includes('Avr')
    })

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-slate-900 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Rétention & Engagement</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Programme <span className="text-amber-500">Fidélité</span></h1>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all">
                    <Gift className="h-4 w-4" /> Attribuer des Points
                </button>
            </div>

            {/* Tier Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(TIER_CONFIG).map(([tier, config]) => {
                    const count = LOYALTY_PATIENTS.filter(p => p.tier === tier).length
                    const TierIcon = tier === 'Platinum' ? Crown : tier === 'Gold' ? Trophy : tier === 'Silver' ? Award : Star
                    return (
                        <div key={tier} className={`${config.bg} border ${config.border} rounded-[2rem] p-5`}>
                            <div className="flex items-center justify-between mb-3">
                                <TierIcon className={`h-6 w-6 ${config.color}`} />
                                <span className={`text-2xl font-black ${config.color}`}>{count}</span>
                            </div>
                            <p className={`font-black text-sm ${config.color}`}>{tier}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{config.min.toLocaleString()}+ pts</p>
                        </div>
                    )
                })}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl w-fit">
                {[
                    { id: 'patients', label: 'Membres' },
                    { id: 'rewards', label: 'Récompenses' },
                    { id: 'campaigns', label: 'Campagnes' },
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                        className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'patients' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Rechercher un patient..."
                            className="w-full h-12 bg-white border border-slate-100 rounded-2xl px-5 text-sm font-medium focus:outline-none focus:border-accent/30 shadow-sm"
                        />
                        <div className="space-y-3">
                            {filteredPatients.map(patient => {
                                const config = TIER_CONFIG[patient.tier as keyof typeof TIER_CONFIG]
                                const TierIcon = patient.tier === 'Platinum' ? Crown : patient.tier === 'Gold' ? Trophy : patient.tier === 'Silver' ? Award : Star
                                return (
                                    <div key={patient.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all">
                                        <div className={`h-14 w-14 rounded-2xl ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0`}>
                                            <span className={`text-sm font-black ${config.color}`}>{patient.avatar}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-black text-slate-900">{patient.name}</p>
                                                <span className={`flex items-center gap-1 text-[9px] font-black ${config.color} ${config.bg} px-2 py-0.5 rounded-full border ${config.border}`}>
                                                    <TierIcon className="h-2.5 w-2.5" /> {patient.tier}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400">{patient.visits} visites • Dernière: {patient.lastVisit}</p>
                                            <div className="mt-2 flex items-center gap-3">
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full bg-gradient-to-r ${patient.tier === 'Platinum' ? 'from-purple-400 to-purple-600' : patient.tier === 'Gold' ? 'from-yellow-400 to-yellow-600' : patient.tier === 'Silver' ? 'from-slate-300 to-slate-500' : 'from-amber-400 to-amber-600'}`}
                                                        style={{ width: `${Math.min((patient.points / 4000) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className={`text-xs font-black ${config.color}`}>{patient.points.toLocaleString()} pts</span>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-black text-slate-900 text-sm">{(patient.spent / 1000).toFixed(0)}K FCFA</p>
                                            <p className="text-[10px] text-slate-400">dépensé</p>
                                            <div className="flex gap-2 mt-2">
                                                <button className="h-7 w-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all">
                                                    <Phone className="h-3 w-3 text-slate-500" />
                                                </button>
                                                <button className="h-7 w-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all">
                                                    <Mail className="h-3 w-3 text-slate-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Upcoming Birthdays */}
                        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-[2rem] p-6 text-white">
                            <div className="flex items-center gap-2 mb-4">
                                <Heart className="h-5 w-5" />
                                <h3 className="font-black text-sm uppercase tracking-widest">Anniversaires Proches</h3>
                            </div>
                            <div className="space-y-3">
                                {upcomingBirthdays.map(p => (
                                    <div key={p.id} className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                                        <div>
                                            <p className="font-black text-sm">{p.name}</p>
                                            <p className="text-xs text-pink-200">{p.birthday}</p>
                                        </div>
                                        <button className="px-3 py-1.5 bg-white text-pink-600 rounded-lg font-black text-xs hover:bg-pink-50 transition-all">
                                            Envoyer vœux
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 space-y-4">
                            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Statistiques</h3>
                            {[
                                { label: 'Points distribués', value: '12,520', icon: Star },
                                { label: 'Récompenses échangées', value: '34', icon: Gift },
                                { label: 'Taux de rétention', value: '91%', icon: TrendingUp },
                            ].map(stat => (
                                <div key={stat.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <stat.icon className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm text-slate-600 font-medium">{stat.label}</span>
                                    </div>
                                    <span className="font-black text-slate-900">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'rewards' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {REWARDS.map(reward => (
                        <div key={reward.id} className={`bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 transition-all hover:shadow-md ${!reward.available ? 'opacity-60' : ''}`}>
                            <div className="text-4xl mb-4">{reward.icon}</div>
                            <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-widest">{reward.category}</span>
                            <h3 className="font-black text-slate-900 text-lg mt-3">{reward.name}</h3>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                    <span className="font-black text-amber-600">{reward.points.toLocaleString()} pts</span>
                                </div>
                                <button disabled={!reward.available}
                                    className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${reward.available ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                                    {reward.available ? 'Activer' : 'Bientôt'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'campaigns' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: 'Double Points Weekend', desc: 'Points x2 pour tous les soins du samedi', status: 'active', reach: 247, color: 'from-teal-500 to-emerald-600' },
                        { title: 'Parrainage Patient', desc: '+500 pts pour chaque nouveau patient parrainé', status: 'active', reach: 89, color: 'from-blue-500 to-indigo-600' },
                        { title: 'Fidélité 1 An', desc: 'Bonus 1000 pts pour les patients depuis 1 an', status: 'scheduled', reach: 34, color: 'from-purple-500 to-violet-600' },
                        { title: 'Rappel Contrôle Annuel', desc: 'SMS automatique + 200 pts pour les patients inactifs', status: 'draft', reach: 0, color: 'from-slate-500 to-slate-700' },
                    ].map((campaign, i) => (
                        <div key={i} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className={`bg-gradient-to-r ${campaign.color} p-6 text-white`}>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black text-lg">{campaign.title}</h3>
                                    <span className={`text-[9px] font-black px-2 py-1 rounded-full ${campaign.status === 'active' ? 'bg-white/20' : campaign.status === 'scheduled' ? 'bg-white/10' : 'bg-black/20'}`}>
                                        {campaign.status === 'active' ? '● Actif' : campaign.status === 'scheduled' ? '⏰ Planifié' : '✎ Brouillon'}
                                    </span>
                                </div>
                                <p className="text-white/80 text-sm mt-2">{campaign.desc}</p>
                            </div>
                            <div className="p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-black text-slate-900">{campaign.reach}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Patients ciblés</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-black text-xs uppercase tracking-widest text-slate-600 transition-all">Modifier</button>
                                    {campaign.status !== 'active' && (
                                        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">Activer</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
