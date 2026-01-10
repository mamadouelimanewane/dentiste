import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const states = await (prisma as any).patientToothState.findMany({
            where: { patientId: id }
        })

        // Format to object { [toothNumber]: status }
        const toothStates = states.reduce((acc: any, curr: any) => ({
            ...acc,
            [curr.toothNumber]: curr.status
        }), {})

        return NextResponse.json(toothStates)
    } catch (error) {
        console.error("Failed to fetch tooth states:", error)
        return NextResponse.json({ error: "Failed to fetch tooth states" }, { status: 500 })
    }
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const body = await request.json()
        const { toothNumber, status, notes } = body

        const updatedState = await (prisma as any).patientToothState.upsert({
            where: {
                patientId_toothNumber: {
                    patientId: id,
                    toothNumber: parseInt(toothNumber)
                }
            },
            update: {
                status,
                notes
            },
            create: {
                patientId: id,
                toothNumber: parseInt(toothNumber),
                status,
                notes
            }
        })

        return NextResponse.json(updatedState)
    } catch (error) {
        console.error("Failed to update tooth state:", error)
        return NextResponse.json({ error: "Failed to update tooth state" }, { status: 500 })
    }
}
