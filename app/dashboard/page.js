'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { Button, HStack } from '@chakra-ui/react'
import { TbUsersPlus } from "react-icons/tb";
import { LuUpload } from "react-icons/lu";
import { Box } from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { RiRobot2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import NewPatient from '@/components/newPatient'

const Dashboard = () => {
    const [isdialogOpen, setIsdialogOpen] = useState(false)
    const [patients, setPatients] = useState([])

    const calculateAge = (dob) => {

        if (!dob) return "N/A";

        const dateOfBirth = new Date(dob);
        const today = new Date()

        let age = today.getFullYear() - dateOfBirth.getFullYear()

        return age >= 0 ? age : "Invalid DOB"

    }

    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A";
        return new Date(timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    
    useEffect(() => {

        const fetchPatients = async () => {

            try {

                const response = await fetch('/api/getPatients')

                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()


                console.log(data)

                setPatients(data)

            } catch (error) {
                console.error('Something went wrong:', error)
            }
        }

        fetchPatients()

    }, [])

    console.log('Test:', patients)

   

    return (
        <div className='flex h-screen'>


            <div className='!mt-4'>
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 !mt-4">
                <Navbar />

                <div className='flex justify-between !p-6 !mt-6'>


                    <div className="!px-2 !py-4 !ml-5 !rounded-2xl !text-white !text-center !bg-gradient-to-r !from-emerald-500 !to-emerald-700 !shadow-lg !max-w-lg ">
                        <p className="!text-2xl !font-extrabold !tracking-wide">
                            Good Afternoon, Dr. Smith!
                        </p>
                        <p className="!text-lg !font-bold !opacity-80 !mt-2">
                            Welcome onboard. We’re glad to have you here.
                        </p>
                    </div>

                    <div className='!mr-5'>
                        <HStack>
                            <Button variant='solid' onClick={() => setIsdialogOpen(true)} rounded='md' className='!bg-emerald-500' fontSize='1.05rem' fontWeight='bold'>
                                <TbUsersPlus className='stroke-3' /> Add Patients
                            </Button>

                            <NewPatient isOpen={isdialogOpen} onClose={() => setIsdialogOpen(false)} />

                            <Button variant='outline' rounded='md' fontSize='1rem' fontWeight='bold'>
                                <LuUpload className='stroke-2' /> Export Data
                            </Button>

                            <Button variant='solid' onClick={() => setIsdialogOpen(true)} rounded='md' className='!bg-emerald-500' fontSize='1.05rem' fontWeight='bold'>
                                <RiRobot2Line className='stroke-1' /> Predict
                            </Button>
                        </HStack>
                    </div>
                </div>

                {/* Cards */}

                <div className='flex justify-between items-center !ml-6 !mt-5 !p-6'>
                    <Box borderWidth='1px' className='!px-8 !py-3 !rounded-md'>
                        <p className='!text-xl !font-semibold !mb-1.5'>Total Patients</p>
                        <p className='!text-lg !font-medium !mb-1.5'>1200</p>
                        <p className='!text-sm !text-emerald-500'>+12.5%</p>
                    </Box>

                    <Box borderWidth='1px' className='!px-8 !py-3 !rounded-md'>
                        <p className='!text-xl !font-semibold !mb-1.5'>Active Cases</p>
                        <p className='!text-lg !font-medium !mb-1.5'>483</p>
                        <p className='!text-sm !text-red-500'>-2.5%</p>
                    </Box>

                    <Box borderWidth='1px' className='!px-8 !py-3 !rounded-md'>
                        <p className='!text-xl !font-semibold !mb-1.5'>All predictions</p>
                        <p className='!text-lg !font-medium !mb-1.5'>96.5</p>
                        <p className='!text-sm !text-emerald-500'>+0.9%</p>
                    </Box>

                    <Box borderWidth='1px' marginRight='20px' className='!px-8 !py-3 !rounded-md'>
                        <p className='!text-xl !font-semibold !mb-1.5'>Appointments</p>
                        <p className='!text-lg !font-medium !mb-1.5'>12</p>
                        <p className='!text-sm '>Today</p>
                    </Box>
                </div>

                {/* Table */}
                <div className='flex justify-between items-center !ml-5 !p-6'>
                    <Table.Root size='sm' interactive>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader className='!text-xl !font-semibold'>Name</Table.ColumnHeader>
                                <Table.ColumnHeader className='!text-xl !font-semibold'>Age</Table.ColumnHeader>
                                <Table.ColumnHeader className='!text-xl !font-semibold'>Gender</Table.ColumnHeader>
                                <Table.ColumnHeader className='!text-xl !font-semibold'>Diagnosis</Table.ColumnHeader>
                                <Table.ColumnHeader className='!text-xl !font-semibold'>Last Visit</Table.ColumnHeader>
                                <Table.ColumnHeader className='!text-xl !font-semibold'>Status</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {patients.map((patient) => (
                                <Table.Row key={patient.id} className='!font-xl !p-5 group hover:bg-gray-100 transition'>
                                    <Table.Cell> {patient.firstName} {patient.lastName} </Table.Cell>
                                    <Table.Cell> {calculateAge(patient.dateOfBirth)} </Table.Cell>
                                    <Table.Cell> {patient.gender} </Table.Cell>
                                    <Table.Cell> {patient.primaryDiagnosis} </Table.Cell>
                                    <Table.Cell> {formatDate(patient.createdAt)} </Table.Cell>
                                    <Table.Cell> <span
                                        className={`inline-flex items-center rounded-full !px-2.5 !py-1 !text-sm !font-medium
                                        ${patient.status == 'stable' ? "bg-green-50 text-green-700 dark:bg-green-500/20 dark:text-green-400" : ""}
                                        ${patient.status === "Review" ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400" : ""}
                                        ${patient.status === "Improving" ? "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" : ""}`}
                                    >
                                        {patient.status}
                                    </span>

                                    </Table.Cell>
                                    <Table.Cell className="relative">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          <FiEdit />
        </span>
      </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>

            </div>






        </div>
    )
}

export default Dashboard