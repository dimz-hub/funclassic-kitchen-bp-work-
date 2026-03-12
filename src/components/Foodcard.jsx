"use client"

import { addToCart } from "@/redux/cartSlice"
import Image from "next/image"
import { useState } from "react"
import { FiShoppingCart } from "react-icons/fi"
import { useDispatch } from "react-redux"

export default function FoodCard({ data }) {

  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

 const dispatch = useDispatch()
const handleAdd = (e) => {

      console.log("Adding item:", data)
    dispatch(addToCart({
      id: data.id,         // make sure data.id exists
      name: data.name,
      price: data.price,
      quantity: quantity,
      image: data.image
    }))
  }



  const increase = (e) => {
    e.stopPropagation()
    setQuantity(prev => prev + 1)
  }

  const decrease = (e) => {
    e.stopPropagation()
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <>
      {/* CARD */}
      <div
        
        className=" rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden  md:w-[370px]"
      >
        <div className="relative h-[180px] w-full overflow-hidden" onClick={() => setOpen(true)}>
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover "
          />
        </div>

        <div className="p-4 bg-white">

          <h3 className="text-lg font-bold capitalize  text-[24px]">
            {data.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {data.description}
          </p>

         

          {/* QUANTITY + CART */}
          <div className="flex items-center justify-between mt-4">
             <p className="mt-3 font-semibold text-orange-500 text-[23px]">
            ${data.price}
          </p>

            {/* <div className="flex items-center gap-3">

              <button
                onClick={decrease}
                className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
              >
                -
              </button>

              <span className="text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={increase}
                className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
              >
                +
              </button>

            </div> */}

            <button
              onClick={handleAdd}
              className="bg-blackt p-2 flex gap-[4px] rounded-lg bg-[#E6CFA9#] bg-orange-500 text-white"
            >
              <span className="font-semibold ">Add</span>
             <FiShoppingCart size={19} /> 
            </button>

          </div>

        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl max-w-md w-[90%] p-6 relative animate-scaleIn">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-gray-500 text-xl"
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="relative h-[200px] mt-[20px] w-full rounded-lg overflow-hidden">
              <Image
                src={data.image}
                alt={data.name}
                fill
                className="object-cover"
              />
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold mt-4">
              {data.name}
            </h2>

            {/* FULL DESCRIPTION */}
            <p className="text-gray-600 mt-2">
              {data.fullDescription}
            </p>

            {/* PRICE */}
            <p className="text-xl font-semibold text-orange-500 mt-4">
              ${data.price}
            </p>

            {/* ORDER BUTTON */}
            {/* <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">

              Order {quantity}

            </button> */}

          </div>

        </div>
      )}
    </>
  )
}