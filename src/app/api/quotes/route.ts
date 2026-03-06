export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const quotes = await prisma.quote.findMany({
            include: {
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
        return NextResponse.json(quotes)
    } catch (error) {
        console.error("Failed to fetch quotes:", error)
        return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const quote = await prisma.quote.create({
            data: {
                patientId: body.patientId,
                title: body.title,
                total: parseFloat(body.total),
                status: body.status || 'DRAFT'
            }
        })
        return NextResponse.json(quote)
    } catch (error) {
        console.error("Failed to create quote:", error)
        return NextResponse.json({ error: "Failed to create quote" }, { status: 500 })
    }
}
