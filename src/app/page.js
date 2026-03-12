"use client"

import BackGroundCarousel from "@/components/BackgroundImage"
import Welcome from "@/components/Welcome"
import { FiShoppingCart } from "react-icons/fi"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useRef } from "react" // Added useEffect and useRef
import { increaseQty, decreaseQty, removeFromCart } from "@/redux/cartSlice"
import Image from "next/image"
import Footer from "@/components/Footer"

export default function Home() {
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  
  // State for detection
  const [isInHero, setIsInHero] = useState(true)
  
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [openCart, setOpenCart] = useState(false)

  // Observer Logic
 useEffect(() => {
  const handleScroll = () => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      // Get the distance from the top of the section to the top of the viewport
      const rect = heroSection.getBoundingClientRect();
      
      // If the top of the section is 0 (or higher), you are at the start.
      // If it's less than 0 (even -1px), you have started scrolling away.
      if (rect.top < 0) {
        setIsInHero(false);
      } else {
        setIsInHero(true);
      }
    }
  };

  // Run on scroll
  window.addEventListener("scroll", handleScroll);
  
  // Run once on load to set initial state
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className="relative">
      {/* 1. Wrapped in ID for detection */}
      <div id="hero-section" className="w-full">
        <BackGroundCarousel />
      </div>

      <Welcome />
      {/* <Footer /> */}
      <div className="bg-black flex-grow">

      <Footer />
      </div>

      {/* Example usage: Floating Cart Button disappears when in Hero */}
      {cartItems.length > 0 && (
        <div
          onClick={() => setOpenCart(true)}
          className="fixed bottom-15 left-2 z-50 cursor-pointer"
        >
          <div className="relative bg-orange-500 text-white p-3 rounded-full shadow-lg">
            <FiShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          </div>
        </div>
      )}

      {/* WhatsApp Button: Example of conditional styling using isInHero */}
      <div className="fixed bottom-15 right-2 z-50 cursor-pointer">
        <div className={`relative transition-opacity duration-300 opacity-100'}`}>
          {
     isInHero ? 
          <Image src='/whatsapp.png' alt="whatsapp" width={40} height={50}/>:
          <Image src='/whatsapp2.png' alt="whatsapp" width={50} height={50}/>
          }
        </div>
      </div>

      {/* CART MODAL (Truncated for brevity, kept your logic) */}
      {openCart && (
        <div className="fixed inset-0 text-black bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full md:w-[420px] md:h-auto md:max-h-[85vh] overflow-y-auto rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setOpenCart(false)} className="text-xl">✕</button>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="border-b py-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-[60px] h-[60px] rounded-md overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">Delete</button>
                    </div>
                    <p className="text-orange-500 font-semibold">${item.price}</p>
                    <div className="flex gap-3 mt-2">
                      <button onClick={() => dispatch(decreaseQty(item.id))} className="bg-gray-200 px-3 rounded">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQty(item.id))} className="bg-gray-200 px-3 rounded">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-5 text-lg font-bold">
              <span>Total</span>
              <span>${totalCost}</span>
            </div>

            <div className="mt-6 space-y-3">
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border p-2 rounded outline-none" />
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-2 rounded outline-none" />
                <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} className="w-full border p-2 rounded outline-none">
                    <option value="">Select Delivery Method</option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pick Up</option>
                </select>
                {deliveryMethod === "delivery" && (
                    <input type="text" placeholder="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border p-2 rounded outline-none" />
                )}
            </div>

            <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}