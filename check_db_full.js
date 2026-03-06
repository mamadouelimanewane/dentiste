const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Fetching all patients...');
    const all = await prisma.patient.findMany({});
    console.log(`Total patients in DB: ${all.length}`);

    all.forEach(p => {
        console.log(`- ${p.firstName} ${p.lastName} | ID: ${p.id} | Status: ${JSON.stringify(p.workflowStatus)}`);
    });
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
