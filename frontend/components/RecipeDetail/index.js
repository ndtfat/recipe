'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { GiHotMeal } from '@react-icons/all-files/gi/GiHotMeal';

import List from './List';
import OverView from './OverView';
import { RecipeCard } from '../common';
import { userRequests } from '@/requests';
import { createAxiosJWT } from '@/instances';
import Review from './Review';
import Link from 'next/link';

function RecipeDetail({ data, relativeReps }) {
    const router = useRouter();
    const user = useSelector((state) => state.auth.userData);
    const axiosJWT = createAxiosJWT(user, useDispatch(), router);
    const [isSaved, setIsSaved] = useState(data.isSaved);

    const handleSavedRecipe = async () => {
        let res;
        if (data.isUsersRecipe) {
            router.push(`/user/${user._id}`);
        } else if (isSaved) {
            res = await userRequests.unsaveRecipes([data._id], user?.accessToken, axiosJWT);
            if (res.status === 200) setIsSaved(false);
        } else {
            res = await userRequests.saveRecipes([data._id], user?.accessToken, axiosJWT);
            if (res.status === 200) setIsSaved(true);
        }
    };

    return (
        <div>
            <div className="md:mr-[200px] lg:mr-[370px] border-b-[1px] border-[#b1b1b1]">
                <OverView data={data} isSaved={isSaved} onSaveRecipe={handleSavedRecipe} />

                <List title="Ingredients" list={data.ingredients} />

                <List title="Directions" list={data.steps} />

                <div className="mt-8">
                    <h1 className="font-bold text-[40px]">{data.note.title}</h1>
                    <p>{data.note.content}</p>
                </div>

                <Review recipe={data} />
            </div>

            {relativeReps.length > 0 ? (
                <div className="mt-8">
                    <h1 className="mb-4 font-bold text-[40px] flex items-center">
                        <GiHotMeal className="mr-2 translate-y-[-6px]" color="#ff3130" />
                        You will Also Love
                    </h1>

                    <ul className="flex flex-col items-center justify-center w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-4">
                        {relativeReps.map((recipe) => (
                            <RecipeCard recipe={recipe} key={recipe._id} />
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-[20px] mt-3">
                    Have no any recipe like this.
                    <Link href="/" className="text-primary underline hover:text-black">
                        Discover
                    </Link>{' '}
                    another amazing recipes
                </p>
            )}
        </div>
    );
}

export default RecipeDetail;
