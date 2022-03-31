import { useEffect, useState } from "react";
import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import { networkParams } from "./network";
import { connectors } from "./connectors";
import { toHex, truncateAddress } from "./utils";
import { useDisclosure } from "react-use-disclosure";
import Image from 'next/image'



const Wallet = () =>{
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
  
    useEffect(() => {
      const provider = window.localStorage.getItem("provider");
      if (provider) activate(connectors[provider]);
    }, []);
  
    return (
      
      <>
      <button
        className="bg-gradient-to-r from-linear-x to-linear-y hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4  ml-[16px]  rounded-[50px]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {active ? <span className="text-white">Connected with <b>{account}</b></span> : <span className="text-white">Not connected</span>}
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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