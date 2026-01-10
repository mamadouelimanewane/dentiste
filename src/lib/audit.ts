import { prisma } from './prisma'

export async function logAction(
    action: string,
    details?: string,
    userId?: string,
    patientId?: string
) {
    try {
        await prisma.auditLog.create({
            data: {
                action,
                details,
                userId,
                patientId,
            }
        })
    } catch (error) {
        console.error("Audit Log Error:", error)
    }
}
