import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import Image from 'next/image'
import Logo from "./assets/1.png"
import Rec from "./assets/rec.png"

export default function Card() {
  return (
  


        <div className="container  w-[368px] h-[447px] bg-black ">   
            <div className='bg-rec w-[345px] h-[416px] absolute  mt-6'>
            <Image  src={Rec}  />
            </div>

          <div className='bg-card  pl-10'>
          <Image  src={Logo} width={358} height={290} />
          </div > 


          <div className='absolute'>
          <div className='text-white pl-10 pt-3 font-semibold text-[21px]'>
            <a >test</a>
          </div>
             
            <div className=' pl-10 pt-4  text-white flex justify-between text-[16px]'> 
            <a>ada</a>  
            <a>16 tokens</a>
            </div>     
                   
              
            <div className='button pt-4 ml-10 flex justify-between text-[16px]'>           

            <button className=" bg-transparent w-[129px] h-[44px] text-white font-semibold  py-2 px-4 border-2 border-white hover:border-transparent rounded-[50px]">
            Play Now 
            </button>
            <button className="bg-gradient-to-r from-linear-x to-linear-y hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4  ml-[16px] w-[129px] h-[44px] rounded-[50px]">
            Buy for  ETH
            </button>
            </div>  
          </div>
           
        
</div>
        
        
        
        
        
        
        
        
        
       
  )
}


