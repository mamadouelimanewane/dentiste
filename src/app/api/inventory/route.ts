export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createStockItemSchema, formatZodErrors } from "@/lib/validations"

export async function GET() {
    try {
        const items = await prisma.stockItem.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        // Add computed status for the frontend
        const enhancedItems = items.map(item => {
            let status = 'OK'
            if (item.quantity === 0) status = 'OUT_OF_STOCK'
            else if (item.quantity <= item.minQuantity) status = 'LOW'

            return {
                ...item,
                status
            }
        })

        return NextResponse.json({ items: enhancedItems })
    } catch (error) {
        console.error("Failed to fetch inventory:", error)
        return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validation Zod
        const parsed = createStockItemSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data

        const newItem = await prisma.stockItem.create({
            data: {
                name: data.name,
                category: data.category,
                quantity: data.quantity,
                minQuantity: data.minQuantity ?? 5,
                unit: data.unit,
                lotNumber: data.lotNumber,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
                isSterile: data.isSterile ?? false,
                lastRestock: new Date()
            }
        })

        return NextResponse.json(newItem)
    } catch (error) {
        console.error("Failed to create stock item:", error)
        return NextResponse.json({ error: "Failed to create stock item" }, { status: 500 })
    }
}
