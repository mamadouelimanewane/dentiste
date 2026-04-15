import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const logs = await prisma.communicationLog.findMany({
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                sentAt: 'desc'
            },
            take: 20
        })

        const formattedLogs = logs.map(log => ({
            id: log.id,
            patient: `${log.patient.firstName} ${log.patient.lastName}`,
            type: log.type,
            category: log.category,
            content: log.content,
            status: log.status,
            time: new Date(log.sentAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        }))

        // Stats
        const totalSent = await prisma.communicationLog.count()
        const delivered = await prisma.communicationLog.count({ where: { status: 'DELIVERED' } })
        const deliveryRate = totalSent > 0 ? (delivered / totalSent) * 100 : 0

        return NextResponse.json({
            logs: formattedLogs,
            stats: {
                totalSent,
                deliveryRate: deliveryRate.toFixed(1) + "%"
            }
        })
    } catch (error) {
        console.error("Failed to fetch communication logs:", error)
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
    }
}
