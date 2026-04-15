export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createSterilizationSchema, formatZodErrors } from "@/lib/validations"

export async function GET() {
    try {
        const logs = await prisma.sterilizationLog.findMany({
            orderBy: {
                date: 'desc'
            },
            take: 10
        })
        return NextResponse.json(logs)
    } catch (error) {
        console.error("Failed to fetch sterilization logs:", error)
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validation Zod
        const parsed = createSterilizationSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data

        const log = await prisma.sterilizationLog.create({
            data: {
                operator: data.operator,
                machineId: data.machineId,
                cycleNumber: data.cycleNumber,
                status: data.status || 'SUCCESS',
                notes: data.notes,
                instruments: data.instruments
            }
        })
        return NextResponse.json(log)
    } catch (error) {
        console.error("Failed to create sterilization log:", error)
        return NextResponse.json({ error: "Failed to create log" }, { status: 500 })
    }
}
