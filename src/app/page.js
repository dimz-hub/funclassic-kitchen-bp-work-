"use client"

import BackGroundCarousel from "@/components/BackgroundImage"
import Welcome from "@/components/Welcome"
import { FiShoppingCart, FiCheckCircle, FiAlertCircle } from "react-icons/fi"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react" 
// Ensure clearCart is imported from your slice
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "@/redux/cartSlice" 
import Image from "next/image"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Home() {
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  
  const [isInHero, setIsInHero] = useState(true)
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [openCart, setOpenCart] = useState(false)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState({ show: false, type: '', message: '' })

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsInHero(rect.top >= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

 const handlePlaceOrder = async () => {
    // Check basic fields first
    const basicFieldsMissing = !fullName || !phone || !deliveryMethod;
    
    // Check address ONLY if delivery is selected
    const addressMissing = deliveryMethod === "delivery" && !address;

    if (basicFieldsMissing || addressMissing) {
      setNotification({ 
        show: true, 
        type: 'error', 
        message: 'Please fill in all required fields.' 
      });
      return;
    }

    setIsSubmitting(true);

    const orderItems = cartItems.map(item => 
      `${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join("\n");

    const formData = {
      Name: fullName,
      Phone: phone,
      Method: deliveryMethod,
      // If pickup, we send "N/A" or "Pick up at store"
      Address: deliveryMethod === "delivery" ? address : "Pick up at store",
      Total: `$${totalCost.toFixed(2)}`,
      OrderDetails: orderItems
    };

    try {
      const response = await fetch("https://formspree.io/f/mpqylokp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        dispatch(clearCart()); 
        setNotification({ show: true, type: 'success', message: 'Order completed! We will contact you shortly.' });
        setOpenCart(false);
        
        // Reset form
        setFullName("");
        setPhone("");
        setAddress("");
        setDeliveryMethod("");
      } else {
        setNotification({ show: true, type: 'error', message: 'Submission failed. Please try again.' });
      }
    } catch (error) {
      setNotification({ show: true, type: 'error', message: 'Connection error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div id="hero-section" className="w-full">
        <BackGroundCarousel />
      </div>

      <div id='menu'>
        <Welcome />
      </div>

      <div className="bg-black flex-grow">
        <Footer />
      </div>

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <div onClick={() => setOpenCart(true)} className="fixed bottom-15 left-2 z-50 cursor-pointer">
          <div className="relative bg-orange-500 text-white p-3 rounded-full shadow-lg">
            <FiShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <div className="fixed bottom-15 right-4 z-50 cursor-pointer">
        <Link 
          href="https://wa.me/12365127552?text=Hello!%20I'm%20interested%20in%20ordering%20from%20FunClassic%20Kitchen."
          target="_blank" rel="noopener noreferrer"
          className="relative transition-all duration-300 hover:scale-110 block"
        >
          {isInHero ? (
            <Image src='/whatsapp.png' alt="whatsapp" width={40} height={50}/>
          ) : (
            <Image src='/whatsapp2.png' alt="whatsapp" width={50} height={50}/>
          )}
        </Link>
      </div>

      {/* CUSTOM NOTIFICATION POPUP */}
      {notification.show && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setNotification({ ...notification, show: false })}></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
              {notification.type === 'success' ? (
                <FiCheckCircle className="text-green-500 size-16" />
              ) : (
                <FiAlertCircle className="text-red-500 size-16" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">
              {notification.type === 'success' ? 'Thank You!' : 'Wait a minute...'}
            </h2>
            <p className="text-gray-600 mb-6">{notification.message}</p>
            <button 
              onClick={() => setNotification({ ...notification, show: false })}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                notification.type === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {openCart && (
        <div className="fixed inset-0 text-black bg-black/60 flex justify-center items-center z-50">
        <div className="bg-white w-full h-full md:w-[420px] md:h-auto md:max-h-[85vh] md:rounded-xl flex flex-col overflow-hidden shadow-xl">
  
  {/* --- FIXED HEADER --- */}
  <div className="flex justify-between items-center p-6 border-b">
    <h2 className="text-xl font-bold">Your Cart</h2>
    <button 
      onClick={() => setOpenCart(false)} 
      className="text-xl hover:text-gray-500 transition-colors"
    >
      ✕
    </button>
  </div>

  {/* --- SCROLLABLE CONTENT AREA --- */}
  <div className="flex-1 overflow-y-auto p-6 space-y-6">
    {/* Cart Items List */}
    <div className="space-y-4">
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <div key={item.id} className="border-b pb-4 last:border-0">
            <div className="flex items-center gap-3">
              <div className="relative w-[60px] h-[60px] rounded-md overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))} 
                    className="text-red-500 text-xs font-medium"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-orange-500 font-bold">${item.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button 
                    onClick={() => dispatch(decreaseQty(item.id))} 
                    className="bg-gray-100 hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full transition"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(increaseQty(item.id))} 
                    className="bg-gray-100 hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-400 italic">Your cart is currently empty.</p>
        </div>
      )}
    </div>

    {/* Checkout Form (Inside Scroll Area) */}
    <div className="pt-4 border-t space-y-3">
      <h3 className="font-semibold text-gray-700">Delivery Details</h3>
      <input 
        type="text" 
        placeholder="Full Name" 
        value={fullName} 
        onChange={(e) => setFullName(e.target.value)} 
        className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" 
        required 
      />
      <input 
        type="tel" 
        placeholder="Phone Number" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" 
        required 
      />
      <select 
        value={deliveryMethod} 
        onChange={(e) => setDeliveryMethod(e.target.value)} 
        className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
      >
        <option value="">Select Delivery Method</option>
        <option value="delivery">Delivery</option>
        <option value="pickup">Pick Up</option>
      </select>
      
      {deliveryMethod === "delivery" && (
        <input 
          type="text" 
          placeholder="Delivery Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" 
          required  
        />
      )}
    </div>
  </div>

  {/* --- FIXED FOOTER --- */}
  <div className="p-6 border-t bg-gray-50 rounded-b-xl">
    <div className="flex justify-between items-center text-lg font-bold mb-4">
      <span className="text-gray-600">Total</span>
      <span className="text-2xl text-gray-900">${totalCost.toFixed(2)}</span>
    </div>
    <button 
      onClick={handlePlaceOrder}
      disabled={isSubmitting || cartItems.length === 0}
      className={`w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-[0.98] transition-all flex justify-center items-center ${
        isSubmitting || cartItems.length === 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''
      }`}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : "Place Order"}
    </button>
  </div>
</div>
        </div>
      )}
    </div>
  )
}