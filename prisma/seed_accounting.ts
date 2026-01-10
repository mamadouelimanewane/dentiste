import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding OHADA Accounting data...')

    // Journals
    const journalVentes = await prisma.journal.upsert({
        where: { code: 'VT' },
        update: {},
        create: { code: 'VT', name: 'Journal des Ventes' }
    })

    const journalCaisse = await prisma.journal.upsert({
        where: { code: 'CA' },
        update: {},
        create: { code: 'CA', name: 'Journal de Caisse' }
    })

    // Accounts
    const accounts = [
        { code: '411100', name: 'Clients (Patients)', type: 'ASSET' },
        { code: '701100', name: 'Ventes de Prestations (Honoraires)', type: 'INCOME' },
        { code: '571100', name: 'Caisse Cabinet', type: 'ASSET' },
        { code: '401100', name: 'Fournisseurs', type: 'LIABILITY' },
        { code: '601100', name: 'Achats de Consommables', type: 'EXPENSE' },
    ]

    for (const acc of accounts) {
        await prisma.account.upsert({
            where: { code: acc.code },
            update: {},
            create: acc
        })
    }

    console.log('Seeding finished!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
