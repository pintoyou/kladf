import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import Image from 'next/image'
import Rec from "./assets/rec.png"

const Card = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return ( 
<div className="container  w-[368px] h-[447px] bg-black "> 
{items.length > 0 ?

  
    <div className="px-5 container">
      <div className='Row'>
      {items.map((item, idx) => (
      <div key={idx} className="Col"> 
            <div  className='bg-rec w-[345px] h-[416px] absolute  mt-6'>
            <Image  src={Rec}  />
            </div>

          <div className='bg-card  pl-10'>
          <Image  src={item.image} width={358} height={290} />
          </div > 


          <div className='absolute'>
          <div className='text-white pl-10 pt-3 font-semibold text-[21px]'>
            <a >{item.name}</a>
          </div>
             
            <div className=' pl-10 pt-4  text-white flex justify-between text-[16px]'> 
            <a>{item.description}</a>  
            <a>16 tokens</a>
            </div>     
                   
              
            <div className='button pt-4 ml-10 flex justify-between text-[16px]'>           

            <button className=" bg-transparent w-[129px] h-[44px] text-white font-semibold  py-2 px-4 border-2 border-white hover:border-transparent rounded-[50px]">
            Play Now 
            </button>
            <button onClick={() => buyMarketItem(item)} className="bg-gradient-to-r from-linear-x to-linear-y hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4  ml-[16px] w-[129px] h-[44px] rounded-[50px]">
            Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
            </button>
            </div>  
          </div>
      </div>
      ))}
      </div>
    
  </div>
  : (
          <main style={{ padding: "1rem 0" }}>
            <h2 className='text-white'>No listed assets</h2>
          </main>
  )}
  </div>
    );
  }
export default Card

