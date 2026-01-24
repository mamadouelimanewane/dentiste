export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const body = await req.json()
        const { quantity, name, category, minQuantity, unit, lotNumber, expiryDate, isSterile } = body

        if (!id) {
            return NextResponse.json({ error: "Item ID is required" }, { status: 400 })
        }

        const updatedItem = await prisma.stockItem.update({
            where: { id },
            data: {
                name,
                category,
                quantity: quantity !== undefined ? parseInt(quantity) : undefined,
                minQuantity: minQuantity !== undefined ? parseInt(minQuantity) : undefined,
                unit,
                lotNumber,
                expiryDate: expiryDate ? new Date(expiryDate) : undefined,
                isSterile: isSterile !== undefined ? !!isSterile : undefined,
                // Only update lastRestock if quantity increased? Or always on update?
                // Let's just update updatedAt which is handled by Prisma anyway.
            }
        })

        return NextResponse.json(updatedItem)
    } catch (error) {
        console.error("Failed to update stock item:", error)
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

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to delete stock item:", error)
        return NextResponse.json({ error: "Failed to delete stock item" }, { status: 500 })
    }
}
