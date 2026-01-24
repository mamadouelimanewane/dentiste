export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Cette route gère l'envoi de messages WhatsApp, SMS et Email
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { type, recipients, content, category, scheduledAt } = body

        if (!type || !recipients || !content) {
            return NextResponse.json(
                { error: "Type, recipients et content sont requis" },
                { status: 400 }
            )
        }

        // Validation du type de message
        const validTypes = ['SMS', 'WHATSAPP', 'EMAIL']
        if (!validTypes.includes(type)) {
            return NextResponse.json(
                { error: "Type de message invalide" },
                { status: 400 }
            )
        }

        const results = []

        // Pour chaque destinataire, créer un log de communication
        for (const patientId of recipients) {
            try {
                // Vérifier que le patient existe
                const patient = await prisma.patient.findUnique({
                    where: { id: patientId },
                    select: { id: true, firstName: true, lastName: true, phone: true, email: true }
                })

                if (!patient) {
                    results.push({
                        patientId,
                        status: 'FAILED',
                        error: 'Patient non trouvé'
                    })
                    continue
                }

                // Personnaliser le contenu du message
                let personalizedContent = content
                    .replace(/{patient}/g, `${patient.firstName} ${patient.lastName}`)
                    .replace(/{prenom}/g, patient.firstName)

                // Simuler l'envoi (en production, intégrer avec Twilio, WhatsApp Business API, etc.)
                const messageStatus = await sendMessage(type, patient, personalizedContent)

                // Créer un log dans la base de données
                const log = await prisma.communicationLog.create({
                    data: {
                        patientId: patient.id,
                        type,
                        category: category || 'REMINDER',
                        content: personalizedContent,
                        status: messageStatus.success ? 'SENT' : 'FAILED',
                    }
                })

                results.push({
                    patientId: patient.id,
                    patientName: `${patient.firstName} ${patient.lastName}`,
                    status: messageStatus.success ? 'SENT' : 'FAILED',
                    logId: log.id,
                    cost: calculateCost(type, personalizedContent)
                })

            } catch (error) {
                console.error(`Erreur envoi message pour patient ${patientId}:`, error)
                results.push({
                    patientId,
                    status: 'FAILED',
                    error: 'Erreur lors de l\'envoi'
                })
            }
        }

        // Calculer les statistiques
        const successCount = results.filter(r => r.status === 'SENT').length
        const failedCount = results.filter(r => r.status === 'FAILED').length
        const totalCost = results.reduce((sum, r) => sum + (r.cost || 0), 0)

        return NextResponse.json({
            success: true,
            summary: {
                total: results.length,
                sent: successCount,
                failed: failedCount,
                totalCost,
                costPerMessage: totalCost / results.length
            },
            results
        })

    } catch (error) {
        console.error("Erreur lors de l'envoi des messages:", error)
        return NextResponse.json(
            { error: "Erreur lors de l'envoi des messages" },
            { status: 500 }
        )
    }
}

// Fonction pour simuler l'envoi de message
// En production, intégrer avec Twilio, WhatsApp Business API, SendGrid, etc.
async function sendMessage(type: string, patient: any, content: string) {
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 100))

    // Vérifier que le patient a les coordonnées nécessaires
    if (type === 'SMS' || type === 'WHATSAPP') {
        if (!patient.phone) {
            return { success: false, error: 'Numéro de téléphone manquant' }
        }
    }

    if (type === 'EMAIL') {
        if (!patient.email) {
            return { success: false, error: 'Email manquant' }
        }
    }

    // En production, appeler l'API appropriée :
    // - Twilio pour SMS
    // - WhatsApp Business API pour WhatsApp
    // - SendGrid/Resend pour Email

    /*
    Exemple avec Twilio (SMS):
    const twilio = require('twilio')(accountSid, authToken)
    await twilio.messages.create({
        body: content,
        from: '+221XXXXXXXXX',
        to: patient.phone
    })

    Exemple avec WhatsApp Business API:
    await fetch('https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: patient.phone,
            type: 'text',
            text: { body: content }
        })
    })
    */

    return { success: true }
}

// Fonction pour calculer le coût d'un message
function calculateCost(type: string, content: string): number {
    if (type === 'WHATSAPP') {
        // WhatsApp: ~15 FCFA par message
        return 15
    } else if (type === 'SMS') {
        // SMS: ~25 FCFA par SMS de 160 caractères
        const smsCount = Math.ceil(content.length / 160)
        return smsCount * 25
    } else if (type === 'EMAIL') {
        // Email: gratuit ou très faible coût
        return 0
    }
    return 0
}

// GET pour récupérer les statistiques d'envoi
export async function GET() {
    try {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const logs = await prisma.communicationLog.findMany({
            where: {
                sentAt: {
                    gte: thirtyDaysAgo
                }
            },
            select: {
                type: true,
                status: true,
                sentAt: true
            }
        })

        const stats = {
            totalSent: logs.length,
            byType: {
                WHATSAPP: logs.filter(l => l.type === 'WHATSAPP').length,
                SMS: logs.filter(l => l.type === 'SMS').length,
                EMAIL: logs.filter(l => l.type === 'EMAIL').length,
            },
            byStatus: {
                SENT: logs.filter(l => l.status === 'SENT').length,
                DELIVERED: logs.filter(l => l.status === 'DELIVERED').length,
                OPENED: logs.filter(l => l.status === 'OPENED').length,
                FAILED: logs.filter(l => l.status === 'FAILED').length,
            },
            deliveryRate: logs.length > 0
                ? `${((logs.filter(l => l.status === 'DELIVERED' || l.status === 'OPENED').length / logs.length) * 100).toFixed(1)}%`
                : '0%'
        }

        return NextResponse.json(stats)

    } catch (error) {
        console.error("Erreur lors de la récupération des stats:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des statistiques" },
            { status: 500 }
        )
    }
}
