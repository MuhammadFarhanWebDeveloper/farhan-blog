import React from 'react'
import LeftSidebar from './New folder/LeftSidebar'
import { Outlet } from 'react-router-dom'

function DashboardHome() {
  return (
    <div className='flex gap-2'>
      <LeftSidebar />

      <Outlet />
    </div>
  )
}

export default DashboardHome
