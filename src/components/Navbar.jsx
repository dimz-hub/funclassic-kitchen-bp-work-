"use client"

import Image from "next/image"
import React, { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { useSelector } from "react-redux"
import { FiShoppingCart } from "react-icons/fi"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-black text-white">
      <div className="flex w-[90%] mx-auto items-center py-1 pb-[5px] justify-between">
        
        <div className="flex-[1.7] ml-[-20px]">
          <Image
            src="/rea-logo.png"
            alt="restaurant-logo"
            width={500}
            height={40}
            className="w-[95px]"
          />

        </div>
        <div className="flex-2.1 flex justify-end font-extrabold text-center">
          <h3 className="text-[20px]">Funclassic Kitchen</h3>
        </div>

        <div className="flex-1 flex justify-end cursor-pointer">
        
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

      {/* MENU */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 text-lg">
          <li className="hover:text-[#FFD45A] cursor-pointer">About Us</li>
          <li className="hover:text-[#FFD45A] cursor-pointer">Order Now</li>
          <li className="hover:text-[#FFD45A] cursor-pointer">Contact Us</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar