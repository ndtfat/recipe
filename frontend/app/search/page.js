'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import { Header } from '@/components';
import { ListWithSort, SearchBox } from '@/components/common';
import { recipeRequest } from '@/requests';

function SearchPage() {
    const searchParams = useSearchParams();
    const text = searchParams.get('text');

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('createdAt desc');
    const [response, setResponse] = useState();

    const handleSort = (field, by) => {
        setSort(`${field} ${by}`);
    };

    useEffect(() => {
        (async () => {
            const res = await recipeRequest.search(text, page, sort);
            setResponse(res);
        })();
    }, [text, page, sort]);

    /* eslint react/no-unescaped-entities */
    return (
        <div>
            <Header />

            <div className="px-[50px] py-5">
                <div className="bg-secondary p-5">
                    <SearchBox />
                </div>

                <h1 className="mt-7 text-[30px]">
                    Search for <span className="font-bold underline decoration-primary">{text}</span>
                </h1>

                {response && <ListWithSort page={page} onPage={setPage} onSort={handleSort} response={response} />}
            </div>
        </div>
    );
}

export default SearchPage;
