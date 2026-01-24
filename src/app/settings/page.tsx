"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Building2,
    Clock,
    Lock,
    Mail,
    Save,
    User,
    Bell,
    Cloud,
    Eye,
    Palette,
    Smartphone,
    CreditCard,
    ShieldCheck,
    Globe,
    MessageSquare,
    Phone,
    Calendar,
    Users,
    Settings,
    CheckCircle,
    AlertCircle,
    Plus,
    Trash2,
    Edit,
    Key
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('CLINIC')
    const [isSaving, setIsSaving] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const [isLoadingUsers, setIsLoadingUsers] = useState(false)

    // Charger les utilisateurs
    useEffect(() => {
        if (activeSection === 'TEAM') {
            setIsLoadingUsers(true)
            fetch('/api/users')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setUsers(data)
                })
                .finally(() => setIsLoadingUsers(false))
        }
    }, [activeSection])

    // États pour les configurations
    const [clinicInfo, setClinicInfo] = useState({
        name: 'Clinique Dentaire Aere Lao',
        ninea: 'DK-1234567-RE',
        address: 'Avenue Léopold Sédar Senghor, Dakar, Sénégal',
        phone: '+221 33 800 00 00',
        email: 'contact@aerelao-dental.sn'
    })

    const [smsConfig, setSmsConfig] = useState({
        provider: 'TWILIO',
        accountSid: '',
        authToken: '',
        fromNumber: '+221XXXXXXXXX',
        enabled: false
    })

    const [whatsappConfig, setWhatsappConfig] = useState({
        provider: 'WHATSAPP_BUSINESS',
        phoneNumberId: '',
        accessToken: '',
        enabled: false
    })

    const [appointmentSettings, setAppointmentSettings] = useState({
        reminderJ2: true,
        reminderJ1: true,
        postOpInstructions: true,
        annualRecall: true,
        defaultDuration: 30,
        bufferTime: 15
    })

    const [workingHours, setWorkingHours] = useState([
        { day: 'Lundi', start: '09:00', end: '18:00', enabled: true },
        { day: 'Mardi', start: '09:00', end: '18:00', enabled: true },
        { day: 'Mercredi', start: '09:00', end: '18:00', enabled: true },
        { day: 'Jeudi', start: '09:00', end: '18:00', enabled: true },
        { day: 'Vendredi', start: '09:00', end: '18:00', enabled: true },
        { day: 'Samedi', start: '09:00', end: '13:00', enabled: true },
        { day: 'Dimanche', start: '09:00', end: '18:00', enabled: false },
    ])

    const handleSave = async () => {
        setIsSaving(true)
        // Simuler la sauvegarde
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSaving(false)
        alert('Paramètres sauvegardés avec succès !')
    }

    const sections = [
        { id: 'CLINIC', name: 'Elite Clinic Profile', icon: Building2 },
        { id: 'TEAM', name: 'Collaborateurs & Rôles', icon: User },
        { id: 'AGENDA', name: 'Horaires & RDV', icon: Clock },
        { id: 'COMMUNICATION', name: 'SMS & WhatsApp', icon: MessageSquare },
        { id: 'SECURITY', name: 'Périmètre de Sécurité', icon: ShieldCheck },
        { id: 'BILLING', name: 'Facturation & Licence', icon: CreditCard },
        { id: 'INTEGRATIONS', name: 'Hub API & Webhooks', icon: Globe },
    ]

    return (
        <div className="p-8 space-y-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1 w-8 bg-slate-900 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Configuration Globale Engine</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Console <span className="text-gold">Command Center</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Personnalisez votre expérience et gérez vos accès.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] h-14 rounded-2xl px-10 shadow-luxury hover:bg-slate-800 transition-all"
                >
                    {isSaving ? (
                        <>Sauvegarde...</>
                    ) : (
                        <>
                            <Save className="mr-2 h-5 w-5" /> Déployer les Changements
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-2">
                    {sections.map(section => (
                        <Button
                            key={section.id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start h-14 rounded-2xl px-6 text-[11px] font-black uppercase tracking-widest transition-all",
                                activeSection === section.id
                                    ? "bg-slate-900 text-white shadow-xl translate-x-2"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <section.icon className={cn("mr-4 h-5 w-5", activeSection === section.id ? "text-accent" : "text-slate-400")} />
                            {section.name}
                        </Button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-8">
                    {activeSection === 'CLINIC' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase">Identité de la Clinique</CardTitle>
                                    <CardDescription className="text-sm font-medium text-slate-500">Ces informations sont utilisées pour l'en-tête de vos documents officiels.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nom de l'établissement</label>
                                            <Input
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5"
                                                value={clinicInfo.name}
                                                onChange={(e) => setClinicInfo({ ...clinicInfo, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identifiant Fiscal / NINEA</label>
                                            <Input
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5"
                                                value={clinicInfo.ninea}
                                                onChange={(e) => setClinicInfo({ ...clinicInfo, ninea: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Adresse Siège</label>
                                            <Input
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5"
                                                value={clinicInfo.address}
                                                onChange={(e) => setClinicInfo({ ...clinicInfo, address: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Téléphone Secrétariat</label>
                                            <Input
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5"
                                                value={clinicInfo.phone}
                                                onChange={(e) => setClinicInfo({ ...clinicInfo, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Public</label>
                                            <Input
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5"
                                                value={clinicInfo.email}
                                                onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white p-10">
                                <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase mb-8">Design & Signatures</CardTitle>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300">
                                            <Palette className="h-8 w-8" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Modifier Logo Officiel</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300">
                                            <Mail className="h-8 w-8" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Template Emails AI</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300">
                                            <Cloud className="h-8 w-8" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Backup Cloud HDS</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {activeSection === 'COMMUNICATION' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            {/* Configuration SMS */}
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase flex items-center gap-3">
                                                <Phone className="h-6 w-6 text-blue-600" />
                                                Configuration SMS (Twilio)
                                            </CardTitle>
                                            <CardDescription className="text-sm font-medium text-slate-500 mt-2">
                                                Configurez votre compte Twilio pour l'envoi automatique de SMS
                                            </CardDescription>
                                        </div>
                                        <div className={cn(
                                            "h-8 w-16 rounded-full transition-all cursor-pointer",
                                            smsConfig.enabled ? "bg-teal-500" : "bg-slate-200"
                                        )}
                                            onClick={() => setSmsConfig({ ...smsConfig, enabled: !smsConfig.enabled })}
                                        >
                                            <div className={cn(
                                                "h-8 w-8 rounded-full bg-white shadow-sm transition-all",
                                                smsConfig.enabled ? "translate-x-8" : "translate-x-0"
                                            )} />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Account SID</label>
                                            <Input
                                                type="password"
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-mono px-5"
                                                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                                value={smsConfig.accountSid}
                                                onChange={(e) => setSmsConfig({ ...smsConfig, accountSid: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Auth Token</label>
                                            <Input
                                                type="password"
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-mono px-5"
                                                placeholder="••••••••••••••••••••••••••••••••"
                                                value={smsConfig.authToken}
                                                onChange={(e) => setSmsConfig({ ...smsConfig, authToken: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Numéro Expéditeur</label>
                                            <Input
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5"
                                                placeholder="+221XXXXXXXXX"
                                                value={smsConfig.fromNumber}
                                                onChange={(e) => setSmsConfig({ ...smsConfig, fromNumber: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Coût par SMS</label>
                                            <div className="h-12 bg-slate-50 rounded-xl flex items-center px-5">
                                                <span className="text-sm font-black text-slate-900">25 FCFA</span>
                                                <span className="text-xs text-slate-400 ml-2">/ 160 caractères</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                        <p className="text-xs font-bold text-blue-900">💡 Comment obtenir vos identifiants Twilio ?</p>
                                        <p className="text-[10px] text-blue-700 mt-1">
                                            1. Créez un compte sur <a href="https://www.twilio.com" target="_blank" className="underline">twilio.com</a><br />
                                            2. Accédez à votre Console Dashboard<br />
                                            3. Copiez votre Account SID et Auth Token<br />
                                            4. Achetez un numéro de téléphone Sénégalais
                                        </p>
                                    </div>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs h-12 rounded-xl">
                                        <CheckCircle className="mr-2 h-4 w-4" /> Tester la Configuration SMS
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Configuration WhatsApp */}
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase flex items-center gap-3">
                                                <MessageSquare className="h-6 w-6 text-green-600" />
                                                Configuration WhatsApp Business
                                            </CardTitle>
                                            <CardDescription className="text-sm font-medium text-slate-500 mt-2">
                                                Connectez votre compte WhatsApp Business API
                                            </CardDescription>
                                        </div>
                                        <div className={cn(
                                            "h-8 w-16 rounded-full transition-all cursor-pointer",
                                            whatsappConfig.enabled ? "bg-green-500" : "bg-slate-200"
                                        )}
                                            onClick={() => setWhatsappConfig({ ...whatsappConfig, enabled: !whatsappConfig.enabled })}
                                        >
                                            <div className={cn(
                                                "h-8 w-8 rounded-full bg-white shadow-sm transition-all",
                                                whatsappConfig.enabled ? "translate-x-8" : "translate-x-0"
                                            )} />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number ID</label>
                                            <Input
                                                type="password"
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-mono px-5"
                                                placeholder="1234567890123456"
                                                value={whatsappConfig.phoneNumberId}
                                                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phoneNumberId: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Token</label>
                                            <Input
                                                type="password"
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-mono px-5"
                                                placeholder="EAAxxxxxxxxxxxxxxxxxxxxxxxx"
                                                value={whatsappConfig.accessToken}
                                                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, accessToken: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Coût par Message</label>
                                            <div className="h-12 bg-slate-50 rounded-xl flex items-center px-5">
                                                <span className="text-sm font-black text-slate-900">15 FCFA</span>
                                                <span className="text-xs text-slate-400 ml-2">/ message</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Taux d'Ouverture</label>
                                            <div className="h-12 bg-green-50 rounded-xl flex items-center px-5">
                                                <span className="text-sm font-black text-green-900">98.2%</span>
                                                <span className="text-xs text-green-700 ml-2">en moyenne</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                                        <p className="text-xs font-bold text-green-900">💡 Comment configurer WhatsApp Business API ?</p>
                                        <p className="text-[10px] text-green-700 mt-1">
                                            1. Créez un compte Meta Business<br />
                                            2. Configurez WhatsApp Business API<br />
                                            3. Obtenez votre Phone Number ID et Access Token<br />
                                            4. Vérifiez votre numéro de téléphone professionnel
                                        </p>
                                    </div>
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest text-xs h-12 rounded-xl">
                                        <CheckCircle className="mr-2 h-4 w-4" /> Tester la Configuration WhatsApp
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {activeSection === 'AGENDA' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            {/* Horaires de Travail */}
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase">Horaires de Travail</CardTitle>
                                    <CardDescription className="text-sm font-medium text-slate-500">Définissez vos plages horaires d'ouverture</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 space-y-4">
                                    {workingHours.map((day, index) => (
                                        <div key={day.day} className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl">
                                            <div className="w-32">
                                                <span className="text-sm font-black text-slate-900">{day.day}</span>
                                            </div>
                                            <div className="flex items-center gap-4 flex-1">
                                                <Input
                                                    type="time"
                                                    className="h-10 bg-white border-slate-200 rounded-xl text-sm font-bold px-4"
                                                    value={day.start}
                                                    disabled={!day.enabled}
                                                    onChange={(e) => {
                                                        const newHours = [...workingHours]
                                                        newHours[index].start = e.target.value
                                                        setWorkingHours(newHours)
                                                    }}
                                                />
                                                <span className="text-slate-400">→</span>
                                                <Input
                                                    type="time"
                                                    className="h-10 bg-white border-slate-200 rounded-xl text-sm font-bold px-4"
                                                    value={day.end}
                                                    disabled={!day.enabled}
                                                    onChange={(e) => {
                                                        const newHours = [...workingHours]
                                                        newHours[index].end = e.target.value
                                                        setWorkingHours(newHours)
                                                    }}
                                                />
                                            </div>
                                            <div className={cn(
                                                "h-6 w-12 rounded-full transition-all cursor-pointer",
                                                day.enabled ? "bg-teal-500" : "bg-slate-200"
                                            )}
                                                onClick={() => {
                                                    const newHours = [...workingHours]
                                                    newHours[index].enabled = !newHours[index].enabled
                                                    setWorkingHours(newHours)
                                                }}
                                            >
                                                <div className={cn(
                                                    "h-6 w-6 rounded-full bg-white shadow-sm transition-all",
                                                    day.enabled ? "translate-x-6" : "translate-x-0"
                                                )} />
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Paramètres RDV */}
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase">Paramètres des Rendez-vous</CardTitle>
                                    <CardDescription className="text-sm font-medium text-slate-500">Configuration des durées et rappels automatiques</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Durée par Défaut (minutes)</label>
                                            <Input
                                                type="number"
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5"
                                                value={appointmentSettings.defaultDuration}
                                                onChange={(e) => setAppointmentSettings({ ...appointmentSettings, defaultDuration: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Temps de Battement (minutes)</label>
                                            <Input
                                                type="number"
                                                className="h-12 bg-slate-50 border-none rounded-xl text-sm font-bold px-5"
                                                value={appointmentSettings.bufferTime}
                                                onChange={(e) => setAppointmentSettings({ ...appointmentSettings, bufferTime: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Rappels Automatiques</h4>
                                        {[
                                            { key: 'reminderJ2', label: 'Rappel J-2 (WhatsApp)', desc: 'Envoi automatique 2 jours avant le RDV' },
                                            { key: 'reminderJ1', label: 'Rappel J-1 (SMS)', desc: 'Envoi automatique la veille du RDV' },
                                            { key: 'postOpInstructions', label: 'Instructions Post-Op', desc: 'Envoi automatique après chirurgie' },
                                            { key: 'annualRecall', label: 'Rappel Contrôle Annuel', desc: 'Pour patients > 12 mois sans visite' },
                                        ].map((setting) => (
                                            <div key={setting.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{setting.label}</p>
                                                    <p className="text-xs text-slate-500">{setting.desc}</p>
                                                </div>
                                                <div className={cn(
                                                    "h-6 w-12 rounded-full transition-all cursor-pointer",
                                                    appointmentSettings[setting.key as keyof typeof appointmentSettings] ? "bg-teal-500" : "bg-slate-200"
                                                )}
                                                    onClick={() => setAppointmentSettings({
                                                        ...appointmentSettings,
                                                        [setting.key]: !appointmentSettings[setting.key as keyof typeof appointmentSettings]
                                                    })}
                                                >
                                                    <div className={cn(
                                                        "h-6 w-6 rounded-full bg-white shadow-sm transition-all",
                                                        appointmentSettings[setting.key as keyof typeof appointmentSettings] ? "translate-x-6" : "translate-x-0"
                                                    )} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {activeSection === 'SECURITY' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-slate-950 text-white p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-10">
                                    <Lock className="h-40 w-40 text-accent" />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">Protocole de Sécurité Militaire</h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">Votre infrastructure est protégée par un chiffrement AES-256 de bout en bout. Toutes les actions sont tracées et immuables.</p>
                                    <div className="flex gap-4">
                                        <Button className="bg-accent text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 shadow-xl border-none">Activer 2FA Biométrique</Button>
                                        <Button variant="outline" className="border-white/10 text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8 hover:bg-white/5 transition-all">Audit des Logs</Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {activeSection === 'TEAM' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase">Gestion des Rôles & Permissions</CardTitle>
                                            <CardDescription className="text-sm font-medium text-slate-500 mt-2">Définissez les niveaux d'accès standard pour votre cabinet</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { role: 'OWNER', name: 'Administrateur', permissions: 'Accès Total', color: 'bg-red-50 text-red-600' },
                                            { role: 'DENTIST', name: 'Praticien', permissions: 'Clinique + Patients', color: 'bg-blue-50 text-blue-600' },
                                            { role: 'ASSISTANT', name: 'Assistant', permissions: 'Clinique + Stérilisation', color: 'bg-teal-50 text-teal-600' },
                                            { role: 'SECRETARY', name: 'Secrétaire', permissions: 'Agenda + Facturation', color: 'bg-purple-50 text-purple-600' },
                                        ].map((r, i) => (
                                            <div key={i} className="p-6 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all group cursor-pointer">
                                                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", r.color)}>
                                                    <ShieldCheck className="h-5 w-5" />
                                                </div>
                                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{r.name}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{r.permissions}</p>
                                                <Button variant="link" className="p-0 h-auto mt-4 text-[9px] font-black uppercase text-slate-400 group-hover:text-slate-900 transition-colors">Éditer Permissions →</Button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-10 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                            <Users className="h-4 w-4" /> Matrice de Permissions Granulaires
                                        </h4>
                                        <div className="space-y-4">
                                            {[
                                                { category: 'Dossier Patient', rights: ['Lecture', 'Édition', 'Suppression', 'Export'] },
                                                { category: 'Données Cliniques', rights: ['Odontogramme', 'Radios', 'Protocoles', 'Prescriptions'] },
                                                { category: 'Finance', rights: ['Facturation', 'Encaissement', 'Comptabilité', 'Rapports'] },
                                                { category: 'Configuration', rights: ['Paramètres', 'Utilisateurs', 'API', 'Audit'] },
                                            ].map((cat, i) => (
                                                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0">
                                                    <span className="text-xs font-black text-slate-700 w-1/3">{cat.category}</span>
                                                    <div className="flex gap-4 w-2/3">
                                                        {cat.rights.map(right => (
                                                            <div key={right} className="flex items-center gap-2">
                                                                <div className="h-4 w-4 rounded-md border-2 border-slate-200 flex items-center justify-center cursor-pointer hover:border-teal-500 transition-colors">
                                                                    <div className="h-2 w-2 rounded-sm bg-teal-500 opacity-0 bg-teal-500/0"></div>
                                                                </div>
                                                                <span className="text-[10px] font-bold text-slate-500">{right}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase">Utilisateurs Actifs</CardTitle>
                                            <CardDescription className="text-sm font-medium text-slate-500 mt-2">Gérez les comptes individuels et leurs rôles</CardDescription>
                                        </div>
                                        <Button className="bg-teal-600 hover:bg-teal-700 text-white font-black uppercase tracking-widest text-xs h-12 rounded-xl px-6">
                                            <Plus className="mr-2 h-4 w-4" /> Nouvel Utilisateur
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10">
                                    <div className="space-y-4">
                                        {isLoadingUsers ? (
                                            <div className="flex flex-col items-center py-10 opacity-50">
                                                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Synchronisation des accès...</p>
                                            </div>
                                        ) : users.length > 0 ? (
                                            users.map((member, i) => (
                                                <div key={member.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-black text-sm group-hover:bg-teal-500 group-hover:text-white transition-all">
                                                            {member.name ? member.name.split(' ').map((n: string) => n[0]).join('') : 'U'}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-sm font-black text-slate-900">{member.name || 'Utilisateur sans nom'}</p>
                                                                <span className={cn(
                                                                    "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter",
                                                                    member.role === 'OWNER' ? "bg-red-100 text-red-700" :
                                                                        member.role === 'DENTIST' ? "bg-blue-100 text-blue-700" :
                                                                            member.role === 'SECRETARY' ? "bg-purple-100 text-purple-700" : "bg-teal-100 text-teal-700"
                                                                )}>{member.role}</span>
                                                            </div>
                                                            <p className="text-xs text-slate-500">{member.email} • <span className="text-slate-400 italic">Créé le: {new Date(member.createdAt).toLocaleDateString()}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all">
                                                            <Key className="h-4 w-4" title="Réinitialiser MDP" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aucun utilisateur trouvé dans la base</p>
                                                <Button variant="link" className="mt-2 text-teal-600 font-black text-[10px] uppercase">Initialiser l'équipe par défaut</Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                    }

                    {activeSection === 'BILLING' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-gradient-to-br from-purple-600 to-purple-700 text-white p-10">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-black tracking-tighter uppercase">Licence Elite Pro</h3>
                                        <p className="text-purple-100 text-sm font-medium mt-2">Accès illimité à toutes les fonctionnalités premium</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="p-6 bg-white/10 rounded-2xl border border-white/20">
                                            <p className="text-xs font-black uppercase tracking-widest text-purple-200">Patients Actifs</p>
                                            <p className="text-3xl font-black mt-2">1,247</p>
                                        </div>
                                        <div className="p-6 bg-white/10 rounded-2xl border border-white/20">
                                            <p className="text-xs font-black uppercase tracking-widest text-purple-200">Messages Envoyés</p>
                                            <p className="text-3xl font-black mt-2">8,942</p>
                                        </div>
                                        <div className="p-6 bg-white/10 rounded-2xl border border-white/20">
                                            <p className="text-xs font-black uppercase tracking-widest text-purple-200">Prochain Renouvellement</p>
                                            <p className="text-xl font-black mt-2">24 Fév 2026</p>
                                        </div>
                                    </div>
                                    <Button className="bg-white text-purple-600 font-black uppercase tracking-widest text-xs h-12 rounded-xl px-8 hover:bg-purple-50">
                                        Gérer l'Abonnement
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {activeSection === 'INTEGRATIONS' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Card className="rounded-[3rem] border-none shadow-luxury bg-white overflow-hidden">
                                <CardHeader className="p-10 border-b border-slate-50">
                                    <CardTitle className="text-xl font-black tracking-tight text-slate-900 uppercase">API & Webhooks</CardTitle>
                                    <CardDescription className="text-sm font-medium text-slate-500">Intégrez avec vos outils externes</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 space-y-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-sm font-black text-slate-900">Clé API</p>
                                            <Button variant="ghost" size="sm" className="text-xs font-black uppercase">
                                                <Key className="mr-2 h-3 w-3" /> Régénérer
                                            </Button>
                                        </div>
                                        <code className="block p-4 bg-slate-900 text-green-400 rounded-xl text-xs font-mono">
                                            api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                        </code>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { name: 'Google Calendar', status: 'Connecté', icon: Calendar },
                                            { name: 'Stripe Payments', status: 'Connecté', icon: CreditCard },
                                            { name: 'Twilio SMS', status: smsConfig.enabled ? 'Connecté' : 'Non configuré', icon: Phone },
                                            { name: 'WhatsApp Business', status: whatsappConfig.enabled ? 'Connecté' : 'Non configuré', icon: MessageSquare },
                                        ].map((integration, i) => (
                                            <div key={i} className="p-6 bg-slate-50 rounded-2xl flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <integration.icon className="h-5 w-5 text-slate-400" />
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">{integration.name}</p>
                                                        <p className={cn(
                                                            "text-xs font-bold",
                                                            integration.status === 'Connecté' ? "text-green-600" : "text-slate-400"
                                                        )}>{integration.status}</p>
                                                    </div>
                                                </div>
                                                {integration.status === 'Connecté' && (
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
