import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { amount, phone, method, patientId, invoiceId } = await req.json()

        // Simulate network delay for mobile money gateway
        await new Promise(resolve => setTimeout(resolve, 2500))

        // Basic validation
        if (!amount || !phone) {
            return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 })
        }

        // Simulate success for demo purposes
        // In a real app, this would call Wave/Orange Money API
        const transactionId = `TRX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

        return NextResponse.json({
            success: true,
            transactionId,
            message: "Paiement validé avec succès",
            details: {
                method,
                amount,
                phone,
                date: new Date().toISOString()
            }
        })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
    }
}
