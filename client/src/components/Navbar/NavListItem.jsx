import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavListItem({ path, title }) {
  const location = useLocation();
  return (
    <li
      className={`hover:border-b-2  ${
        location.pathname == path && "border-b-2 border-blue-700"
      }`}
    >
      <Link className="font-bold" to={path}>
        {title}
      </Link>
    </li>
  );
}

export default NavListItem;
