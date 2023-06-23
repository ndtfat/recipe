'use client';
import { RiDislikeLine } from '@react-icons/all-files/ri/RiDislikeLine';
import { AiOutlineLock } from '@react-icons/all-files/ai/AiOutlineLock';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { TiDocumentDelete } from '@react-icons/all-files/ti/TiDocumentDelete';
import { RiDeleteBin6Line } from '@react-icons/all-files/ri/RiDeleteBin6Line';
import { AiOutlineShareAlt } from '@react-icons/all-files/ai/AiOutlineShareAlt';
import { MdSettingsBackupRestore } from '@react-icons/all-files/md/MdSettingsBackupRestore';
import { useContext, useLayoutEffect, useState } from 'react';

import RecipeTable from './RecipeTable';
import InfoContent from './InfoContent';
import { UserContext } from '@/contexts/UserContext';
import { recipeRequest } from '@/requests';

function UserContent({ isUser, paramId }) {
    const { user, axiosJWT, content, page, checkedIds, sort, loadingRecipes, recipes, actions } =
        useContext(UserContext);
    const [contentComponent, setContentComponent] = useState();

    // reset page.value and checkIds.value when change content
    useLayoutEffect(() => {
        page.set(1);
        checkedIds.set([]);
    }, [content.value]);

    useLayoutEffect(() => {
        (async () => {
            let recipesData;
            loadingRecipes.set(true);
            // anyone can access user's shared_recipes
            if (content.value === 'My Recipes') {
                recipesData = await recipeRequest.getRecipes(
                    paramId,
                    page.value,
                    sort.value,
                    user?.accessToken,
                    axiosJWT,
                );
            }

            // just user have right to access saved_recipes
            else if (isUser && content.value === 'Saved Recipes') {
                recipesData = await recipeRequest.getSavedRecipes(page.value, sort.value, user.accessToken, axiosJWT);
            }

            //
            else if (isUser && content.value === 'Trash') {
                recipesData = await recipeRequest.getRecipesDeleted(
                    paramId,
                    page.value,
                    sort.value,
                    user?.accessToken,
                    axiosJWT,
                );
            }
            recipes.set(recipesData);
            loadingRecipes.set(false);
        })();
    }, [content.value, page.value, sort.value]);

    useLayoutEffect(() => {
        if (content.value === 'Personal Info' && isUser) {
            setContentComponent(<InfoContent />);
        } else if (content.value === 'My Recipes') {
            const actionsProp = [
                {
                    icon: <RiDeleteBin6Line color="#fff" size={20} />,
                    text: 'You want move these recipe into trash?',
                    function: actions.softDelete,
                },
            ];

            setContentComponent(
                <RecipeTable
                    isUser={isUser}
                    content={content.value}
                    recipeData={recipes.value}
                    loading={loadingRecipes.value}
                    actions={actionsProp}
                />,
            );
        } else if (content.value === 'Saved Recipes' && isUser) {
            const actionsProp = [
                {
                    icon: <RiDislikeLine color="#fff" size={20} />,
                    text: 'You want UNSAVE these recipes?',
                    function: actions.unsave,
                },
            ];
            setContentComponent(
                <RecipeTable
                    isUser={isUser}
                    content={content.value}
                    loading={loadingRecipes.value}
                    recipeData={recipes.value}
                    actions={actionsProp}
                />,
            );
        } else if (content.value === 'Trash' && isUser) {
            const actionsProp = [
                {
                    icon: <RiDeleteBin6Line color="#fff" size={20} />,
                    text: 'You want DELETE these recipes for good?',
                    function: actions.forceDelete,
                },
                {
                    icon: <MdSettingsBackupRestore color="#fff" size={20} />,
                    text: 'You want RESTORE these recipes?',
                    function: actions.restore,
                },
            ];

            setContentComponent(
                <RecipeTable
                    isUser={isUser}
                    content={content.value}
                    loading={loadingRecipes.value}
                    recipeData={recipes.value}
                    actions={actionsProp}
                />,
            );
        }
    }, [content.value, recipes.value, loadingRecipes.value]);

    return (
        <div className="w-full lg:ml-8 bg-white px-7 py-5">
            <h1 className="inline-block font-bold text-3xl text-black border-b-4 border-primary">
                {content.value}
                {content.value !== 'Personal Info' ? ` - (${recipes.value?.total_recipes})` : ''}
            </h1>

            {/* description foreach 'content' */}
            <p className="flex items-end text-gray-500 mt-3 text-justify">
                {content.value === 'Personal Info' ? (
                    <>
                        <AiOutlineLock className="mr-[6px] text-2xl" />
                        Only you can see the information on this page. It will not be displayed for other users to see.
                    </>
                ) : content.value === 'My Recipes' ? (
                    <>
                        <AiOutlineShareAlt className="mr-[6px] text-2xl" />
                        {isUser ? 'All recipes you shared.' : 'Shared recipes'}
                    </>
                ) : content.value === 'Saved Recipes' ? (
                    <>
                        <AiOutlineHeart className="mr-[6px] text-2xl" />
                        All recipes you saved
                    </>
                ) : (
                    <>
                        <TiDocumentDelete className="mr-[6px] text-2xl" />
                        Recipes were deleted
                    </>
                )}
            </p>
            <span className="block h-[1px] bg-gray-300 mt-7 mb-5" />

            {contentComponent}
        </div>
    );
}

export default UserContent;
