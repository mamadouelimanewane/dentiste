
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create a Dentist User
    const user = await prisma.user.upsert({
        where: { email: 'dr.dupont@dentiste.app' },
        update: {},
        create: {
            email: 'dr.dupont@dentiste.app',
            name: 'Dr. Dupont',
            role: 'DENTIST',
        },
    })

    // Create Patients
    const p1 = await prisma.patient.create({
        data: {
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            phone: '0612345678',
            gender: 'M',
            medicalHistory: {
                create: {
                    allergies: 'Pénicilline',
                    conditions: 'Hypertension',
                }
            },
            appointments: {
                create: [
                    {
                        title: 'Consultation',
                        start: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
                        end: new Date(new Date().setDate(new Date().getDate() + 1)),
                        type: 'CONSULTATION',
                        status: 'CONFIRMED'
                    }
                ]
            },
            invoices: {
                create: [
                    {
                        amount: 150.00,
                        status: 'UNPAID',
                        items: {
                            create: [
                                { description: 'Consultation initiale', quantity: 1, unitPrice: 50.00, total: 50.00 },
                                { description: 'Détartrage', quantity: 1, unitPrice: 100.00, total: 100.00 }
                            ]
                        }
                    }
                ]
            }
        }
    })

    const p2 = await prisma.patient.create({
        data: {
            firstName: 'Marie',
            lastName: 'Curie',
            email: 'marie.curie@example.com',
            phone: '0698765432',
            gender: 'F',
            dob: new Date('1980-01-01'),
            treatments: {
                create: [
                    { description: 'Extraction 48', toothNumber: '48', status: 'COMPLETED', cost: 80.00 }
                ]
            }
        }
    })

    console.log({ user, p1, p2 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
