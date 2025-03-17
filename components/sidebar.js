'use client'

import { useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { FaMedrt } from "react-icons/fa6";
import { motion } from 'framer-motion';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const menu = [
    { name: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
    { name: 'Patients', icon: <FaUsers />, path: '/patients' },
    { name: 'AI Insights', icon: <RiRobot2Line />, path: '/insights' },
    { name: 'Settings', icon: <IoMdSettings />, path: '/settings' },
  ]

  return (
    <div>

      <div className='flex bg-emerald-50'>

        <motion.div
          animate={{ width: isOpen ? '250px' : '50px' }}
          className='h-screen flex flex-col text-black p-4 transition-all'
        >

          <div className='flex items-center justify-between !m-2'>
            <div className='flex items-center gap-2 '>
              <FaMedrt className='!text-4xl text-emerald-500' />
              <p className='!text-2xl text-emerald-500 !font-extrabold'>MedIntel</p>
            </div>

            <div>
            <button onClick={() => setIsOpen(!isOpen)}>
              <IoMdMenu className='!text-2xl text-black' />
            </button>
            </div>

           
          </div>


          <nav className='flex flex-col !m-8 gap-3'>
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className='flex items-center gap-2 !text-xl'>
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

        </motion.div>

      </div>

    </div>
  )
}

export default Sidebar