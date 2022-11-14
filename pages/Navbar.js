import React from "react";
import navstyle from "../styles/Navbar.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar(props) {
  let brandName=props.brandName;
  const homepage = () => {
    console.log("call home page");
    props.func("home");
  };
  const sale = () => {
    console.log("call saleing page");
    props.func("sale");
  };
  const about = () => {
    console.log("call about page");
    props.func("about");
  };
  return (
    <>
      <div  className={navstyle.maincontainer}>
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
          <ConnectButton chainStatus={false} label={"Connect"}   showBalance={false}/>
        </div>
      </div>
    </>
  );
}
Navbar.proptype;
