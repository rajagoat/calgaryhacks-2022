import Image from 'next/image';
import styles from '../styles/PassengerWait.module.css';

const DriverPassengerView = () => {

    const trip_num = "Noel Thomas";
    const driverImage = "https://ucarecdn.com/d0cfd8a6-ae78-42c3-97d0-ad3f1b49174b/noel.png";
    const driverPronouns = "He/Him";


    return (
        <div className={styles.center}>
            <h3 className={styles.title}>H</h3>
            <br/>
            <div className={styles.imageContainer}>
                <Image src={driverImage} alt='profile-pic' layout="fill" objectFit='cover'/>
            </div>
            <br />
            <div>{driverPronouns}</div>
            <br />
            <div style={{marginLeft:"26px", marginRight:"26px"}}>Remember to verify your driver using the QR Code feature.</div>
        </div>
    );
}

export default DriverPassengerView;