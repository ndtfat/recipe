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
            res = await userRequests.unsaveRecipe(data._id, user?.accessToken, axiosJWT);
            if (res.status === 200) setIsSaved(false);
        } else {
            res = await userRequests.saveRecipe(data._id, user?.accessToken, axiosJWT);
            if (res.status === 200) setIsSaved(true);
        }
    };

    return (
        <div>
            <div className="mr-[450px] border-b-[1px] border-[#b1b1b1]">
                <OverView data={data} isSaved={isSaved} onSaveRecipe={handleSavedRecipe} />

                <List title="Ingredients" list={data.ingredients} />

                <List title="Directions" list={data.steps} />

                <div className="mt-8">
                    <h1 className="font-bold text-[40px]">{data.note.title}</h1>
                    <p>{data.note.content}</p>
                </div>

                <Review recipe={data} />
            </div>

            <div className="mt-8">
                <h1 className="mb-4 font-bold text-[40px] flex items-center">
                    <GiHotMeal className="mr-2 translate-y-[-6px]" color="#ff3130" />
                    You'll Also Love
                </h1>

                <ul className="grid grid-cols-4 auto-rows-auto gap-4">
                    {relativeReps.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe._id} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RecipeDetail;
