import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Prisma models:', Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_')));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
