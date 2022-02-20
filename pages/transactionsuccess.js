import Head from 'next/head'
import Image from 'next/image';

import styles from '../styles/Profile.module.css'

export default function TransactComplete() {
  var file_src = "d0cfd8a6-ae78-42c3-97d0-ad3f1b49174b/noel.png";

  return (
    <div>
      <Head>
        <title>Success</title>
      </Head>

      <a style={{textDecoration:"none", color:"black"}}href="/user_home"><h1 style={{margin:"20px"}}>SMARTPOOL</h1></a>

      <div className={styles.profileCard} >
        <br/>
        <div className='center'>
          <h2>Successful Transaction!</h2>
          <br />
          Have a nice day!
          <div className={styles.back}>
          <a href="/user_home">
            <b>
            Back to home
            </b>
          </a>
        </div>
        </div>
        
      </div>
    </div>
  )
}
