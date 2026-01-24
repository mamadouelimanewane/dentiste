export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Logic for 3rd party booking sites (e.g. Doctolib, Mikano)
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const apiKey = req.headers.get('x-api-key')

    // Mock API Key Check
    if (apiKey !== 'DENTISTE_PRO_2026') {
        return NextResponse.json({ error: "Invalid API Key" }, { status: 401 })
    }

    const start = searchParams.get('start') || new Date().toISOString()
    const end = searchParams.get('end') || new Date(Date.now() + 7 * 24 * 3600000).toISOString()

    try {
        const slots = await prisma.appointment.findMany({
            where: {
                start: { gte: new Date(start), lte: new Date(end) }
            },
            select: { start: true, end: true }
        })

        // Return occupied slots so 3rd party can show availability
        return NextResponse.json({ occupied: slots })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch slots" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const apiKey = req.headers.get('x-api-key')
    if (apiKey !== 'DENTISTE_PRO_2026') {
        return NextResponse.json({ error: "Invalid API Key" }, { status: 401 })
    }

    try {
        const body = await req.json()
        const { patientName, email, phone, start, end, title } = body

        // Find or create external patient
        let patient = await prisma.patient.findFirst({ where: { email } })
        if (!patient) {
            patient = await prisma.patient.create({
                data: {
                    firstName: patientName.split(' ')[0],
                    lastName: patientName.split(' ')[1] || '',
                    email,
                    phone,
                    status: 'PROSPECT'
                }
            })
        }

        const appointment = await (prisma as any).appointment.create({
            data: {
                patientId: patient.id,
                title: `[ONLINE] ${title || 'Consultation'}`,
                type: 'CONSULTATION',
                start: new Date(start),
                end: new Date(end),
                status: 'PENDING',
                notes: 'Réservé via API tiers'
            }
        })

        return NextResponse.json(appointment)
    } catch (error) {
        return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 })
    }
}
