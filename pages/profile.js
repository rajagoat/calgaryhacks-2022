import Head from 'next/head'
import Image from 'next/image';
import { useState, useEffect } from 'react';

import styles from '../styles/Profile.module.css'
import uploadcare from 'uploadcare-widget'

export default function Profile() {
  
  var file_src = "d0cfd8a6-ae78-42c3-97d0-ad3f1b49174b/noel.png";
  var name = "Noel Thomas";
  var pronouns = "He/Him";
  var pos = "Developer";
  var org = "uofc";
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>

      <a style={{textDecoration:"none", color:"black"}}href="/user_home"><h1 style={{margin:"20px"}}>SMARTPOOL</h1></a>

      <div className={styles.profileCard} >
        <div className={styles.imageContainer}>
          <Image src={`https://ucarecdn.com/${file_src}`} placeholder='blur' 
          blurDataURL={`https://ucarecdn.com/3b3c67e9-b8c3-4e2f-9416-199a1137aa80/qrimage.png`} alt='profile-pic' layout="fill" objectFit='cover'/>
        </div>
        <br/>
        <div className='center'>
          <h2>{name}</h2>
          {pronouns}

          <br/>

          <h4>{pos} @ {org}</h4>
          <div className={styles.back}>
          <a href="/user_home">
            <b>
            Back to Home
            </b>
          </a>
        </div>
        </div>
        
      </div>
    </div>
  )
}
