"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    PlayCircle,
    CheckCircle2,
    Award,
    BookOpen,
    Zap,
    Brain,
    Lock,
    Trophy,
    GraduationCap,
    Clock,
    ChevronRight,
    Play,
    Star,
    Radiation,
    ShieldCheck,
    Mic,
    Target
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AcademyPage() {
    const [selectedVideo, setSelectedVideo] = useState<any>(null)
    const [activeQuiz, setActiveQuiz] = useState<any>(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [quizAnswers, setQuizAnswers] = useState<boolean[]>([])
    const [quizFinished, setQuizFinished] = useState(false)
    const [xp, setXp] = useState(1240)

    const courses = [
        {
            id: 1,
            title: "Maîtrise de l'IA Radio Lab",
            category: "Intelligence",
            duration: "12 min",
            difficulty: "Expert",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
            icon: Radiation,
            progress: 85,
            completed: false,
            desc: "Apprenez à interpréter les scores de confiance de l'IA et à détecter les pathologies complexes via le scanner neural.",
            questions: [
                {
                    q: "Que signifie un score de confiance de 95% affiché par l'IA sur une carie ?",
                    options: ["Probabilité élevée de pathologie confirmée", "Précision de l'image DICOM", "Temps restant avant traitement", "Niveau de douleur estimé"],
                    correct: 0
                },
                {
                    q: "Quel module IA est utilisé pour l'analyse des clichés STL ?",
                    options: ["Voice Hub", "Radio Lab Vision", "Financial Engine", "Smile Design"],
                    correct: 1
                }
            ]
        },
        {
            id: 2,
            title: "Protocole Stérilisation Elite",
            category: "Opérations",
            duration: "8 min",
            difficulty: "Standard",
            image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800",
            icon: ShieldCheck,
            progress: 100,
            completed: true,
            desc: "Maîtrisez le cycle complet de traçabilité QR-Trace et la conformité aux normes sanitaires internationales.",
            questions: [
                {
                    q: "Quelle est la température standard d'un cycle Prion ?",
                    options: ["121°C", "134°C", "100°C", "150°C"],
                    correct: 1
                }
            ]
        },
        {
            id: 3,
            title: "Dictée Vocale & Notes Cliniques",
            category: "Intelligence",
            duration: "5 min",
            difficulty: "Intermédiaire",
            image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=800",
            icon: Mic,
            progress: 30,
            completed: false,
            desc: "Optimisez votre vitesse de saisie grâce aux commandes vocales avancées et à la correction linguistique neuronale.",
            questions: [
                {
                    q: "Comment activer le mode 'Ordonnance' en cours de dictée ?",
                    options: ["Appui long sur le micro", "Commande vocale 'Passer en prescription'", "Menu latéral tactile", "Toutes les réponses"],
                    correct: 3
                }
            ]
        }
    ]

    const handleAnswer = (index: number) => {
        const isCorrect = index === activeQuiz.questions[currentQuestionIndex].correct
        setQuizAnswers([...quizAnswers, isCorrect])

        if (currentQuestionIndex < activeQuiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            setQuizFinished(true)
            if (isCorrect) setXp(prev => prev + 200)
        }
    }

    const resetQuiz = () => {
        setActiveQuiz(null)
        setCurrentQuestionIndex(0)
        setQuizAnswers([])
        setQuizFinished(false)
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                        <GraduationCap className="h-8 w-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">Academy & Certification Hub</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-indigo-600">Learning Academy</span></h1>
                        <p className="text-slate-500 font-medium tracking-tight">Formations immersives, certifications et simulateurs interactifs pour le personnel.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Card className="bg-white border shadow-sm px-6 py-2 flex items-center gap-4 rounded-2xl">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Mon Score</p>
                            <p className="text-xl font-black text-slate-900">{xp.toLocaleString()} <span className="text-[10px] text-indigo-600">XP</span></p>
                        </div>
                        <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <Trophy className="h-5 w-5" />
                        </div>
                    </Card>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black px-10 rounded-2xl uppercase tracking-widest text-[11px] h-14 shadow-luxury transition-all">
                        Ma Progression
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Featured Course Player / Interaction */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <AnimatePresence mode="wait">
                        {activeQuiz ? (
                            <motion.div
                                key="quiz"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <Card className="rounded-[4rem] border-none shadow-2xl bg-indigo-950 text-white p-12 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                        <Brain className="h-64 w-64 text-white" />
                                    </div>

                                    {!quizFinished ? (
                                        <>
                                            <div className="relative z-10 space-y-8">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Question {currentQuestionIndex + 1} sur {activeQuiz.questions.length}</span>
                                                    <Button variant="ghost" onClick={resetQuiz} className="text-white/40 hover:text-white"><X className="h-4 w-4 mr-2" /> Abandonner</Button>
                                                </div>
                                                <h2 className="text-3xl font-black tracking-tight max-w-2xl">{activeQuiz.questions[currentQuestionIndex].q}</h2>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {activeQuiz.questions[currentQuestionIndex].options.map((opt: string, i: number) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleAnswer(i)}
                                                            className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] text-left hover:bg-white/10 transition-all font-bold text-sm flex justify-between items-center group"
                                                        >
                                                            {opt}
                                                            <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full mt-10">
                                                <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%` }} />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="relative z-10 text-center space-y-8 py-10">
                                            <div className="h-24 w-24 bg-gold rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-gold/20">
                                                <Trophy className="h-10 w-10 text-white" />
                                            </div>
                                            <div className="space-y-4">
                                                <h2 className="text-5xl font-black tracking-tighter uppercase italic">Certification Validée !</h2>
                                                <p className="text-indigo-300 font-medium">Félicitations, vous avez maîtrisé le module <span className="text-white font-bold">{activeQuiz.title}</span>.</p>
                                                <div className="flex justify-center gap-10 pt-6">
                                                    <div>
                                                        <p className="text-3xl font-black text-white">+200</p>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Points XP</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-3xl font-black text-white">100%</p>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Score</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-4">
                                                <Button onClick={resetQuiz} className="bg-white text-indigo-900 font-black uppercase text-[11px] tracking-widest h-14 px-12 rounded-2xl hover:bg-indigo-50 transition-all">Retour à l'Academy</Button>
                                                <Button className="bg-gold text-white font-black uppercase text-[11px] tracking-widest h-14 px-12 rounded-2xl shadow-xl shadow-gold/20">Partager le Diplôme</Button>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ) : selectedVideo ? (
                            <motion.div key="player" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                <Card className="rounded-[4rem] border-none shadow-2xl bg-black overflow-hidden relative min-h-[500px]">
                                    <img src={selectedVideo.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                    <div className="absolute inset-x-12 bottom-12 z-10 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-4 py-1 bg-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">{selectedVideo.category}</span>
                                                    <span className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest"><Clock className="h-3 w-3" /> {selectedVideo.duration}</span>
                                                </div>
                                                <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">{selectedVideo.title}</h3>
                                            </div>
                                            <div className="flex gap-4">
                                                <Button variant="ghost" className="h-14 w-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white"><PlaySquare className="h-6 w-6" /></Button>
                                                <Button
                                                    onClick={() => setActiveQuiz(selectedVideo)}
                                                    className="h-14 px-10 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
                                                >
                                                    Passer le Quiz de Validation
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-white/60 text-sm max-w-xl font-medium leading-relaxed">{selectedVideo.desc}</p>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${selectedVideo.progress}%` }}
                                                className="h-full bg-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Card className="rounded-[4rem] border-none shadow-2xl bg-slate-950 text-white p-12 overflow-hidden relative min-h-[500px] flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200')] opacity-10 bg-center bg-cover" />
                                    <div className="relative z-10 text-center space-y-8 max-w-xl">
                                        <div className="h-24 w-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                                            <Play className="h-10 w-10 fill-white" />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Commencer la formation <br /><span className="text-gold">Workflow Management</span></h2>
                                            <p className="text-slate-400 font-medium">Apprenez à optimiser le parcours patient via notre nouveau module Kanban en 5 minutes chrono.</p>
                                        </div>
                                        <Button className="bg-white text-indigo-900 font-black uppercase text-[11px] tracking-widest h-14 px-12 rounded-2xl hover:bg-indigo-50 transition-all">
                                            Lancer la Masterclass
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Course Catalog */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Catalogue des Formations</h3>
                            <div className="flex gap-2">
                                {['TOUT', 'INTELLIGENCE', 'OPÉRATIONS', 'MANAGEMENT'].map(cat => (
                                    <button key={cat} className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all">
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {courses.map(course => (
                                <Card
                                    key={course.id}
                                    onClick={() => setSelectedVideo(course)}
                                    className={cn(
                                        "rounded-[3rem] border-none shadow-luxury bg-white group cursor-pointer overflow-hidden hover:translate-y-[-8px] transition-all",
                                        selectedVideo?.id === course.id && "ring-2 ring-indigo-500/20 shadow-2xl"
                                    )}
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <PlayCircle className="h-12 w-12 text-white" />
                                        </div>
                                        {course.completed && (
                                            <div className="absolute top-4 right-4 bg-teal-500 text-white p-2 rounded-xl shadow-xl">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 left-4 flex gap-2">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase text-slate-900 tracking-widest">{course.difficulty}</span>
                                        </div>
                                    </div>
                                    <CardContent className="p-8 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <course.icon className="h-4 w-4 text-indigo-600" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{course.category}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-400">
                                                <Clock className="h-3 w-3" />
                                                <span className="text-[9px] font-black uppercase">{course.duration}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-2">{course.title}</h4>
                                            <p className="text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed italic">{course.desc}</p>
                                        </div>
                                        <div className="pt-4 flex items-center gap-4">
                                            <div className="flex-1 h-1 bg-slate-50 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: `${course.progress}%` }} />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400">{course.progress}%</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Certifications & Challenges */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Classement Elite</h3>
                            <Trophy className="h-5 w-5 text-gold" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Dr. Aere Lao", xp: "1,240", rank: 1, role: "Praticien Elite", avatar: "AL" },
                                { name: "Fatou Diack", xp: "1,120", rank: 2, role: "Assistante Chef", avatar: "FD" },
                                { name: "Dr. Marc Sène", xp: "980", rank: 3, role: "Chirurgien", avatar: "MS" },
                                { name: "Sophie Fall", xp: "850", rank: 4, role: "Stagiaire Master", avatar: "SF" },
                            ].map((user) => (
                                <div key={user.name} className={cn(
                                    "flex items-center justify-between p-3 rounded-2xl transition-all",
                                    user.rank === 1 ? "bg-indigo-50 border border-indigo-100" : "hover:bg-slate-50"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs shadow-sm shadow-indigo-600/10",
                                            user.rank === 1 ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-100"
                                        )}>
                                            {user.avatar}
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 leading-tight">{user.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-slate-900">{user.xp}</p>
                                        <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">XP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full border-slate-200 text-slate-900 font-black uppercase text-[10px] tracking-widest h-12 rounded-2xl mt-6">
                            Voir le podium complet
                        </Button>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Mes Certificats</h3>
                            <Award className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: "Spécialiste IA Vision v1", date: "Jan 2026", icon: Brain },
                                { title: "Maître de Consultation", date: "Déc 2025", icon: Star }
                            ].map((cert, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-slate-900 transition-all cursor-pointer">
                                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-all">
                                        <cert.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-900 group-hover:text-white">{cert.title}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-white/60">Obtenu le {cert.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl mt-8">
                            Générer mon Diplôme Elite
                        </Button>
                    </Card>

                    <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Zap className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-xl font-black tracking-tighter text-white uppercase italic">Challenge Hebdo</h3>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
                                <p className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-3">Récompense : 500 XP</p>
                                <p className="text-xs font-medium text-slate-300 leading-relaxed italic">
                                    "Réalisez 10 dictées vocales consécutives avec moins de 2 corrections manuelles pour valider le badge 'Maître de la Voix'."
                                </p>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                <span>Ma progression</span>
                                <span className="text-gold">8/10</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gold" style={{ width: '80%' }} />
                            </div>
                        </div>
                    </Card>

                    <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem] flex flex-col items-center text-center space-y-4">
                        <div className="h-16 w-16 bg-white rounded-[2rem] flex items-center justify-center text-indigo-600 shadow-xl border border-indigo-50">
                            <BookOpen className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Besoin d'approfondir ?</p>
                            <p className="text-base font-black text-slate-900 mt-2 uppercase italic tracking-tighter">Documentation Technique</p>
                            <p className="text-[11px] font-medium text-slate-500 mt-2 leading-relaxed">
                                Accédez à 36 chapitres détaillés sur chaque module de votre ERP DentoPrestige.
                            </p>
                        </div>
                        <Button
                            variant="link"
                            onClick={() => window.location.href = '/documentation'}
                            className="text-[10px] font-black uppercase text-indigo-600 group"
                        >
                            Ouvrir le manuel <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PlaySquare(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m9 8 6 4-6 4Z" />
        </svg>
    )
}

function X(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
