'use client';
import { useState } from 'react';

import { Pagination, RecipeCard } from '.';

function ListWithSort({ page, onPage, onSort, response }) {
    const [[field, by], setSortBy] = useState(['createdAt', 'desc']);

    return (
        <>
            <div className="mt-[30px] mb-[16px]">
                <select
                    value={field}
                    onChange={(e) => setSortBy((prev) => [e.target.value, prev[1]])}
                    className="select select-sm select-error mr-1 select-none"
                >
                    <option value="updatedAt">Update date</option>
                    <option value="rate">Rate</option>
                </select>

                <select
                    value={by}
                    onChange={(e) => setSortBy((prev) => [prev[0], e.target.value])}
                    className="select select-sm select-error mr-3 select-none"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

                <button onClick={() => onSort(field, by)} className="btn btn-sm btn-outline btn-error">
                    SORT
                </button>
            </div>

            <ul className="flex flex-col items-center justify-center px-5 sm:px-0 w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-4">
                {response.recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe._id} />
                ))}
            </ul>

            {response.total_pages > 1 && (
                <Pagination currentPage={page} onPage={onPage} totalPages={response.total_pages} />
            )}
        </>
    );
}

export default ListWithSort;
