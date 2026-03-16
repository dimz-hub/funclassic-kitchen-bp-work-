"use client"

import { foodData } from '@/utils/foodData'
import React, { useState, useEffect, useRef } from 'react'
import FoodCard from './Foodcard'

const Welcome = () => {
  const [activeCategory, setActiveCategory] = useState('rice');
  const [isSticky, setIsSticky] = useState(false);
  
  const headerRef = useRef(null); 
  const stickyRef = useRef(null);
  const scrollTargetRef = useRef(null); 

  const handleTagClick = (categoryId) => {
    setActiveCategory(categoryId);

    setTimeout(() => {
      if (scrollTargetRef.current) {
        const topPosition = scrollTargetRef.current.offsetTop;
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
        const headerRect = headerRef.current?.getBoundingClientRect();
        if (headerRect) {
          setIsSticky(headerRect.bottom <= 0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated tags array with 4 new categories
  const tags = [
    { id: 'breakfast', label: 'Breakfast' }, // New
    { id: 'rice', label: 'Rice' },
    { id: 'protein', label: 'Protein' },
    { id: 'specials', label: 'Specials' }, // New
    { id: 'soup', label: 'Soups' },
    { id: 'peppered soup', label: 'Peppered Soups' }, // New
    { id: 'sides', label: 'Deserts & Sides' }, // New
    { id: 'drinks', label: 'Drinks' },
  ];

  const filteredFood = foodData.filter((item) => {
    if (!item || !item.category) return false;

    // Special Logic for combined or extra categories
    if (activeCategory === 'soup') {
      return item.category === 'soup' || item.category === 'extra';
    }
    
    // Logic for Deserts & Sides (Checks for either 'desert' or 'sides')
    if (activeCategory === 'sides') {
      return item.category === 'sides' || item.category === 'desert';
    }

    // Standard matching for breakfast, specials, peppered soup, etc.
    return item.category === activeCategory;
  });

  return (
    <div className='w-full text-black bg-white pb-[50px]'>
      
      <div ref={headerRef} className="pt-[30px] bg-white">
        <h3 className='text-center font-bold text-[28px] w-[90%] mx-auto'>
          Welcome to <span className='text-orange-600'> FunClassic Kitchen </span>
        </h3>
        <p className='text-center pt-[5px] pb-[20px] text-[18.3px] w-[90%] mx-auto'>
          We have a wide range of delicacies, Order Now.
        </p>
      </div>

      <div 
        ref={stickyRef}
        className={`sticky top-0 z-40 bg-white w-full transition-all duration-300 ${
          isSticky 
            ? 'shadow-lg border-b border-gray-100' 
            : 'shadow-none' 
        }`}
      >
        <div className='flex justify-center flex-wrap gap-2 md:gap-3 py-4 w-[95%] mx-auto'>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={`px-4 md:px-6 py-2 rounded-full font-bold text-[12px] md:text-[16px] transition-all duration-300 border-2 ${
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

      <div ref={scrollTargetRef} />

      <div className='w-[90%] mx-auto flex flex-col md:grid-cols-2 lg:grid-cols-3 md:grid gap-[20px] mt-8 min-h-screen'>
        {filteredFood.length > 0 ? (
          filteredFood.map((data) => (
            data && data.id && <FoodCard key={data.id} data={data} />
          ))
        ) : (
          <div className="text-center col-span-full py-20">
            <p className="text-gray-400 text-lg italic">Coming soon: Delicious items for this section!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Welcome;