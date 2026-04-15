import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const appointments = await prisma.appointment.findMany({
            where: { patientId: params.id },
            include: { patient: true }
        })

        if (appointments.length === 0) {
            return new NextResponse("No appointments found", { status: 404 })
        }

        // Simple vCalendar generation
        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//DentisteApp//NONSGML v1.0//EN\n"

        appointments.forEach(app => {
            icsContent += "BEGIN:VEVENT\n"
            icsContent += `UID:${app.id}@dentiste.app\n`
            icsContent += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`
            icsContent += `DTSTART:${app.start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`
            icsContent += `DTEND:${app.end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`
            icsContent += `SUMMARY:Dentiste: ${app.title}\n`
            icsContent += `DESCRIPTION:Rendez-vous pour ${app.patient.firstName} ${app.patient.lastName}\n`
            icsContent += "END:VEVENT\n"
        })

        icsContent += "END:VCALENDAR"

        return new NextResponse(icsContent, {
            headers: {
                "Content-Type": "text/calendar",
                "Content-Disposition": `attachment; filename="appointments.ics"`
            }
        })
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
