'use client';
import Link from 'next/link';
import { formatDate } from '@/instances';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';

function TRow({ recipe, index, isUser, ...props }) {
    const { content, checkedIds, page } = useContext(UserContext);

    return (
        <tr {...props}>
            <td>
                {isUser ? (
                    <label>
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={checkedIds.value.includes(recipe._id)}
                            onChange={() => checkedIds.handleCheck(recipe._id)}
                        />
                    </label>
                ) : (
                    index
                )}
            </td>
            <td>
                <Link
                    href={`/recipe/detail/${recipe._id}`}
                    className="group cursor-pointer flex items-center space-x-3"
                >
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={recipe.imgURL} alt={recipe.title} />
                        </div>
                    </div>

                    <div>
                        <p className="font-bold ellipsis group-hover:underline underline-offset-1 decoration-primary">
                            {recipe.title}
                        </p>
                        <p>{recipe.dishType}</p>
                    </div>
                </Link>
            </td>
            {content.value === 'Saved Recipes' ? (
                <td>
                    {recipe.author.first_name} {recipe.author.last_name}
                </td>
            ) : (
                <td>
                    {recipe.isPublic ? (
                        <span className=" text-green-500">public</span>
                    ) : (
                        <span className="text-primary">private</span>
                    )}
                </td>
            )}
            <td>{recipe.rate.toFixed(1)}</td>
            <td>{recipe.total_rated}</td>
            {content.value !== 'Saved Recipes' && <td>{formatDate(recipe.updatedAt, true)}</td>}
        </tr>
    );
}

export default TRow;
