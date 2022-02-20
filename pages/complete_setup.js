import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/CSetup.module.css'

import { useEffect, useState } from 'react';
import uploadcare from 'uploadcare-widget';

export default function CompleteSetup() {

    const [file_src, setFilesrc] = useState("init");
    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== 'undefined') {
          const widget = uploadcare.Widget("#uploader", { publicKey: '96bdf694b2ef98124327', imagesOnly: true });
          widget.onUploadComplete(fileInfo => {
            console.log(fileInfo.uuid); // Uploaded file id
            console.log(fileInfo.name); // Uploaded file name

            var uuid = fileInfo.uuid;

            var filename = fileInfo.name;

            filename = filename.replace(/[.](?=.*[.])/g, "");
            filename = filename.replace(/\s+/g, '');
            filename = filename.replace(/-/g, '');

            setFilesrc(uuid + "/" + filename);

            console.log(file_src)
          });
        }
      }, []);
  return (
    <div>
      <Head>
        <title>Complete Your Setup</title>
      </Head>
    
    <div>
      <Head>
        <title>Profile</title>
      </Head>

      <h1 style={{margin:"20px"}}>SMARTPOOL</h1>

      <div className={styles.profileCard} >

        <h2>Complete your profile setup</h2>
        <br/>
        <br/>
        <div className={styles.imageContainer}>
          <Image src={`https://ucarecdn.com/${file_src}`} placeholder='blur' 
          blurDataURL={`https://ucarecdn.com/3b3c67e9-b8c3-4e2f-9416-199a1137aa80/qrimage.png`} alt='profile-pic' layout="fill" objectFit='cover'/>
        </div>

        <div className={styles.imageUpload}>
          <input id="uploader" type="hidden" />
        </div>
        

        <br/>
        <div className='center'>
          <input className={styles.blanks} placeholder="  Name" type="text" />
          <input className={styles.blanks} placeholder="  Pronouns" type="text" />

          <br/>

          <span><input className={styles.blanks} placeholder="  Position" type="text" /> @ <input className={styles.blanks} placeholder="  Organization" type="text" /></span>
        </div>

        <button className={styles.getStarted} type='button'>
            <Link href={'/signup'}>
              <a style={{color:"white", textDecoration:"none", fontSize:"12px"}}>Submit</a>
            </Link>
          </button>
        
      </div>
    </div>

    </div>
  )
}
