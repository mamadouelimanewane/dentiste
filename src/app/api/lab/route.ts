export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createLabWorkSchema, formatZodErrors } from "@/lib/validations"

export async function GET() {
    try {
        const labWorks = await prisma.labWork.findMany({
            orderBy: {
                sentDate: 'desc'
            }
        })

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

        // Validation Zod
        const parsed = createLabWorkSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data

        const work = await prisma.labWork.create({
            data: {
                patientId: data.patientId,
                labName: data.labName,
                type: data.type,
                material: data.material,
                shade: data.shade,
                status: data.status || 'SENT',
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
                notes: data.notes
            }
        })
        return NextResponse.json(work)
    } catch (error) {
        console.error("Failed to create lab work:", error)
        return NextResponse.json({ error: "Failed to create lab work" }, { status: 500 })
    }
}
