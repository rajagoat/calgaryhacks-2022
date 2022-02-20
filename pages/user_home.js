import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/UserHome.module.css'
import Navbar from '../components/Navbar';
import PassengerWait from "../components/PassengerWait";

export default function UserHome() {

  const dest = "university+of+calgary"
  const src = "calgary"
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBnVKDuctU6vqxXII877bb_k-rEeF4DlvE&origin=${src}&destination=${dest}&avoid=tolls|highways`

  return (
    <div style={{height:"100vh", overflow:"hidden", backgroundColor:"gray"}}>
      <Head>
        <title>Start</title>
      </Head>

      <div style={{zIndex:"0"}}>
        <iframe
          style={{overflow:"hidden",height:"100vh",width:"100vw"}}
          loading="lazy"
          allowfullscreen
          src={mapUrl} >
        </iframe>
      </div>


      <div className={styles.actionBox}>
        {/* <div className={styles.actionOption} style={{backgroundColor:"#FFC154"}}><h3>Driver</h3></div>
        <div className={styles.actionOption} style={{backgroundColor:"#FF9345"}}><h3>Passenger</h3></div> */}

        <PassengerWait />
      </div>


    </div>
  )
}
