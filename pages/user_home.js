import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/UserHome.module.css'
import { useState } from 'react';
import PassengerWait from "../components/PassengerWait";
import Looking from '../components/Looking';

export default function UserHome() {
  const [driverSelected, setDriverSelected] = useState(false);
  const [passengerSelected, setPassengerSelected] = useState(false);

  const dest = "university+of+calgary"
  const src = "calgary"
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBnVKDuctU6vqxXII877bb_k-rEeF4DlvE&origin=${src}&destination=${dest}&avoid=tolls|highways`

  const handleDriver = () => {
    setDriverSelected(true);
  }

  const handlePassenger = () => {
    setPassengerSelected(true);
  }

  return (
    <div style={{ height: "100vh", overflow: "hidden", backgroundColor: "gray" }}>
      <Head>
        <title>Start</title>
      </Head>

      <div style={{ zIndex: "0" }}>
        <iframe
          style={{ overflow: "hidden", height: "100vh", width: "100vw" }}
          loading="lazy"
          allowfullscreen
          src={mapUrl} >
        </iframe>
      </div>


      {!driverSelected && !passengerSelected ? <div className={styles.actionBox}>
        <h2>Choose your role.</h2>
        <div className={styles.actionOption} style={{ backgroundColor: "#FFC154" }} onClick={handleDriver}><h3>Driver</h3></div>
        <div className={styles.actionOption} style={{ backgroundColor: "#FF9345" }} onClick={handlePassenger}><h3>Passenger</h3></div>
      </div> : <div className={styles.actionBox}> 
        <Looking />
      </div>}
    </div>
  )
}
