export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendCommunicationSchema, formatZodErrors } from "@/lib/validations"

// Cette route gère l'envoi de messages WhatsApp, SMS et Email
export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validation Zod
        const parsed = sendCommunicationSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const { type, recipients, content, category } = parsed.data

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
                costPerMessage: results.length > 0 ? totalCost / results.length : 0
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

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

// Fonction pour simuler l'envoi de message
// En production, intégrer avec Twilio, WhatsApp Business API, SendGrid, etc.
async function sendMessage(type: string, patient: any, content: string) {
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

        try {
            // Intégration Resend réelle
            if (process.env.RESEND_API_KEY) {
                const data = await resend.emails.send({
                    from: 'DentoPrestige <noreply@dentoprestige.sn>',
                    to: patient.email,
                    subject: 'Message de votre cabinet DentoPrestige',
                    html: `
                        <div style="font-family: sans-serif; max-w-xl mx-auto p-6 bg-slate-50 rounded-2xl">
                            <h2 style="color: #0f172a; margin-bottom: 20px;">DentoPrestige Elite</h2>
                            <p style="color: #334155; line-height: 1.6; font-size: 16px;">
                                ${content.replace(/\n/g, '<br/>')}
                            </p>
                            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;"/>
                            <p style="color: #94a3b8; font-size: 12px; text-align: center;">
                                Cabinet DentoPrestige - Dakar Plateau
                            </p>
                        </div>
                    `,
                });

                if (data.error) {
                    console.error("Erreur Resend:", data.error);
                    return { success: false, error: data.error.message }
                }

                return { success: true }
            } else {
                console.log("[MOCK EMAIL] Envoi simulé à", patient.email, "=>", content)
                await new Promise(resolve => setTimeout(resolve, 500))
                return { success: true }
            }
        } catch (error: any) {
            console.error("Crash lors de l'envoi Email:", error)
            return { success: false, error: error.message }
        }
    }

    // Simulation d'envoi pour SMS / WhatsApp pour le moment
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: true }
}

// Fonction pour calculer le coût d'un message
function calculateCost(type: string, content: string): number {
    if (type === 'WHATSAPP') {
        return 15
    } else if (type === 'SMS') {
        const smsCount = Math.ceil(content.length / 160)
        return smsCount * 25
    } else if (type === 'EMAIL') {
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
