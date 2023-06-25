'use client';
import Link from 'next/link';
import { FaChevronLeft } from '@react-icons/all-files/fa/FaChevronLeft';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';

import { Button, Rating } from '../common';

function TopRecipePreview({ recipes }) {
    const [[index, direction], setIndex] = useState([0, 1]);
    const [recipe, setRecipe] = useState(recipes[index].top_one[0]);

    const handlePrev = () => {
        setIndex(() => (index === 0 ? [recipes.length - 1, -1] : [index - 1, -1]));
    };

    const handleNext = () => {
        setIndex(() => (index === recipes.length - 1 ? [0, 1] : [index + 1, 1]));
    };

    // auto slideshow
    useEffect(() => {
        const slider = () => {
            setIndex(() => (index === recipes.length - 1 ? [0, 1] : [index + 1, 1]));
        };
        const id = setInterval(slider, 10000);

        return () => {
            clearInterval(id);
        };
    }, [recipes, index]);

    useLayoutEffect(() => {
        setRecipe(recipes[index].top_one[0]);
    }, [index]);

    return (
        <div className="flex items-center justify-center sm:justify-between h-full w-full">
            <div onClick={handlePrev} className="hidden sm:block">
                <FaChevronLeft size={40} className="duration-300 cursor-pointer text-[#ffffff4d] hover:text-white" />
            </div>

            <div className="h-full mx-5 flex flex-col-reverse lg:flex-row lg:items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={recipe.desc}
                        initial={{ opacity: 0, y: direction < 0 ? '20px' : '-20px' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: direction > 0 ? '20px' : '-20px' }}
                        transition={{ duration: 0.8 }}
                        className="text-white lg:mr-[70px]"
                    >
                        <div className="mt-3 lg:mt-0 lg:max-w-[500px] group">
                            <div className="ellipsis-2 text-[30px] md:text-[40px] leading-[40px] font-bold underline-offset-4 decoration-primary group-hover:underline">
                                {recipe.title}
                            </div>

                            <span className="flex items-center mt-1">
                                <div className="translate-y-[-2px]">
                                    <Rating rate={`${Math.ceil(recipe.rate)}`} readOnly size="sm" />
                                </div>
                                <span className="ml-2">{recipe.rate.toFixed(1)}</span>
                                <span className="ml-1">({recipe.total_rated})</span>
                            </span>

                            <p className="text-justify mt-2 ellipsis-3 text-sm md:text-base">{recipe.desc}</p>

                            <div className="flex items-end mt-4">
                                <Link href={`/recipe/detail/${recipe._id}`}>
                                    <Button typeBtn="primary" className="text-[16px] font-bold py-2 px-3">
                                        DETAIL
                                    </Button>
                                </Link>

                                <Link href={`/recipe/${recipe.dishType}`} className="ml-2">
                                    <Button typeBtn="outline" className="text-[16px] font-bold py-2 px-3">
                                        MORE
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.img
                        key={recipe._id}
                        initial={{ opacity: 0, y: direction > 0 ? '20px' : '-20px' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: direction < 0 ? '20px' : '-20px' }}
                        transition={{ duration: 0.8 }}
                        alt={recipe.title}
                        src={recipe.imgURL}
                        className="w-full  lg:w-1/2 h-1/3 sm:h-1/2 lg:h-4/5 object-cover select-none rounded-lg"
                    />
                </AnimatePresence>
            </div>

            <div onClick={handleNext} className="hidden sm:block">
                <FaChevronRight size={40} className="duration-300 cursor-pointer text-[#ffffff4d] hover:text-white" />
            </div>
        </div>
    );
}

export default TopRecipePreview;
