import Head from 'next/head'
import Image from 'next/image';
import { useState, useEffect } from 'react';

import styles from '../styles/Profile.module.css'


export default function Profile() {

  // const [windowSize, setWindowSize] = useState({
  //   width: undefined,
  //   height: undefined,
  // });

  // useEffect(() => {
  //   // only execute all the code below in client side
  //   if (typeof window !== 'undefined') {
  //     // Handler to call on window resize
  //     function handleResize() {
  //       // Set window width/height to state
  //       setWindowSize({
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //       });
  //     }
    
  //     // Add event listener
  //     window.addEventListener("resize", handleResize);
     
  //     // Call handler right away so state gets updated with initial window size
  //     handleResize();
    
  //     // Remove event listener on cleanup
  //     return () => window.removeEventListener("resize", handleResize);
  //   }
  // }, []); // Empty array ensures that effect is only run on mount


  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>

      <h1 style={{margin:"20px"}}>SMARTPOOL</h1>

      <div className={styles.profileCard} >
        <div className={styles.imageContainer}>
          <Image src={'https://ucarecdn.com/d0cfd8a6-ae78-42c3-97d0-ad3f1b49174b/noel.png'} alt='profile-pic' layout="fill" objectFit='cover'/>
        </div>
        <br/>
        <div className='center'>
          <h2>Noel Thomas</h2>
          Pronouns

          <br/>

          <h4>Position @ Organization</h4>
        </div>
        
      </div>
    </div>
  )
}
