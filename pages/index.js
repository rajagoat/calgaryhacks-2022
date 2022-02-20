import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../src/authConfig";
import { useRouter } from 'next/router';

function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

export default function Home() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter()

  if (isAuthenticated) router.push('/complete_setup');

  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <Image src={'/static/driver.gif'} alt='driver' width={800} height={800} />
        <div className={styles.mainInfo}>
          <h2>Get to where you're going with your peers.</h2>
          <p>Find people from your organization to rideshare with. You only pay a fraction for gas!</p>
          <button type='button' onClick={()=>handleLogin(instance)} style={{ cursor: "pointer" }}>
              <a>Get started</a>
          </button>
        </div>
      </div>
    </div>
  )
}
