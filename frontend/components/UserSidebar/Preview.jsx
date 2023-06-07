'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';

import avatar from '@/public/user-default.jpg';

function Preview() {
    const user = useSelector((state) => state.auth.userData);
    console.log(user);

    return (
        <div className="w-[300px] flex p-[12px] bg-white mb-[2px]">
            <Image alt="avatar" src={avatar} height={100} className="mr-[10px]" />

            <div className="font-bold text-[22px]">
                <span className="block">Hi,</span>
                <span className="text-primary">
                    <span className="first-letter:uppercase">{user?.first_name}</span> {user?.last_name}
                </span>
            </div>
        </div>
    );
}

export default Preview;
