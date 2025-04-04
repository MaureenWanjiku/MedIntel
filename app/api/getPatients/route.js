import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const currentPatients = await prisma.patient.findMany();
        return new NextResponse(JSON.stringify(currentPatients), {
            status: 200,
            headers: { "Content-Type" : "application/json" }
        })
    } catch(error) {
        console.error("Failed to Fetch Patients:", error)
        return new NextResponse(JSON.stringify({error: 'Failed to Fetch Patients'}), {
            status: 500,
            headers: { "Content-Type" : "application/json" }
        })
    }
}