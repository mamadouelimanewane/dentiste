import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        // 1. Audit Logs (recent access to patient data)
        const auditLogs = await prisma.auditLog.findMany({
            include: {
                user: { select: { name: true } },
                patient: { select: { firstName: true, lastName: true } }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        })

        // 2. Consent Stats
        const totalConsents = await prisma.consent.count()
        const signedConsents = await prisma.consent.count({ where: { status: 'SIGNED' } })

        // 3. Archiving Stats
        const totalDocs = await prisma.document.count()
        const archivedDocs = await prisma.document.count({ where: { isArchived: true } })

        // 4. RGPD Deletion queue (retention limit reached)
        const expiredDocsCount = await prisma.document.count({
            where: {
                retentionLimit: { lte: new Date() },
                isArchived: false
            }
        })

        // 5. Legal Reminders (Urgent tasks for equipment/compliance)
        const legalReminders = await (prisma as any).task.findMany({
            where: {
                category: 'ADMIN',
                priority: 'URGENT',
                status: 'TODO'
            },
            take: 5
        })

        return NextResponse.json({
            auditLogs,
            legalReminders,
            stats: {
                totalConsents,
                signedConsents,
                consentRate: totalConsents > 0 ? (signedConsents / totalConsents) * 100 : 100,
                totalDocs,
                archivedDocs,
                archiveRate: totalDocs > 0 ? (archivedDocs / totalDocs) * 100 : 0,
                expiredDocsCount
            }
        })
    } catch (error) {
        console.error("Failed to fetch compliance data:", error)
        return NextResponse.json({ error: "Failed to fetch compliance data" }, { status: 500 })
    }
}
