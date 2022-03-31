import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import Navbar from './Navbar'
import Card from './Card'
import { StrictMode } from "react";
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import MarketplaceAbi from '../src/frontend/contractsData/Marketplace.json'
import MarketplaceAddress from '../src/frontend/contractsData/Marketplace-address.json'
import NFTAbi from '../src/frontend/contractsData/NFT.json'
import NFTAddress from '../src/frontend/contractsData/NFT-address.json'




function Home () {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  // MetaMask Login/Connect
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
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }

  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  }
  
  
  return (
      <div>


        <Navbar web3Handler={web3Handler} account={account}/>

      
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
        <Card marketplace={marketplace} nft={nft}/>
        )}
        </div>
       
      
      </div>


  )
}

export default Home;