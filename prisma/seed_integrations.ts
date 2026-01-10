import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Generating seed integrations...')

    const items = [
        {
            provider: 'Sirona SIDEXIS',
            type: 'IMAGING',
            status: 'CONNECTED',
            config: JSON.stringify({ path: 'C:\\Sidexis\\Data', protocol: 'TWAIN' })
        },
        {
            provider: 'Stripe Payments',
            type: 'PAYMENT',
            status: 'CONNECTED',
            config: JSON.stringify({ mode: 'live', webhookUrl: 'https://api.dentiste.app/webhooks/stripe' })
        }
    ]

    for (const item of items) {
        await prisma.integration.create({
            data: item
        })
    }

    console.log('Integrations seed data generated.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
