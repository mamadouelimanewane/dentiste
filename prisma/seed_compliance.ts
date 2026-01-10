import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. Get Dentist and some patients
    const dentist = await prisma.user.findFirst({ where: { role: 'DENTIST' } })
    const patients = await prisma.patient.findMany({ take: 3 })

    if (!dentist || patients.length === 0) {
        console.log('Seed prerequisites not met. Run seed.ts first.')
        return
    }

    // 2. Create Audit Logs
    console.log('Generating audit logs...')
    const actions = ['ACCESS_PATIENT_RECORD', 'EXPORT_XRAY', 'UPDATE_MEDICAL_HISTORY', 'VIEW_BILLING']
    for (const patient of patients) {
        for (let i = 0; i < 5; i++) {
            await prisma.auditLog.create({
                data: {
                    userId: dentist.id,
                    patientId: patient.id,
                    action: actions[Math.floor(Math.random() * actions.length)],
                    details: `Consultation du dossier pour motif clinique`,
                    severity: i === 4 ? 'WARNING' : 'INFO',
                    ip: '192.168.1.' + Math.floor(Math.random() * 255),
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
                }
            })
        }
    }

    // 3. Create Legal Reminders (Urgent Admin Tasks)
    console.log('Generating legal reminders...')
    const reminders = [
        { title: 'Contrôle annuel Autoclave Statim', category: 'ADMIN', priority: 'URGENT' },
        { title: 'Renouvellement certification PCR (Radioprotection)', category: 'ADMIN', priority: 'URGENT' },
        { title: 'Audit annuel RGPD - Registre des activités', category: 'ADMIN', priority: 'URGENT' },
        { title: 'Contrôle qualité externe Panoramique Dentaire', category: 'ADMIN', priority: 'URGENT' }
    ]

    for (const r of reminders) {
        await (prisma as any).task.create({
            data: {
                ...r,
                status: 'TODO',
                dueDate: new Date(Date.now() + 7 * 24 * 3600000) // 7 days from now
            }
        })
    }

    // 4. Create some expired documents for purge simulation
    console.log('Generating documents for archiving stats...')
    for (const patient of patients) {
        await prisma.document.create({
            data: {
                patientId: patient.id,
                name: 'Ancienne Radio 2004',
                url: 'https://example.com/old_xray.jpg',
                category: 'XRAY',
                isArchived: false,
                retentionLimit: new Date('2024-01-01'), // Expired
                processed: true
            }
        })
    }

    console.log('Compliance seed data generated successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
