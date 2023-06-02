import Link from 'next/link';

function Navbar() {
    return (
        <nav className="hidden lg:flex bg-[#1a1a1a] text-white text-[18px] font-medium w-full h-[50px] justify-center items-center [&>*]:mx-[26px] [&>*]:cursor-pointer [&>*]:border-b-[2px] [&>*]:border-transparent [&>*:hover]:border-[#fe3333]">
            <Link href="/recipes/main">Main Dishes</Link>
            <Link href="/recipes/healthy">Healthy</Link>
            <Link href="/recipes/soup">Soups</Link>
            <Link href="/recipes/drink">Drinks</Link>
            <Link href="/recipes/dessert">Desserts</Link>
        </nav>
    );
}

export default Navbar;
