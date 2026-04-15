export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { updateQuoteSchema, formatZodErrors } from "@/lib/validations"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const quote = await prisma.quote.findUnique({
            where: { id: params.id },
            include: { patient: true }
        })

        if (!quote) return new NextResponse("Not Found", { status: 404 })
        return NextResponse.json(quote)
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
        if (!id) return NextResponse.json({ error: "Quote ID is required" }, { status: 400 })

        const body = await req.json()
        const parsed = updateQuoteSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data
        const updatedQuote = await prisma.quote.update({
            where: { id },
            data
        })

        return NextResponse.json(updatedQuote)
    } catch (error: any) {
        console.error("Failed to update quote:", error)
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Devis non trouvé" }, { status: 404 })
        }
        return NextResponse.json({ error: "Failed to update quote" }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        if (!id) return NextResponse.json({ error: "Quote ID is required" }, { status: 400 })

        await prisma.quote.delete({
            where: { id }
        })

        return NextResponse.json({ success: true, message: "Devis supprimé" })
    } catch (error: any) {
        console.error("Failed to delete quote:", error)
        return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 })
    }
}
