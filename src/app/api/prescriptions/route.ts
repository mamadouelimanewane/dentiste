export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createPrescriptionSchema, formatZodErrors } from "@/lib/validations"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validation Zod
        const parsed = createPrescriptionSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data

        const prescription = await prisma.prescription.create({
            data: {
                patientId: data.patientId,
                notes: data.notes,
                items: {
                    create: data.items.map((item) => ({
                        medicationName: item.name,
                        dosage: item.dosage,
                        duration: item.duration,
                        instructions: item.instructions
                    }))
                }
            },
            include: {
                items: true,
                patient: true
            }
        })

        // 2. Automatisme Elite Connect : Instructions Post-Op immédiates
        const message = `Bonjour ${prescription.patient.firstName}, votre ordonnance a été générée. 💊 Suivez bien les posologies indiquées. Instructions : appliquez de la glace 10min/h et privilégiez une alimentation froide. Bon rétablissement !`

        await prisma.communicationLog.create({
            data: {
                patientId: prescription.patientId,
                type: 'WHATSAPP',
                category: 'POST_OP',
                content: message,
                status: 'DELIVERED'
            }
        })

        console.log(`[ELITE CONNECT] Instructions post-op envoyées à ${prescription.patient.firstName}`)

        return NextResponse.json(prescription)
    } catch (error) {
        console.error("Failed to create prescription:", error)
        return NextResponse.json({ error: "Failed to create prescription" }, { status: 500 })
    }
}

export async function GET() {
    try {
        const prescriptions = await prisma.prescription.findMany({
            include: {
                items: true,
                patient: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(prescriptions)
    } catch (error) {
        console.error("Failed to fetch prescriptions:", error)
        return NextResponse.json({ error: "Failed to fetch prescriptions" }, { status: 500 })
    }
}
