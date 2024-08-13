import NavListItem from "./NavListItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../../redux/theme/themeSlice";
import {
  MdDiscFull,
  MdOutlineDarkMode,
  MdOutlineSearch,
  MdOutlineWbSunny,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { AiOutlineLogout, AiTwotoneIdcard } from "react-icons/ai";

function Navbar() {
  const dispetch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const logout = async () => {
    const response = await fetch(`${VITE_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (data.success) {
      console.log("success");
      navigate("/login");
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      setIsUserMenuOpened(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`p-3 flex items-center justify-around border-b `}>
      {/* LOGO */}
      <div className="font-bold">
        <span className="bg-red-500 bg-gradient-to-tl from-blue-800 to-pink-800 rounded p-1">
          &lt;Farhan's /&gt;
        </span>{" "}
        Blog
      </div>
      {/* LOGO */}

      {/* SEARCH-BAR */}
      <form className={`flex gap-2 items-center rounded p-1`}>
        <input
          type="text"
          className="outline-none bg-transparent "
          placeholder="Search"
        />
        <MdOutlineSearch size={20} />
      </form>
      {/* SEARCH-BAR */}

      {/* NAV-ITEMS */}
      <ul className="flex items-center gap-6">
        <NavListItem path={"/"} title={"Home"} />

        {currentUser ? (
          <NavListItem path={"/create-post"} title={"Create Post"} />
        ) : (
          <>
            <NavListItem path={"/login"} title={"Login"} />
            <NavListItem path={"/signup"} title={"Sign up"} />
          </>
        )}
      </ul>
      {/* NAV-ITEMS */}

      {/* CONTROLS */}
      <div className="flex items-center gap-5">
        <div
          className={`border cursor-pointer rounded-full p-2`}
          onClick={() => {
            dispetch(toggleTheme());
          }}
        >
          {theme == "light" ? (
            <MdOutlineDarkMode size={20} />
          ) : (
            <MdOutlineWbSunny size={20} />
          )}
        </div>
        <div>
          {currentUser ? (
            <>
              <div
                className="cursor-pointer m-auto w-[40px] h-[40px] overfow-hidden rounded-full"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsUserMenuOpened(!isUserMenuOpened);
                }}
              >
                <img
                  src={currentUser.image || "noavatar.png"}
                  alt="Avatar"
                  className="rounded-full h-full border "
                  width={100}
                />
              </div>
              {isUserMenuOpened && (
                <ul className="bg-gray-500 rounded p-1 py-3 absolute flex flex-col gap-2 mt-1 right-10">
                  <li className="hover:bg-gray-900 h-10 rounded">
                    <Link
                      className="px-5 text-center w-full  h-full flex justify-center items-center"
                      to={`/user/dashboard`}
                    >
                      See Profile
                    </Link>
                  </li>
                  <hr />
                  <li className="hover:bg-gray-900 h-10 rounded">
                    <div
                      className="text-center w-full h-full flex justify-around items-center"
                      onClick={logout}
                    >
                      <AiOutlineLogout />
                      <p>Logout</p>
                    </div>
                  </li>
                </ul>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* CONTROLS */}
    </nav>
  );
}

export default Navbar;
