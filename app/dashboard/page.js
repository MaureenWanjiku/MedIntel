import React from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

const Dashboard = () => {
    return (
        <div className='flex h-screen'>

            <div className='!mt-4'>
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 !mt-4">
                <Navbar />
            </div>

        </div>
    )
}

export default Dashboard