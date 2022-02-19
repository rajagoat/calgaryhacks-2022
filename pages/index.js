import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className={styles.landing}>
      <Navbar />
      <Image src={'/static/driver.gif'} alt='driver' width={400} height={400} />
      <div>
        <h2>Get to where you're going with your peers.</h2>
        <p>Find people from your organization to rideshare with. You only pay a fraction for gas!</p>
        <button type='button'>
          <Link href={'/'}>
            <a>Get started</a>
          </Link>
        </button>
      </div>
    </div>
  )
}
