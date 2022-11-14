import React from "react";
import styles from "../styles/Introduction.module.css";

export default function Introduction(props) {
  let image = props.image;
  const getSale = () => {
    console.log("whitelisting page");
  };

  return (
    <div className={styles.main__container}>
      <div className={styles.container1}>
        <div className={styles.heading}>
          <h1>{props.heading}</h1>
        </div>
        <div className={styles.intro}>
          <p>{props.intro}</p>
          <div>
            <button className={styles.button} onClick={getSale}>
              Start Minting
            </button>
          </div>
        </div>
      </div>
      <div className={styles.container2}>
        <img
          className={styles.image}
          src={
            image
              ? image
              : "https://cdnb.artstation.com/p/assets/images/images/051/104/991/large/nft-artist-whatsapp-image-2022-06-28-at-6-14-42-pm-1.jpg?1656465338"
          }
          alt="bordape"
        />
      </div>
    </div>
  );
}
