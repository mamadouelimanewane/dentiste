"use client"

import { motion } from "framer-motion"
import { Diamond, ShieldCheck, Zap, ArrowRight, ArrowRightCircle, Sparkles, UserCircle, Globe } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center text-center space-y-12 max-w-4xl px-6"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="h-24 w-24 bg-gradient-to-br from-accent to-[#b8860b] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-accent/20 border border-white/10"
          >
            <Diamond className="h-12 w-12 text-white" />
          </motion.div>

          <div className="space-y-1">
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase">
              Dento<span className="text-accent">Prestige</span>
            </h1>
            <p className="text-[10px] font-black text-accent uppercase tracking-[1em] ml-2">Elite Practice Management</p>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-white/90 tracking-tight leading-tight">
            Système de Pilotage <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">Haute Fidélité</span>
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Bienvenue à la <span className="text-white font-bold">Clinique Dentaire Aere Lao</span>.
            Entrez dans l'ère de l'excellence opérationnelle avec notre suite logicielle premium.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col items-center space-y-8">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(16,185,129,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white font-black px-16 py-7 rounded-[2rem] text-sm uppercase tracking-[0.4em] flex items-center gap-6 group transition-all shadow-2xl shadow-emerald-900/20"
            >
              Accès au Cabinet
              <ArrowRightCircle className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </Link>

          {/* Status Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="h-3 w-3 text-teal-400" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sécurisé AES-256</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
              <Zap className="h-3 w-3 text-gold" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">IA DeepSeek v3 Active</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
              <Globe className="h-3 w-3 text-indigo-400" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Database Live : Dakar</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Signature */}
      <div className="absolute bottom-10 flex flex-col items-center space-y-2 opacity-50">
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em]">Digital Signature</p>
        <p className="text-sm font-black text-white italic tracking-tighter">Dr. Aere Lao</p>
      </div>

      {/* Overlay Gradient for focus */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
