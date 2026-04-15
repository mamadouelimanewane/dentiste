export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { updateStockItemSchema, formatZodErrors } from "@/lib/validations"

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({ error: "Item ID is required" }, { status: 400 })
        }

        const body = await req.json()

        const parsed = updateStockItemSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data
        const updateData: any = { ...data }

        if (data.expiryDate) updateData.expiryDate = new Date(data.expiryDate)

        const updatedItem = await prisma.stockItem.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json(updatedItem)
    } catch (error: any) {
        console.error("Failed to update stock item:", error)
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Article non trouvé" }, { status: 404 })
        }
        return NextResponse.json({ error: "Failed to update stock item" }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({ error: "Item ID is required" }, { status: 400 })
        }

        await prisma.stockItem.delete({
            where: { id }
        })

        return NextResponse.json({ success: true, message: "Article supprimé" })
    } catch (error: any) {
        console.error("Failed to delete stock item:", error)
        return NextResponse.json({ error: "Failed to delete stock item" }, { status: 500 })
    }
}
