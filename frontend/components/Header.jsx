'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { RiAccountPinCircleFill } from 'react-icons/ri';

import logo from '@/public/logo.png';
import sloganBlack from '@/public/slogan-black.png';
import userDefaultAvatar from '@/public/user-default.jpg';
import Navbar from './Navbar';
import requests from '@/services/requests';

function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await requests.logout(router, dispatch);
    };

    return (
        <>
            <div className="w-full h-[90px] flex justify-between items-center px-[50px] bg-ưhite text-white shadow-md">
                <Link href="/" className="flex items-center cursor-pointer">
                    <Image alt="logo" src={logo} height={50} className="mr-3" />
                    <Image alt="logo" src={sloganBlack} height={35} />
                </Link>

                {authState.userData ? (
                    <div className=" flex items-end relative group">
                        {authState.userData && (
                            <span className="text-[#1a1a1a] mr-[10px] text-[26px] font-medium">
                                Hi {authState.userData.last_name}
                            </span>
                        )}
                        <Image
                            alt="user-avatar"
                            src={userDefaultAvatar}
                            height={40}
                            className="rounded-full cursor-pointer"
                        />
                        <span className="absolute right-0 top-full h-2 w-full"></span>

                        <div className="hidden group-hover:flex absolute top-[46px] right-0 flex-col w-[170px] text-[14px] font-medium [&>*]:cursor-pointer">
                            <Link
                                href="/"
                                className="p-3 bg-slate-600 flex items-center justify-between rounded-t-xl cursor-grab hover:bg-slate-500"
                            >
                                <span>My Account</span> <RiAccountPinCircleFill className="text-[26px]" />
                            </Link>
                            <div
                                onClick={handleLogout}
                                className="p-3 bg-slate-600 flex items-center justify-between rounded-b-xl cursor-grab hover:bg-slate-500"
                            >
                                <span>Log out</span>
                                <FiLogOut className="text-[24px]" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link
                        href="/auth/login"
                        className="text-[#1a1a1a] mr-[10px] text-[20px] font-medium cursor-pointer hover:text-[#ff3130]"
                    >
                        Log in
                    </Link>
                )}
            </div>

            <Navbar />
        </>
    );
}

export default Header;
