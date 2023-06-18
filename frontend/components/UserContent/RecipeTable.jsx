'use client';
import Link from 'next/link';
import { useContext } from 'react';

import TRow from './TRow';
import THead from './THead';
import { UserContext } from '@/contexts/UserContext';
import { LoadingWrapper, Pagination } from '../common';

function RecipeTable({ content, recipeData, isUser, loading, actions }) {
    const { page } = useContext(UserContext);

    return recipeData?.recipes?.length > 0 ? (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <THead isUser={isUser} actions={actions} />

                <LoadingWrapper loading={loading}>
                    <tbody>
                        {recipeData.recipes.map((recipe, index) => (
                            <TRow key={recipe._id} index={index} isUser={isUser} recipe={recipe} />
                        ))}
                    </tbody>
                </LoadingWrapper>
            </table>

            {recipeData.total_pages > 1 && (
                <Pagination totalPages={recipeData.total_pages} currentPage={page.value} onPage={page.set} />
            )}
        </div>
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

export default RecipeTable;
