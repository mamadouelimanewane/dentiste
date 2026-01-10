import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. Get or Create a Dentist
    let dentist = await prisma.user.findFirst({ where: { role: 'DENTIST' } })
    if (!dentist) {
        dentist = await prisma.user.create({
            data: {
                name: 'Dr. Marc Diallo',
                email: 'dr.diallo@prestige.com',
                password: 'password123',
                role: 'DENTIST'
            }
        })
    }

    // 2. Get some patients
    const patients = await prisma.patient.findMany({ take: 5 })
    if (patients.length === 0) {
        console.log('No patients found. Please run seed.ts first.')
        return
    }

    // 3. Create Treatments with analytics data
    const categories = ['SURGERY', 'PROSTHESIS', 'ENDO', 'PREVENTION']
    const outcomes = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'SUCCESS', 'COMPLICATION', 'FAILURE']

    console.log('Generating treatments...')
    for (const patient of patients) {
        // Create 2-3 treatments per patient
        for (let i = 0; i < 3; i++) {
            const cat = categories[Math.floor(Math.random() * categories.length)]
            const out = outcomes[Math.floor(Math.random() * outcomes.length)]
            const cost = Math.floor(Math.random() * 500) + 100

            await (prisma as any).treatment.create({
                data: {
                    patientId: patient.id,
                    dentistId: dentist.id,
                    description: `${cat} Procedure`,
                    category: cat,
                    status: 'COMPLETED',
                    outcome: out,
                    complicationType: out === 'COMPLICATION' ? 'INFECTION' : null,
                    cost: cost,
                    estimatedCost: cost * 0.4,
                    toothNumber: (Math.floor(Math.random() * 32) + 1).toString()
                }
            })
        }

        // Create multiple appointments for retention tracking
        await prisma.appointment.create({
            data: {
                patientId: patient.id,
                title: 'Suivi post-op',
                start: new Date(),
                end: new Date(Date.now() + 3600000),
                type: 'CONSULTATION',
                status: 'CONFIRMED'
            }
        })
    }

    // 4. Create some Validated Quotes for Forecast
    console.log('Generating quotes...')
    for (const patient of patients) {
        await (prisma as any).quote.create({
            data: {
                patientId: patient.id,
                title: 'Devis Dentaire Global',
                total: Math.floor(Math.random() * 2000) + 500,
                status: 'ACCEPTED'
            }
        })
    }

    console.log('Analytics seed data generated successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
