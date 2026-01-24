
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('--- DEBUT DU SEED ELITE (SENEGAL / FCFA) ---')

    // 1. UTILISATEURS (Équipe Clinique)
    const drLao = await prisma.user.upsert({
        where: { email: 'dr.lao@dentoprestige.sn' },
        update: {},
        create: {
            email: 'dr.lao@dentoprestige.sn',
            name: 'Dr. Aere Lao',
            role: 'DENTIST',
            skills: JSON.stringify(['Implantologie', 'Chirurgie Maxillo-faciale', 'IA Diagnostics']),
        },
    })

    const assistant = await prisma.user.upsert({
        where: { email: 'fatou.ndiaye@dentoprestige.sn' },
        update: {},
        create: {
            email: 'fatou.ndiaye@dentoprestige.sn',
            name: 'Fatou Ndiaye',
            role: 'ASSISTANT',
        },
    })

    // 2. PATIENTS (Noms Sénégalais)
    const patients = [
        { first: 'Mamadou', last: 'Dia', email: 'm.dia@orange.sn', phone: '77 567 12 34', source: 'Instagram' },
        { first: 'Mariama', last: 'Sow', email: 'm.sow@gmail.com', phone: '78 123 45 67', source: 'Bouche à oreille' },
        { first: 'Ousmane', last: 'Gueye', email: 'o.gueye@netcourrier.sn', phone: '70 888 99 00', source: 'Campagne Google' },
        { first: 'Awa', last: 'Fall', email: 'awa.fall@yahoo.fr', phone: '76 555 44 33', source: 'Partenaire VIP' },
    ]

    for (const p of patients) {
        await prisma.patient.upsert({
            where: { email: p.email },
            update: {},
            create: {
                firstName: p.first,
                lastName: p.last,
                email: p.email,
                phone: p.phone,
                source: p.source,
                status: 'ACTIVE',
                medicalHistory: {
                    create: {
                        conditions: 'Diabète Type 2',
                        medications: 'Metformine'
                    }
                }
            }
        })
    }

    const createdPatients = await prisma.patient.findMany()

    // 3. RENDEZ-VOUS & TRAITEMENTS
    for (let i = 0; i < createdPatients.length; i++) {
        const patient = createdPatients[i]

        // Appointment
        await prisma.appointment.create({
            data: {
                patientId: patient.id,
                title: 'Détartrage et Polissage Pro',
                start: new Date(new Date().setDate(new Date().getDate() + i + 1)),
                end: new Date(new Date().setDate(new Date().getDate() + i + 1)),
                type: 'CLEANING',
                status: 'CONFIRMED',
                isSurgery: false
            }
        })

        // Treatment
        await prisma.treatment.create({
            data: {
                patientId: patient.id,
                description: 'Pose Implant - Secteur 14',
                cost: 450000,
                status: 'COMPLETED',
                category: 'SURGERY',
                date: new Date()
            }
        })

        // Invoice
        await prisma.invoice.create({
            data: {
                patientId: patient.id,
                amount: 450000,
                status: i % 2 === 0 ? 'PAID' : 'PENDING',
                items: {
                    create: [
                        { description: 'Implant Titane Grade 5', quantity: 1, unitPrice: 350000, total: 350000 },
                        { description: 'Acte Chirurgical', quantity: 1, unitPrice: 100000, total: 100000 },
                    ]
                }
            }
        })
    }

    // 4. STOCK & INVENTAIRE
    const items = [
        { name: 'Anesthésique Septodont', cat: 'Consommable', qty: 150, unit: 'Cartouches', price: 25000 },
        { name: 'Composites 3M Filtek', cat: 'Matériau', qty: 45, unit: 'Seringues', price: 45000 },
        { name: 'Gants Nitrile (M)', cat: 'Protection', qty: 1200, unit: 'Unités', price: 5000 },
        { name: 'Implants Straumann BLX', cat: 'Implantologie', qty: 12, unit: 'Unités', price: 185000 },
    ]

    for (const item of items) {
        await prisma.stockItem.create({
            data: {
                name: item.name,
                category: item.cat,
                quantity: item.qty,
                unit: item.unit,
                minQuantity: 10,
                isSterile: item.cat === 'Implantologie'
            }
        })
    }

    // 5. COMPTABILITÉ (Plan OHADA)
    const accounts = [
        { code: '521', name: 'Banque CBAO', type: 'ASSET' },
        { code: '571', name: 'Caisse Petit Cash', type: 'ASSET' },
        { code: '701', name: 'Ventes de Soins Dentaires', type: 'INCOME' },
        { code: '601', name: 'Achats Fournitures Dentaires', type: 'EXPENSE' },
    ]

    for (const acc of accounts) {
        await prisma.account.upsert({
            where: { code: acc.code },
            update: {},
            create: {
                code: acc.code,
                name: acc.name,
                type: acc.type
            }
        })
    }

    // 6. KNOWLEDGE BASE & PROTOCOLES
    await prisma.knowledgeBase.createMany({
        data: [
            { title: 'Protocole Stérilisation ISO', content: 'Nettoyage bac ultra-son (10 min), Rinçage, Séchage, Ensachage, Autoclave Prion B...', category: 'PROTOCOLE', isPublic: false },
            { title: 'Gestion Urgence Hémorragique', content: 'Compression locale, Pose de points de suture résorbables, Éponge hémostatique...', category: 'URGENCE', isPublic: false },
        ]
    })

    console.log('--- SEED ELITE TERMINE AVEC SUCCES ---')
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
