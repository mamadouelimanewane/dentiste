const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const all = await prisma.patient.findMany({});
    console.log(`Found ${all.length} patients.`);

    for (const p of all) {
        // If it's undefined or null, let's fix it
        if (!p.workflowStatus || p.workflowStatus === 'null') {
            await prisma.patient.update({
                where: { id: p.id },
                data: { workflowStatus: 'VISIT_UPCOMING' }
            });
            console.log(`Fixed: ${p.firstName} ${p.lastName}`);
        } else {
            console.log(`Already has status: ${p.firstName} ${p.lastName} | ${p.workflowStatus}`);
        }
    }
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
