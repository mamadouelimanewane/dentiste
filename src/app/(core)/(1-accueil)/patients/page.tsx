export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'; // Ensure we don't cache empty DB
import { prisma } from "@/lib/prisma"
import PatientsClient from "./PatientsClient"

const DEMO_PATIENTS = [
    {
        id: "demo-1",
        firstName: "Amadou",
        lastName: "Diallo",
        email: "amadou.diallo@email.com",
        phone: "+221 77 123 45 67",
        updatedAt: new Date().toISOString() as any
    },
    {
        id: "demo-2",
        firstName: "Fatou",
        lastName: "Mbaye",
        email: "fatou.mbaye@email.com",
        phone: "+221 78 234 56 78",
        updatedAt: new Date(Date.now() - 86400000).toISOString() as any
    },
    {
        id: "demo-3",
        firstName: "Ibrahima",
        lastName: "Sow",
        email: "ibrahima.sow@email.com",
        phone: "+221 76 345 67 89",
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString() as any
    },
    {
        id: "demo-4",
        firstName: "Mariama",
        lastName: "Diop",
        email: "mariama.diop@email.com",
        phone: "+221 70 456 78 90",
        updatedAt: new Date(Date.now() - 86400000 * 3).toISOString() as any
    },
    {
        id: "demo-5",
        firstName: "Ousmane",
        lastName: "Ndiaye",
        email: "ousmane.ndiaye@email.com",
        phone: "+221 77 567 89 01",
        updatedAt: new Date(Date.now() - 86400000 * 4).toISOString() as any
    }
];

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
        let serializedPatients = patients.map(p => ({
            ...p,
            updatedAt: p.updatedAt.toISOString() as any
        }))

        // Si la base est vide (ex: sur Vercel avec SQLite), on injecte des données de démonstration
        if (serializedPatients.length === 0) {
            serializedPatients = DEMO_PATIENTS;
        }

        return <PatientsClient initialPatients={serializedPatients} />
    } catch (error) {
        console.error("Database connection error in PatientsPage:", error)
        // Graceful fallback avec patients de démo en cas d'erreur DB
        return <PatientsClient initialPatients={DEMO_PATIENTS} />
    }
}

