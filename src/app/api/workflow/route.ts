import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const patients = await prisma.patient.findMany({
            where: {
                workflowStatus: {
                    not: null
                }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                workflowStatus: true,
                updatedAt: true
            }
        })

        return NextResponse.json(patients)
    } catch (error) {
        console.error("Failed to fetch workflow patients:", error)
        return NextResponse.json({ error: "Failed to fetch workflow" }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const { id, workflowStatus } = body

        const patient = await prisma.patient.update({
            where: { id },
            data: { workflowStatus },
            include: { communications: true }
        })

        // Déclencher la préparation clinique
        if (workflowStatus === 'PHASE_4_ACTES') {
            await prisma.task.create({
                data: {
                    patientId: patient.id,
                    title: `Préparer le plateau technique pour ${patient.firstName}`,
                    priority: 'HIGH',
                    category: 'CLINICAL'
                }
            })
            console.log(`[ELITE CONNECT] Tâche ajoutée : Préparation pour ${patient.firstName}`)
        }

        // Déclencher l'alerte administrative
        if (workflowStatus === 'PHASE_5_ADMIN') {
            await prisma.task.create({
                data: {
                    patientId: patient.id,
                    title: `Vérifier la FSE et le règlement de ${patient.firstName}`,
                    priority: 'URGENT',
                    category: 'ADMIN'
                }
            })
            console.log(`[ELITE CONNECT] Tâche ajoutée : Facturation pour ${patient.firstName}`)
        }

        // Déclencher le suivi Post-Op et la fin de traitement
        if (workflowStatus === 'PHASE_6_SUIVI') {
            const message = `Félicitations ${patient.firstName} ! Votre traitement est terminé. 🎉 Un assistant vous contactera pour s'assurer que tout se passe bien. N'oubliez pas vos soins ! 🦷`

            await prisma.communicationLog.create({
                data: {
                    patientId: patient.id,
                    type: 'WHATSAPP',
                    category: 'POST_OP',
                    content: message,
                    status: 'DELIVERED'
                }
            })
            console.log(`[ELITE CONNECT] Suivi Post-Op automatisé pour ${patient.firstName}`)
        }

        return NextResponse.json(patient)
    } catch (error) {
        console.error("Failed to update patient workflow:", error)
        return NextResponse.json({ error: "Failed to update workflow" }, { status: 500 })
    }
}
