import Navbar from "./Navbar";
import Introduction from "./Introduction";
import Sale from "./Sale";
import About from "./About";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import Web3Modal from "web3modal";
import {
  getCollectionURIs,
  getCurrentDeployment,
  getSaleContract,
} from "../SmartContractsStuff/contractInteraction";
import { getTokensMetaData } from "../SmartContractsStuff/IpfsInteraction";
import ShowNFTs from "./ShowNFTs";
import { connectWallet } from "../SmartContractsStuff/accountsConnect";

let myUrlAddress = "https://tron-saler.vercel.app";

export default function Home() {
  const [currentpage, setCurrentPage] = useState("home");
  const [currentDeployment, setCurrentDeployment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState(null);
  const [NFTs, setNFTs] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);

  async function fetchCollection(deploymentAddress) {
    console.log("making a sale contract ");

    let saleContract = await getSaleContract(deploymentAddress);
    console.log("sale contract is ", saleContract);
    let name;
    try {
      name = await saleContract.name().call();
      console.log("name is ", name);
      setBrandName(name);
    } catch (e) {
      console.log("not to get name");
    }
    let baseURIs;
    try {
      baseURIs = await getCollectionURIs(saleContract);
      // console.log("base URIs ", baseURIs);
    } catch (e) {
      console.log("unable to get base uri");
    }
    try {
      await getTokensMetaData(baseURIs, setNFTs, saleContract);
    } catch (e) {
      console.log("errror:getmetadata ");
      // setLoading(false);
    }
  }
  async function fetchDeployment() {
    console.log("connected is ", walletAddress);
    let _currentDeployment = await getCurrentDeployment(myUrlAddress);
    if (!_currentDeployment) {
      return null;
    }
    return _currentDeployment.currentDeployment;
  }

  async function ConnectTheWallet() {
    let adr = await connectWallet();
    if (!adr) return;
    setWalletAddress(adr);
    return adr;
  }
  async function init() {
    if (!walletAddress) return null;
    let deploymentAddress = await fetchDeployment();
    deploymentAddress = "TPsPBnb2VX6RLk5HqRjfyTJ284DK85b13q";
    console.log("deployment", deploymentAddress);
    setCurrentDeployment(deploymentAddress);

    if (deploymentAddress) {
      await fetchCollection(deploymentAddress);
    } else {
      // setLoading(false);
    }
  }
  useEffect(() => {
    ConnectTheWallet();
    init();
  }, [walletAddress]);
  // console.log("NFTs are ", NFTs);
  return (
    <div
      style={{
        height: "100vh",
        background: "black",
      }}
    >
      <Navbar
        image={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr7ZZQwTn5ClB5v8hOJTehixgGs5csluH-8WIUQEB2rdEaFFzXWOoXY4oOGK09US2CAdY&usqp=CAU"
        }
        brandName={brandName ? brandName : "Tron Saler"}
        func={setCurrentPage}
      />

      {currentDeployment == null ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "black",
            color: "white",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          {!walletAddress ? (
            <button
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={ConnectTheWallet}
            >
              Connect Wallet
            </button>
          ) : !currentDeployment ? (
            "Tron Saler is not rented for any collection"
          ) : loading && !brandName ? (
            "Loading Hosted Collection's details"
          ) : brandName ? (
            brandName + " NFTs are coming.."
          ) : (
            "Lets Sale is not rented for any sale yet"
          )}
        </div>
      ) : (
        <>
          {" "}
          {currentpage === "about" && (
            <About
              heading="About us"
              description="The founder is an integral part of the brand’s origin story, so making her the star of the page works. Think about including additional elements that can strengthen your About Us page.Hello know us."
              discord="https://discord.com/invite/chainlink"
              linkdin="https://www.linkedin.com/in/umarkhatab456"
              email="mailto:seemalfrl@gmail.com"
              twitter="https://twitter.com/umarkhatab465"
            />
          )}
          {currentpage === "sale" && (
            <Sale
              heading="Mint Membership  "
              text="You will receive a special NFT as part of your membership, and you will be eligible for Early Access. NFTS are limited, and only NFT owners will get Early Access. You can help us create more tools by purchasing a membership. Join our community! Public access will be enabled in the end of 2022."
            />
          )}
          {currentpage === "home" && (
            <div>
              <Introduction
                intro="When buying an NFT, you will be instantly registered as the unique owner on the Blockchain. Exclusive NFT Collections. Buy NFT Art simply with a Credit Card. No digital wallet needed."
                heading="Collection NFT Sale"
                image={NFTs.length > 0 ? NFTs[0].image : undefined}
              />
              {brandName && NFTs.length == 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "100vh",
                    fontSize: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "black",
                    color: "white",
                    fontWeight: "600px",
                  }}
                >
                  <p>Fetching Collections...</p>
                </div>
              ) : (
                <ShowNFTs contractAddress={currentDeployment} NFTs={NFTs} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
