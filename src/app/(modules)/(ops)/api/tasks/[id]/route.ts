export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { updateTaskSchema, formatZodErrors } from "@/lib/validations"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const task = await prisma.task.findUnique({
            where: { id: params.id },
            include: { patient: true }
        })

        if (!task) return new NextResponse("Not Found", { status: 404 })
        return NextResponse.json(task)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        if (!id) return NextResponse.json({ error: "Task ID is required" }, { status: 400 })

        const body = await req.json()
        const parsed = updateTaskSchema.safeParse({ ...body, id })

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: formatZodErrors(parsed.error) },
                { status: 400 }
            )
        }

        const data = parsed.data
        const { id: _, ...updateData } = data as any

        if (data.dueDate) updateData.dueDate = new Date(data.dueDate)

        const updatedTask = await prisma.task.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json(updatedTask)
    } catch (error: any) {
        console.error("Failed to update task:", error)
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Tâche non trouvée" }, { status: 404 })
        }
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        if (!id) return NextResponse.json({ error: "Task ID is required" }, { status: 400 })

        await prisma.task.delete({
            where: { id }
        })

        return NextResponse.json({ success: true, message: "Tâche supprimée" })
    } catch (error: any) {
        console.error("Failed to delete task:", error)
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
    }
}
