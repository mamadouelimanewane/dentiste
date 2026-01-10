import Link from 'next/link'
import { Calendar, Users, Activity, DollarSign, ShieldCheck, BookOpen, MessageSquare, Sparkles, TrendingUp, ArrowRight, Briefcase, BarChart3, Share2 } from 'lucide-react'

export default function Home() {
  const modules = [
    { name: 'Patients', icon: Users, href: '/patients', desc: 'Gestion de la base patient' },
    { name: 'Agenda', icon: Calendar, href: '/agenda', desc: 'Planning & Rendez-vous' },
    { name: 'Soins', icon: Activity, href: '/charting', desc: 'Dossier clinique interactif' },
    { name: 'Facturation', icon: DollarSign, href: '/billing', desc: 'Suivi des paiements' },
    { name: 'Communication', icon: MessageSquare, href: '/communication', desc: 'WhatsApp, SMS & Emails' },
    { name: 'Comptabilité', icon: BookOpen, href: '/accounting', desc: 'Conformité OHADA/SYSCOA' },
    { name: 'Analytique', icon: BarChart3, href: '/analytics', desc: 'Reporting & Performance' },
    { name: 'Conformité', icon: ShieldCheck, href: '/compliance', desc: 'RGPD, ANS & Traçabilité' },
    { name: 'Intégrations', icon: Share2, href: '/integrations', desc: 'Écosystème & API Tiers' },
    { name: 'Business Intel', icon: Briefcase, href: '/business', desc: 'CRM & Pilotage stratégique' },
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Stats Grid Luxury */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl group border border-white/5">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="h-24 w-24" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Performance Mensuelle</p>
            <h3 className="text-4xl font-black mb-2 tracking-tighter text-gold">4 250 000 FCFA</h3>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
              <TrendingUp className="h-4 w-4" /> +12.5% depuis le mois dernier
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 text-slate-900 relative overflow-hidden shadow-luxury border border-slate-100 group transition-all hover:border-accent/20">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Agenda du Jour</p>
            <h3 className="text-4xl font-black mb-2 tracking-tighter">12 <span className="text-lg text-slate-400 font-bold uppercase tracking-widest">Rendez-vous</span></h3>
            <Link href="/agenda" className="text-accent text-xs font-black flex items-center gap-2 mt-4 hover:gap-4 transition-all">
              VOIR LE PLANNING COMPLET <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-accent to-[#b8860b] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -bottom-6 -right-6 opacity-20">
              <Sparkles className="h-32 w-32" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-4">Status du Cabinet</p>
            <h3 className="text-4xl font-black mb-2 tracking-tighter">Opérationnel</h3>
            <p className="text-xs font-bold text-white/80">3 Assistants en ligne • 1 Praticien actif</p>
          </div>
        </div>

        {/* Modules Navigation */}
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 border-b pb-4">Services & Pilotage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <Link key={mod.name} href={mod.href} className="group">
                <div className="bg-white h-32 p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 transition-all duration-300 hover:shadow-luxury hover:border-accent/30 group-hover:-translate-y-1">
                  <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                    <mod.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-slate-900">{mod.name}</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{mod.desc}</p>
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

