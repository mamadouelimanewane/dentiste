import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const patients = await prisma.patient.findMany({
            where: {
                workflowStatus: {
                    not: null
                }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                workflowStatus: true,
                updatedAt: true
            }
        })

        return NextResponse.json(patients)
    } catch (error) {
        console.error("Failed to fetch workflow patients:", error)
        return NextResponse.json({ error: "Failed to fetch workflow" }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const { id, workflowStatus } = body

        const patient = await prisma.patient.update({
            where: { id },
            data: { workflowStatus }
        })

        return NextResponse.json(patient)
    } catch (error) {
        console.error("Failed to update patient workflow:", error)
        return NextResponse.json({ error: "Failed to update workflow" }, { status: 500 })
    }
}
