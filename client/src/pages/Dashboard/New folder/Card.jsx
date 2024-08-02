import React from 'react'
import { MdSupervisedUserCircle } from 'react-icons/md'

function Card() {
  return (
    <div className='bg-gray-700 rounded w-full p-2 flex gap-3'>
      <div className="left">
        <MdSupervisedUserCircle size={24}/>
      </div>
      <div className="right flex flex-col gap-2">
        <h2>Total Users</h2>
        <p className='font-bold'>1000</p>
        <p><span className='text-green-300'>12%</span> more than previous week</p>
      </div>
    </div>
  )
}

export default Card
