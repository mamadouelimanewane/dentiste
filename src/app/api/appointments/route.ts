export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true,
                        phone: true
                    }
                }
            },
            orderBy: {
                start: 'asc'
            }
        })
        return NextResponse.json(appointments)
    } catch (error) {
        console.error("Failed to fetch appointments:", error)
        return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // 1. Création du rendez-vous
        const appointment = (await prisma.appointment.create({
            data: {
                patientId: body.patientId,
                title: body.title,
                start: new Date(body.start),
                end: new Date(body.end),
                type: body.type,
                status: body.status || 'CONFIRMED',
                notes: body.notes,
                isSurgery: !!body.isSurgery,
                siteId: body.siteId || 'CABINET_DAKAR'
            },
            include: {
                patient: true
            }
        })) as any

        // 2. Génération automatique du rappel (Simulation Elite Connect)
        const patientName = `${appointment.patient.firstName} ${appointment.patient.lastName}`
        const dateStr = new Date(body.start).toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        })

        const smsContent = `Bonjour ${appointment.patient.firstName}, votre rendez-vous chez DentoPrestige pour "${body.title}" est confirmé le ${dateStr}. Merci de prévenir en cas d'empêchement.`

        await prisma.communicationLog.create({
            data: {
                patientId: body.patientId,
                type: 'WHATSAPP',
                category: 'REMINDER',
                content: smsContent,
                status: 'DELIVERED'
            }
        })

        console.log(`[ELITE CONNECT] WhatsApp envoyé à ${appointment.patient.phone}: ${smsContent}`)

        return NextResponse.json(appointment)
    } catch (error) {
        console.error("Failed to create appointment & reminder:", error)
        return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
    }
}
