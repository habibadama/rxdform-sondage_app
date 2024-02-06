import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../isAuthenticated/isAuthenticated";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-row justify-between p-5 px-5 md:px-32 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div>
          <Link to="/" className=" font-semibold text-2xl p-1 cursor-pointer">
            RxDForm
          </Link>
        </div>

        <nav className="hidden md:flex gap-5 font-medium p-1 text-lg">
          <Link
            to="/"
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Accueil
          </Link>
          <Link
            to="/sondages"
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Créer un sondage
          </Link>
          <Link
            to="/mes-sondages"
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Mes sondages
          </Link>
          {isAuthenticated() && (
            <Link
              to="/"
              className="hover:text-[#539165] transition-all cursor-pointer"
              onClick={handleLogout}
            >
              Déconnexion
            </Link>
          )}
        </nav>

        <div className="flex md:hidden" onClick={handleChange}>
          <div className=" p-2">
            <AiOutlineMenu size={22} />
          </div>
        </div>
      </div>
      <div
        className={` ${
          menu ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col absolute bg-[#ffffff] left-0 top-20 font-medium text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 `}
      >
        <Link
          to="/"
          className="hover:text-[#539165] transition-all cursor-pointer"
        >
          Accueil
        </Link>
        <Link
          to="/sondages"
          className="hover:text-[#539165] transition-all cursor-pointer"
        >
          Créer un sondage
        </Link>
        <Link
          to="mes-sondages"
          className="hover:text-[#539165] transition-all cursor-pointer"
        >
          Mes sondages
        </Link>
        {isAuthenticated() && (
          <Link
            to="/"
            className="hover:text-[#539165] transition-all cursor-pointer"
            onClick={handleLogout}
          >
            Déconnexion
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
