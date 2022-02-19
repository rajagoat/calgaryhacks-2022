import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <nav>
            <h1 className={styles.logo}>SMARTPOOL</h1>
            <Link href={'/login'}>
                <a className={styles.login}><h3>Log In</h3></a>
            </Link>
        </nav>
    );
}

export default Navbar;