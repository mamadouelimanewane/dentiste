export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import PatientsClient from "./PatientsClient"

export default async function PatientsPage() {
    try {
        const patients = await prisma.patient.findMany({
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                updatedAt: true,
            }
        })

        // Serialize dates to prevent hydration issues
        const serializedPatients = patients.map(p => ({
            ...p,
            updatedAt: p.updatedAt.toISOString() as any
        }))

        return <PatientsClient initialPatients={serializedPatients} />
    } catch (error) {
        console.error("Database connection error in PatientsPage:", error)
        // Graceful fallback: return empty list to prevent crash
        return <PatientsClient initialPatients={[]} />
    }
}

