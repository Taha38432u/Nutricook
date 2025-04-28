import { useState } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUser from "../services/authentication/useUser.js";
import UserNav from "./UserNav";
import AdminNav from "./AdminNav";
import Logo from "./Logo";

function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading, user } = useUser();
  const navigate = useNavigate(); // ← for redirecting

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // ← remove the token
    navigate("/login"); // ← redirect to login page
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-gray-800 p-5 shadow-md">
      <div className="flex items-center justify-between">
        <Logo />

        <button
          className="ml-auto text-3xl text-white md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul
          className={`fixed right-0 top-0 h-screen w-64 bg-gray-800 p-7 pt-20 text-white shadow-lg transition-transform duration-500 ease-in md:relative md:flex md:h-auto md:w-auto md:items-center md:p-0 md:shadow-none ${
            isMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
        >
          <li className="absolute right-5 top-5 md:hidden">
            <button
              className="text-3xl text-white"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <FaTimes />
            </button>
          </li>

          {user.user.role === "user" && <UserNav />}
          {user.user.role === "admin" && <AdminNav />}

          <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
            <FaSignOutAlt />
            <button
              className="text-lg font-bold hover:text-blue-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MainNav;
