export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"

// ─── Webhook pour les notifications de paiement ────────────────────────────────
// Wave envoie un POST avec l'état du paiement quand il change (SUCCEEDED, FAILED...)
// Orange Money envoie aussi une notification POST sur ce même endpoint

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log("[PAYMENT WEBHOOK]", JSON.stringify(body, null, 2))

        // Wave webhook format
        if (body.client_reference || body.wave_id) {
            const status = body.payment_status // 'succeeded' | 'failed' | 'cancelled'
            const ref = body.client_reference
            console.log(`[WAVE WEBHOOK] Transaction ${ref}: ${status}`)

            // TODO: Update invoice status in Prisma
            // await prisma.invoice.update({ where: { id: ref }, data: { status: status === 'succeeded' ? 'PAID' : 'UNPAID' } })

            return NextResponse.json({ received: true, provider: "WAVE", ref, status })
        }

        // Orange Money webhook format
        if (body.payToken || body.txnid) {
            const status = body.status // 'SUCCESS' | 'FAILED' | 'PENDING'
            const ref = body.txnid || body.payToken
            console.log(`[ORANGE MONEY WEBHOOK] Transaction ${ref}: ${status}`)

            return NextResponse.json({ received: true, provider: "ORANGE_MONEY", ref, status })
        }

        return NextResponse.json({ received: true, note: "Unknown provider format" })

    } catch (error) {
        console.error("[WEBHOOK ERROR]", error)
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
    }
}
