'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RecipeDetail } from '@/components';
import LoaderSpin from '@/components/common/LoaderSpin';
import { createAxiosJWT } from '@/instances';
import { recipeRequest } from '@/requests';
import { redirect } from 'next/navigation';

function Page({ params }) {
    const user = useSelector((state) => state.auth.userData);
    const axiosJWT = createAxiosJWT(user, useDispatch());
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
            const relativeRes = await recipeRequest.getRelativeRecipes(recipeId, accessToken, axiosJWT);

            if (recipeDetailRes) {
                const isoDate = new Date(recipeDetailRes.data.updatedAt);
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                const formattedDate = isoDate.toLocaleDateString('en-US', options);

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
                    updatedAt: formattedDate,
                    isUsersRecipe: recipeDetailRes.isUsersRecipe,
                });
            }

            if (relativeRes) {
                setRelativeReps(relativeRes.data.slice(0, 8));
            }

            setIsLoading(false);
        })();
    }, [params.id]);

    return isLoading ? <LoaderSpin /> : <RecipeDetail data={recipe} relativeReps={relativeReps} />;
}

export default Page;
