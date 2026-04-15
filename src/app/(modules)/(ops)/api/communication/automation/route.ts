export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { addDays, startOfDay, endOfDay } from "date-fns"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

// API pour gérer les automatisations de communication
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { action } = body

        if (action === 'send_appointment_reminders') {
            return await sendAppointmentReminders()
        } else if (action === 'send_post_op_instructions') {
            return await sendPostOpInstructions()
        } else if (action === 'send_annual_recall') {
            return await sendAnnualRecall()
        } else if (action === 'send_pending_invoices') {
            return await sendPendingInvoices()
        } else if (action === 'send_satisfaction_surveys') {
            return await sendSatisfactionSurveys()
        }

        return NextResponse.json(
            { error: "Action non reconnue" },
            { status: 400 }
        )

    } catch (error) {
        console.error("Erreur automation:", error)
        return NextResponse.json(
            { error: "Erreur lors de l'exécution de l'automation" },
            { status: 500 }
        )
    }
}

// Envoyer des rappels de RDV pour J-2 et J-1
async function sendAppointmentReminders() {
    const results = []

    // Rappels J-2 (dans 2 jours)
    const twoDaysFromNow = addDays(new Date(), 2)
    const appointmentsIn2Days = await prisma.appointment.findMany({
        where: {
            start: {
                gte: startOfDay(twoDaysFromNow),
                lte: endOfDay(twoDaysFromNow)
            },
            status: {
                in: ['PENDING', 'CONFIRMED']
            }
        },
        include: {
            patient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true
                }
            }
        }
    })

    for (const appointment of appointmentsIn2Days) {
        if (!appointment.patient.phone) continue

        const message = `Bonjour ${appointment.patient.firstName}, nous vous rappelons votre rendez-vous le ${format(appointment.start, 'EEEE d MMMM', { locale: fr })} à ${format(appointment.start, 'HH:mm')} avec Dr. Aere Lao. Confirmez en répondant OUI. Clinique Dentaire Aere Lao ☎️ +221 XX XXX XX XX`

        try {
            await prisma.communicationLog.create({
                data: {
                    patientId: appointment.patient.id,
                    type: 'WHATSAPP',
                    category: 'REMINDER',
                    content: message,
                    status: 'SENT'
                }
            })

            results.push({
                patientId: appointment.patient.id,
                patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                type: 'J-2',
                status: 'SENT'
            })
        } catch (error) {
            console.error(`Erreur envoi rappel J-2 pour ${appointment.patient.id}:`, error)
        }
    }

    // Rappels J-1 (demain)
    const tomorrow = addDays(new Date(), 1)
    const appointmentsTomorrow = await prisma.appointment.findMany({
        where: {
            start: {
                gte: startOfDay(tomorrow),
                lte: endOfDay(tomorrow)
            },
            status: {
                in: ['PENDING', 'CONFIRMED']
            }
        },
        include: {
            patient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true
                }
            }
        }
    })

    for (const appointment of appointmentsTomorrow) {
        if (!appointment.patient.phone) continue

        const message = `Bonjour ${appointment.patient.firstName}, votre rendez-vous est prévu demain à ${format(appointment.start, 'HH:mm')}. N'oubliez pas d'apporter votre carte vitale. À demain ! 🦷 Clinique Dentaire Aere Lao`

        try {
            await prisma.communicationLog.create({
                data: {
                    patientId: appointment.patient.id,
                    type: 'SMS',
                    category: 'REMINDER',
                    content: message,
                    status: 'SENT'
                }
            })

            results.push({
                patientId: appointment.patient.id,
                patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                type: 'J-1',
                status: 'SENT'
            })
        } catch (error) {
            console.error(`Erreur envoi rappel J-1 pour ${appointment.patient.id}:`, error)
        }
    }

    return NextResponse.json({
        success: true,
        action: 'send_appointment_reminders',
        summary: {
            total: results.length,
            j2: results.filter(r => r.type === 'J-2').length,
            j1: results.filter(r => r.type === 'J-1').length
        },
        results
    })
}

// Envoyer des instructions post-opératoires
async function sendPostOpInstructions() {
    const results = []
    const today = new Date()

    // Récupérer les rendez-vous de type chirurgie d'aujourd'hui
    const surgeryAppointments = await prisma.appointment.findMany({
        where: {
            start: {
                gte: startOfDay(today),
                lte: endOfDay(today)
            },
            isSurgery: true,
            status: 'COMPLETED'
        },
        include: {
            patient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true
                }
            }
        }
    })

    for (const appointment of surgeryAppointments) {
        if (!appointment.patient.phone) continue

        const message = `Bonjour ${appointment.patient.firstName}, suite à votre intervention aujourd'hui, voici les consignes importantes :

❄️ Appliquer de la glace 10min/heure pendant 6h
💊 Antalgiques toutes les 6h si douleur
🚫 Pas d'effort physique pendant 48h
🍽️ Alimentation tiède et molle 24h
🦷 Bain de bouche doux après 24h

⚠️ En cas de saignement important, douleur intense ou fièvre, contactez-nous immédiatement au +221 XX XXX XX XX

Bon rétablissement ! 
Dr. Aere Lao - Clinique Dentaire`

        try {
            await prisma.communicationLog.create({
                data: {
                    patientId: appointment.patient.id,
                    type: 'WHATSAPP',
                    category: 'POST_OP',
                    content: message,
                    status: 'SENT'
                }
            })

            results.push({
                patientId: appointment.patient.id,
                patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                status: 'SENT'
            })
        } catch (error) {
            console.error(`Erreur envoi post-op pour ${appointment.patient.id}:`, error)
        }
    }

    return NextResponse.json({
        success: true,
        action: 'send_post_op_instructions',
        summary: {
            total: results.length
        },
        results
    })
}

// Envoyer des rappels de contrôle annuel
async function sendAnnualRecall() {
    const results = []
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    // Récupérer les patients dont le dernier RDV date de plus d'un an
    const patientsNeedingRecall = await prisma.patient.findMany({
        where: {
            appointments: {
                some: {
                    start: {
                        lte: oneYearAgo
                    }
                }
            }
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            appointments: {
                orderBy: {
                    start: 'desc'
                },
                take: 1,
                select: {
                    start: true
                }
            }
        }
    })

    for (const patient of patientsNeedingRecall) {
        if (!patient.phone) continue

        const lastAppointment = patient.appointments[0]
        const monthsSinceLastVisit = Math.floor(
            (new Date().getTime() - lastAppointment.start.getTime()) / (1000 * 60 * 60 * 24 * 30)
        )

        const message = `Bonjour ${patient.firstName}, votre dernier contrôle date de ${monthsSinceLastVisit} mois. 

Il est temps de prendre rendez-vous pour :
✅ Contrôle dentaire complet
✅ Détartrage professionnel
✅ Dépistage précoce

Votre sourire mérite le meilleur ! 😊

Prenez RDV facilement :
📞 +221 XX XXX XX XX
🌐 www.clinique-aere-lao.sn

Dr. Aere Lao - Clinique Dentaire`

        try {
            await prisma.communicationLog.create({
                data: {
                    patientId: patient.id,
                    type: 'WHATSAPP',
                    category: 'RECALL',
                    content: message,
                    status: 'SENT'
                }
            })

            results.push({
                patientId: patient.id,
                patientName: `${patient.firstName} ${patient.lastName}`,
                monthsSinceLastVisit,
                status: 'SENT'
            })
        } catch (error) {
            console.error(`Erreur envoi recall pour ${patient.id}:`, error)
        }
    }

    return NextResponse.json({
        success: true,
        action: 'send_annual_recall',
        summary: {
            total: results.length
        },
        results
    })
}

// Envoyer les factures en attente
async function sendPendingInvoices() {
    const results = []

    // Récupérer les factures non payées
    const pendingInvoices = await prisma.invoice.findMany({
        where: {
            status: {
                in: ['PENDING', 'SENT']
            }
        },
        include: {
            patient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    email: true
                }
            }
        }
    })

    for (const invoice of pendingInvoices) {
        if (!invoice.patient.phone && !invoice.patient.email) continue

        const message = `Bonjour ${invoice.patient.firstName}, votre facture du ${format(invoice.date, 'd MMMM yyyy', { locale: fr })} est disponible.

💰 Montant : ${invoice.amount.toLocaleString()} FCFA

📄 Téléchargez votre facture sur votre portail patient sécurisé :
🔗 www.clinique-aere-lao.sn/portal

Modes de paiement acceptés :
💳 Carte bancaire
📱 Mobile Money (Orange/Wave)
💵 Espèces

Merci de votre confiance !
Dr. Aere Lao - Clinique Dentaire`

        try {
            await prisma.communicationLog.create({
                data: {
                    patientId: invoice.patient.id,
                    type: invoice.patient.email ? 'EMAIL' : 'WHATSAPP',
                    category: 'BILLING',
                    content: message,
                    status: 'SENT'
                }
            })

            // Mettre à jour le statut de la facture
            await prisma.invoice.update({
                where: { id: invoice.id },
                data: { status: 'SENT' }
            })

            results.push({
                patientId: invoice.patient.id,
                patientName: `${invoice.patient.firstName} ${invoice.patient.lastName}`,
                invoiceId: invoice.id,
                amount: invoice.amount,
                status: 'SENT'
            })
        } catch (error) {
            console.error(`Erreur envoi facture pour ${invoice.patient.id}:`, error)
        }
    }

    return NextResponse.json({
        success: true,
        action: 'send_pending_invoices',
        summary: {
            total: results.length,
            totalAmount: results.reduce((sum, r) => sum + r.amount, 0)
        },
        results
    })
}

// Envoyer des enquêtes de satisfaction J+7 après la fin du traitement
async function sendSatisfactionSurveys() {
    const results = []
    const sevenDaysAgo = addDays(new Date(), -7)

    // Récupérer les patients qui ont terminé leur parcours il y a 7 jours
    const patientsFinished7DaysAgo = await prisma.patient.findMany({
        where: {
            workflowStatus: 'COMPLETED',
            updatedAt: {
                gte: startOfDay(sevenDaysAgo),
                lte: endOfDay(sevenDaysAgo)
            }
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true
        }
    })

    for (const patient of patientsFinished7DaysAgo) {
        if (!patient.phone) continue

        const message = `Bonjour ${patient.firstName}, cela fait une semaine que votre traitement est terminé. Votre avis compte beaucoup pour nous ! ⭐ Auriez-vous 30 secondes pour nous donner une note ? Cliquez ici : https://g.page/dentoprestige/review. Merci ! 🦷`

        try {
            await prisma.communicationLog.create({
                data: {
                    patientId: patient.id,
                    type: 'WHATSAPP',
                    category: 'RECALL',
                    content: message,
                    status: 'SENT'
                }
            })

            results.push({
                patientId: patient.id,
                patientName: `${patient.firstName} ${patient.lastName}`,
                status: 'SENT'
            })
        } catch (error) {
            console.error(`Erreur envoi satisfaction pour ${patient.id}:`, error)
        }
    }

    return NextResponse.json({
        success: true,
        action: 'send_satisfaction_surveys',
        summary: {
            total: results.length
        },
        results
    })
}

// GET pour récupérer les statistiques d'automation
export async function GET() {
    try {
        const today = new Date()
        const tomorrow = addDays(today, 1)
        const twoDaysFromNow = addDays(today, 2)

        // Compter les RDV nécessitant des rappels
        const appointmentsJ2 = await prisma.appointment.count({
            where: {
                start: {
                    gte: startOfDay(twoDaysFromNow),
                    lte: endOfDay(twoDaysFromNow)
                },
                status: { in: ['PENDING', 'CONFIRMED'] }
            }
        })

        const appointmentsJ1 = await prisma.appointment.count({
            where: {
                start: {
                    gte: startOfDay(tomorrow),
                    lte: endOfDay(tomorrow)
                },
                status: { in: ['PENDING', 'CONFIRMED'] }
            }
        })

        // Compter les chirurgies d'aujourd'hui
        const surgeriesToday = await prisma.appointment.count({
            where: {
                start: {
                    gte: startOfDay(today),
                    lte: endOfDay(today)
                },
                isSurgery: true
            }
        })

        // Compter les factures en attente
        const pendingInvoices = await prisma.invoice.count({
            where: {
                status: { in: ['PENDING', 'SENT'] }
            }
        })

        return NextResponse.json({
            pending: {
                appointmentRemindersJ2: appointmentsJ2,
                appointmentRemindersJ1: appointmentsJ1,
                postOpInstructions: surgeriesToday,
                pendingInvoices
            }
        })

    } catch (error) {
        console.error("Erreur récupération stats automation:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des statistiques" },
            { status: 500 }
        )
    }
}
