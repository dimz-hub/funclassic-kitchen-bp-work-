'use client'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

const backgrounds = [
  '/paste3.jpg',
  '/jrice2.jpg',
  '/back2.png',
]

const BackGroundCarousel = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    /* 1. Changed to h-screen to avoid the "dynamic" resizing of dvh.
      2. Removed the negative margin hacks for cleaner layout.
    */
    <div className="relative h-screen w-full overflow-hidden bg-black isolate">
      
      {/* Background layers */}
      {backgrounds.map((bg, i) => (
        <div
          key={bg}
          className={clsx(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            i === index ? 'opacity-100' : 'opacity-0'
          )}
          style={{ 
            backgroundImage: `url(${bg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', 
            /* IMPORTANT: Using 100% height and width. 
               We use 'absolute' and 'inset-0' to lock it to the parent.
            */
            height: '101%',
            width: '100%',
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content Center */}
      <div className="relative z-20 flex h-full items-center justify-center text-white">
        <h1 className="text-5xl font-bold"></h1>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {backgrounds.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={clsx(
              'h-3 w-3 rounded-full transition',
              i === index ? 'bg-white' : 'bg-white/40'
            )}
          />
        ))}
      </div>

      {/* Bottom Left Card */}
      {/* Changed bottom-[10vh] to a fixed px or rem to prevent 
         it from jumping when the address bar moves.
      */}
      <div className="uppercase px-[30px] absolute z-30 bottom-40 left-0">
        <div className="h-[100px] rounded-t-[20px] p-3 text-white uppercase w-[80vw] lg:w-[40vw] bg-black text-[17px]">
          <div className="flex items-center gap-[20px]">
            <img
              src="/res-logo1.png"
              className="h-[70px] w-[70px]"
              alt="logo"
            />
            <p>Crafting moments, one bite at a time!</p>
          </div>
        </div>
        <div>
          <div className="lg:w-[40vw] rounded-b-[20px] w-[80vw] cursor-pointer text-black p-3 bg-[#FFD45A] font-semibold text-center text-[18px]">
            Our Menu
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackGroundCarousel