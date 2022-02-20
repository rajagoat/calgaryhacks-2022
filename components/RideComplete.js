import Image from 'next/image';
import styles from '../styles/PassengerWait.module.css';

const RideComplete = () => {

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



    return (
        <div className={styles.center}>
            <Image src="/static/RideComplete.svg" alt='celebration' height={140} width={140}/>
            <br />
            <h3 className={styles.title}>Ride Complete</h3>
            <button type='button' onClick={handleTransaction}>Checkout</button>
        </div>
    );
}

export default RideComplete;