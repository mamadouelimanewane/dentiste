export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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
        const { name, category, quantity, minQuantity, unit, lotNumber, expiryDate, isSterile } = body

        if (!name || !category || quantity === undefined || !unit) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const newItem = await prisma.stockItem.create({
            data: {
                name,
                category,
                quantity: parseInt(quantity),
                minQuantity: parseInt(minQuantity || 5),
                unit,
                lotNumber,
                expiryDate: expiryDate ? new Date(expiryDate) : null,
                isSterile: !!isSterile,
                lastRestock: new Date()
            }
        })

        return NextResponse.json(newItem)
    } catch (error) {
        console.error("Failed to create stock item:", error)
        return NextResponse.json({ error: "Failed to create stock item" }, { status: 500 })
    }
}
