'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import { Header } from '@/components';
import { ListWithSort, SearchBox } from '@/components/common';
import { recipeRequest } from '@/requests';

function SearchPage() {
    const searchParams = useSearchParams();

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('createdAt desc');
    const [response, setResponse] = useState();

    const handleSort = (field, by) => {
        setSort(`${field} ${by}`);
    };

    useEffect(() => {
        (async () => {
            const res = await recipeRequest.search(searchParams.get('text'), page, sort);
            setResponse(res);
        })();
    }, [searchParams.get('text'), page, sort]);

    return (
        <div>
            <Header />

            <div className="px-[50px] py-5">
                <div className="bg-secondary p-5">
                    <SearchBox />
                </div>

                {response && <ListWithSort page={page} onPage={setPage} onSort={handleSort} response={response} />}
            </div>
        </div>
    );
}

export default SearchPage;
