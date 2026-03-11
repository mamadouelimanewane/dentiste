import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const patientId = params.id

        // 1. Fetch Pathologies (from tooth states)
        const toothStates = await (prisma as any).patientToothState.findMany({
            where: { patientId }
        })

        // 2. Fetch Treatment Plans
        const plans = await (prisma as any).treatmentPlan.findMany({
            where: { patientId, status: "ACCEPTED" },
            include: { steps: true }
        })

        // 3. Fetch Completed Treatments
        const completedTreatments = await (prisma as any).treatment.findMany({
            where: { patientId, status: "COMPLETED" }
        })

        const nodes: any[] = []
        const connections: any[] = []

        // Process Pathologies
        toothStates.forEach((ts: any) => {
            if (ts.status !== 'HEALTHY') {
                const nodeId = `path-${ts.toothNumber}`
                nodes.push({
                    id: nodeId,
                    label: `${ts.status} - Dent ${ts.toothNumber}`,
                    type: 'PATHOLOGY',
                    status: 'DETECTED',
                    confidence: 95 // Simulated AI confidence
                })
            }
        })

        // Process Treatments (from plans)
        plans.forEach((plan: any) => {
            plan.steps.forEach((step: any, idx: number) => {
                const nodeId = `treat-${step.id}`
                nodes.push({
                    id: nodeId,
                    label: step.title,
                    type: 'TREATMENT',
                    status: step.status === 'COMPLETED' ? 'PLANNED' : 'RECOMMENDED'
                })

                // Logic to connect: If we can guess the tooth from title (e.g. "Dent 16")
                // This is a bit weak, but for demo/MVP it works.
                const toothMatch = step.title.match(/(\d+)/)
                if (toothMatch) {
                    const toothNum = toothMatch[1]
                    connections.push({
                        from: `path-${toothNum}`,
                        to: nodeId,
                        label: "Indiqué if caries detected"
                    })
                }
            })
        })

        // Add some default Goals/Prevention if not enough data
        if (nodes.length > 0) {
            nodes.push({
                id: 'goal-stabi',
                label: 'Stabilité Parodontale',
                type: 'PREVENTION',
                status: 'PLANNED'
            })

            // Connect last treatments to goal
            const lastTreatments = nodes.filter(n => n.type === 'TREATMENT').slice(-1)
            lastTreatments.forEach(lt => {
                connections.push({ from: lt.id, to: 'goal-stabi' })
            })
        }

        // Return formatted data
        return NextResponse.json({
            nodes: nodes.length > 0 ? nodes : [
                { id: 'demo-1', label: 'Caries Distale D16', type: 'PATHOLOGY', status: 'DETECTED' },
                { id: 'demo-2', label: 'Composite Résine', type: 'TREATMENT', status: 'RECOMMENDED' },
                { id: 'demo-3', label: 'Prévention Récurrence', type: 'PREVENTION', status: 'PLANNED' }
            ],
            connections: connections.length > 0 ? connections : [
                { from: 'demo-1', to: 'demo-2' },
                { from: 'demo-2', to: 'demo-3' }
            ]
        })

    } catch (error) {
        console.error("Neural Map API Error:", error)
        return NextResponse.json({ error: "Failed to generate neural map" }, { status: 500 })
    }
}
