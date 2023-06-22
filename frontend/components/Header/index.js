'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import logo from '@/public/logo.png';
import sloganBlack from '@/public/slogan-black.png';
import Navbar from './Navbar';
import NavbarIcon from './NavbarIcon';
import AccountMenu from './AccountMenu';
import { SearchBox } from '../common';

function Header() {
    const pathName = usePathname();

    return (
        <div className="lg:px-[50px] bg-ưhite text-white shadow-md pb-2">
            <div className="w-full h-[70px] flex justify-between items-center px-3">
                <NavbarIcon />

                <div className="flex">
                    <Link href="/" className="flex items-center cursor-pointer">
                        <Image alt="logo" src={logo} height={50} priority className="lg:mr-3" />
                        <Image alt="logo" src={sloganBlack} height={35} priority className="hidden lg:block" />
                    </Link>
                </div>

                <AccountMenu />
            </div>

            <Navbar />
            {!pathName.includes('search') && <SearchBox />}
        </div>
    );
}

export default Header;
