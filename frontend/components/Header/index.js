import Link from 'next/link';
import Image from 'next/image';

import logo from '@/public/logo.png';
import sloganBlack from '@/public/slogan-black.png';
import Navbar from './Navbar';
import AccountMenu from './AccountMenu';
import NavbarIcon from './NavbarIcon';

function Header() {
    return (
        <>
            <div className="w-full h-[70px] flex justify-between items-center px-3 lg:px-[50px] bg-ưhite text-white shadow-md">
                <NavbarIcon />

                <Link href="/" className="flex items-center cursor-pointer">
                    <Image alt="logo" src={logo} height={50} priority className="lg:mr-3" />
                    <Image alt="logo" src={sloganBlack} height={35} priority className="hidden lg:block" />
                </Link>

                <AccountMenu />
            </div>

            <Navbar />
        </>
    );
}

export default Header;
