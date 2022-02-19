import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <Image src={'/static/driver.gif'} alt='driver' width={800} height={800} />
        <div className={styles.mainInfo}>
          <h2>Get to where you're going with your peers.</h2>
          <p>Find people from your organization to rideshare with. You only pay a fraction for gas!</p>
          <button type='button'>
            <Link href={'/signup'}>
              <a>Get started</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
