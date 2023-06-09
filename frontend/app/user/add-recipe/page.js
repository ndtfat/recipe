'use client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

import addRecipeBg from '@/public/add-recipe/add-recipe.jpg';
import { AddRecipeForm } from '@/components';

function AddRecipe() {
    const userData = useSelector((state) => state.auth.userData);
    if (userData === null) redirect('/auth/login');

    return (
        <div>
            <Image
                priority
                alt="add-recipe"
                src={addRecipeBg}
                className="w-full h-[200px] object-cover brightness-75"
            />

            <AddRecipeForm />
        </div>
    );
}

export default AddRecipe;
