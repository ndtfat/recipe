'use client';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';

import userDefaultAvatar from '@/public/user-default.jpg';
import requests from '@/requests/authRequest';
import { Button } from '../common';
import { createAxiosJWT } from '@/instances';

function AccountMenu() {
    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const axiosJWT = createAxiosJWT(authState.userData, dispatch);

    const handleLogout = async () => {
        await requests.logout(authState.userData?.accessToken, router, dispatch, axiosJWT);

        router.push('/auth/login');
    };

    return (
        <>
            {authState.userData ? (
                <div className="z-20 flex items-end relative group">
                    <Image
                        priority
                        alt="user-avatar"
                        src={userDefaultAvatar}
                        height={46}
                        className="rounded-full cursor-pointer"
                    />
                    <span className=" absolute right-0 top-full h-2 w-[170px]"></span>

                    <div className="hidden group-hover:flex absolute top-[40px] right-0 flex-col w-[170px] text-[14px] font-medium [&>*]:cursor-pointer">
                        <Link
                            href="/user"
                            className="p-3 bg-slate-600 flex items-center justify-between rounded-t-xl cursor-grab hover:bg-slate-500"
                        >
                            <span>My Account</span> <RiAccountPinCircleFill className="text-[26px]" />
                        </Link>
                        <Link
                            href="/user/add-recipe"
                            className="p-3 bg-slate-600 flex items-center justify-between cursor-grab hover:bg-slate-500"
                        >
                            <span>Add a Recipe</span> <FaPlus className="text-[26px]" />
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
                <Link href="/auth/login">
                    <Button className="px-4 py-2 flex items-center">
                        Log in <FiLogIn className="ml-[8px] text-[20px]" />
                    </Button>
                </Link>
            )}
        </>
    );
}

export default AccountMenu;
