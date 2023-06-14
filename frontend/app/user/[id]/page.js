'use client';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useSearchParams } from 'next/navigation';

import { userRequests, recipeRequest } from '@/requests';
import { createAxiosJWT } from '@/instances';
import { UserContent, UserSidebar } from '@/components';
import { useEffect, useRef, useState } from 'react';

function UserPage({ params }) {
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const axiosJWT = createAxiosJWT(user, dispatch);
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    const [content, setContent] = useState(searchParams.get('content') || 'My Recipes');
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
    const searchedUser = useRef({});
    const recipes = useRef({
        saved: [],
        mine: [],
    });

    useEffect(() => {
        // if not login
        if (!user) {
            redirect('/auth/login');
        }

        const fetch = async () => {
            setIsLoadingInfo(true);
            const res = await userRequests.getUserInfo(params.id, user.accessToken, axiosJWT);
            searchedUser.current = res.data;
            setIsLoadingInfo(false);
        };

        fetch();
    }, [params.id, user]);

    useEffect(() => {
        (async () => {
            setIsLoadingRecipes(true);
            if (user._id === params.id) {
                const savedRecipes = await recipeRequest.getSavedRecipes(page, user.accessToken, axiosJWT);
                recipes.current = {
                    ...recipes.current,
                    saved: savedRecipes,
                };
            }

            const myRecipes = await recipeRequest.getRecipes(params.id, page, user.accessToken, axiosJWT);
            recipes.current = {
                ...recipes.current,
                mine: myRecipes,
            };

            setIsLoadingRecipes(false);
        })();
    }, [page]);

    return (
        <>
            <UserSidebar
                content={content}
                info={searchedUser.current}
                loading={isLoadingInfo}
                onChangeContent={setContent}
            />
            <UserContent
                isUser={user?._id === params.id}
                page={page}
                onPage={setPage}
                content={content}
                isLoading={isLoadingRecipes}
                userRecipesData={recipes.current.mine}
                savedRecipesData={recipes.current.saved}
            />
        </>
    );
}

export default UserPage;
