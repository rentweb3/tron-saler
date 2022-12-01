import React, { useState } from "react";
import styles from "../styles/ShowNFTs.module.css";
import NFTInformation from "./NFTInformation";

export default function ShowNFTs(props) {
  let collection = props.NFTs;
  let contractAddress=props.contractAddress;
  const [selectedNFT, setSelectedNFT] = useState(null);

  // console.log("NFt collection we found is ", collection);
  
  return (
    <>
      {!selectedNFT && (
        <div key={"NFTs collection"} className={styles.main}>
          <ul  className={styles.collection_list}>
            {collection.map((item, index) => {
              return (
                <li key={"nft" + item.name} className={styles.nft__container}>
                  <div className={styles.image__container}>
                    <img
                      className={styles.image}
                      src={item.image}
                      onClick={() => {
                        setSelectedNFT(item);
                      }}
                    />
                  </div>
                  <h4>{item.name}</h4>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {selectedNFT && <NFTInformation contractAddress={contractAddress} NFT={selectedNFT} toggler={setSelectedNFT} />}
    </>
  );
}
