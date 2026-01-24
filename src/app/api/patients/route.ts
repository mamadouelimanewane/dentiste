export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const patients = await prisma.patient.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                dob: true,
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
        const { firstName, lastName, email, phone } = body

        if (!firstName || !lastName) {
            return NextResponse.json({ error: "First name and last name are required" }, { status: 400 })
        }

        const patient = await prisma.patient.create({
            data: {
                firstName,
                lastName,
                email: email || null, // Ensure empty string doesn't trigger unique constraint
                phone: phone || null,
            }
        })

        return NextResponse.json(patient)
    } catch (error: any) {
        console.error("Failed to create patient:", error)
        // Return a more descriptive error for debugging
        const message = error.code === 'P2002'
            ? "Cet email est déjà utilisé par un autre patient."
            : error.message || "Erreur inconnue lors de la création du patient."

        return NextResponse.json({
            error: "Failed to create patient",
            message: message
        }, { status: 500 })
    }
}
