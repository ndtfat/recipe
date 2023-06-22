import Image from 'next/image';
import { motion } from 'framer-motion';

function Header({ category }) {
    return (
        <header className="relative">
            <Image
                placeholder="category"
                blurDataURL="@/public/logo.png"
                alt="category"
                src={category.background}
                className="w-full h-[350px] object-cover backdrop-brightness-50"
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex flex-col items-center justify-center bg-[#000000b1] text-white p-5 md:p-7">
                <div className="overflow-hidden mb-3">
                    <motion.h1
                        initial={{ y: '100%' }}
                        animate={{ y: '0' }}
                        transition={{ duration: 0.8 }}
                        className="font-bold text-center text-[30px] md:text-[50px] underline underline-offset-2 decoration-primary leading-tight"
                    >
                        {category.title}
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.p
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-[14px] lg:text-[16px]"
                    >
                        {category.desc}
                    </motion.p>
                </div>
            </div>
        </header>
    );
}

export default Header;
