"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock, Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Task = {
    id: string
    title: string
    assignee: string
    dueDate: string
    status: 'TODO' | 'DONE'
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
}

const INITIAL_TASKS: Task[] = [
    { id: '1', title: 'Commander des masques et gants', assignee: 'Sophie (Assistante)', dueDate: 'Aujourd\'hui', status: 'TODO', priority: 'HIGH' },
    { id: '2', title: 'Rappeler M. Martin pour son devis', assignee: 'Secrétariat', dueDate: 'Demain', status: 'TODO', priority: 'MEDIUM' },
    { id: '3', title: 'Stérilisation des instruments du matin', assignee: 'Sophie', dueDate: '12:00', status: 'DONE', priority: 'HIGH' },
]

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'TODO' ? 'DONE' : 'TODO' } : t))
    }

    return (
        <div className="flex h-full flex-col p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Tâches</h1>
                    <p className="text-slate-500">Gestion des tâches du cabinet et de l'équipe</p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Nouvelle Tâche
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* TO DO List */}
                <Card className="border-t-4 border-t-orange-400">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>À Faire</span>
                            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">{tasks.filter(t => t.status === 'TODO').length}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {tasks.filter(t => t.status === 'TODO').map(task => (
                            <div key={task.id} className="flex items-start gap-4 p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => toggleTask(task.id)}>
                                <Circle className="h-5 w-5 text-slate-300 group-hover:text-teal-500 mt-1" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium text-slate-900">{task.title}</p>
                                        {task.priority === 'HIGH' && <span className="h-2 w-2 rounded-full bg-red-500" title="Priorité Haute" />}
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {task.dueDate}</span>
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{task.assignee}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tasks.filter(t => t.status === 'TODO').length === 0 && (
                            <div className="text-center py-8 text-slate-400">Aucune tâche en attente.</div>
                        )}
                    </CardContent>
                </Card>

                {/* DONE List */}
                <Card className="border-t-4 border-t-green-500 bg-slate-50/50">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Terminé</span>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{tasks.filter(t => t.status === 'DONE').length}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {tasks.filter(t => t.status === 'DONE').map(task => (
                            <div key={task.id} className="flex items-start gap-4 p-4 rounded-lg border bg-slate-100/50 opacity-75 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => toggleTask(task.id)}>
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900 line-through decoration-slate-400">{task.title}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                        <span>{task.assignee}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

