import Link from 'next/link';

import Rating from './Rating';

function RecipeCard({ recipe, ...props }) {
    return (
        <Link
            href={`/recipe/detail/${recipe._id}`}
            {...props}
            className="duration-300 select-none hover:translate-y-[-6px] hover:shadow-md"
        >
            <header className="h-[200px] w-full relative">
                <img alt={recipe.title} src={recipe.imgURL} className="h-full w-full object-cover" />
            </header>

            <div className="h-[130px] flex flex-col justify-between bg-secondary p-3">
                <div>
                    <h1 className="font-bold text-[26px] ellipsis">{recipe.title}</h1>
                    <h4 className="text-[14px] font-bold">
                        <span className="font-normal text-[#7f7f7f]">by</span> {recipe.author.last_name}{' '}
                        {recipe.author.first_name}
                    </h4>
                </div>

                <div className="mt-3 flex items-center text-[16px]">
                    <Rating rate={`${Math.round(recipe.rate)}`} size="sm" readOnly />
                    <span className="ml-2 text-[14px] text-[#7f7f7f]">({recipe.total_rated} Ratings)</span>
                </div>
            </div>
        </Link>
    );
}

export default RecipeCard;
