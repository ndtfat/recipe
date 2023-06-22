'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useState, useRef } from 'react';

import { createAxiosJWT } from '@/instances';
import { useEffect } from 'react';
import { recipeRequest, userRequests } from '@/requests';

const UserContext = createContext({});

function UserProvider({ children }) {
    const user = useSelector((state) => state.auth.userData);
    const axiosJWT = createAxiosJWT(user, useDispatch(), useRouter());
    const searchParams = useSearchParams();

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('updatedAt desc');
    const [content, setContent] = useState(searchParams.get('content') || 'My Recipes');
    const [checkedIds, setCheckedIds] = useState([]);
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const searchedUser = useRef({});
    const idsRef = useRef([]);

    useEffect(() => {
        idsRef.current = checkedIds;
    }, [checkedIds]);

    const handleCheck = (id) => {
        const isChecked = checkedIds.includes(id);
        let newCheckedIds = [...checkedIds];

        if (isChecked) {
            newCheckedIds = checkedIds.filter((item) => item !== id);
        } else {
            newCheckedIds.push(id);
        }
        setCheckedIds(newCheckedIds);
    };

    const handleSoftDelete = async () => {
        await recipeRequest.softFelete(idsRef.current, user.accessToken, axiosJWT);
        setContent('Trash');
    };

    const handleForceDelete = async () => {
        await recipeRequest.forceDelete(idsRef.current, user.accessToken, axiosJWT);
        setContent('Trash');
    };

    const handleRestore = async () => {
        const res = await recipeRequest.restore(idsRef.current, user.accessToken, axiosJWT);
        setContent('My Recipes');
    };

    const handleUnsave = async () => {
        await userRequests.unsaveRecipes(idsRef.current, user.accessToken, axiosJWT);
        setIsLoadingRecipes(true);
        const res = await await recipeRequest.getSavedRecipes(page, sortBy, user.accessToken, axiosJWT);
        setRecipes(res);
        setCheckedIds([]);
        setIsLoadingRecipes(false);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                axiosJWT,
                page: { value: page, set: setPage },
                sort: { value: sortBy, set: setSortBy },
                content: { value: content, set: setContent },
                checkedIds: { value: checkedIds, handleCheck, set: setCheckedIds },
                loadingInfo: { value: isLoadingInfo, set: setIsLoadingInfo },
                loadingRecipes: { value: isLoadingRecipes, set: setIsLoadingRecipes },
                recipes: { value: recipes, set: setRecipes },
                searchedUser,
                actions: {
                    unsave: handleUnsave,
                    restore: handleRestore,
                    softDelete: handleSoftDelete,
                    forceDelete: handleForceDelete,
                },
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
