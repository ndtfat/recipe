'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { SlArrowRight } from 'react-icons/sl';

import categories from '@/public/category';

function NavbarIcon() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="z-20 block lg:hidden">
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="[&>*]:duration-300 [&>*]:text-[34px] [&>*]:text-black [&>*:hover]:text-primary [&>*]:cursor-pointer"
            >
                {isOpen ? <GrClose /> : <FiMenu />}
            </div>

            <span className="fixed top-[70px] left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]"></span>

            {isOpen && (
                <div className="fixed top-[70px] h-full left-0 w-[300px] flex flex-col bg-white text-black text-[16px] font-medium ">
                    <h1 className="ml-[50px] mr-[90px] text-[30px] border-b-4 border-primary">Categories</h1>

                    <nav className="flex flex-col mt-[20px] ">
                        {categories.map((category) => (
                            <Link
                                key={category.title}
                                href={category.href}
                                className="cursor-pointer w-full flex items-center justify-between pl-[50px] pr-[20px] py-[16px] border-b-[1px] border-[#ccc] hover:bg-slate-200"
                            >
                                {category.title} <SlArrowRight />
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}

export default NavbarIcon;
