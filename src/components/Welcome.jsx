"use client"

import { foodData } from '@/utils/foodData'
import React, { useState, useEffect, useRef } from 'react'
import FoodCard from './Foodcard'

const Welcome = () => {
  const [activeCategory, setActiveCategory] = useState('rice');
  const [isSticky, setIsSticky] = useState(false);
  
  const headerRef = useRef(null); // Ref for the top "Welcome" section
  const stickyRef = useRef(null);
  const scrollTargetRef = useRef(null); // Ref for the items start point

  const handleTagClick = (categoryId) => {
    setActiveCategory(categoryId);

    // Give React a tiny moment to switch the items, then scroll
    setTimeout(() => {
      if (scrollTargetRef.current) {
        const topPosition = scrollTargetRef.current.offsetTop;
        // We subtract the height of your sticky bar (approx 80px)
        window.scrollTo({
          top: topPosition - 80, 
          behavior: 'smooth'
        });
      }
    }, 10);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        // We check the position of the headerRef. 
        // When the bottom of the "Welcome" text hits the top, we enable shadow.
        const headerRect = headerRef.current?.getBoundingClientRect();
        if (headerRect) {
          setIsSticky(headerRect.bottom <= 0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tags = [
    { id: 'rice', label: 'Rice' },
    { id: 'soup', label: 'Soups' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'protein', label: 'Protein' }
  ];

  const filteredFood = foodData.filter((item) => {
    if (!item || !item.category) return false;
    if (activeCategory === 'soup') {
      return item.category === 'soup' || item.category === 'extra';
    }
    return item.category === activeCategory;
  });

  return (
    <div className='w-full text-black bg-white pb-[50px]'>
      
      {/* Title Section - Wrapped in a ref to detect when it's gone */}
      <div ref={headerRef} className="pt-[30px] bg-white">
        <h3 className='text-center font-bold text-[28px] w-[90%] mx-auto'>
          Welcome to <span className='text-orange-600'> FunClassic Kitchen </span>
        </h3>
        <p className='text-center pt-[5px] pb-[20px] text-[18.3px] w-[90%] mx-auto'>
          We have a wide range of delicacies, Order Now.
        </p>
      </div>

      {/* STICKY BAR */}
      <div 
        ref={stickyRef}
        className={`sticky top-0 z-40 bg-white w-full transition-all duration-300 ${
          isSticky 
            ? 'shadow-lg border-b border-gray-100' 
            : 'shadow-none' // Forced shadow-none when not sticky
        }`}
      >
        <div className='flex justify-center flex-wrap gap-3 py-4 w-[95%] mx-auto'>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={`px-6 py-2 rounded-full font-bold text-[14px] md:text-[16px] transition-all duration-300 border-2 ${
                activeCategory === tag.id 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                  : 'bg-white text-gray-800 border-gray-200 hover:border-orange-500'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* SCROLL TARGET: This is where we scroll to */}
      <div ref={scrollTargetRef} />

      {/* CARDS SECTION */}
      <div className='w-[90%] mx-auto flex flex-col md:grid-cols-2 lg:grid-cols-3 md:grid gap-[20px] mt-8 min-h-screen'>
        {filteredFood.length > 0 ? (
          filteredFood.map((data) => (
            data && data.id && <FoodCard key={data.id} data={data} />
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No items found in this section.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Welcome;