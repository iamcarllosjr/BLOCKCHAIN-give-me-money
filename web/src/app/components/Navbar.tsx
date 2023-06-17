"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from "../../../public/logo.png";

const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState("");

    //function for connect Wallet
    const connectWallet = async() => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try {
        /* Metamask is Installed */
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
        setWalletAddress(accounts[0]);
        console.log(accounts[0]) //For test
      } catch (err){
        console.error(err);
      }
    } else {
      /* Metamask is not installed */
      console.log("Please install Metamask") 
    }
    };
  
    //function to keep the same account when reloading the page
    const getCurrentWallet = async() => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try {
        
        const accounts = await window.ethereum.request({ method: "eth_accounts"});
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]) //For test
        } else {
          console.log("Connect to Metamask using the Connect Button ")
        }
      } catch (err) {
        console.error(err);
      }
    } 
    };
  
    //Function so that when disconnecting from the wallet, change the state of the button on the page
    const addWalletListener = async() => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
      window.ethereum.on("accountsChanged", (accounts:string | []) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* Metamask is not installed */
      setWalletAddress("");
      console.log("Please connect to wallet address")
    };
    };
  
  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  },);


  return (
    <div className="w-full h-20 lg:h-[12vh] sticky top-0 z-50 bg-tranparent px-4">
        <div className="h-full mx-auto py-1 font-light flex items-center justify-between">
            <Image className="w-14" src={Logo} alt="logo"></Image>

            <div className="flex items-center gap-7">
                <ul className="flex gap-7 text-white tracking-wider">
                    <Link href="#" target="_blank">Money</Link>
                    <Link href="#" target="_blank">Features</Link>
                    <Link href="#" target="_blank">Whitepaper</Link>
                    <Link href="#" target="_blank">About Us</Link>
                </ul>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={connectWallet}>{(walletAddress && walletAddress.length > 0) ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : "Connect Your Wallet"} </button>
            </div>
            
          
        

        </div>  
    </div>
  )

}

export default Navbar;