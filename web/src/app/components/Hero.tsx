"use client"

import Navbar from "@/app/components/Navbar";
import abi from "../../../../hardhat/artifacts/contracts/GiveMeMoney.sol/GiveMeMoney.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

export default function Hero() {
  // Contract Address & ABI
  const contractAddress = "0xcEdAb484AFb84a7583276B144f8D1aaB4D4ebd4B";
  const contractABI = abi.abi;

  // Component state
  const [walletAddress, setWalletAddress] = useState("");
  const [amout, setAmout] = useState("");

  

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

  const sendMoney = async () => {
    try {

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const sendMeMoney = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("sending money..")
        const moneyTxn = await sendMeMoney.donate(
          {value: ethers.parseEther(amout)}
          //Aqui define o valor que será enviado
        );

        await moneyTxn.wait();

        console.log("mined ", moneyTxn.hash);

        console.log("money sent!");

      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <section className="bg-hero-bg bg-cover h-screen">
      <Navbar />
    <div className="flex flex-col items-center gap-5 bg-no-repeat pt-10">
      
        <h1 className="flex items-center justify-center text-white uppercase text-3xl tracking-wider font-semibold">
          Give Me Moneeey !
        </h1>
        
        {/* Wallet está conectada ? Se sim, vai mostrar mostrar o componente ou o codido a ser renderizado, 
        Se não, vai mostrar o botão de conectar carteira */}
        {walletAddress ? 
        ( 
          
            <div className="flex flex-col gap-2 items-center justify-center bg-white shadow-sm rounded px-8 pt-8 pb-8 h-32 w-80">
              
              <input type="text" placeholder="Amout" className="p-2 border-2 border-blue-500 focus:outline-none rounded-lg text-gray-700 text-center w-24 font-bold tracking-wider" value={amout} onChange={e => setAmout(e.target.value)} />
                <button
                  type="button"
                  onClick={sendMoney}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline tracking-wider"
                >
                  Send Me Matic
                </button>
              
            </div>
          
        ) : (
          
            <h1 className="text-white text-2xl tracking-wider pt-6">Connect Your Wallet in the button for <span className=" bg-lime-600 px-2 py-1 font-bold">send me a Money !</span></h1>
        
        )}

    </div>
    </section>
  )
}