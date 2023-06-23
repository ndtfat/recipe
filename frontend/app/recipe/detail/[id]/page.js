'use client';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import LoaderSpin from '@/components/common/LoaderSpin';
import { recipeRequest } from '@/requests';
import { RecipeDetail } from '@/components';
import { createAxiosJWT, formatDate } from '@/instances';

function Page({ params }) {
    const user = useSelector((state) => state.auth.userData);
    const axiosJWT = createAxiosJWT(user, useDispatch(), useRouter());
    const [recipe, setRecipe] = useState({});
    const [relativeReps, setRelativeReps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // check logined ?
    useEffect(() => {
        if (!user) redirect('/auth/login');
    }, [user]);

    // get recipe data
    useEffect(() => {
        (async () => {
            const recipeId = params.id;
            const accessToken = user?.accessToken;
            setIsLoading(true);
            const recipeDetailRes = await recipeRequest.getRecipeDetail(recipeId, accessToken, axiosJWT);

            if (recipeDetailRes) {
                let totalTime;
                const { prepTime, cookingTime } = recipeDetailRes.data.times;
                const timeLevel = { mins: 0, hours: 1, days: 2 };

                if (timeLevel[prepTime.measure] === timeLevel[cookingTime.measure]) {
                    totalTime = `${Number(prepTime.value) + Number(cookingTime.value)} ${prepTime.measure}`;
                } else if (timeLevel[prepTime.measure] > timeLevel[cookingTime.measure]) {
                    totalTime = `${prepTime.value} ${prepTime.measure} and ${cookingTime.value} ${cookingTime.measure}`;
                } else {
                    totalTime = `${cookingTime.value} ${cookingTime.measure} and ${prepTime.value} ${prepTime.measure}`;
                }

                setRecipe({
                    ...recipeDetailRes.data,
                    times: { ...recipeDetailRes.data.times, totalTime },
                    isSaved: recipeDetailRes.isSaved,
                    isUsersRecipe: recipeDetailRes.isUsersRecipe,
                });
            }

            const relativeRes = await recipeRequest.getRelativeRecipes(recipeId, accessToken, axiosJWT);
            setRelativeReps(relativeRes.data.slice(0, 8));

            setIsLoading(false);
        })();
    }, [params.id]);

    return isLoading ? <LoaderSpin /> : <RecipeDetail data={recipe} relativeReps={relativeReps} />;
}

export default Page;
