export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createPatientSchema, formatZodErrors } from "@/lib/validations"

export async function GET() {
    try {
        const patients = await prisma.patient.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                updatedAt: true,
                dob: true,
                workflowStatus: true,
            },
            orderBy: {
                lastName: 'asc'
            }
        })
        return NextResponse.json(patients)
    } catch (error) {
        console.error("Failed to fetch patients:", error)
        return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validation Zod
        const parsed = createPatientSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const { firstName, lastName, email, phone, workflowStatus } = parsed.data

        const patient = await prisma.patient.create({
            data: {
                firstName,
                lastName,
                email: email || null,
                phone: phone || null,
                workflowStatus: workflowStatus || null
            }
        })

        return NextResponse.json(patient)
    } catch (error: any) {
        console.error("Failed to create patient:", error)
        const message = error.code === 'P2002'
            ? "Cet email est déjà utilisé par un autre patient."
            : error.message || "Erreur inconnue lors de la création du patient."

        return NextResponse.json({
            error: "Failed to create patient",
            message: message
        }, { status: 500 })
    }
}
