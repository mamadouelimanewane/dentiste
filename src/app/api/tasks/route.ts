export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createTaskSchema, updateTaskSchema, formatZodErrors } from "@/lib/validations"

export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(tasks)
    } catch (error) {
        console.error("Failed to fetch tasks:", error)
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validation Zod
        const parsed = createTaskSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data

        const task = await prisma.task.create({
            data: {
                title: data.title,
                status: data.status || 'TODO',
                priority: data.priority || 'MEDIUM',
                category: data.category || 'ADMIN',
                patientId: data.patientId || null,
                dueDate: data.dueDate ? new Date(data.dueDate) : null
            }
        })
        return NextResponse.json(task)
    } catch (error) {
        console.error("Failed to create task:", error)
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json()

        // Validation Zod
        const parsed = updateTaskSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const { id, ...updateData } = parsed.data
        const task = await prisma.task.update({
            where: { id },
            data: updateData
        })
        return NextResponse.json(task)
    } catch (error) {
        console.error("Failed to update task:", error)
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
    }
}
