export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createQuoteSchema, formatZodErrors } from "@/lib/validations"

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

        // Validation Zod
        const parsed = createQuoteSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data

        const quote = await prisma.quote.create({
            data: {
                patientId: data.patientId,
                title: data.title,
                total: data.total,
                status: data.status || 'DRAFT'
            }
        })
        return NextResponse.json(quote)
    } catch (error) {
        console.error("Failed to create quote:", error)
        return NextResponse.json({ error: "Failed to create quote" }, { status: 500 })
    }
}
