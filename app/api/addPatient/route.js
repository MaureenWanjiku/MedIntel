import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req) {

    if (req.method === 'POST') {

        try {
            const { firstName, lastName, email, phone, gender, dateOfBirth, primaryDiagnosis, notes } = await req.json()

            const formattedDate = new Date(dateOfBirth)

            const newPatient = await prisma.patient.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    gender,
                    dateOfBirth: formattedDate,
                    primaryDiagnosis, 
                    notes,
                },
            });

            return NextResponse.json( newPatient, { status: 201 })

        } catch (error) {
            console.error('Error Adding Patient:', error)
            return NextResponse.json({error: 'Something went wrong'})
        }   
    } 

}