import Link from 'next/link';
import { Pagination } from '../common';
import LoaderSpin from '../common/LoaderSpin';

function RecipeList({ content, recipeData, currentPage, onPage, loading }) {
    return recipeData.recipes > 0 ? (
        <>
            {loading ? (
                <LoaderSpin />
            ) : (
                <ul className="2-[500px]">
                    {recipeData.recipes.map((recipe) => (
                        <li
                            key={recipe._id}
                            className="flex mb-4 p-3 pr-5 items-center bg-[#f5f6ea] cursor-pointer hover:translate-y-[-4px] hover:shadow-md"
                        >
                            <img
                                src={recipe.imgURL}
                                alt="recipe-img"
                                className="w-[70px] h-[60px] lg:w-[100px] lg:h-[80px] object-cover mr-4"
                            />
                            <div className="flex-1 lg:h-[80px] flex flex-col justify-start">
                                <h1 className="flex flex-col lg:flex-row justify-between font-bold text-[18px] lg:text-xl">
                                    <span className="ellipsis mb-1 lg:mb-0">{recipe.title}</span>

                                    <div className="text-sm lg:[&>*]:text-base [&>*]:py-[2px] [&>*]:px-2 [&>*]:rounded">
                                        <span className="inline-block bg-primary text-white">{recipe.dishType}</span>
                                        <span className="inline-block bg-black text-white ml-1">
                                            {recipe.isPublic ? 'Public' : 'Private'}
                                        </span>
                                    </div>
                                </h1>
                                <p className="hidden lg:block ellipsis-2 text-justify mt-2">{recipe.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {recipeData.total_pages > 1 && (
                <Pagination totalPages={recipeData.total_pages} currentPage={currentPage} onPage={onPage} />
            )}
        </>
    ) : content === 'My Recipes' ? (
        <p>
            You have not shared any recipes yet.{' '}
            <Link href="/user/add-recipe" className="text-primary underline hover:text-black">
                Share one!!
            </Link>
        </p>
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
