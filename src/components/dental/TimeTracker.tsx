"use client"

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer, Play, Pause, Square, Save, History, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function TimeTracker() {
    const [isRunning, setIsRunning] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [history, setHistory] = useState([
        { id: 1, task: 'Consultation Chirurgie', duration: '45 min', date: 'Aujourd\'hui' },
        { id: 2, task: 'Analyse Scanner 3D', duration: '15 min', date: 'Hier' }
    ])

    useEffect(() => {
        let interval: any = null
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(s => s + 1)
            }, 1000)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isRunning])

    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600)
        const mins = Math.floor((totalSeconds % 3600) / 60)
        const secs = totalSeconds % 60
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <Card className="border-none shadow-luxury bg-slate-900 text-white rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-white/5 p-6 border-b border-white/5 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Chronos Facturation</CardTitle>
                    <p className="text-[9px] font-bold text-slate-400">Temps clinique minuté</p>
                </div>
                <Timer className={cn("h-4 w-4", isRunning ? "text-accent animate-pulse" : "text-slate-600")} />
            </CardHeader>
            <CardContent className="p-8">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-5xl font-black tracking-tighter text-white font-mono">
                        {formatTime(seconds)}
                    </div>

                    <div className="flex gap-3 w-full">
                        {!isRunning ? (
                            <Button
                                onClick={() => setIsRunning(true)}
                                className="flex-1 bg-accent hover:bg-yellow-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl h-11"
                            >
                                <Play className="h-4 w-4 mr-2" /> Démarrer
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setIsRunning(false)}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-xl h-11"
                            >
                                <Pause className="h-4 w-4 mr-2" /> Pause
                            </Button>
                        )}
                        <Button
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-500 font-black rounded-xl h-11 w-11"
                            onClick={() => {
                                setIsRunning(false)
                                setSeconds(0)
                            }}
                        >
                            <Square className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="w-full pt-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <History className="h-3 w-3" /> Historique récent
                            </span>
                            <span className="text-[9px] font-black text-accent cursor-pointer">TOUT VOIR</span>
                        </div>
                        <div className="space-y-2">
                            {history.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-300 group-hover:text-white transition-colors">{item.task}</p>
                                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{item.date}</p>
                                    </div>
                                    <span className="text-[10px] font-black text-accent">{item.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

