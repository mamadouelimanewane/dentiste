export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const labWorks = await prisma.labWork.findMany({
            include: {
                // Add relation if exists, but LabWork in schema doesn't have a direct relation to Patient in the model definition currently
            },
            orderBy: {
                sentDate: 'desc'
            }
        })

        // Since LabWork doesn't have a direct relation in schema (only patientId), we might need to fetch patient names manually or adjust schema
        // For now, let's fetch patients to join names if necessary, or just return as is

        const patientIds = Array.from(new Set(labWorks.map(lw => lw.patientId)))
        const patients = await prisma.patient.findMany({
            where: { id: { in: patientIds } },
            select: { id: true, firstName: true, lastName: true }
        })

        const enhancedLabWorks = labWorks.map(lw => {
            const patient = patients.find(p => p.id === lw.patientId)
            return {
                ...lw,
                patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Inconnu'
            }
        })

        return NextResponse.json(enhancedLabWorks)
    } catch (error) {
        console.error("Failed to fetch lab works:", error)
        return NextResponse.json({ error: "Failed to fetch lab works" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const work = await prisma.labWork.create({
            data: {
                patientId: body.patientId,
                labName: body.labName,
                type: body.type,
                material: body.material,
                shade: body.shade,
                status: body.status || 'SENT',
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                notes: body.notes
            }
        })
        return NextResponse.json(work)
    } catch (error) {
        console.error("Failed to create lab work:", error)
        return NextResponse.json({ error: "Failed to create lab work" }, { status: 500 })
    }
}
