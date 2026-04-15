import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const integrations = await prisma.integration.findMany()
        return NextResponse.json(integrations)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { provider, type, status, config } = body

        const integration = await prisma.integration.upsert({
            where: { id: body.id || 'new' },
            update: { provider, type, status, config: JSON.stringify(config) },
            create: { provider, type, status, config: JSON.stringify(config) }
        })

        return NextResponse.json(integration)
    } catch (error) {
        console.error("Failed to save integration:", error)
        return NextResponse.json({ error: "Failed to save integration" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json()
        await prisma.integration.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete integration" }, { status: 500 })
    }
}
