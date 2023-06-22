'use client';
import { FaSort } from '@react-icons/all-files/fa/FaSort';
import { useContext, useState } from 'react';

import ActionButton from './ActionButton';
import { UserContext } from '@/contexts/UserContext';

function THead({ isUser, actions }) {
    const { content, sort, checkedIds } = useContext(UserContext);
    const [sortState, setSortState] = useState({
        rate: 'desc',
        total_rated: 'desc',
        updatedAt: 'desc',
        deletedAt: 'desc',
    });

    const handleSort = async (field) => {
        const nextSortState = sortState[field] === 'desc' ? 'asc' : 'desc';

        console.log(`${field} ${nextSortState}`);

        sort.set(`${field} ${nextSortState}`);
        setSortState((prev) => {
            return { ...prev, [field]: nextSortState };
        });
    };

    return (
        <thead>
            <tr className="text-[14px]">
                <th>{isUser && actions && <ActionButton checkedIds={checkedIds} actions={actions} />}</th>
                <th>Title</th>
                {content.value === 'Saved Recipes' ? <th>Author</th> : <th>Public</th>}
                <th>
                    <p className="flex items-center">
                        Rate <FaSort className="ml-1 cursor-pointer" onClick={() => handleSort('rate')} />
                    </p>
                </th>
                <th>
                    <p className="flex items-center">
                        Total rated <FaSort className="ml-1 cursor-pointer" onClick={() => handleSort('total_rated')} />
                    </p>
                </th>
                {content.value !== 'Saved Recipes' && (
                    <th>
                        <p className="flex items-center">
                            {content.value === 'Trash' ? 'DeletedAt' : 'UpdatedAt'}{' '}
                            <FaSort
                                className="ml-1 cursor-pointer"
                                onClick={
                                    content.value === 'Trash'
                                        ? () => handleSort('deletedAt')
                                        : () => handleSort('updatedAt')
                                }
                            />
                        </p>
                    </th>
                )}
            </tr>
        </thead>
    );
}

export default THead;
