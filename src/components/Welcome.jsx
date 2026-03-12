"use client"

import { foodData } from '@/utils/foodData'
import React from 'react'
import FoodCard from './Foodcard'

const Welcome = () => {
  return (
    <div className='w-full text-black h-full pb-[50px] bg-white'>
        <h3 className='text-center pt-[30px] font-bold text-[28px] w-[90%] mx-auto'>Welcome to <span className=''> FunClassic Kitchen </span></h3>
        <p className='text-center pt-[5px] pb-[20px] text-[18.3px] w-[90%] mx-auto'>We have a wide ranges of delicacies, Order Now. </p>
        <div className='w-[90%] mx-auto flex flex-wrap flex-col gap-[20px]'>
          {foodData.map((data) => 
          

            <FoodCard key={data.id} data = {data}  />
            
          )}
        </div>
        </div>
  )
}

export default Welcome