import React from 'react'
import { useState } from 'react'
import { ethers } from "ethers"
import Navbar from './Navbar'
import { create as ipfsHttpClient } from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = ({ marketplace, nft })  => {
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })


    const uploadToIPFS = async (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      if (typeof file !== 'undefined') {
        try {
          const result = await client.add(file)
          console.log(result)
          setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
        } catch (error){
          console.log("ipfs image upload error: ", error)
        }
      }
    }
    const createNFT = async () => {
      if (!image || !price || !name || !description) return
      try{
        const result = await client.add(JSON.stringify({image, price, name, description}))
        mintThenList(result)
      } catch(error) {
        console.log("ipfs uri upload error: ", error)
      }
    }
    const mintThenList = async (result) => {
      const uri = `https://ipfs.infura.io/ipfs/${result.path}`
      // mint nft 
      await(await nft.mint(uri)).wait()
      // get tokenId of new nft 
      const id = await nft.tokenCount()
      // approve marketplace to spend nft
      await(await nft.setApprovalForAll(marketplace.address, true)).wait()
      // add nft to marketplace
      const listingPrice = ethers.utils.parseEther(price.toString())
      await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    }






    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()
    
        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload();
        })
    
        window.ethereum.on('accountsChanged', async function (accounts) {
          setAccount(accounts[0])
          await web3Handler()
        })
       
      }
    

      const [account, setAccount] = useState(null)
  return (   


<div>
<Navbar web3Handler={web3Handler} account={account}/>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
         
          <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={uploadToIPFS}
        />
      
        <button onClick={createNFT} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>







          </div>
        </div>
      </div>







    );
}

export default Create