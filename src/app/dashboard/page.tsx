import Link from 'next/link'
import {
  Calendar, Users, Activity, DollarSign, ShieldCheck, BookOpen,
  MessageSquare, Sparkles, TrendingUp, ArrowRight, Briefcase,
  BarChart3, Share2, Video, CreditCard, Star, Clock, Bell,
  AlertCircle, CheckCircle, Zap, Brain, Package, Hash
} from 'lucide-react'

const QUICK_STATS = [
  { label: 'CA du Jour', value: '485 000', unit: 'FCFA', trend: '+12%', up: true, color: 'text-teal-600' },
  { label: 'RDV Aujourd\'hui', value: '12', unit: 'patients', trend: '3 restants', up: true, color: 'text-blue-600' },
  { label: 'En Attente', value: '4', unit: 'en salle', trend: 'Moy. 18 min', up: false, color: 'text-orange-600' },
  { label: 'Impayés', value: '675 000', unit: 'FCFA', trend: '5 factures', up: false, color: 'text-red-600' },
]

const ALERTS = [
  { type: 'urgent', message: 'Stock Lidocaïne critique — 2 unités restantes', action: '/inventory', icon: AlertCircle },
  { type: 'info', message: 'Rappels SMS envoyés — 12 patients pour demain', action: '/communication', icon: CheckCircle },
  { type: 'warning', message: 'Fatou Mbaye — Facture en retard (3 jours)', action: '/payment', icon: Clock },
]

const MODULES_GRID = [
  { name: 'Patients', icon: Users, href: '/patients', desc: 'Gestion base patient', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' },
  { name: 'Agenda', icon: Calendar, href: '/agenda', desc: 'Planning & RDV', color: 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white' },
  { name: 'Soins', icon: Activity, href: '/charting', desc: 'Dossier clinique', color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' },
  { name: 'Paiement', icon: CreditCard, href: '/payment', desc: 'Wave, Orange Money', color: 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white', isNew: true },
  { name: 'Téléconsult', icon: Video, href: '/teleconsultation', desc: 'Vidéo consultation', color: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white', isNew: true },
  { name: 'Salle Attente', icon: Clock, href: '/waiting-room', desc: 'File d\'attente live', color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white', isNew: true },
  { name: 'Messages', icon: Hash, href: '/messages', desc: 'Chat équipe', color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white', isNew: true },
  { name: 'Fidélité', icon: Star, href: '/loyalty', desc: 'Programme points', color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white', isNew: true },
  { name: 'Facturation', icon: DollarSign, href: '/billing', desc: 'Suivi paiements', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' },
  { name: 'Communication', icon: MessageSquare, href: '/communication', desc: 'WhatsApp, SMS', color: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white' },
  { name: 'Analytique', icon: BarChart3, href: '/analytics', desc: 'Reporting', color: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white' },
  { name: 'AI Hub', icon: Brain, href: '/ai-hub', desc: 'Intelligence IA', color: 'bg-slate-50 text-slate-600 group-hover:bg-slate-800 group-hover:text-white' },
]

const TODAY_APPOINTMENTS = [
  { time: '09:00', patient: 'Amadou Diallo', type: 'Détartrage', status: 'done', room: 'S1' },
  { time: '09:30', patient: 'Fatou Mbaye', type: 'Consultation', status: 'done', room: 'S2' },
  { time: '10:30', patient: 'Ibrahima Sow', type: 'Extraction', status: 'in-progress', room: 'S1' },
  { time: '11:00', patient: 'Mariama Diop', type: 'Orthodontie', status: 'waiting', room: 'S3' },
  { time: '14:00', patient: 'Ousmane Ndiaye', type: 'Blanchiment', status: 'scheduled', room: 'S2' },
  { time: '15:30', patient: 'Aissatou Ba', type: 'Contrôle', status: 'scheduled', room: 'S1' },
]

export default function DashboardPage() {
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
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Mardi 18 Février 2026</p>
              <h2 className="text-3xl font-black tracking-tighter">Bonjour, <span className="text-accent">Dr. Aere Lao</span> 👋</h2>
              <p className="text-slate-400 mt-1 font-medium">Vous avez 12 rendez-vous aujourd'hui. 3 patients en attente.</p>
            </div>
            <div className="hidden md:flex gap-3">
              <Link href="/waiting-room"
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                <Clock className="h-4 w-4" /> Salle d'Attente
              </Link>
              <Link href="/teleconsultation"
                className="flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent/90 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                <Video className="h-4 w-4" /> Téléconsult
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_STATS.map(stat => (
            <div key={stat.label} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{stat.label}</p>
              <div className="flex items-end gap-2">
                <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-xs text-slate-400 font-bold mb-1">{stat.unit}</span>
              </div>
              <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${stat.up ? 'text-teal-600' : 'text-orange-500'}`}>
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Alertes du Jour</h2>
            {ALERTS.map((alert, i) => (
              <Link key={i} href={alert.action}
                className={`flex items-start gap-3 p-4 rounded-2xl border transition-all hover:shadow-sm ${alert.type === 'urgent' ? 'bg-red-50 border-red-100' : alert.type === 'warning' ? 'bg-orange-50 border-orange-100' : 'bg-teal-50 border-teal-100'}`}>
                <alert.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${alert.type === 'urgent' ? 'text-red-500' : alert.type === 'warning' ? 'text-orange-500' : 'text-teal-500'}`} />
                <p className={`text-xs font-bold ${alert.type === 'urgent' ? 'text-red-700' : alert.type === 'warning' ? 'text-orange-700' : 'text-teal-700'}`}>{alert.message}</p>
              </Link>
            ))}

            {/* Today's Revenue */}
            <div className="bg-gradient-to-br from-accent to-[#b8860b] rounded-[2rem] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-2">Performance du Jour</p>
              <p className="text-3xl font-black">485 000 <span className="text-lg font-bold text-white/70">FCFA</span></p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white/70">Objectif mensuel</span>
                  <span>68%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Agenda du Jour</h2>
              <Link href="/agenda" className="text-xs font-black text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
                Voir tout <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {TODAY_APPOINTMENTS.map((apt, i) => (
                <div key={i} className={`flex items-center gap-4 px-6 py-3.5 transition-all ${apt.status === 'in-progress' ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                  <span className="text-xs font-black text-slate-400 w-12 flex-shrink-0">{apt.time}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 text-sm truncate">{apt.patient}</p>
                    <p className="text-xs text-slate-400">{apt.type} • {apt.room}</p>
                  </div>
                  <span className={`text-[9px] font-black px-2.5 py-1 rounded-full flex-shrink-0 ${apt.status === 'done' ? 'bg-slate-100 text-slate-400' :
                      apt.status === 'in-progress' ? 'bg-teal-100 text-teal-700' :
                        apt.status === 'waiting' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                    }`}>
                    {apt.status === 'done' ? '✓ Terminé' : apt.status === 'in-progress' ? '● En cours' : apt.status === 'waiting' ? '⏳ En attente' : '📅 Planifié'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Tous les Modules</h2>
            <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">5 nouveaux modules</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {MODULES_GRID.map((mod) => (
              <Link key={mod.name} href={mod.href} className="group">
                <div className="bg-white h-28 p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:border-transparent hover:-translate-y-1 relative overflow-hidden">
                  {(mod as any).isNew && (
                    <span className="absolute top-2 right-2 text-[8px] font-black text-teal-500 bg-teal-50 px-1.5 py-0.5 rounded-full">NEW</span>
                  )}
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${mod.color}`}>
                    <mod.icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xs font-black text-slate-800 tracking-tight">{mod.name}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{mod.desc}</p>
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
