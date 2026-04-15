import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { updatePatientSchema, formatZodErrors } from "@/lib/validations"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const patient = await prisma.patient.findUnique({
            where: { id: params.id },
            include: {
                appointments: { orderBy: { start: 'desc' } },
                treatments: true,
                invoices: true,
                prescriptions: true,
                documents: true
            }
        })

        if (!patient) return new NextResponse("Not Found", { status: 404 })
        return NextResponse.json(patient)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()

        // Validation Zod pour le PATCH
        const parsed = updatePatientSchema.safeParse({ ...body, id: params.id })
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const { id, ...updateData } = parsed.data

        const updatedPatient = await prisma.patient.update({
            where: { id: params.id },
            data: updateData
        })

        return NextResponse.json(updatedPatient)
    } catch (error: any) {
        if (error.code === 'P2025') {
            return new NextResponse("Patient non trouvé", { status: 404 })
        }
        return new NextResponse("Erreur lors de la mise à jour", { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // En vrai mode production de santé, on fait du Soft Delete (changement de statut).
        // Ici, on va faire une anonymisation ou une supression hard si aucune donnée bloquante.
        await prisma.patient.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ success: true, message: "Patient supprimé" })
    } catch (error: any) {
        if (error.code === 'P2003') { // Foreign key constraint
            return new NextResponse(
                "Impossible de supprimer le patient car des rendez-vous ou factures y sont attachés.",
                { status: 400 }
            )
        }
        return new NextResponse("Erreur lors de la suppression", { status: 500 })
    }
}
