"use client"

import Image from "next/image"
import React, { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToFooter = (e) => {
    e.preventDefault();
    setMenuOpen(false); // Close menu after clicking
    const menuSection = document.getElementById('contact');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = (e) => {
    e.preventDefault();
    setMenuOpen(false); // Close menu after clicking
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Added relative and z-50 to ensure the dropdown stays on top of the carousel
    <div className="bg-black text-white relative z-50">
      <div className="flex w-[90%] mx-auto items-center py-1 pb-[5px] justify-between ">
        
        <div className="flex-[1.7] ml-[-20px] flex items-center">
          <Image
            src="/rea-logo.png"
            alt="restaurant-logo"
            width={500}
            height={40}
            className="w-[95px]"
          />
           <h3 className="text-[25px] hidden md:block font-bold  ">Funclassic Kitchen</h3>
        </div>
        <div className=" gap-[15px] items-center text-[20px] hidden md:flex">
          
          <span className="hover:text-[#FFD45A] cursor-pointer" onClick={scrollToFooter}>
            Contact Us
          </span>
          <span className="hover:text-[#FFD45A] cursor-pointer " onClick={scrollToMenu}>
            Order Now
          </span>
        
        </div>

        <div className="flex-2.1 flex justify-end font-extrabold text-center md:hidden ">
          <h3 className="text-[20px]">Funclassic Kitchen</h3>
        </div>

        <div className="flex-1 flex justify-end cursor-pointer md:hidden">
          {menuOpen ? (
            <FiX
              size={32}
              className="text-white"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <FiMenu
              size={32}
              className="text-[#FFD45A]/70"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* MENU CONTAINER */}
      <div
        className={`absolute w-full left-0 overflow-hidden transition-all md:hidden duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* ul with bg-blue-500 */}
        <ul className="flex flex-col items-center gap-4 py-4  text-lg bg-black font-bold shadow-xl">
          <li className="hover:text-[#FFD45A] cursor-pointer" onClick={scrollToMenu}>
            Order Now
          </li>
          <li className="hover:text-[#FFD45A] cursor-pointer" onClick={scrollToFooter}>
            Contact Us
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar