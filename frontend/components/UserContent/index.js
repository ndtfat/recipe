'use client';
import { useLayoutEffect, useState } from 'react';
import { AiOutlineLock } from '@react-icons/all-files/ai/AiOutlineLock';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { AiOutlineShareAlt } from '@react-icons/all-files/ai/AiOutlineShareAlt';

import InfoContent from './InfoContent';
import RecipeList from './RecipeList';

function UserContent({ isUser = true, content, page, onPage, userRecipesData, savedRecipesData, isLoading }) {
    const [contentComponent, setContentComponent] = useState();

    useLayoutEffect(() => {
        if (content === 'Personal Info' && isUser) {
            setContentComponent(<InfoContent />);
        } else if (content === 'My Recipes') {
            setContentComponent(
                <RecipeList
                    isUser={isUser}
                    content={content}
                    recipeData={userRecipesData}
                    loading={isLoading}
                    currentPage={page}
                    onPage={onPage}
                />,
            );
        } else if (content === 'Saved Recipes' && isUser) {
            setContentComponent(
                <RecipeList
                    content={content}
                    recipeData={savedRecipesData}
                    loading={isLoading}
                    currentPage={page}
                    onPage={onPage}
                />,
            );
        }
    }, [content, page, userRecipesData, savedRecipesData, isLoading]);

    return (
        <div className="w-full lg:ml-8 bg-white px-7 py-5">
            <h1 className="inline-block font-bold text-3xl text-black border-b-4 border-primary">
                {content}
                {content !== 'Personal Info'
                    ? ` - (${
                          content === 'My Recipes' ? userRecipesData.total_recipes : savedRecipesData.total_recipes
                      })`
                    : ''}
            </h1>

            <p className="flex items-end text-gray-500 mt-3 text-justify">
                {content === 'Personal Info' ? (
                    <>
                        <AiOutlineLock className="mr-[6px] text-2xl" />
                        Only you can see the information on this page. It will not be displayed for other users to see.
                    </>
                ) : content === 'My Recipes' ? (
                    <>
                        <AiOutlineShareAlt className="mr-[6px] text-2xl" />
                        {isUser ? 'All recipes you shared.' : 'Shared recipes'}
                    </>
                ) : (
                    <>
                        <AiOutlineHeart className="mr-[6px] text-2xl" />
                        All recipes you saved
                    </>
                )}
            </p>

            <span className="block h-[1px] bg-gray-300 mt-7 mb-5"></span>

            {contentComponent}
        </div>
    );
}

export default UserContent;
