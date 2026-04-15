export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { startOfMonth, subMonths, endOfMonth } from "date-fns"

export async function GET() {
    try {
        const now = new Date()
        const currentMonthStart = startOfMonth(now)
        const lastMonthStart = subMonths(currentMonthStart, 1)
        const lastMonthEnd = endOfMonth(lastMonthStart)

        // 1. Clinical Dashboards
        const clinicalStats = await (prisma as any).treatment.groupBy({
            by: ['outcome'],
            _count: {
                id: true
            }
        })

        const complicationDetails = await (prisma as any).treatment.findMany({
            where: { outcome: 'COMPLICATION' },
            select: { complicationType: true, description: true, toothNumber: true },
            take: 5
        })

        // 2. Production Statistics (by category)
        const productionByCategory = await (prisma as any).treatment.groupBy({
            by: ['category'],
            _sum: {
                cost: true
            },
            _count: {
                id: true
            }
        })

        // 3. Profitability (Simplified)
        const treatments = await (prisma as any).treatment.findMany({
            select: { cost: true, estimatedCost: true }
        })
        const totalRevenue = treatments.reduce((acc: number, t: any) => acc + (t.cost || 0), 0)
        const totalEstimatedCost = treatments.reduce((acc: number, t: any) => acc + (t.estimatedCost || 0), 0)
        const netProfit = totalRevenue - totalEstimatedCost

        // 4. Patient Retention (Simplified: Patients with > 1 appointment)
        const patientAppointmentCounts = await prisma.appointment.groupBy({
            by: ['patientId'],
            _count: {
                id: true
            }
        })
        const recurringPatients = patientAppointmentCounts.filter(p => p._count.id > 1).length
        const totalPatients = await prisma.patient.count()
        const retentionRate = totalPatients > 0 ? (recurringPatients / totalPatients) * 100 : 0

        // 5. Revenue Forecasts (Validated Quotes)
        const validatedQuotes = await (prisma as any).quote.aggregate({
            where: { status: 'ACCEPTED' },
            _sum: {
                total: true
            }
        })

        // 6. Production by Dentist
        const productionByDentist = await (prisma as any).treatment.groupBy({
            by: ['dentistId'],
            _sum: {
                cost: true
            }
        })

        return NextResponse.json({
            clinical: {
                stats: clinicalStats,
                recentComplications: complicationDetails,
                successRate: calculateSuccessRate(clinicalStats)
            },
            production: {
                byCategory: productionByCategory,
                byDentist: productionByDentist
            },
            profitability: {
                totalRevenue,
                totalEstimatedCost,
                netProfit,
                margin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0
            },
            retention: {
                recurringPatients,
                totalPatients,
                retentionRate: retentionRate.toFixed(1) + "%"
            },
            forecast: {
                potential: validatedQuotes._sum?.total || 0
            },
            benchmarking: {
                office: (totalRevenue / (totalPatients || 1)).toFixed(2),
                industryAvg: "1250" // Mock benchmarking data
            }
        })
    } catch (error) {
        console.error("Failed to fetch analytics:", error)
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }
}

function calculateSuccessRate(stats: any[]) {
    const total = stats.reduce((acc, s) => acc + s._count.id, 0)
    const successes = stats.find(s => s.outcome === 'SUCCESS')?._count.id || 0
    return total > 0 ? ((successes / total) * 100).toFixed(1) + "%" : "100%"
}
