export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        // Fetch Journals
        let journals = await (prisma.journal as any).findMany({
            include: {
                entries: true
            }
        })

        // If no journals, return mock data for demonstration
        if (journals.length === 0) {
            journals = [
                { id: '1', code: 'VT', name: 'Ventes & Prestations', entries: [{ debit: 4500000, credit: 0 }] },
                { id: '2', code: 'BQ', name: 'Banque (BOA/SGBS)', entries: [{ debit: 2800000, credit: 450000 }] },
                { id: '3', code: 'CA', name: 'Caisse Petit Cash', entries: [{ debit: 350000, credit: 125000 }] },
                { id: '4', code: 'OD', name: 'Opérations Diverses', entries: [{ debit: 50000, credit: 50000 }] },
            ]
        }

        const journalsData = journals.map((j: any) => {
            const totals = (j.entries || []).reduce((acc: any, entry: any) => ({
                debit: acc.debit + (entry.debit || 0),
                credit: acc.credit + (entry.credit || 0)
            }), { debit: 0, credit: 0 })

            return {
                id: j.id,
                code: j.code,
                name: j.name,
                debit: totals.debit.toLocaleString(),
                credit: totals.credit.toLocaleString(),
                color: j.code === 'VT' ? 'bg-blue-50 text-blue-700' :
                    j.code === 'BQ' ? 'bg-teal-50 text-teal-700' :
                        j.code === 'CA' ? 'bg-amber-50 text-amber-700' :
                            'bg-indigo-50 text-indigo-700'
            }
        })

        // Fetch Key OHADA Accounts Balance
        // 521 (Banque), 571 (Caisse)
        const bankAccount = await (prisma.account as any).findUnique({
            where: { code: '521' },
            include: { entries: true }
        })
        const cashAccount = await (prisma.account as any).findUnique({
            where: { code: '571' },
            include: { entries: true }
        })

        const calculateBalance = (acc: any) => {
            if (!acc || !acc.entries) return 0
            const totals = acc.entries.reduce((sum: any, e: any) => ({
                debit: sum.debit + (e.debit || 0),
                credit: sum.credit + (e.credit || 0)
            }), { debit: 0, credit: 0 })
            return totals.debit - totals.credit
        }

        const bankBalance = calculateBalance(bankAccount) || 2350000 // Fallback for demo
        const cashBalance = calculateBalance(cashAccount) || 225000   // Fallback for demo
        const totalTreasury = bankBalance + cashBalance

        // Result Account (131 - Resultat Net)
        const resultAccount = await (prisma.account as any).findUnique({
            where: { code: '131' },
            include: { entries: true }
        })
        const netResult = calculateBalance(resultAccount) || 1250000 // Fallback for demo

        return NextResponse.json({
            journals: journalsData,
            treasury: totalTreasury,
            netResult,
            bankBalance,
            cashBalance
        })
    } catch (error) {
        console.error("Failed to fetch accounting metrics:", error)
        return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
    }
}
