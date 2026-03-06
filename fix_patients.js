const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Fetching patients with null status...');
    const patients = await prisma.patient.findMany({
        where: { workflowStatus: null }
    });

    console.log(`Found ${patients.length} patients to update.`);

    for (const p of patients) {
        await prisma.patient.update({
            where: { id: p.id },
            data: { workflowStatus: 'VISIT_UPCOMING' }
        });
        console.log(`Updated ${p.firstName} ${p.lastName}`);
    }

    console.log('Update complete.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
