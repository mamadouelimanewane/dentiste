import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        // Real Revenue (Paid Invoices)
        const revenue = await prisma.invoice.aggregate({
            _sum: {
                amount: true
            }
        })

        // Potential Revenue (Draft or Sent Quotes)
        const potentialRevenue = await (prisma.quote as any).aggregate({
            _sum: {
                total: true
            }
        })

        // Patient Count
        const patientCount = await prisma.patient.count()
        const newPatientsThisMonth = await prisma.patient.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }
        })

        // Conversion Rate (Quotes to Invoice - simplified logic for demo)
        const totalQuotes = await prisma.quote.count()
        const acceptedQuotes = await prisma.quote.count({ where: { status: 'ACCEPTED' } })
        const conversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0

        // Revenue by month (simplified)
        const invoices = await prisma.invoice.findMany({
            select: {
                amount: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return NextResponse.json({
            revenue: revenue?._sum?.amount || 0,
            potentialRevenue: potentialRevenue?._sum?.total || 0,
            patientCount,
            newPatientsThisMonth,
            conversionRate: conversionRate.toFixed(1) + "%",
            invoices
        })
    } catch (error) {
        console.error("Failed to fetch business metrics:", error)
        return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
    }
}
