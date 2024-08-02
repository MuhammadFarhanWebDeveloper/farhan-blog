import LeftMenuItem from './LeftMenuItem'
import React from "react";
import { MdAttachMoney, MdDashboard,  MdShoppingBag, MdSupervisedUserCircle, } from 'react-icons/md'
const Sidebar = () => {
  const pagesList = [
    { title: "Dashboard", link: "/dashboard",icon: <MdDashboard/>},
    { title: "Products", link: "/dashboard/products", icon: <MdShoppingBag/>  },
    { title: "Add User", link: "/dashboard/create-user", icon:<MdSupervisedUserCircle /> },
    { title: "Transactions", link: "/dashboard/transactions",icon:<MdAttachMoney/>},
  ];

  return (
    <div className="min-h-screen w-1/4">
      <div className="user-logo mx-2 my-3 py-1 items-center flex gap-1">
        <div className="rounded-full overflow-hidden">
          <img
            src={"/noavatar.png"}
            width={50}
            height={50}
            alt={"User IMAGE"}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="userName font-semibold text-base">Farhan</p>
          <p className="userTitle opacity-60 text-base">Administrater</p>
        </div>
      </div>
      <div className="Lists flex flex-col">
        <div className="PagesList pl-3 flex gap-0 flex-col">
          <h2 className="pages font-bold">Pages</h2>
          <ul className=" py-0 p-2">
            {pagesList.map((item, index) => {
              return (
                <LeftMenuItem key={index} title={item.title} link={item.link} icon={item.icon} />
              );
            })}
          </ul>
        </div>
      
      </div>
    </div>
  );
};

export default Sidebar;
