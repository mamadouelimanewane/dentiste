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

import { PractitionerDashboard } from '@/components/dashboard/PractitionerDashboard'
import { AccountantDashboard } from '@/components/dashboard/AccountantDashboard'
import { StaffDashboard } from '@/components/dashboard/StaffDashboard'
import AdminPortal from '../admin-portal/page'
import PatientPortal from '../portal/page'
import { useRole } from '@/hooks/useRole'

export default function DashboardPage() {
  const { role: userRole, user, status } = useRole()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    setIsLoading(false)
  }, [])

  if (!mounted) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
    </div>
  )

  // Role routing
  switch(user.role) {
    case 'OWNER':
        return <AdminPortal />
    case 'DENTIST':
        return <div className="p-8"><PractitionerDashboard user={user} /></div>
    case 'ACCOUNTANT':
        return <div className="p-8"><AccountantDashboard user={user} /></div>
    case 'ASSISTANT':
    case 'SECRETARY':
        return <div className="p-8"><StaffDashboard user={user} /></div>
    case 'CLIENT':
        return <PatientPortal />
    default:
        return <AdminPortal />
  }
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
