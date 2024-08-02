import React from 'react'
import { MdChangeCircle, MdDelete, MdOutlineSecurityUpdateGood, MdSystemUpdateAlt, MdTipsAndUpdates, MdUpdate } from 'react-icons/md';
import { Link } from 'react-router-dom';

function ShowUsers() {
    const users = [
        {
            id:1,
            username:"Farhan",
            userEmail:"farhan@farhan.com",
            isAdmin:false,
            createdAt:"23.6.2024",
        },
        {
            id:1,
            username:"Farhan",
            userEmail:"farhan@farhan.com",
            isAdmin:true,
            createdAt:"23.6.2024",

        },
        {
            id:1,
            username:"Farhan",
            userEmail:"farhan@farhan.com",
            isAdmin:false,
            createdAt:"23.6.2024",
        },
        {
            id:1,
            username:"Farhan",
            userEmail:"farhan@farhan.com",
            isAdmin:false,
            createdAt:"23.6.2024",

        }
    ]
  return (
    <div className="mx-auto bg-gray-700 rounded w-fit">
      <h1 className="text-2xl font-bold text-center text-purple-500 mb-4">Users</h1>
      <table >
        <thead>
          <tr>
            <th className="text-start py-2 px-6 border-b">Username</th>
            <th className="text-start py-2 px-6 border-b">UserEmail</th>
            <th className="text-start py-2 px-6 border-b">IsAdmin</th>
            <th className="text-start py-2 px-6 border-b">CreatedAt</th>
            <th className="text-start py-2 px-6 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={index}>
                <td className="py-2 px-6 border-b">{user.username}</td>
                <td className="py-2 px-6 border-b">{user.userEmail}</td>
                <td className="py-2 px-6 border-b">{user.isAdmin ? "Admin":"Client"}</td>
                <td className="py-2 px-6 border-b">{user.createdAt}</td>
                <td className="py-2 px-6 border-b">
                  <div className='flex items-center gap-2 justify-center'>
                  <Link to={`/dasboard/delete-user/${user.id}`}><MdDelete/></Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ShowUsers
