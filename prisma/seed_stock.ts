import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding stock items...')

    const items = [
        {
            name: 'Gants Examen Nitrile (M)',
            category: 'Consommables',
            quantity: 12,
            minQuantity: 20,
            unit: 'Boîtes',
            lotNumber: 'L-2024-001',
            expiryDate: new Date('2026-12-31'),
            isSterile: false,
        },
        {
            name: 'Septanest 4% Adrénaline',
            category: 'Anesthésie',
            quantity: 45,
            minQuantity: 10,
            unit: 'Cartouches',
            lotNumber: 'A-789-X',
            expiryDate: new Date('2025-06-30'),
            isSterile: false,
        },
        {
            name: 'Composite E-Max A2 Syringe',
            category: 'Soins',
            quantity: 3,
            minQuantity: 5,
            unit: 'Seringues',
            lotNumber: 'C-2024-B',
            expiryDate: new Date('2026-01-15'),
            isSterile: false,
        },
        {
            name: 'Implants Nobel Biocare 4.3',
            category: 'Implantologie',
            quantity: 8,
            minQuantity: 5,
            unit: 'Unités',
            lotNumber: 'NB-4321',
            expiryDate: new Date('2028-10-12'),
            isSterile: true,
        },
        {
            name: 'Lames de Bistouri n°15',
            category: 'Soins',
            quantity: 100,
            minQuantity: 50,
            unit: 'Unités',
            lotNumber: 'S-456-Z',
            expiryDate: new Date('2027-04-20'),
            isSterile: true,
        },
        {
            name: 'Solution Hydroalcoolique 5L',
            category: 'Hygiène',
            quantity: 2,
            minQuantity: 4,
            unit: 'Bidons',
            lotNumber: 'H-2024-Q',
            expiryDate: new Date('2026-08-30'),
            isSterile: false,
        }
    ]

    for (const item of items) {
        await prisma.stockItem.upsert({
            where: { id: `seed-${item.name.toLowerCase().replace(/\s/g, '-')}` },
            update: {},
            create: {
                id: `seed-${item.name.toLowerCase().replace(/\s/g, '-')}`,
                ...item,
            },
        })
    }

    console.log('Stock items seeded successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
