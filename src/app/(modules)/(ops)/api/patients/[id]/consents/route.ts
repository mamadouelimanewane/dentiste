import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const consents = await prisma.consent.findMany({
            where: { patientId: params.id },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(consents)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch consents" }, { status: 500 })
    }
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const patientId = params.id
        const body = await request.json()
        const { title, content, signatureData, ipAddress, userAgent } = body

        // Generate a checksum for document integrity
        const checksum = crypto.createHash('sha256').update(content + patientId + Date.now()).digest('hex')

        const consent = await (prisma as any).consent.create({
            data: {
                patientId,
                title,
                content,
                signatureUrl: signatureData, // Ideally upload to S3/Storage first
                ipAddress,
                userAgent,
                status: 'SIGNED',
                signedAt: new Date(),
                checksum
            }
        })

        // Log the action for audit
        await prisma.auditLog.create({
            data: {
                patientId,
                action: 'SIGN_CONSENT',
                details: `Consentment signé: ${title}`,
                severity: 'INFO',
                ip: ipAddress,
                userAgent
            }
        })

        return NextResponse.json(consent)
    } catch (error) {
        console.error("Failed to sign consent:", error)
        return NextResponse.json({ error: "Failed to sign consent" }, { status: 500 })
    }
}
