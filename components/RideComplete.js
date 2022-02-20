import Image from 'next/image';
import styles from '../styles/PassengerWait.module.css';

const PassengerWait = () => {

    const driverName = "Noel Thomas";
    const driverImage = "https://ucarecdn.com/d0cfd8a6-ae78-42c3-97d0-ad3f1b49174b/noel.png";
    const driverPronouns = "He/Him";


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