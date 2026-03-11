import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import path from "path"

const DICTATION_DIR = path.join(process.cwd(), "data", "dictations")
const DICTATION_FILE = path.join(DICTATION_DIR, "records.json")

async function ensureDir() {
    await mkdir(DICTATION_DIR, { recursive: true })
}

export async function GET() {
    try {
        await ensureDir()
        let records: any[] = []
        try {
            const raw = await readFile(DICTATION_FILE, "utf-8")
            records = JSON.parse(raw)
        } catch {
            records = []
        }
        return NextResponse.json({
            records,
            savePath: DICTATION_FILE
        })
    } catch (error) {
        return NextResponse.json({ error: "Failed to load records" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        await ensureDir()
        const body = await req.json()
        const { type, text, date } = body

        let records: any[] = []
        try {
            const raw = await readFile(DICTATION_FILE, "utf-8")
            records = JSON.parse(raw)
        } catch {
            records = []
        }

        const newRecord = {
            id: Date.now(),
            type,
            text,
            date: date || new Date().toLocaleString("fr-FR"),
            savedAt: new Date().toISOString()
        }

        records.unshift(newRecord)
        await writeFile(DICTATION_FILE, JSON.stringify(records, null, 2), "utf-8")

        return NextResponse.json({ success: true, record: newRecord, savePath: DICTATION_FILE })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to save record" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        await ensureDir()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        let records: any[] = []
        try {
            const raw = await readFile(DICTATION_FILE, "utf-8")
            records = JSON.parse(raw)
        } catch {
            records = []
        }

        records = records.filter((r: any) => String(r.id) !== String(id))
        await writeFile(DICTATION_FILE, JSON.stringify(records, null, 2), "utf-8")

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete record" }, { status: 500 })
    }
}
