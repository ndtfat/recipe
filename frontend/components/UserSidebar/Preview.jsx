'use client';

import Image from 'next/image';

import avatar from '@/public/user-default.jpg';

function Preview({ info }) {
    return (
        <div className="lg:w-[280px] flex p-[12px] bg-white mb-[2px]">
            <Image alt="avatar" src={avatar} height={50} className="mr-[10px] rounded-full" />

            {info && (
                <div className="font-bold text-[20px]">
                    <span className="text-black">
                        <span className="first-letter:uppercase">{info.first_name}</span> {info.last_name}
                    </span>
                    <span className="block font-normal text-[14px] text-ellipsis overflow-hidden ellipsis">
                        {info.email}
                    </span>
                </div>
            )}
        </div>
    );
}

export default Preview;
