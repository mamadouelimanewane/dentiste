
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('--- DEBUT DU SEED ELITE FULL (SENEGAL / FCFA) ---')

    // Nettoyage préventif (Optionnel, attention en prod)
    // await prisma.transaction.deleteMany() ...

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

    // 2. PATIENTS (Noms Sénégalais & VIP)
    const patientsData = [
        { first: 'Mamadou', last: 'Dia', email: 'm.dia@orange.sn', phone: '77 567 12 34', source: 'Instagram' },
        { first: 'Mariama', last: 'Sow', email: 'm.sow@gmail.com', phone: '78 123 45 67', source: 'Bouche à oreille' },
        { first: 'Ousmane', last: 'Gueye', email: 'o.gueye@netcourrier.sn', phone: '70 888 99 00', source: 'Campagne Google' },
        { first: 'Awa', last: 'Fall', email: 'awa.fall@yahoo.fr', phone: '76 555 44 33', source: 'Partenaire VIP' },
        { first: 'Jean-Pierre', last: 'Badji', email: 'jp.badji@tech.sn', phone: '77 000 11 22', source: 'Site Web' },
    ]

    for (const p of patientsData) {
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
                        medications: 'Metformine',
                        allergies: 'Pénicilline'
                    }
                }
            }
        })
    }

    const allPatients = await prisma.patient.findMany()
    const pMamadou = allPatients.find(p => p.firstName === 'Mamadou') || allPatients[0]
    const pMariama = allPatients.find(p => p.firstName === 'Mariama') || allPatients[1]
    const pOusmane = allPatients.find(p => p.firstName === 'Ousmane') || allPatients[2]

    // 3. RENDEZ-VOUS & TRAITEMENTS
    const today = new Date()

    // RDV Passé
    await prisma.appointment.create({
        data: {
            patientId: pMamadou.id,
            title: 'Consultation Initiale & Panoramique',
            start: new Date(new Date().setDate(today.getDate() - 2)),
            end: new Date(new Date().setDate(today.getDate() - 2)),
            type: 'CONSULTATION',
            status: 'COMPLETED',
        }
    })

    // RDV Futur
    await prisma.appointment.create({
        data: {
            patientId: pMariama.id,
            title: 'Pose Facettes (Secteur Antérieur)',
            start: new Date(new Date().setDate(today.getDate() + 3)),
            end: new Date(new Date().setDate(today.getDate() + 3)),
            type: 'ESTHETIC',
            status: 'CONFIRMED',
            isSurgery: false
        }
    })

    // Traitement
    await prisma.treatment.create({
        data: {
            patientId: pMamadou.id,
            description: 'Bilan Parodontal Complet',
            cost: 35000,
            status: 'COMPLETED',
            category: 'PARO',
            date: new Date()
        }
    })

    // 4. DEVIS (QUOTES) - Module Devis Multi-Options
    await prisma.quote.create({
        data: {
            patientId: pOusmane.id,
            title: 'Réhabilitation Implantaire Complète',
            status: 'SENT',
            total: 2450000,
            createdAt: new Date()
        }
    })

    // 5. ORDONNANCES (PRESCRIPTIONS)
    await prisma.prescription.create({
        data: {
            patientId: pMamadou.id,
            notes: 'Traitement post-opératoire extraction 48',
            items: {
                create: [
                    { medicationName: 'Amoxicilline 1g', dosage: '1 comprimé matin et soir', duration: '6 jours' },
                    { medicationName: 'Paracétamol 1g', dosage: 'En cas de douleur, max 3/jour', duration: '3 jours' },
                    { medicationName: 'Eludril', dosage: 'Bain de bouche 3x/jour', duration: '10 jours' }
                ]
            }
        }
    })

    // 6. DOCUMENTS (GED)
    await prisma.document.create({
        data: {
            patientId: pMariama.id,
            name: 'Consentement Éclairé - Facettes.pdf',
            url: 'https://example.com/consent.pdf',
            category: 'LEGAL',
            aiSummary: 'Patient informé des risques de sensibilité. Signature validée.',
            aiClassifiedAs: 'CONSENT_FORM'
        }
    })

    // 7. TRAÇABILITÉ STÉRILISATION (STERILIZATION LOGS)
    await prisma.sterilizationLog.create({
        data: {
            operator: 'Fatou Ndiaye',
            machineId: 'AUTOCLAVE-01',
            cycleNumber: 452,
            status: 'VALID',
            date: new Date(),
            instruments: 'Plateaux Chirurgie x3, Miroirs x10',
            notes: 'Cycle Prion 134°C - RAS'
        }
    })

    // 8. LABORATOIRE (LAB WORK)
    await prisma.labWork.create({
        data: {
            patientId: pOusmane.id,
            labName: 'Laboratoire Elite ProDakar',
            type: 'COURONNE_ZIRCONE',
            status: 'SENT',
            sentDate: new Date(),
            shade: 'A2',
            notes: 'Urgent pour RDV du 15/02'
        }
    })

    // 9. IMAGERIE (AI RADIO LAB)
    await prisma.image.create({
        data: {
            patientId: pMamadou.id,
            url: 'https://prod-images-static.radiopaedia.org/images/156828/0a1d60492863901614767448358249_jumbo.jpg',
            type: 'PANORAMIC',
            notes: 'Panoramique de contrôle pré-implant',
            metadata: JSON.stringify({ aiAnalysis: 'Perte osseuse secteur 46 détectée' })
        }
    })

    // 10. MARKETING & COMMUNICATION
    await prisma.communicationLog.create({
        data: {
            patientId: pMariama.id,
            type: 'SMS',
            category: 'REMINDER',
            content: 'Bonjour Mariama, rappel de votre RDV demain à 14h00 chez DentoPrestige.',
            status: 'DELIVERED'
        }
    })

    // 11. FINANCE & COMPTABILITÉ (OHADA / FACTURES)
    // Facture payée
    await prisma.invoice.create({
        data: {
            patientId: pMariama.id,
            amount: 1500000,
            status: 'PAID',
            type: 'STANDARD',
            items: {
                create: [
                    { description: 'Facettes Céramique E-Max (x4)', quantity: 4, unitPrice: 350000, total: 1400000 },
                    { description: 'Simulation Smile Design', quantity: 1, unitPrice: 100000, total: 100000 }
                ]
            }
        }
    })

    // Facture en attente
    await prisma.invoice.create({
        data: {
            patientId: pOusmane.id,
            amount: 50000,
            status: 'PENDING',
            items: {
                create: [
                    { description: 'Scanner 3D CBCT', quantity: 1, unitPrice: 50000, total: 50000 }
                ]
            }
        }
    })

    const accounts = [
        { code: '521', name: 'Banque CBAO', type: 'ASSET' },
        { code: '571', name: 'Caisse Petit Cash', type: 'ASSET' },
        { code: '701', name: 'Ventes Soins', type: 'INCOME' },
        { code: '601', name: 'Achats Materiel', type: 'EXPENSE' },
    ]

    for (const acc of accounts) {
        await prisma.account.upsert({
            where: { code: acc.code },
            update: {},
            create: { code: acc.code, name: acc.name, type: acc.type }
        })
    }

    // 12. SMILE DESIGN & SIMULATIONS
    await prisma.planningSimulation.create({
        data: {
            patientId: pMariama.id,
            type: 'SMILE_DESIGN',
            data: JSON.stringify({ template: 'HOLLYWOOD_WHITE', toothShape: 'OVAL' }),
            beforeImageUrl: 'https://example.com/before.jpg',
            afterImageUrl: 'https://example.com/after.jpg'
        }
    })

    // 13. TÂCHES INTERNES (TASKS)
    await prisma.task.createMany({
        data: [
            { title: 'Commander résine composite A3', status: 'TODO', priority: 'HIGH', category: 'ADMIN' },
            { title: 'Relancer laboratoire pour cas Ousmane', status: 'IN_PROGRESS', priority: 'MEDIUM', category: 'LAB' },
            { title: 'Vérifier calibration scanner 3D', status: 'DONE', priority: 'LOW', category: 'CLINICAL' }
        ]
    })

    // 14. STOCK GLOBAL
    const items = [
        { name: 'Anesthésique Septodont', cat: 'Consommable', qty: 142, unit: 'Cartouches' },
        { name: 'Gants Latex S', cat: 'Protection', qty: 850, unit: 'Unités' },
        { name: 'Implants Straumann', cat: 'Implantologie', qty: 8, unit: 'Kit', isSterile: true },
    ]

    for (const item of items) {
        await prisma.stockItem.create({
            data: {
                name: item.name,
                category: item.cat,
                quantity: item.qty,
                unit: item.unit,
                isSterile: item.isSterile || false
            }
        })
    }

    console.log('--- SEED ELITE COMPLET (ALL MODULES) TERMINE ---')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        // Check for specific unique constraint errors to avoid hard crashes if re-run
        await prisma.$disconnect()
        process.exit(1)
    })
