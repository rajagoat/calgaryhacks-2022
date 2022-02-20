import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/UserHome.module.css'
import { useState } from 'react';
import Looking from '../components/Looking';
import dynamic from 'next/dynamic';

const PassengerWait = dynamic(() => import('../components/PassengerWait'));

export default function UserHome() {

  const [driverSelected, setDriverSelected] = useState(false);
  const [passengerSelected, setPassengerSelected] = useState(false);
  const [passengerWaiting, setPassengerWaiting] = useState(true);

  const [arrival, setArrival] = useState("")

  const dest = "university+of+calgary"
  const src = "calgary"
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBnVKDuctU6vqxXII877bb_k-rEeF4DlvE&origin=${src}&destination=${dest}&avoid=tolls|highways&zoom=12`

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents page refresh
    let time = e.target[0].value;
    let driverValue = e.target[1].checked;
    if (driverValue) {
      setDriverSelected(true);
    } else {
      setPassengerSelected(true);
    }
    // Use a backend function here to send the time and passenger value to the DB
  }

  return (
    <div style={{ height: "100vh", overflow: "hidden", backgroundColor: "gray" }}>
      <Head>
        <title>Start</title>
      </Head>

      <div style={{ zIndex: "0", backgroundColor:"grey" }}>

        <div className={styles.profile}>
          <a href="/user_home">
            <b>
            Go back
            </b>
          </a>
        </div>

        
        <iframe
          style={{ overflow: "hidden", height: "100vh", width: "100vw" }}
          loading="lazy"
          allowFullScreen
          src={mapUrl} >
        </iframe>
      </div>


      {!driverSelected && !passengerSelected ? <div className={styles.actionBox}>
        <form onSubmit={handleSubmit}>
          <p>Choose your arrival time:</p>
          <input type="time" id='appt' name='appt' required/>
          <p>Choose your role:</p>
          <input type="radio" id='driver' name='role' value={'Driver'} required/>
          <label htmlFor="driver">Driver</label>
          <input type="radio" id='passenger' name='role' value={'Passenger'} required/>
          <label htmlFor="passenger">Passenger</label>
          <input type="submit" value={'Submit'}/>
        </form>
        {/* <h2 style={{margin:"32px"}}>Choose your arrival time.</h2>
        <input type={'time'} name={'appt'} className={styles.actionQuestion} required
              onChange={(newText) => {
                handleArrival(newText)
              }}
            />
          
        <h2 style={{margin:"32px"}}>And choose your role.</h2>
        <div className={styles.actionOption} style={{ backgroundColor: "#FFC154" }} onClick={handleDriver}><h3>Driver</h3></div>
        <div className={styles.actionOption} style={{ backgroundColor: "#FF9345" }} onClick={handlePassenger}><h3>Passenger</h3></div> */}

      </div> : <div className={styles.actionBox}>
        {driverSelected && passengerWaiting ? <Looking userInfo={'passengers'}/> : <Looking userInfo={'a driver'}/>}
      </div>}
    </div>
  )
}
