'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';

import avatar from '@/public/user-default.jpg';

function Preview() {
    const user = useSelector((state) => state.auth.userData);

    return (
        <div className="w-[350px] flex p-[12px] bg-white mb-[2px]">
            <Image alt="avatar" src={avatar} height={100} className="mr-[10px]" />

            {user && (
                <div className="font-bold text-[20px]">
                    <span>Hi,</span>
                    <span className="text-primary ml-1">
                        <span className="first-letter:uppercase">{user.first_name}</span> {user.last_name}
                    </span>
                    <span className="block font-normal text-[14px] text-ellipsis overflow-hidden">{user.email}</span>
                </div>
            )}
        </div>
    );
}

export default Preview;
