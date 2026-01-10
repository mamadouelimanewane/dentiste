import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { patientId, items, notes } = body

        if (!patientId || !items || items.length === 0) {
            return NextResponse.json({ error: "Patient ID and at least one item are required" }, { status: 400 })
        }

        const prescription = await prisma.prescription.create({
            data: {
                patientId,
                notes,
                items: {
                    create: items.map((item: any) => ({
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
