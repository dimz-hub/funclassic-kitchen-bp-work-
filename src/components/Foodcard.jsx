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
  const [selectedSide, setSelectedSide] = useState("") 
  const [selectedPie, setSelectedPie] = useState("") // New state for Pie types

  const dispatch = useDispatch()

  const handleAdd = () => {
    if (!data) return;

    // Validation for Soups
    if (data?.category === 'soup' && !selectedExtra) {
      alert("Please select a swallow for your soup!");
      return;
    }

    // Validation for Protein
    if (data?.protein && !selectedProtein) {
      alert("Please select Chicken, Beef, or Fish!");
      return;
    }

    // Validation for Fish sides
    if (data?.fish && !selectedSide) {
      alert("Please select Yam, Potato, or Plantain!");
      return;
    }

    // NEW: Validation for Pies
    if (data?.pies && !selectedPie) {
      alert("Please select Meat Pie or Chicken Pie!");
      return;
    }

    let displayName = data.name;
    if (selectedExtra) displayName += ` (+ ${selectedExtra})`;
    if (selectedProtein) displayName += ` (+ ${selectedProtein})`;
    if (selectedSide) displayName += ` (+ ${selectedSide})`;
    if (selectedPie) displayName += ` (+ ${selectedPie})`; // Add pie choice to name

    dispatch(addToCart({
      id: data.id,
      name: displayName,
      price: data.price,
      quantity: quantity,
      image: data.image
    }))
    
    // Reset all selections
    setSelectedExtra("")
    setSelectedProtein("")
    setSelectedSide("")
    setSelectedPie("")
  }

  const swallows = ["Poundo", "Garri", "Semo", "Amala", "Fufu"];
  const proteinChoices = ["Chicken", "Beef", "Fish"];
  const sideChoices = ["Yam", "Potato", "Plantain"];
  const pieChoices = ["Meat Pie", "Chicken Pie"]; // New choices array

  return (
    <>
      <div className={`rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden md:w-[370px] lg:w-[300px] xl:w-[370px] bg-white border border-gray-100`}>
        <div className="relative h-[180px] w-full cursor-pointer" onClick={() => setOpen(true)}>
          <Image src={data?.image || '/placeholder.jpg'} alt={data?.name} fill className="object-cover" />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold capitalize text-[24px]">{data?.name}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{data?.description}</p>

          {/* SWALLOW RADIOS */}
          {data?.category === 'soup' && (
            <div className="mt-4 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
              <p className="text-xs font-bold text-orange-400 uppercase mb-2">Select Swallow:</p>
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

          {/* PROTEIN RADIOS */}
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

          {/* SIDE RADIOS (For Fish) */}
          {data?.fish && (
            <div className="mt-4 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
              <p className="text-xs font-bold text-orange-400 uppercase mb-2">Select Side:</p>
              <div className="flex flex-wrap gap-3">
                {sideChoices.map((side) => (
                  <label key={side} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`side-${data.id}`}
                      checked={selectedSide === side}
                      onChange={() => setSelectedSide(side)}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm text-gray-600">{side}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* NEW: PIE RADIOS (Only if data.pies is true) */}
          {data?.pies && (
            <div className="mt-4 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
              <p className="text-xs font-bold text-orange-400 uppercase mb-2">Select Pie Type:</p>
              <div className="flex flex-wrap gap-3">
                {pieChoices.map((pie) => (
                  <label key={pie} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`pie-${data.id}`}
                      checked={selectedPie === pie}
                      onChange={() => setSelectedPie(pie)}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm text-gray-600">{pie}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <p className="font-semibold text-orange-500 text-[23px]">${data?.price}</p>
            <button onClick={handleAdd} className="p-2 px-4 cursor-pointer flex items-center gap-2 rounded-lg bg-orange-500 text-white font-bold">
              Add <FiShoppingCart size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-gray-500">✕</button>
              <h2 className="text-2xl font-bold capitalize text-orange-500">{data?.name}</h2>
              <div className="relative h-[250px] w-full my-4">
                <Image src={data.image} fill alt="food-img" className="rounded-2xl object-cover"/>
              </div>
              <p className="mt-2 text-gray-600">{data?.fullDescription}</p>
           </div>
        </div>
      )}
    </>
  )
}