'use client';
import { useLayoutEffect, useState } from 'react';

import Header from '@/components/Category/Header';
import Latest from '@/components/Category/Latest';
import categories from '@/public/category';
import { recipeRequest } from '@/requests';
import { ListWithSort, Pagination, RecipeCard } from '@/components/common';

function Category({ params }) {
    const category = categories.filter((category) => category.param === params.category)[0];

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('createdAt desc');
    const [response, setResponse] = useState();

    useLayoutEffect(() => {
        (async () => {
            const res = await recipeRequest.getRecipesOfType(params.category, page, sort);
            setResponse(res);
        })();
    }, [params.category, page, sort]);

    const handleSort = (field, by) => {
        setSort(`${field} ${by}`);
    };

    return (
        <>
            <Header category={category} />

            <main className="p-[10px] lg:p-[50px]">
                <h1 className="font-bold text-[20px] md:text-[40px] flex flex-col items-center mb-4">
                    <span className="flex items-center mb-2 [&>*]:mx-1">
                        <span className="bg-primary text-white px-2">N</span>
                        <span>E</span>
                        <span className="bg-black text-white px-2">W</span>
                    </span>
                    <span className="flex items-center  [&>*]:mx-1">
                        <span>R</span>
                        <span className="bg-black text-white px-2">E</span>
                        <span className="bg-primary text-white px-2">C</span>
                        <span>I</span>
                        <span className="bg-black text-white px-2">P</span>
                        <span>E</span>
                    </span>
                </h1>
                {response?.latest && <Latest recipe={response.latest} />}

                {response && <ListWithSort page={page} onPage={setPage} onSort={handleSort} response={response} />}
            </main>
        </>
    );
}

export default Category;
