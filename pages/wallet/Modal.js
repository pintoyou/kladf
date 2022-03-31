
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
import Image from 'next/image'

export default function SelectWalletModal({ isOpen, closeModal }) {
    const { activate } = useWeb3React();
  

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

    return (

<div isOpen={isOpen} onClose={closeModal} isCentered>
      
      <div w="300px">
        <h1>Select Wallet</h1>
        <a
          _focus={{
            boxShadow: "none"
          }}
        />
        <div paddingBottom="1.5rem">
          <div>
            <button
              variant="outline"
              onClick={() => {
                activate(connectors.coinbaseWallet);
                setProvider("coinbaseWallet");
                closeModal();
              }}
              w="100%"
            >
              <div w="100%" justifyContent="center">
                <Image
                  src="/cbw.png"
                  alt="Coinbase Wallet Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <h2>Coinbase Wallet</h2>
              </div>
            </button>
            <button
              variant="outline"
              onClick={() => {
                activate(connectors.walletConnect);
                setProvider("walletConnect");
                closeModal();
              }}
              w="100%"
            >
              <div w="100%" justifyContent="center">
                <Image
                  src="/wc.png"
                  alt="Wallet Connect Logo"
                  width={26}
                  height={26}
                  borderRadius="3px"
                />
                <h2>Wallet Connect</h2>
              </div>
            </button>
            <button
              variant="outline"
              onClick={() => {
                activate(connectors.injected);
                setProvider("injected");
                closeModal();
              }}
              w="100%"
            >
              <div w="100%" justifyContent="center">
                <Image
                  src="/mm.png"
                  alt="Metamask Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <h2>Metamask</h2>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>








    )
  }
  