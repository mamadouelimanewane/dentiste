import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding new modules data...')

    // Stock
    await prisma.stockItem.createMany({
        data: [
            { name: 'Gants Examen (M)', category: 'Consommables', quantity: 12, minQuantity: 20, unit: 'Boîtes' },
            { name: 'Anesthésique Septanest', category: 'Médicaments', quantity: 45, minQuantity: 10, unit: 'Cartouches' },
            { name: 'Composite Universel A2', category: 'Soins', quantity: 3, minQuantity: 5, unit: 'Seringues' },
        ]
    })

    // Sterilization
    await prisma.sterilizationLog.createMany({
        data: [
            { date: new Date(), machineId: 'AUTO-01', cycleNumber: 1301, operator: 'Dr. Dupont', status: 'SUCCESS' },
            { date: new Date(), machineId: 'AUTO-02', cycleNumber: 942, operator: 'Sophie', status: 'SUCCESS' },
        ]
    })

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
