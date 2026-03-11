export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { amount, patientName, description, paymentMethod } = body

        if (!amount || !patientName || !paymentMethod) {
            return NextResponse.json(
                { error: "Montant, nom du patient et méthode de paiement sont requis." },
                { status: 400 }
            )
        }

        const transactionId = `TX_${Date.now()}_${Math.floor(Math.random() * 1000)}`

        // C'est ici que l'appel d'API vers CinetPay se passe normalement (https://api-checkout.cinetpay.com/v2/payment)
        // Mais nous simulons la réponse attendue.

        console.log(`[CINETPAY SIMULÉE] Paiement initié: ${transactionId} - ${amount} FCFA - Via ${paymentMethod}`)

        await new Promise(resolve => setTimeout(resolve, 800)) // Simulation de délai réseau

        return NextResponse.json({
            success: true,
            transactionId,
            amount,
            currency: 'XOF',
            paymentUrl: `https://payment-gateway-sim.dentoprestige.sn/${transactionId}`, // Faux lien
            status: "PENDING",
            message: "Transaction initiée avec succès. Veuillez procéder au paiement sur le numéro indiqué."
        })

    } catch (error) {
        console.error("Erreur lors de l'initiation du paiement:", error)
        return NextResponse.json(
            { error: "Échec de l'initiation du paiement" },
            { status: 500 }
        )
    }
}
