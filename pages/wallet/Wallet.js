import { useEffect, useState } from "react";
import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import { networkParams } from "./network";
import { connectors } from "./connectors";
import { toHex, truncateAddress } from "./utils";
import { useDisclosure } from "react-use-disclosure";
import Image from 'next/image'
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";
import { ethers, providers } from "ethers"
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  rpc: {
    1: "https://mainnet.mycustomnode.com",
    3: "https://ropsten.mycustomnode.com",
    100: "https://dai.poa.network",
    // ...
  },
});






const Wallet = ({ web3Handler })  =>{
  const [showModal, setShowModal] = useState(false);
    const {
      library,
      chainId,
      account,
      activate,
      deactivate,
      active
    } = useWeb3React();
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [network, setNetwork] = useState(undefined);
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();
  
    const setProvider = (type) => {
      window.localStorage.setItem("provider", type);
    };

    const handleNetwork = (e) => {
      const id = e.target.value;
      setNetwork(Number(id));
    };
  
    const handleInput = (e) => {
      const msg = e.target.value;
      setMessage(msg);
    };
  
    const switchNetwork = async () => {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(network) }]
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [networkParams[toHex(network)]]
            });
          } catch (error) {
            setError(error);
          }
        }
      }
    };
  
    const signMessage = async () => {
      if (!library) return;
      try {
        const signature = await library.provider.request({
          method: "personal_sign",
          params: [message, account]
        });
        setSignedMessage(message);
        setSignature(signature);
      } catch (error) {
        setError(error);
      }
    };
  
    const verifyMessage = async () => {
      if (!library) return;
      try {
        const verify = await library.provider.request({
          method: "personal_ecRecover",
          params: [signedMessage, signature]
        });
        setVerified(verify === account.toLowerCase());
      } catch (error) {
        setError(error);
      }
    };
  
    const refreshState = () => {
      window.localStorage.setItem("provider", undefined);
      setNetwork("");
      setMessage("");
      setSignature("");
      setVerified(undefined);
    };
  
    const disconnect = () => {
      refreshState();
      deactivate();
    };

   


    const CoinbaseWallet = new WalletLinkConnector({
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      appName: "Web3-react Demo",
      supportedChainIds: [1, 3, 4, 5, 42],
     });
     
     const WalletConnect = new WalletConnectConnector({
      rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
     });
     
     const Injected = new InjectedConnector({
      supportedChainIds: [97]
     });


     const web3Provider = new providers.Web3Provider(provider);

  
    return (
      
      <>
      <button
        className="bg-gradient-to-r from-linear-x to-linear-y hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4  ml-[16px]  rounded-[50px]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {active ? <span className="text-white"> <b>{account.slice(0, 5) + '...' + account.slice(38, 42)}</b></span> : <span className="text-white">Not connected</span>}
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <button
              variant="outline"
              onClick={() => {
                activate(coinbaseWallet);
                setProvider("coinbaseWallet");
                setShowModal(false);
              }}
              w="100%">
              
            
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
                activate(WalletConnect);
                setProvider("walletConnect");
                setShowModal(false);
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
              onClick={(web3Handler) => {
                activate(Injected);
                setProvider("injected");
                setShowModal(false);
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
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                
                </div>
            </div>
          </div>
        </>
      ) : null}
    </>
      );
    }

    export default Wallet;