export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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
        const task = await prisma.task.create({
            data: {
                title: body.title,
                status: body.status || 'TODO',
                priority: body.priority || 'MEDIUM',
                category: body.category || 'ADMIN',
                patientId: body.patientId || null,
                dueDate: body.dueDate ? new Date(body.dueDate) : null
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
        const { id, ...data } = body
        const task = await prisma.task.update({
            where: { id },
            data: data
        })
        return NextResponse.json(task)
    } catch (error) {
        console.error("Failed to update task:", error)
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
    }
}
