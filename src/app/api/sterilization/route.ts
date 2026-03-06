export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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
        const log = await prisma.sterilizationLog.create({
            data: {
                operator: body.operator,
                machineId: body.machineId,
                cycleNumber: parseInt(body.cycleNumber),
                status: body.status || 'SUCCESS',
                notes: body.notes,
                instruments: body.instruments
            }
        })
        return NextResponse.json(log)
    } catch (error) {
        console.error("Failed to create serialization log:", error)
        return NextResponse.json({ error: "Failed to create log" }, { status: 500 })
    }
}
