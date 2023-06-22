import Link from 'next/link';

import categories from '@/public/category';

function Navbar() {
    return (
        <nav className="hidden lg:flex text-black uppercase font-bold items-center [&>*]:mx-[20px] [&>*]:cursor-pointer [&>*]:border-b-[2px] [&>*]:border-transparent [&>*:hover]:border-[#fe3333] [&>*]:py-1">
            {categories.map((category) => (
                <Link key={category.title} href={category.href}>
                    {category.title}
                </Link>
            ))}
        </nav>
    );
}

export default Navbar;
