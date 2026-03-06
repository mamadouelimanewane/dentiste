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
        const appointment = await prisma.appointment.create({
            data: {
                patientId: body.patientId,
                title: body.title,
                start: new Date(body.start),
                end: new Date(body.end),
                type: body.type,
                status: body.status || 'CONFIRMED',
                notes: body.notes,
                isSurgery: !!body.isSurgery
            }
        })
        return NextResponse.json(appointment)
    } catch (error) {
        console.error("Failed to create appointment:", error)
        return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
    }
}
