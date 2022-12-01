import { WebsiteRentAddress } from "./contractMetdadata";
import { getTokensMetaData } from "./IpfsInteraction";

export const getWebsiteRentContract = async () => {
  let contractAddress = WebsiteRentAddress;
  let tronWeb = await window.tronLink.tronWeb;
  let contract = await tronWeb.contract().at(contractAddress);
  return contract;
};

export const getSaleContract = async (contractAddress) => {
  try {
    let tronWeb = await window.tronLink.tronWeb;
    let contract = await tronWeb.contract().at(contractAddress);
    return contract;
  } catch (e) {
    console.log("error in making contract ", e);
  }
};
export async function mint(contractAddress, tokenId, price, successCallback) {
  let contract = await getSaleContract(contractAddress);
  console.log("sale contract to mint from ", contract);
  await contract.purchaseThisToken(tokenId).send({
    feeLimit: 100000000,
    callValue: price,
    shouldPollResponse: true,
  });
  
}
export async function getTokenOwner(contract) {
  let owner = await contract.ownerOf(tokenId).call();
  return owner;

  return "0x0000000";
}

export async function getCollectionURIs(contract) {
  let _totalSupply;
  try {
    _totalSupply = await contract.totalSupply().call();
  } catch (e) {
    console.log("supply error ", e);
  }

  let numNFTsToFetch = 0;
  numNFTsToFetch = parseInt(_totalSupply);
  console.log("supply is ", numNFTsToFetch);
  let baseURIs = [];

  console.log("Obtaining ", numNFTsToFetch, " NFTs");
  let baseURI = await contract.baseURI().call();

  for (let index = 0; index < numNFTsToFetch; index++) {
    let tokenURI = `${baseURI}/${index+1}.json`;
    baseURIs.push(tokenURI);
  }
  return baseURIs;
}
function noDeployment(adr) {
  if (
    !adr ||
    adr?.toString().includes("0000000000") ||
    adr?.toString().includes("41c0000")
  )
    return true;

  return false;
}

export async function getCurrentDeployment(websiteURL) {
  //   console.log("inside getting current deployment");
  let contract = await getWebsiteRentContract();
  //   console.log("contract is ", contract);
  console.log("checking Deployment of _" + websiteURL + "_");
  let _currentDeployment = await contract
    .websiteToDeployment(websiteURL)
    .call();
  //   console.log("curremt deployment", _currentDeployment);
  if (noDeployment(_currentDeployment)) {
    console.log("No deployment");
    return null;
  }

  let rentTime = await contract.rentTime(websiteURL).call();

  let jsEpochRentTime = parseInt(rentTime * 1000);
  let currentTime = new Date().getTime();
  if (jsEpochRentTime <= currentTime) {
    _currentDeployment = null;
  }
  return { currentDeployment: _currentDeployment, rentTime };
}
