import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { path: "/", title: "Home" },
    ...(currentUser
      ? [{ path: "/create-post", title: "Create Post" }]
      : [
          { path: "/login", title: "Login" },
          { path: "/signup", title: "Sign up" },
        ]),
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const NavLink = ({ path, title, onClick, additionalClasses = "" }) => (
    <Link
      to={path}
      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-blue-400 ${
        path === location.pathname
          ? "text-blue-500 font-semibold dark:text-blue-400"
          : "text-gray-700 dark:text-gray-300"
      } ${additionalClasses}`}
      onClick={onClick}
    >
      {title}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                <span className="bg-gradient-to-tl from-blue-800 to-pink-800 text-transparent bg-clip-text">
                  &lt;Farhan's /&gt;
                </span>{" "}
                Blog
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.path} {...item} />
            ))}
          </nav>

          <div className="flex items-center">
            {currentUser ? (
              <div className="relative user-menu" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={currentUser.image || "/noavatar.png"}
                    alt={currentUser.name || "User avatar"}
                    className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                  />
                  <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentUser.name}
                  </span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 dark:bg-gray-800">
                    <Link
                      to="/user/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <AiOutlineUser className="inline-block mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <AiOutlineLogout className="inline-block mr-2" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-2">
                <NavLink path="/login" title="Login" />
                <NavLink path="/signup" title="Sign up" />
              </div>
            )}
            <button
              className="ml-4 md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="md:hidden bg-white dark:bg-gray-900"
          ref={mobileMenuRef}
        >
          <div className="px-2 pt-2 pb-3 text-center space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                {...item}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
