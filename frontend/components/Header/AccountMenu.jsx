'use client';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FiLogOut } from '@react-icons/all-files/fi/FiLogOut';
import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';
import { RiAccountPinCircleFill } from '@react-icons/all-files/ri/RiAccountPinCircleFill';
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
        // router.push('/auth/login');
    };

    return (
        <>
            {authState.userData ? (
                <div className="dropdown dropdown-bottom dropdown-end z-10 cursor-pointer">
                    <label tabIndex={0} className="">
                        <Image
                            priority
                            alt="user-avatar"
                            src={userDefaultAvatar}
                            height={46}
                            className="rounded-full cursor-pointer"
                        />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu w-52">
                        <Link
                            href={`/user/${authState.userData._id}?content=Personal Info`}
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
                    </ul>
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
