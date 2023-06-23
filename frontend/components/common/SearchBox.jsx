'use client';
import Link from 'next/link';
import { RiSearch2Line } from '@react-icons/all-files/ri/RiSearch2Line';
import { IoMdCloseCircle } from '@react-icons/all-files/io/IoMdCloseCircle';
import { useState, useEffect } from 'react';

import useDebounce from '@/hooks/useDebounce';
import { recipeRequest } from '@/requests';

function SearchBox() {
    const [value, setValue] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const debounce = useDebounce(value, 500);

    useEffect(() => {
        if (debounce) {
            (async () => {
                setLoading(true);
                const res = await recipeRequest.search(debounce.trim(), 1, 'createdAt desc');
                setResults(res.recipes.slice(0, 5));
                setLoading(false);
            })();
        } else {
            setResults([]);
        }
    }, [debounce]);

    return (
        <div className="relative z-40">
            <div className="w-full flex items-center">
                <div className="w-full flex items-center border-[1px] border-primary">
                    <input
                        type="text"
                        value={value}
                        placeholder="search your recipe..."
                        onChange={(e) => setValue(e.target.value)}
                        className="cursor-text w-full text-black py-[7px] outline-none pl-4"
                    />

                    {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                        value && (
                            <IoMdCloseCircle
                                onClick={() => setValue('')}
                                className=" cursor-pointer text-black text-[22px] ml-4 mr-2"
                            />
                        )
                    )}
                </div>

                <Link href={`/search?text=${value}`}>
                    <div className="text-[22px] bg-primary text-white h-[40px] w-[40px] grid place-items-center cursor-pointer">
                        <RiSearch2Line />
                    </div>
                </Link>
            </div>

            {results.length > 0 ? (
                <ul className="w-full absolute left-0 top-[calc(100%+4px)]">
                    {results.map((item) => (
                        <Link key={item._id} href={`/recipe/detail/${item._id}`}>
                            <p className="shadow-md duration-300 cursor-pointer w-full flex justify-between items-center font-bold bg-white hover:bg-secondary text-black px-3 py-2 mb-1">
                                <span className="ellipsis">{item.title}</span>
                                <span className="bg-black text-white whitespace-nowrap px-2 py-1">{item.dishType}</span>
                            </p>
                        </Link>
                    ))}
                    <Link href={`/search?text=${value}`}>
                        <p className="duration-300 cursor-pointer w-full flex justify-center font-bold bg-primary text-white hover:tracking-[2px] px-3 py-2">
                            MORE
                        </p>
                    </Link>
                </ul>
            ) : (
                value &&
                loading && (
                    <p className="absolute left-0 top-[calc(100%+4px)] w-full font-bold bg-white text-[#b1b1b1] px-3 py-2 shadow-md">
                        Sorry. There is no recipe like the one you want.
                    </p>
                )
            )}
        </div>
    );
}

export default SearchBox;
