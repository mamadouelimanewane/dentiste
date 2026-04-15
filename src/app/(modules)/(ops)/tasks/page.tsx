"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock, Plus, Loader2, Calendar, User, Tag } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function TasksPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [tasks, setTasks] = useState<any[]>([])
    const [patients, setPatients] = useState<any[]>([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [taskFormData, setTaskFormData] = useState({
        title: '',
        priority: 'MEDIUM',
        category: 'Opérations',
        patientId: '',
        dueDate: ''
    })

    const fetchPatients = async () => {
        try {
            const res = await fetch('/api/patients')
            const data = await res.json()
            if (Array.isArray(data)) setPatients(data)
        } catch (e) { console.error(e) }
    }

    const fetchTasks = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/tasks')
            const data = await res.json()
            if (Array.isArray(data)) {
                setTasks(data)
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
        fetchPatients()
    }, [])

    const toggleTask = async (task: any) => {
        const newStatus = task.status === 'TODO' ? 'DONE' : 'TODO'
        // Optimistic update
        setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t))

        try {
            await fetch('/api/tasks', {
                method: 'PATCH',
                body: JSON.stringify({ id: task.id, status: newStatus }),
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error("Failed to update task:", error)
            fetchTasks() // roll back
        }
    }

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!taskFormData.title) return toast.error("Le titre est requis")

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskFormData)
            })
            if (res.ok) {
                toast.success("Tâche créée avec succès !")
                setIsAddOpen(false)
                setTaskFormData({ title: '', priority: 'MEDIUM', category: 'Opérations', patientId: '', dueDate: '' })
                fetchTasks()
            }
        } catch (error) {
            toast.error("Erreur lors de la création de la tâche")
        }
    }

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Coordination d'Équipe</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Elite <span className="text-gold">Command Center</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Gestion des flux opérationnels, maintenance et tâches cliniques.</p>
                </div>
                <Button
                    className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl px-8 shadow-xl hover:scale-[1.02] transition-all"
                    onClick={() => setIsAddOpen(true)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Nouvelle Tâche
                </Button>
            </div>

            {/* Creation Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-8 border-none shadow-luxury">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 tracking-tighter">Nouvelle <span className="text-gold">Tâche</span></DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateTask} className="space-y-6 mt-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Titre de la tâche</label>
                            <Input
                                value={taskFormData.title}
                                onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                                className="rounded-xl h-12 border-slate-100 bg-slate-50/50"
                                placeholder="ex: Commander du matériel, Rappeler M. Dupont..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Priorité</label>
                                <Select value={taskFormData.priority} onValueChange={(val) => setTaskFormData({ ...taskFormData, priority: val })}>
                                    <SelectTrigger className="rounded-xl h-12 border-slate-100 bg-slate-50/50">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Basse (Bleu)</SelectItem>
                                        <SelectItem value="MEDIUM">Moyenne (Orange)</SelectItem>
                                        <SelectItem value="HIGH">Haute (Rouge)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Catégorie</label>
                                <Input
                                    value={taskFormData.category}
                                    onChange={(e) => setTaskFormData({ ...taskFormData, category: e.target.value })}
                                    className="rounded-xl h-12 border-slate-100 bg-slate-50/50"
                                    placeholder="ex: Opérations, Admin, Clinique"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date (Optionnel)</label>
                                <Input
                                    type="date"
                                    value={taskFormData.dueDate}
                                    onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                                    className="rounded-xl h-12 border-slate-100 bg-slate-50/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Patient Associé (Optionnel)</label>
                                <Select value={taskFormData.patientId} onValueChange={(val) => setTaskFormData({ ...taskFormData, patientId: val })}>
                                    <SelectTrigger className="rounded-xl h-12 border-slate-100 bg-slate-50/50">
                                        <SelectValue placeholder="Aucun" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Aucun</SelectItem>
                                        {patients.map(p => (
                                            <SelectItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-14 bg-slate-900 text-gold font-black uppercase tracking-widest rounded-2xl shadow-xl mt-4 hover:scale-[1.02] transition-all">Créer la Tâche</Button>
                    </form>
                </DialogContent>
            </Dialog>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-10 w-10 animate-spin text-gold mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Déploiement des tâches...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* TO DO List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-8 bg-orange-400 rounded-full"></div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Pipeline en attente</h3>
                            </div>
                            <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-3 py-1 rounded-full">{tasks.filter(t => t.status === 'TODO').length}</span>
                        </div>

                        <div className="space-y-4">
                            {tasks.filter(t => t.status === 'TODO').length === 0 ? (
                                <div className="p-12 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                    Bravo ! Plus aucune tâche urgente.
                                </div>
                            ) : (
                                tasks.filter(t => t.status === 'TODO').map(task => (
                                    <Card key={task.id} className="rounded-[2.5rem] border-none shadow-luxury bg-white group hover:scale-[1.02] transition-all cursor-pointer overflow-hidden border border-slate-50" onClick={() => toggleTask(task)}>
                                        <CardContent className="p-8">
                                            <div className="flex items-start gap-6">
                                                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                                                    <Circle className="h-6 w-6 text-slate-300 group-hover:text-orange-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="text-lg font-black text-slate-900 tracking-tight">{task.title}</h4>
                                                        <div className={cn(
                                                            "h-2 w-2 rounded-full",
                                                            task.priority === 'HIGH' ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                                                                task.priority === 'MEDIUM' ? "bg-orange-400" : "bg-blue-400"
                                                        )} />
                                                    </div>
                                                    <div className="flex items-center gap-6 mt-4">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Pas de date'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Tag className="h-3.5 w-3.5 text-slate-400" />
                                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{task.category || 'Opérations'}</span>
                                                        </div>
                                                        {task.patient && (
                                                            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg">
                                                                <User className="h-3 w-3 text-slate-500" />
                                                                <span className="text-[9px] font-black text-slate-600 uppercase">{task.patient.firstName} {task.patient.lastName}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>

                    {/* DONE List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-8 bg-teal-500 rounded-full"></div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Archive Success</h3>
                            </div>
                            <span className="bg-teal-100 text-teal-700 text-[10px] font-black px-3 py-1 rounded-full">{tasks.filter(t => t.status === 'DONE').length}</span>
                        </div>

                        <div className="space-y-4 opacity-60">
                            {tasks.filter(t => t.status === 'DONE').map(task => (
                                <Card key={task.id} className="rounded-[2.5rem] border-none bg-slate-50/50 hover:opacity-100 transition-all cursor-pointer overflow-hidden" onClick={() => toggleTask(task)}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-6">
                                            <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center">
                                                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-base font-black text-slate-900 line-through decoration-slate-300 decoration-2">{task.title}</h4>
                                                <p className="text-[9px] font-black uppercase text-slate-400 mt-1 tracking-widest">Complété</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
