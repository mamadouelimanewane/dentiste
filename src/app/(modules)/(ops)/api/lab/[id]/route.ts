export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { updateLabWorkSchema, formatZodErrors } from "@/lib/validations"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const labwork = await prisma.labWork.findUnique({
            where: { id: params.id }
        })

        if (!labwork) return new NextResponse("Not Found", { status: 404 })
        return NextResponse.json(labwork)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        if (!id) return NextResponse.json({ error: "LabWork ID is required" }, { status: 400 })

        const body = await req.json()
        const parsed = updateLabWorkSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data
        const updateData: any = { ...data }

        if (data.dueDate) updateData.dueDate = new Date(data.dueDate)

        const updatedLabWork = await prisma.labWork.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json(updatedLabWork)
    } catch (error: any) {
        console.error("Failed to update lab work:", error)
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Travail de laboratoire non trouvé" }, { status: 404 })
        }
        return NextResponse.json({ error: "Failed to update lab work" }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        if (!id) return NextResponse.json({ error: "LabWork ID is required" }, { status: 400 })

        await prisma.labWork.delete({
            where: { id }
        })

        return NextResponse.json({ success: true, message: "Déclaration laboratoire supprimée" })
    } catch (error: any) {
        console.error("Failed to delete lab work:", error)
        return NextResponse.json({ error: "Failed to delete lab work" }, { status: 500 })
    }
}
