export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"

// ─── Wave Transfer API (Sénégal) ─────────────────────────────────────────────
// Docs: https://wave.com/en/api/
// Endpoint Live: https://api.wave.com/v1/checkout/sessions

async function initiateWavePayment(amount: number, clientReference: string, successUrl: string, errorUrl: string) {
    const WAVE_API_KEY = process.env.WAVE_API_KEY
    if (!WAVE_API_KEY) throw new Error("WAVE_API_KEY non configurée")

    const response = await fetch("https://api.wave.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${WAVE_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": `wave_${clientReference}_${Date.now()}`
        },
        body: JSON.stringify({
            amount: amount.toString(),
            currency: "XOF",
            error_url: errorUrl,
            success_url: successUrl,
            client_reference: clientReference,
        })
    })

    if (!response.ok) {
        const err = await response.json()
        throw new Error(`Wave API Error: ${JSON.stringify(err)}`)
    }

    return await response.json()
}

// ─── Orange Money Sénégal (Sonatel OM Pay API) ────────────────────────────────
// Docs: https://devportal.orange-sonatel.com/
// Auth: OAuth 2.0 - Token endpoint: https://api.orange-sonatel.com/oauth/token

async function getOrangeMoneyToken() {
    const CLIENT_ID = process.env.ORANGE_MONEY_CLIENT_ID
    const CLIENT_SECRET = process.env.ORANGE_MONEY_CLIENT_SECRET
    if (!CLIENT_ID || !CLIENT_SECRET) throw new Error("Orange Money credentials non configurées")

    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

    const response = await fetch("https://api.orange-sonatel.com/oauth/token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    })

    if (!response.ok) {
        const err = await response.text()
        throw new Error(`Orange Money Token Error: ${err}`)
    }

    const data = await response.json()
    return data.access_token
}

async function initiateOrangeMoneyPayment(
    amount: number,
    clientReference: string,
    customerPhone: string,
    notifyUrl: string
) {
    const token = await getOrangeMoneyToken()
    const OM_PAY_URL = process.env.ORANGE_MONEY_PAY_URL || "https://api.orange-sonatel.com/api/eWallet/v1/cashout"

    const response = await fetch(OM_PAY_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: {
                unit: "XOF",
                value: amount
            },
            customerWalletId: customerPhone, // Ex: "221770000000"
            reference: clientReference,
            pin: process.env.ORANGE_MONEY_PIN_CODE, // Marchand PIN
            notifyUrl
        })
    })

    if (!response.ok) {
        const err = await response.json()
        throw new Error(`Orange Money API Error: ${JSON.stringify(err)}`)
    }

    return await response.json()
}

// ─── Main Route Handler ───────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            amount,
            patientName,
            patientPhone,
            description,
            paymentMethod, // 'WAVE' | 'ORANGE_MONEY' | 'CARD'
            invoiceId
        } = body

        if (!amount || !paymentMethod) {
            return NextResponse.json(
                { error: "Montant et méthode de paiement sont requis." },
                { status: 400 }
            )
        }

        const clientReference = invoiceId || `INV-${Date.now()}`
        const baseUrl = process.env.NEXTAUTH_URL || "https://dentiste-nine.vercel.app"
        const successUrl = `${baseUrl}/financial-war-room?payment=success&ref=${clientReference}`
        const errorUrl = `${baseUrl}/financial-war-room?payment=error&ref=${clientReference}`
        const notifyUrl = `${baseUrl}/api/payment/webhook`

        // ─── Wave Payment ──────────────────────────────────────────────
        if (paymentMethod === 'WAVE') {
            // If Wave API key not configured, return sandbox simulation
            if (!process.env.WAVE_API_KEY || process.env.WAVE_API_KEY === 'wave_sk_sandbox_xxx') {
                return NextResponse.json({
                    success: true,
                    mode: "SANDBOX",
                    provider: "WAVE",
                    transactionId: clientReference,
                    amount,
                    currency: 'XOF',
                    paymentUrl: `https://pay.wave.com/m/DENTOPRESTIGE_SN?amount=${amount}&currency=XOF&ref=${clientReference}`,
                    status: "PENDING",
                    message: "SESSION SANDBOX Wave — Clé API de production requise pour les vrais paiements."
                })
            }

            const waveResult = await initiateWavePayment(amount, clientReference, successUrl, errorUrl)
            return NextResponse.json({
                success: true,
                mode: "LIVE",
                provider: "WAVE",
                transactionId: waveResult.id || clientReference,
                amount,
                currency: 'XOF',
                paymentUrl: waveResult.wave_launch_url || waveResult.checkout_url,
                waveDeepLink: `wave://checkout?session_id=${waveResult.id}`,
                status: waveResult.payment_status || "PENDING",
                expiresAt: waveResult.when_expires,
                message: "Session Wave créée. Redirigez le patient vers le lien de paiement."
            })

        // ─── Orange Money Payment ──────────────────────────────────────
        } else if (paymentMethod === 'ORANGE_MONEY') {
            // Sandbox simulation if no credentials
            if (!process.env.ORANGE_MONEY_CLIENT_ID || process.env.ORANGE_MONEY_CLIENT_ID === 'om_sandbox_xxx') {
                return NextResponse.json({
                    success: true,
                    mode: "SANDBOX",
                    provider: "ORANGE_MONEY",
                    transactionId: clientReference,
                    amount,
                    currency: 'XOF',
                    paymentUrl: `https://payment.orange.sn/?ref=${clientReference}&amount=${amount}`,
                    status: "PENDING",
                    message: `SANDBOX Orange Money — Demandez au patient de payer via #150*4*3# pour valider.`,
                    ussdCode: `*144*4*1*${amount}*DentoPrestige#`,
                    otpInstruction: `Le patient doit générer un OTP via *144# → Payer → puis saisir l'OTP ci-dessous.`
                })
            }

            const omResult = await initiateOrangeMoneyPayment(amount, clientReference, patientPhone, notifyUrl)
            return NextResponse.json({
                success: true,
                mode: "LIVE",
                provider: "ORANGE_MONEY",
                transactionId: omResult.id || clientReference,
                amount,
                currency: 'XOF',
                status: omResult.status || "PENDING",
                message: "Paiement Orange Money initié. Le patient recevra un SMS de confirmation.",
                internalTransactionId: omResult.payToken
            })

        // ─── Card / Default ────────────────────────────────────────────
        } else {
            return NextResponse.json({
                success: true,
                mode: "SANDBOX",
                provider: "CARD",
                transactionId: clientReference,
                amount,
                currency: 'XOF',
                paymentUrl: `https://secure-pay.dentoprestige.sn/card/${clientReference}`,
                status: "PENDING",
                message: "Terminal CB simulé. Connectez un TPE Stripe/CinetPay pour les vrais paiements CB."
            })
        }

    } catch (error: any) {
        console.error("Erreur paiement:", error)
        return NextResponse.json(
            {
                error: error.message || "Échec de l'initiation du paiement",
                mode: "ERROR"
            },
            { status: 500 }
        )
    }
}
