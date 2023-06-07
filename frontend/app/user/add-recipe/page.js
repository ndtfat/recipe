import Image from 'next/image';

import addRecipeBg from '@/public/add-recipe/add-recipe.jpg';
import { AddRecipeForm } from '@/components';

function AddRecipe() {
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
