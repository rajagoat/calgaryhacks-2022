import Image from 'next/image';
import styles from '../styles/PassengerWait.module.css';

import { useEffect } from 'react';

const PassengerWait = () => {

    const handleTransaction = () => {
        fetch('http://localhost:3000/create-checkout-session', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    {id: 1, quantity: 1}
                ]
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }). then(({url}) => {
            window.location = url
            console.log(url)
        }).catch(e => {
            console.error(e.error)
        })
    }

    const userID = "123456";

    const driverName = "Noel Thomas";
    const driverImage = "https://ucarecdn.com/d0cfd8a6-ae78-42c3-97d0-ad3f1b49174b/noel.png";
    const driverPronouns = "He/Him";

    // var db = require('./db_connection_modules.js');
    return (
        <div className={styles.center}>
            <h3 className={styles.title}>Your ride is on its way!</h3>
            <br/>
            <div className={styles.imageContainer}>
                <Image src={driverImage} alt='profile-pic' layout="fill" objectFit='cover'/>
            </div>
            <br />
            <h4>{driverName}</h4>
            <div>{driverPronouns}</div>
            <br />
            <div style={{marginLeft:"26px", marginRight:"26px"}}>Remember to verify your driver using the QR Code feature.</div>
        </div>
    );
}

export default PassengerWait;