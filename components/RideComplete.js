import Image from 'next/image';
import styles from '../styles/PassengerWait.module.css';

const RideComplete = () => {
    return (
        <div className={styles.center}>
            <Image src="/static/RideComplete.svg" alt='celebration' height={140} width={140}/>
            <br />
            <h3 className={styles.title}>Ride Complete</h3>
            
        </div>
    );
}

export default RideComplete;