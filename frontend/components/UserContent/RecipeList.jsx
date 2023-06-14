import Link from 'next/link';

import LoaderSpin from '../common/LoaderSpin';
import { Pagination } from '../common';

function RecipeList({ isUser, content, recipeData, currentPage, onPage, loading }) {
    return recipeData?.recipes?.length > 0 ? (
        <>
            {loading ? (
                <LoaderSpin />
            ) : (
                <ul className="2-[500px]">
                    {recipeData.recipes.map((recipe) => (
                        <Link
                            href={`/recipe/detail/${recipe._id}`}
                            key={recipe._id}
                            className="duration-300 flex mb-4 p-3 pr-5 items-center bg-[#f5f6ea] cursor-pointer hover:translate-y-[-6px] hover:shadow-md"
                        >
                            <img
                                src={recipe.imgURL}
                                alt="recipe-img"
                                className="w-[120px] h-[100px] lg:w-[100px] lg:h-[80px] object-cover mr-4"
                            />
                            <div className="flex-1 lg:h-[80] flex flex-col justify-start">
                                <h1 className="flex flex-row justify-between font-bold text-[18px] lg:text-xl">
                                    <span className="ellipsis mb-1 lg:mb-0">{recipe.title}</span>

                                    <span className="flex items-center bg-primary text-white text-sm lg:text-base py-[2px] px-2 rounded">
                                        {recipe.isPublic ? 'Public' : 'Private'}
                                    </span>
                                </h1>

                                <p className="hidden ellipsis-2 text-justify mt-2">{recipe.desc}</p>
                            </div>
                        </Link>
                    ))}
                </ul>
            )}

            {recipeData.total_pages > 1 && (
                <Pagination totalPages={recipeData.total_pages} currentPage={currentPage} onPage={onPage} />
            )}
        </>
    ) : content === 'My Recipes' ? (
        <>
            {isUser ? (
                <p>
                    You have not shared any recipes yet.{' '}
                    <Link href="/user/add-recipe" className="text-primary underline hover:text-black">
                        Share one!!
                    </Link>
                </p>
            ) : (
                <p>This user have not shared any recipes.</p>
            )}
        </>
    ) : (
        <p>
            You have not saved any recipes yet.{' '}
            <Link href="/" className="text-primary underline hover:text-black">
                Discover
            </Link>{' '}
            and saved your favourite one!!
        </p>
    );
}

export default RecipeList;
