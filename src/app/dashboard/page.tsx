"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Calendar, Users, Activity, DollarSign, ShieldCheck, BookOpen,
  MessageSquare, Sparkles, TrendingUp, ArrowRight, Briefcase,
  BarChart3, Share2, Video, CreditCard, Star, Clock, Bell,
  AlertCircle, CheckCircle, Zap, Brain, Package, Hash, Smartphone,
  Loader2, FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

const MODULES_GRID = [
  { name: 'Patients', icon: Users, href: '/patients', desc: 'Gestion base patient', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
  { name: 'Agenda', icon: Calendar, href: '/agenda', desc: 'Planning & RDV', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
  { name: 'Soins', icon: Activity, href: '/charting', desc: 'Dossier clinique', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
  { name: 'Paiement', icon: CreditCard, href: '/payment', desc: 'Wave, Orange Money', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', isNew: true, roles: ['OWNER', 'SECRETARY', 'ACCOUNTANT', 'CLIENT'] },
  { name: 'Salle Attente', icon: Clock, href: '/waiting-room', desc: 'File d\'attente live', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', isNew: true, roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
  { name: 'AI Hub', icon: Brain, href: '/ai-hub', desc: 'Neural Command', color: 'bg-slate-900 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white', isNew: true, roles: ['OWNER', 'DENTIST'] },
  { name: 'Compta', icon: BarChart3, href: '/accounting', desc: 'OHADA Reporting', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', roles: ['OWNER', 'ACCOUNTANT'] },
  { name: 'Labo', icon: Activity, href: '/lab', desc: 'Prothèses', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', roles: ['OWNER', 'DENTIST', 'ASSISTANT'] },
  { name: 'Stérilisation', icon: ShieldCheck, href: '/sterilization', desc: 'Traçabilité IoT', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', roles: ['OWNER', 'ASSISTANT'] },
  { name: 'Inventory', icon: Package, href: '/inventory', desc: 'Stock & Ruptures', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', roles: ['OWNER', 'ASSISTANT'] },
  { name: 'Devis', icon: FileText, href: '/quotes', desc: 'Plans financiers', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white', roles: ['OWNER', 'SECRETARY'] },
  { name: 'Tasks', icon: Briefcase, href: '/tasks', desc: 'Opérations', color: 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white', roles: ['OWNER', 'DENTIST', 'ASSISTANT', 'SECRETARY'] },
]

export default function DashboardPage() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState<any>({
    revenue: 0,
    appointmentsCount: 0,
    waitingCount: 0,
    unpaidCount: 0
  })
  const [todayApts, setTodayApts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const user = session?.user ? {
    role: (session.user as any).role || 'OWNER',
    name: session.user.name || 'Dr. Lao',
  } : null

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      const [aptsRes, metricsRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/accounting/metrics')
      ])

      const apts = await aptsRes.json()
      const metrics = await metricsRes.json()

      const todayStr = new Date().toISOString().split('T')[0]
      const validApts = Array.isArray(apts) ? apts : []
      const trueTodayApts = validApts.filter(a => new Date(a.start).toISOString().split('T')[0] === todayStr)
      const trueWaiting = validApts.filter(a => a.status === 'WAITED' || a.status === 'ARRIVED' || a.status === 'WAITING').length

      setTodayApts(trueTodayApts)
      setStats({
        revenue: metrics.treasury || 0,
        appointmentsCount: trueTodayApts.length,
        waitingCount: trueWaiting,
        unpaidCount: metrics.netResult || 0
      })
    } catch (error) {
      console.error("Dashboard fetch error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchDashboardData()
  }, [])

  if (!mounted) return <div className="min-h-screen bg-slate-50" />

  const filteredModules = MODULES_GRID.filter(mod => {
    const roles = (mod as any).roles
    if (!roles) return true
    if (!user) return false
    return roles.includes(user.role)
  })

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Welcome Banner */}
        <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="h-48 w-48" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <h2 className="text-3xl font-black tracking-tighter">Bonjour, <span className="text-emerald-gradient">{user?.name || 'Dr. Lao'}</span> 👋</h2>
              <p className="text-slate-400 mt-1 font-medium italic uppercase text-[10px] tracking-widest">Opérations en temps réel • DentoPrestige <span className="text-emerald-500">Emerald Elite</span></p>
            </div>
            <div className="hidden md:flex gap-3">
              <Link href="/waiting-room"
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                <Clock className="h-4 w-4" /> Salle d'Attente
              </Link>
              <Link href="/agenda"
                className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                <Calendar className="h-4 w-4" /> Agenda
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Trésorerie" value={stats.revenue.toLocaleString()} unit="FCFA" trend="+5%" icon={DollarSign} color="text-emerald-600" />
          <StatCard label="RDV Cette Semaine" value={stats.appointmentsCount} unit="RDV" trend="Stable" icon={Calendar} color="text-emerald-600" />
          <StatCard label="En Attente" value={stats.waitingCount} unit="Salle" trend="Moy 15min" icon={Clock} color="text-emerald-600" />
          <StatCard label="Résultat Net" value={stats.unpaidCount.toLocaleString()} unit="FCFA" trend="+12%" icon={Activity} color="text-emerald-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts Area */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Command Center IA</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl">
                  <Zap className="h-4 w-4 text-blue-500 mt-1" />
                  <p className="text-[11px] font-bold text-slate-700 leading-tight">Optimisation : Le créneau de 15h est libre, une campagne SMS a été lancée vers la liste d'attente.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-6 text-white text-center space-y-4 border border-white/5 shadow-xl">
              <div className="h-12 w-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto">
                <Brain className="h-6 w-6 text-emerald-500" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest">Elite Intelligence</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">"Le taux d'acceptation des devis a augmenté de 15% grâce aux nouveaux plans d'échelonnement."</p>
            </div>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Prochains Rendez-vous</h2>
              <Link href="/agenda" className="text-xs font-black text-emerald-600 hover:text-emerald-500 transition-colors flex items-center gap-1">
                Voir tout <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {isLoading ? (
                <div className="p-20 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto" />
                </div>
              ) : todayApts.length === 0 ? (
                <div className="p-20 text-center text-slate-400 uppercase text-[10px] font-black tracking-widest">Aucun rendez-vous</div>
              ) : todayApts.map((apt, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-all">
                  <span className="text-[10px] font-black text-slate-400 w-16">{new Date(apt.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 text-sm truncate">{apt.patient?.firstName} {apt.patient?.lastName}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mt-1">{apt.title} • {apt.type}</p>
                  </div>
                  <span className="text-[9px] font-black px-3 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-widest">
                    Confirmé
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Hub Opérationnel Elite</h2>
            <span className="text-[9px] font-black text-white bg-slate-900 px-3 py-1 rounded-full uppercase tracking-widest">Accès Intégral</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredModules.map((mod) => (
              <Link key={mod.name} href={mod.href} className="group">
                <div className="bg-white h-32 p-4 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 transition-all duration-500 hover:shadow-xl hover:border-transparent hover:-translate-y-1 relative overflow-hidden group">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${mod.color}`}>
                    <mod.icon className="h-7 w-7 transition-all group-hover:scale-110" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xs font-black text-slate-900 tracking-tight">{mod.name}</h4>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">{mod.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function StatCard({ label, value, unit, trend, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-luxury transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-2xl bg-slate-50", color.replace('text-', 'bg-').replace('600', '100'))}>
          <Icon className={cn("h-5 w-5", color)} />
        </div>
        <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full uppercase tracking-tighter">{trend}</span>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{value}</h3>
        <span className="text-[10px] font-black text-slate-400 uppercase">{unit}</span>
      </div>
    </div>
  )
}
