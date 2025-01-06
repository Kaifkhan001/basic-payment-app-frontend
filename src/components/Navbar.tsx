import { useNavigate } from "react-router-dom";
import {   useRecoilState } from "recoil";
import {  dataAtom } from "../store/store.js";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
    const [data, setData] = useRecoilState(dataAtom);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
      setData(data);

    }, [ data, setData])
    
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
      navigate(path);
    };

    const handleMenuClick = () => {
      setIsMenuOpen(!isMenuOpen);
    }

    const handleClick = (path: string) => {
      navigate(path);
    }
    
  return (
    <div className="bg-black text-white px-6">
      <nav className="flex items-center justify-between py-3 ">
        <div
          className={`menuBar z-50 absolute top-0 right-0 w-4/5 flex-col h-3/5 bg-gray-900 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <div className="w-full h-[6vh] px-6 pt-6 flex items-center justify-end">
            <ImCross onClick={handleMenuClick} />
          </div>
          <h1 className="text-3xl w-full py-3 flex items-center justify-center pb-12">
            Menu
          </h1>
          {data && (
            <ul>
              <li
                onClick={() => {handleClick("/home")
                  handleMenuClick();
                }}
                className="w-full h-6 border-b-2 border-gray-600 mb-8 hover:bg-gray-700 py-8 flex items-center justify-center text-xl "
              >
                HOME
              </li>
              <li
                onClick={() => {handleClick("/logout")
                  handleMenuClick();
                }}
                className="w-full h-6 border-b-2 border-gray-600 mb-4 pb-8 flex items-center justify-center text-xl "
              >
                LOGOUT
              </li>
            </ul>
          )}
          {!data && (
            <ul>
              <li
                onClick={() => {handleClick("/signup"); handleMenuClick();}}
                className="w-full h-6 border-b-2 border-gray-600 mb-8 hover:bg-gray-700 py-8 flex items-center justify-center text-xl "
              >
                SIGN-UP
              </li>
              <li
                onClick={() => {handleClick("/signin"); handleMenuClick()}}
                className="w-full h-6 border-b-2 border-gray-600 mb-4 pb-8 flex items-center justify-center text-xl "
              >
                SIGN-IN
              </li>
            </ul>
          )}
        </div>
        <img src="./images/logo.png" alt="logo" width={75} height={75} />
        <div className="sm:hidden flex">
          <MdMenu
            onClick={handleMenuClick}
            color="white"
            className="w-[3rem] text-3xl"
          />
        </div>
        <ul className="sm:flex gap-4 pr-6 hidden">
          {data && (
            <div className="flex gap-4">
              <button
                onClick={() => handleNavigation("/home")}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/logout")}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                Logout
              </button>
            </div>
          )}
          {!data && (
            <div className="flex gap-4">
              <button
                onClick={() => handleNavigation("/signup")}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                Signup
              </button>
              <button
                onClick={() => handleNavigation("/signin")}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                Signin
              </button>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar
