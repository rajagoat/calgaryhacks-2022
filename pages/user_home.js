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
          <a href="/profile">
            <b>
            View Profile
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
        <form className={styles.center} onSubmit={handleSubmit}>
          <h3>Choose your arrival time:</h3>
          <input className={styles.actionQuestion} type="time" id='appt' name='appt' required/>

          <h3>Choose your role:</h3>
          <div className={styles.actionSelect} >
          <input type="radio" id='driver' name='role' value={'Driver'} required/>
          <label htmlFor="driver"> Driver</label>
          </div>

          <div className={styles.actionSelect} >
          <input type="radio" id='passenger' name='role' value={'Passenger'} required/>
          <label htmlFor="passenger"> Passenger</label>
          </div>

          <input className={styles.submit} type="submit" value={'Submit'}/>
        </form>
      </div> : <div className={styles.actionBox}>
        {driverSelected && passengerWaiting ? <Looking userInfo={'passengers'}/> : <Looking userInfo={'a driver'}/>}
      </div>}
    </div>
  )
}
