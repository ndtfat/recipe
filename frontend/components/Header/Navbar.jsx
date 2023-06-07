import Link from 'next/link';

import categories from '@/public/category';

function Navbar() {
    return (
        <nav className="hidden lg:flex bg-[#1a1a1a] text-white text-[18px] font-medium w-full h-[50px] justify-center items-center [&>*]:mx-[26px] [&>*]:cursor-pointer [&>*]:border-b-[2px] [&>*]:border-transparent [&>*:hover]:border-[#fe3333]">
            {categories.map((category) => (
                <Link key={category.title} href={category.href}>
                    {category.title}
                </Link>
            ))}
        </nav>
    );
}

export default Navbar;
