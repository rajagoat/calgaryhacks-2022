import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from '../components/SignInButton';
import { SignOutButton } from './SignOutButton';

const Navbar = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <nav>
            <h1 className={styles.logo}>SMARTPOOL</h1>
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </nav>
    );
}

export default Navbar;