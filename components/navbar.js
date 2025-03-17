import React from 'react'
import { Input, InputGroup } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa";
import { Button, HStack } from '@chakra-ui/react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";

const Navbar = () => {

    return (

        <div className="bg-white shadow-md relative !px-12 !py-1.5">
            
            <div className='flex justify-between items-center'>


                <div className='flex justify-center !ml-10 !w-1/2'>
                    <InputGroup startElement={<FaSearch className='text-gray-400 ' />} className='shadow-sm'>
                        <Input 
                        placeholder='Search Records' 
                        className='text-gray-400 !text-lg !w-full !rounded-md'
                        />
                    </InputGroup>

                    <div className='flex items-center !ml-5 gap-10'>
                    <IoIosNotificationsOutline />
                    <IoSunnyOutline />
                </div>

                </div>

                <div>
                    <HStack>
                        <Button
                            variant='ghost'>
                            Dr Smith  <IoChevronDownSharp />
                        </Button>
                    </HStack>


                </div>

            </div>
        </div>

    )
}

export default Navbar