import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '../common';

function Latest({ recipe }) {
    return (
        <div className="flex items-center justify-center w-full mb-5">
            <img alt={recipe.title} src={recipe.imgURL} className="h-[200px] md:h-[300px] lg:w-[400px] object-cover" />

            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="h-[200px] md:h-[300px] lg:w-[300px] p-3 md:p-5 bg-secondary"
            >
                <h1 className="ellipsis-2 font-bold text-[20px] md:text-[30px] mb-2 leading-tight">{recipe.title}</h1>
                <p className="ellipsis-3 text-[14px] md:text-[16px] text-justify first-letter:uppercase leading-tight mb-6">
                    {recipe.desc}
                </p>

                <Link href={`/recipe/detail/${recipe._id}`}>
                    <Button typeBtn="primary" className="text-[16px] font-bold py-2 px-3">
                        DETAIL
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}

export default Latest;
