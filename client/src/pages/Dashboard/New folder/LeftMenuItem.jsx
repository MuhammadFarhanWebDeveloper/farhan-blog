import { Link } from "react-router-dom";
import React from "react";

function LeftMenuItem({ title, link, icon }) {
  return (
    <li className="">
      <Link
        to={link}
        className="p-2 hover:bg-gray-600 flex rounded gap-2 items-center"
      >
        {icon}
        {title}
      </Link>
    </li>
  );
}

export default LeftMenuItem;
