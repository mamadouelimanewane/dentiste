import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { patientId, action, details, severity } = body

        // In a real app, get userId from session
        const dentist = await prisma.user.findFirst({ where: { role: 'DENTIST' } })

        const log = await prisma.auditLog.create({
            data: {
                userId: dentist?.id,
                patientId,
                action,
                details,
                severity: severity || 'INFO',
                ip: req.headers.get('x-forwarded-for') || '127.0.0.1',
                userAgent: req.headers.get('user-agent')
            }
        })

        return NextResponse.json(log)
    } catch (error) {
        console.error("Failed to create audit log:", error)
        return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 })
    }
}
