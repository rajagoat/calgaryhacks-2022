import Image from 'next/image';
import styles from '../styles/Looking.module.css';

const Looking = ({ userInfo }) => {
    return (
        <>
            <Image src={'/static/magnifying-glass.svg'} alt='Magnifying Glass' height={140} width={140}/>
            <h3 style={{margin:"32px"}}>Looking for {userInfo}...</h3>
        </>
    );
}
 
export default Looking;