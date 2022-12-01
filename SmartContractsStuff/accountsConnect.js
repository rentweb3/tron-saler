/*
  connectWallet: Connects the MetaMask wallet
*/
import { BigNumber, Contract, ethers, providers, utils } from "ethers";

export const connectWallet = async () => {
  try {
       //      debugger;
       let tronlink = await window.tronLink;
       if (!tronlink) {
         return null;
       }
       try {
         await tronlink.request({ method: "tron_requestAccounts" });
       } catch (e) {
         return null;
       }
   
       let tronWeb = await tronlink?.tronWeb;
       if (!tronWeb) return null;
       let address = tronWeb?.defaultAddress;
       if (!address) return null;
       return address?.base58;
     } catch (err) {
       console.log("Error: ", err);
       alert("Error: TronLink extension is not installed");
       return null;
     }
  
};

