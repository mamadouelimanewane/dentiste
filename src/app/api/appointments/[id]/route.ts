import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"
import { formatZodErrors } from "@/lib/validations"

const updateAppointmentSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    start: z.string().min(1).optional(),
    end: z.string().min(1).optional(),
    type: z.string().min(1).max(50).optional(),
    status: z.string().max(30).optional(),
    notes: z.string().max(2000).optional().nullable(),
})

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const appointment = await prisma.appointment.findUnique({
            where: { id: params.id },
            include: { patient: true }
        })

        if (!appointment) return new NextResponse("Not Found", { status: 404 })
        return NextResponse.json(appointment)
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

        const parsed = updateAppointmentSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data
        const updateData: any = { ...data }

        if (data.start) updateData.start = new Date(data.start)
        if (data.end) updateData.end = new Date(data.end)

        const appointment = await prisma.appointment.update({
            where: { id: params.id },
            data: updateData
        })

        return NextResponse.json(appointment)
    } catch (error: any) {
        if (error.code === 'P2025') {
            return new NextResponse("Rendez-vous non trouvé", { status: 404 })
        }
        return new NextResponse("Erreur lors de la mise à jour", { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.appointment.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ success: true, message: "Rendez-vous supprimé" })
    } catch (error: any) {
        return new NextResponse("Erreur lors de la suppression", { status: 500 })
    }
}
