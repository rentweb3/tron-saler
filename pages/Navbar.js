import React, { useState,useEffect } from "react";
import navstyle from "../styles/Navbar.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { connectWallet } from "../SmartContractsStuff/accountsConnect";

export default function Navbar(props) {
  let brandName = props.brandName;
  const [connectedAddress, setConnectedAddress] = useState(null);

  const homepage = () => {
    props.func("home");
  };
  const sale = () => {
    props.func("sale");
  };
  const about = () => {
    props.func("about");
  };
  async function connectTheWallet() {
    let adr = await connectWallet();
    setConnectedAddress(adr);
  }
  useEffect(() => {
    // connectTheWallet();
  }, []);
function getMinimalAddress(address){
if(!address){
  connectTheWallet();
  return "Fetching..."

}
return address.toString().slice(0,5)+'...'+address.toString().slice(-4,);

}
  return (
    <>
      <div className={navstyle.maincontainer}>
        <div className={navstyle.container1}>
          <img src={props.image} alt="icon" className={navstyle.image} />
          <p>{brandName}</p>
        </div>
        <div className={navstyle.container2}>
          <button className={navstyle.button} onClick={homepage}>
            Home
          </button>
          <button className={navstyle.button} onClick={sale}>
            Sale
          </button>
          <button className={navstyle.button} onClick={about}>
            About
          </button>
        </div>
        <div className={navstyle.container3}>
          <button style={{
              padding:"10px",
              background:"black",
              border:"1px solid white",
              color:"white",
              borderRadius:"10px",
              fontSize:"16px",
              cursor:"pointer"
            }}  onClick={connectTheWallet}>{connectedAddress?getMinimalAddress(connectedAddress):"Connect Wallet"}</button>
          
        </div>
      </div>
    </>
  );
}
Navbar.proptype;
