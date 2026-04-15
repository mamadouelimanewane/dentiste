export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// API pour la gestion des utilisateurs et des rôles
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                permissions: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                name: 'asc'
            }
        })

        return NextResponse.json(users)
    } catch (error) {
        console.error("Failed to fetch users:", error)
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, name, role, permissions, password } = body

        if (!email || !role) {
            return NextResponse.json({ error: "Email and role are required" }, { status: 400 })
        }

        const user = await prisma.user.create({
            data: {
                email,
                name,
                role,
                permissions: permissions ? JSON.stringify(permissions) : null,
                password // Note: En production, hacher le mot de passe !
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error("Failed to create user:", error)
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const { id, email, name, role, permissions } = body

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 })
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                email,
                name,
                role,
                permissions: permissions ? JSON.stringify(permissions) : null
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error("Failed to update user:", error)
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 })
        }

        await prisma.user.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to delete user:", error)
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
    }
}
