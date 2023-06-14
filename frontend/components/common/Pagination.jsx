'use client';
import { useEffect, useRef } from 'react';
import { HiOutlineArrowNarrowLeft } from '@react-icons/all-files/hi/HiOutlineArrowNarrowLeft';
import { HiOutlineArrowNarrowRight } from '@react-icons/all-files/hi/HiOutlineArrowNarrowRight';

function Pagination({ totalPages, onPage, currentPage }) {
    const pageNums = Array.from({ length: totalPages }, (v, i) => i + 1);
    const listRef = useRef();

    const handlePrev = () => {
        if (currentPage > 1) onPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPage(currentPage + 1);
    };

    useEffect(() => {
        if (currentPage <= 3) {
            listRef.current.style.transform = `translateX(0)`;
        } else if (currentPage > 3 && totalPages - currentPage >= 2) {
            listRef.current.style.transform = `translateX(-${(currentPage - 3) * 44}px)`;
        } else {
            listRef.current.style.transform = `translateX(-${(totalPages - 2 - 3) * 44}px)`;
        }
    }, [currentPage, totalPages]);

    return (
        <div className="w-full flex items-center justify-center text-[20px] mt-8">
            {totalPages > 5 && <HiOutlineArrowNarrowLeft className="cursor-pointer" onClick={handlePrev} />}

            <div className={`overflow-hidden mx-4 select-none ${totalPages > 5 ? 'w-[220px]' : ''}`}>
                <ul ref={listRef} className="whitespace-nowrap">
                    {pageNums.map((num) => (
                        <li
                            key={num}
                            className={`${
                                currentPage === num
                                    ? 'bg-primary text-white pointer-events-none '
                                    : 'hover:bg-[#fd9999] hover:text-white '
                            }cursor-pointer inline-grid place-items-center list-none w-[36px] h-[36px] mx-1 rounded-full`}
                            onClick={() => onPage(num)}
                        >
                            {num}
                        </li>
                    ))}
                </ul>
            </div>

            {totalPages > 5 && <HiOutlineArrowNarrowRight className="cursor-pointer" onClick={handleNext} />}
        </div>
    );
}

export default Pagination;
