import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <h1>SMARTPOOL</h1>
            <Link href={'/login'}>
                <a><h3>Log In</h3></a>
            </Link>
            
        </nav>
    );
}

export default Navbar;