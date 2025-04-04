'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, CloseButton, Dialog, GridItem, Portal } from "@chakra-ui/react"
import { Field, Input } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { Grid } from '@chakra-ui/react'
import { SiTicktick } from "react-icons/si";
import { Alert, Stack } from "@chakra-ui/react";

const NewPatient = ({ isOpen, onClose }) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [primaryDiagnosis, setPrimaryDiagnosis] = useState('')
    const [notes, setNotes] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const router = useRouter()

    const SuccessAlert = ({ success, setSuccess }) => {
        if (!success) return null;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSubmitting(true);

        setError(null);

        const patientForm = {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            email,
            phone,
            primaryDiagnosis,
            notes,
        };

        try {

            const response = await fetch("/api/addPatient", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patientForm)
            })

            if (response.ok) {

                setSuccess(true)

                setTimeout(() => {
                    setSuccess(false)
                    router.push('/dashboard')
                }, 2000)
            } else {
                console.error('Failed to Add Patient')
            }

            const result = await response.json()

            console.log('Patient added successfully:', result)

            setFirstName(''),
                setLastName(''),
                setDateOfBirth(''),
                setGender(''),
                setEmail(''),
                setPhone(''),
                setPrimaryDiagnosis(''),
                setNotes('')

        } catch (err) {
            setError(err)
        } finally {
            setSubmitting(false)
        }

    }

    return (

        <>

            <Stack gap="4" width="full" className="fixed bottom-4 right-4">
                <Alert.Root status="success" className="bg-green-100 p-4 rounded-md shadow-md flex items-center gap-2">
                    <Alert.Indicator />
                    <SiTicktick className="text-green-500 text-xl" />
                    <Alert.Title>Patient Added Successfully</Alert.Title>
                    <button
                        onClick={() => setSuccess(false)}
                        className="ml-auto text-sm text-green-800 font-semibold"
                    >
                        Dismiss
                    </button>
                </Alert.Root>
            </Stack>


            <Dialog.Root open={isOpen} onClose={onClose}>
                <Portal>
                    <Dialog.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                    <Dialog.Positioner className="fixed inset-0 flex items-center justify-center">
                        <Dialog.Content className="bg-white !p-4 rounded-lg shadow-lg" maxW="750px" w="90%">

                            <form onSubmit={handleSubmit}>
                                {/* Header */}
                                <Dialog.Header>
                                    <Flex justify="space-between" align="center" w="full">
                                        <Dialog.Title fontSize="3xl" fontWeight="bold">Add a New Patient</Dialog.Title>
                                        <CloseButton size="xl" onClick={onClose} />
                                    </Flex>
                                </Dialog.Header>

                                {/* Body */}
                                <Dialog.Body>
                                    <Grid templateRows="repeat(5, 1fr)" templateColumns="repeat(2, 1fr)" gap={8}>

                                        {/* First Name */}
                                        <div>
                                            <label className="block text-lg font-medium">First Name <span className="text-red-500">*</span></label>
                                            <Input
                                                placeholder="John"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>

                                        {/* Last Name */}
                                        <div>
                                            <label className="block text-lg font-medium">Last Name <span className="text-red-500">*</span></label>
                                            <Input
                                                placeholder="Doe"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <label className="block text-lg font-medium">Date of Birth <span className="text-red-500">*</span></label>
                                            <Input
                                                type="date"
                                                value={dateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                            />
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <label className="block text-lg font-medium">Gender <span className="text-red-500">*</span></label>
                                            <Input
                                                placeholder="Enter gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-lg font-medium">Email <span className="text-red-500">*</span></label>
                                            <Input
                                                type="email"
                                                placeholder="johndoe@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-lg font-medium">Phone Number <span className="text-red-500">*</span></label>
                                            <Input
                                                type="tel"
                                                placeholder="Enter phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>

                                        {/* Primary Diagnosis */}
                                        <GridItem colSpan={2}>
                                            <div>
                                                <label className="block text-lg font-medium">Primary Diagnosis <span className="text-red-500">*</span></label>
                                                <Input
                                                    placeholder="Asthma"
                                                    value={primaryDiagnosis}
                                                    onChange={(e) => setPrimaryDiagnosis(e.target.value)}
                                                />
                                            </div>
                                        </GridItem>

                                        {/* Notes */}
                                        <GridItem colSpan={2}>
                                            <div>
                                                <label className="block text-lg font-medium">Notes</label>
                                                <Input
                                                    placeholder="Enter any additional information about the patient"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                />
                                                <p className="text-sm text-gray-500">Include any relevant medical history or special considerations.</p>
                                            </div>
                                        </GridItem>

                                        {error && <p className="!text-red-500">{error?.message || String(error)}</p>}


                                    </Grid>
                                </Dialog.Body>

                                {/* Footer */}
                                <Dialog.Footer>
                                    <Button variant="outline" onClick={onClose} fontSize="lg">Cancel</Button>
                                    <Button type="submit" disabled={submitting} fontSize="lg" className="!bg-emerald-500">
                                        {submitting ? 'Submitting...' : 'Add Patient'}
                                    </Button>
                                </Dialog.Footer>

                            </form>

                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>



    )
}

export default NewPatient