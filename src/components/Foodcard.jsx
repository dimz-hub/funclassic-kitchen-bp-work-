"use client"

import { addToCart } from "@/redux/cartSlice"
import Image from "next/image"
import { useState } from "react"
import { FiShoppingCart } from "react-icons/fi"
import { useDispatch } from "react-redux"

export default function FoodCard({ data }) {
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  
  const [selectedExtra, setSelectedExtra] = useState("")
  const [selectedProtein, setSelectedProtein] = useState("")

  const dispatch = useDispatch()

  const handleAdd = () => {
    // SAFEGUARD: Check if data exists
    if (!data) return;

    // Validation for Soups
    if (data?.category === 'soup' && !selectedExtra) {
      alert("Please select a swallow for your soup!");
      return;
    }

    // Validation for Protein (if protein is true)
    if (data?.protein && !selectedProtein) {
      alert("Please select Chicken, Beef, or Fish!");
      return;
    }

    let displayName = data.name;
    if (selectedExtra) displayName += ` (+ ${selectedExtra})`;
    if (selectedProtein) displayName += ` (+ ${selectedProtein})`;

    dispatch(addToCart({
      id: data.id,
      name: displayName,
      price: data.price,
      quantity: quantity,
      image: data.image
    }))
    
    setSelectedExtra("")
    setSelectedProtein("")
  }

  const swallows = ["Poundo", "Garri", "Semo", "Amala", "Fufu"];
  const proteinChoices = ["Chicken", "Beef", "Fish"];

  return (
    <>
      <div className="rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden md:w-[370px] bg-white border border-gray-100">
        <div className="relative h-[180px] w-full" onClick={() => setOpen(true)}>
          <Image src={data?.image || '/placeholder.jpg'} alt={data?.name} fill className="object-cover" />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold capitalize text-[24px]">{data?.name}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{data?.description}</p>

          {/* SWALLOW RADIOS (Only for Soup category) */}
          {data?.category === 'soup' && (
            <div className="mt-4 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
              <p className="text-xs font-bold  text-orange-400 uppercase mb-2">Select Swallow:</p>
              <div className="grid grid-cols-2 gap-2">
                {swallows.map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`swallow-${data.id}`}
                      checked={selectedExtra === item}
                      onChange={() => setSelectedExtra(item)}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm text-gray-600">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* PROTEIN RADIOS (Only if data.protein is true) */}
          {data?.protein && (
            <div className="mt-4 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
              <p className="text-xs font-bold text-orange-400 uppercase mb-2">Add Protein:</p>
              <div className="flex flex-wrap gap-3">
                {proteinChoices.map((choice) => (
                  <label key={choice} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`protein-${data.id}`}
                      checked={selectedProtein === choice}
                      onChange={() => setSelectedProtein(choice)}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm text-gray-600">{choice}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <p className="font-semibold text-orange-500 text-[23px]">${data?.price}</p>
            <button onClick={handleAdd} className="p-2 px-4 flex items-center gap-2 rounded-lg bg-orange-500 text-white font-bold">
              Add <FiShoppingCart size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL (Simplified for brevity) */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-gray-500">✕</button>
              <h2 className="text-2xl font-bold">{data?.name}</h2>
              <p className="mt-2 text-gray-600">{data?.fullDescription}</p>
           </div>
        </div>
      )}
    </>
  )
}