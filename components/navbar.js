import React from 'react'
import { Input, InputGroup } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa";
import { Button, HStack } from '@chakra-ui/react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";
import { FaMedrt } from "react-icons/fa6";
import { Menu, Portal } from '@chakra-ui/react';

const Navbar = () => {

    return (

        <div className="bg-white shadow-md relative !px-12 !py-1.5">
            
            <div className='flex justify-between items-center'>

            <div className='flex items-center gap-2 '>
              <FaMedrt className='!text-4xl text-emerald-500' />
              {/* <p className='!text-2xl text-emerald-500 !font-extrabold'>MedIntel</p> */}
            </div>


                <div className='flex justify-center !ml-10 !w-1/2'>
                    <InputGroup startElement={<FaSearch className='text-gray-400 ' />} className='shadow-sm'>
                        <Input 
                        placeholder='Search Records' 
                        className='text-gray-400 !w-full !rounded-md'
                        fontSize='lg'
                        />
                    </InputGroup>

                    <div className='flex items-center !ml-5 gap-10'>
                    <IoIosNotificationsOutline />
                    <IoSunnyOutline />
                </div>

                </div>

                <div>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                        <HStack>
                        <Button
                            variant='ghost'>
                            Dr Smith  <IoChevronDownSharp />
                        </Button>
                    </HStack>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value='profile'>Profile</Menu.Item>
                                    <Menu.Item value='settings'>Settings</Menu.Item>
                                    <Menu.Item value='logout'>Log Out</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                    


                </div>

            </div>
        </div>

    )
}

export default Navbar