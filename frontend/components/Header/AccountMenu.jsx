'use client';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';

import userDefaultAvatar from '@/public/user-default.jpg';
import requests from '@/services/requests';

function AccountMenu() {
    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await requests.logout(router, dispatch);
    };

    return (
        <>
            {authState.userData ? (
                <div className="z-20 flex items-end relative group">
                    {authState.userData && (
                        <span className="hidden lg:block text-[#1a1a1a] mr-[10px] text-[16px] md:text-[22px] font-medium">
                            Hi {authState.userData.last_name}
                        </span>
                    )}
                    <Image
                        alt="user-avatar"
                        src={userDefaultAvatar}
                        height={38}
                        className="rounded-full cursor-pointer"
                    />
                    <span className=" absolute right-0 top-full h-2 w-[170px]"></span>

                    <div className="hidden group-hover:flex absolute top-[40px] right-0 flex-col w-[170px] text-[14px] font-medium [&>*]:cursor-pointer">
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
                    className="duration-300 px-4 py-2 md:text-[20px] font-medium cursor-pointer bg-[#1a1a1a] hover:bg-[#ff3130]"
                >
                    Log in
                </Link>
            )}
        </>
    );
}

export default AccountMenu;
