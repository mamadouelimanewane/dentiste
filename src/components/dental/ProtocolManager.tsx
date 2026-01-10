"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Play, Info } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Step {
    id: string
    title: string
    completed: boolean
}

interface Protocol {
    id: string
    name: string
    category: string
    steps: Step[]
}

export function ProtocolManager() {
    const [activeProtocol, setActiveProtocol] = useState<Protocol | null>({
        id: '1',
        name: 'Protocole Implantologie',
        category: 'CHIRURGIE',
        steps: [
            { id: '1', title: 'Examen Clinique & Radio 3B', completed: true },
            { id: '2', title: 'Signature Consentement Éclairé', completed: true },
            { id: '3', title: 'Pose de l\'implant (Phase 1)', completed: false },
            { id: '4', title: 'Cicatrisation (3-6 mois)', completed: false },
            { id: '5', title: 'Pose de la couronne (Phase 2)', completed: false },
        ]
    })

    return (
        <Card className="border-none shadow-luxury bg-white overflow-hidden rounded-[2rem]">
            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-500">Protocoles de Traitement</CardTitle>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-tighter">Workflow automatisé</p>
                </div>
                <Button size="sm" variant="outline" className="text-[10px] font-black uppercase tracking-widest h-8 px-4 rounded-full border-accent/20 text-accent hover:bg-accent/5">
                    Changer de Playbook
                </Button>
            </CardHeader>
            <CardContent className="p-8">
                {activeProtocol && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter">{activeProtocol.name}</h3>
                            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{activeProtocol.category}</span>
                        </div>

                        <div className="relative space-y-4">
                            {/* Vertical Line */}
                            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-100"></div>

                            {activeProtocol.steps.map((step, idx) => (
                                <div key={step.id} className="flex gap-4 relative group">
                                    <div className={cn(
                                        "h-6 w-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500",
                                        step.completed
                                            ? "bg-accent text-white shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                            : "bg-white border-2 border-slate-200 text-slate-400 group-hover:border-accent group-hover:text-accent"
                                    )}>
                                        {step.completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                                    </div>
                                    <div className="flex-1 pb-4">
                                        <div className="flex items-center justify-between">
                                            <p className={cn(
                                                "text-sm font-bold transition-colors",
                                                step.completed ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                                            )}>{step.title}</p>
                                            {!step.completed && (
                                                <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full hover:bg-accent/10 hover:text-accent">
                                                    <Play className="h-3 w-3" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

