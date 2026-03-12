import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

    const currentYear = new Date().getFullYear();
  return (
    /* Added pb-[30px] to give space and 'block' to prevent inline gaps */
    <footer className='bg-black text-white pt-[20px] pb-[40px] w-full block border-none outline-none relative'>
      <div className='flex items-center  pt-[20px]  w-[95%] mx-auto'>
        {/* Added block and align-middle to the logo image */}
        <Image 
          src='/rea-logo.png' 
          alt='logo' 
          width={90} 
          height={30} 
          className="block align-middle"
        />
        <p className='text-[23px] font-semibold'>Funclassic Kitchen</p>
      </div>

      <div>
        <p className='w-[95%] ml-[30px] mx-auto mt-[15px] leading-8 text-[16px]'>
          Crafting moments, one bite at a time. Taste the tradition in every flavor and feel the passion in every dish. Welcome to the table where quality meets heart.
        </p>
        
        <div className='flex items-center w-[95%] ml-[30px] gap-[15px] mx-auto mt-[17px]'> 
            <a href="#" className="bg-[#DE9151]/40 p-2 rounded-[50%]"><FaFacebook size={30}/></a>
            <a href="#" className="bg-[#DE9151]/40 p-2 rounded-[50%]"><FaInstagram size={30}/></a>
            <a href="#" className="bg-[#DE9151]/40 p-2 rounded-[50%]"><FaXTwitter size={27}/></a>
        </div>
      </div>

      <div className='mx-auto w-[95%] ml-[30px] mt-[25px]'>
        <h3 className='text-[22px] font-bold mb-3'>Contact Info</h3>
        <div className='flex items-center gap-3 mb-2'>
          <FaPhoneAlt size={18} className="text-[#DE9151]" />
          <a href="tel:+12365127552" className="hover:underline">+1 (236) 512-7552</a>
        </div>
        <div className='flex items-center gap-3 mb-2'>
          <FaEnvelope size={18} className="text-[#DE9151]" />
          <a href="mailto:ogundareoluwafunmilola@gmail.com" className="hover:underline break-all">
            ogundareoluwafunmilola@gmail.com
          </a>
        </div>
        <div className='flex items-center gap-3 mb-8'>
          <FaMapMarkerAlt size={18} className="text-[#DE9151]" />
          <a href="mailto:ogundareoluwafunmilola@gmail.com" className="hover:underline break-all">
           6730 193a street V4N0B8
          </a>
        </div>
        <div>
          <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2611.854086470875!2d-122.69081592352227!3d49.11790418161747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d98eeebe24eb%3A0x6b8c424a1a6a3f22!2s6730%20193a%20St%2C%20Surrey%2C%20BC%20V4N%200B8%2C%20Canada!5e0!3m2!1sen!2sng!4v1710255500000!5m2!1sen!2sng" 
  width="600" 
  height="450" 
  style={{border:"0"}} 
  allowFullScreen="" 
  className='w-[85vw]  xs:h-[350px] xs:rounded-[20px] xs:mb-[20px]  h-[300px] rounded-xl' 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
        </div>

       


      </div>
       <div>
          <div className='border-t-[1px] w-[90%] mx-auto mt-[40px] border-white/50'>
          <div className='flex items-center justify-center text-white text-[16px] mt-[15px]'>
                Copyright &copy; {currentYear}<div className='bg-white mx-[5px] w-[5px] h-[5px] rounded-[50%]'> </div> <span>FunClassic Kitchen</span>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer