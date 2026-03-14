"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
    GraduationCap, 
    Play, 
    CheckCircle2, 
    Clock, 
    Star, 
    Users, 
    Search,
    Filter,
    Award,
    ChevronRight,
    TrendingUp,
    ShieldCheck,
    Volume2,
    Lock
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function EliteAcademy() {
    const [activeCategory, setActiveCategory] = useState('ALL')

    const courses = [
        { 
            id: 1, 
            title: "L'Expérience Patient VIP", 
            instructor: "Dr. Aere Lao", 
            duration: "2h 15min", 
            lessons: 12, 
            progress: 85,
            image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
            category: "SOFT_SKILLS",
            status: "IN_PROGRESS"
        },
        { 
            id: 2, 
            title: "Protocoles d'Hygiène Elite V2", 
            instructor: "Mme Sow (Chef Assistant)", 
            duration: "1h 45min", 
            lessons: 8, 
            progress: 100,
            image: "https://images.unsplash.com/photo-1581594658553-3594d284bc6c?auto=format&fit=crop&q=80&w=800",
            category: "CLINICAL",
            status: "COMPLETED"
        },
        { 
            id: 3, 
            title: "Maîtrise du Smile Design Studio", 
            instructor: "Elite AI Labs", 
            duration: "3h 30min", 
            lessons: 24, 
            progress: 15,
            image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
            category: "TECH",
            status: "IN_PROGRESS"
        },
        { 
            id: 4, 
            title: "Gestion d'Urgence en Cabinet", 
            instructor: "Dr. Diallo", 
            duration: "1h 10min", 
            lessons: 6, 
            progress: 0,
            image: "https://images.unsplash.com/photo-1603398938378-e54eab446f21?auto=format&fit=crop&q=80&w=800",
            category: "CLINICAL",
            status: "LOCKED"
        }
    ]

    return (
        <div className="p-4 md:p-8 space-y-10 max-w-7xl mx-auto pb-40">
            {/* Header section with Hero */}
            <div className="relative rounded-[4rem] overflow-hidden bg-slate-950 text-white p-10 md:p-16 shadow-2xl">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #10b981, transparent)' }}></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <GraduationCap className="h-6 w-6 text-emerald-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Elite Standards Training</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none">
                            Élevez Votre <span className="text-emerald-gradient">Expertise Clinique</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed">
                            Formez votre équipe aux standards DentoPrestige. Des masterclass exclusives pour un cabinet d'exception.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button className="h-14 px-8 rounded-2xl bg-emerald-600 text-white font-black uppercase text-[11px] tracking-widest shadow-xl shadow-emerald-500/20">
                                Reprendre mon cours
                            </Button>
                            <Button variant="ghost" className="h-14 px-6 rounded-2xl border border-white/10 text-white font-black uppercase text-[11px] tracking-widest hover:bg-white/5">
                                Consulter le catalogue
                            </Button>
                        </div>
                    </div>
                    <div className="hidden lg:block shrink-0">
                        <Card className="rounded-[3rem] border-none bg-white/5 backdrop-blur-xl p-8 border border-white/10 w-80">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Progression Equipe</h3>
                                <TrendingUp className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div className="space-y-6">
                                {[
                                    { name: "Dr. Aere Lao", level: "Elite Platinum", xp: 95 },
                                    { name: "Mme Sow", level: "Elite Gold", xp: 78 },
                                    { name: "Mlle Fall", level: "Elite Silver", xp: 42 }
                                ].map((member, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black">
                                            <span className="text-white uppercase">{member.name}</span>
                                            <span className="text-emerald-400">{member.level}</span>
                                        </div>
                                        <Progress value={member.xp} className="h-1.5 bg-white/10" />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Filter segments */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                    {['ALL', 'CLINICAL', 'SOFT_SKILLS', 'TECH', 'ADMIN'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeCategory === cat 
                                    ? "bg-slate-900 text-white shadow-xl" 
                                    : "bg-white border border-slate-100 text-slate-400 hover:border-slate-300"
                            )}
                        >
                            {cat === 'ALL' ? 'Tous les cours' : cat.replace('_', ' ')}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-slate-100 bg-white">
                        <Search className="h-5 w-5 text-slate-400" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-slate-100 bg-white">
                        <Filter className="h-5 w-5 text-slate-400" />
                    </Button>
                </div>
            </div>

            {/* Courses Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <motion.div
                        key={course.id}
                        whileHover={{ y: -8 }}
                        className="group"
                    >
                        <Card className="rounded-[3rem] border-none shadow-luxury overflow-hidden bg-white h-full flex flex-col">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={course.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    {course.status !== 'LOCKED' ? (
                                        <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform">
                                            <Play className="h-6 w-6 text-slate-900 fill-slate-900 ml-1" />
                                        </div>
                                    ) : (
                                        <div className="h-14 w-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                            <Lock className="h-6 w-6 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[8px] font-black text-white uppercase tracking-widest">
                                        {course.category}
                                    </span>
                                    {course.status === 'COMPLETED' && (
                                        <span className="px-3 py-1 rounded-full bg-emerald-500 text-[8px] font-black text-white uppercase tracking-widest">
                                            Terminé
                                        </span>
                                    )}
                                </div>
                            </div>
                            <CardContent className="p-8 flex-1 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1 italic">
                                            Expert Academy
                                        </p>
                                        <h3 className="text-xl font-black text-slate-900 leading-tight tracking-tighter">
                                            {course.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-8 bg-slate-50 rounded-xl flex items-center justify-center">
                                            <Award className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">
                                            {course.instructor}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-y border-slate-50">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-[10px] font-black">{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Volume2 className="h-4 w-4" />
                                            <span className="text-[10px] font-black">{course.lessons} Leçons</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pt-6 space-y-4">
                                    {course.progress > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black">
                                                <span className="text-slate-400 uppercase">Progression</span>
                                                <span className="text-slate-900">{course.progress}%</span>
                                            </div>
                                            <Progress value={course.progress} className="h-1 bg-slate-100" />
                                        </div>
                                    )}
                                    <Button 
                                        disabled={course.status === 'LOCKED'}
                                        variant={course.status === 'COMPLETED' ? 'outline' : 'default'}
                                        className={cn(
                                            "w-full h-12 rounded-2xl font-black uppercase text-[10px] tracking-widest",
                                            course.status === 'COMPLETED' ? "border-emerald-100 text-emerald-600 bg-emerald-50" : "bg-slate-900 text-white shadow-lg"
                                        )}
                                    >
                                        {course.status === 'COMPLETED' ? "Revoir le cours" : 
                                         course.status === 'LOCKED' ? "Cours Verrouillé" : "Continuer"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Achievement / Certification Area */}
            <Card className="rounded-[4rem] border-none bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <ShieldCheck className="h-64 w-64" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="space-y-4 text-center md:text-left">
                        <h3 className="text-3xl font-black tracking-tighter italic">Elite Certifications</h3>
                        <p className="text-indigo-200 font-medium max-w-lg">
                            Validez vos acquis et obtenez vos certificats Elite pour chaque module complété. Préparez-vous à l'excellence.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div className="h-32 w-32 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex flex-col items-center justify-center space-y-2">
                            <Star className="h-8 w-8 text-gold fill-gold" />
                            <span className="text-[10px] font-black">2026 BRONZE</span>
                        </div>
                        <div className="h-32 w-32 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center space-y-2 opacity-50 grayscale">
                            <Star className="h-8 w-8 text-slate-300" />
                            <span className="text-[10px] font-black">2026 SILVER</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
