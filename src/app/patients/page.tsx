export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import PatientsClient from "./PatientsClient"

export default async function PatientsPage() {
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

    return <PatientsClient initialPatients={patients} />
}

