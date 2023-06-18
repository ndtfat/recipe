'use client';
import { useContext } from 'react';
import { GoTrashcan } from '@react-icons/all-files/go/GoTrashcan';
import { GiBlackBook } from '@react-icons/all-files/gi/GiBlackBook';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { AiOutlineInfoCircle } from '@react-icons/all-files/ai/AiOutlineInfoCircle';

import Item from './Item';
import Preview from './Preview';
import { UserContext } from '@/contexts/UserContext';
import { LoadingWrapper } from '../common';

function UserSidebar() {
    const { user, content, loadingInfo, searchedUser } = useContext(UserContext);

    return (
        <LoadingWrapper loading={loadingInfo.value}>
            <div>
                <Preview info={searchedUser.current} />

                {user?._id === searchedUser.current?._id && (
                    <>
                        <div className="hidden lg:block">
                            <Item
                                icon={<AiOutlineInfoCircle />}
                                title="Personal Info"
                                active={content.value === 'Personal Info'}
                                onClick={() => content.set('Personal Info')}
                            />
                            <Item
                                icon={<GiBlackBook />}
                                title="My Recipes"
                                active={content.value === 'My Recipes'}
                                onClick={() => content.set('My Recipes')}
                            />
                            <Item
                                icon={<AiOutlineHeart />}
                                title="Saved Recipes"
                                active={content.value === 'Saved Recipes'}
                                onClick={() => content.set('Saved Recipes')}
                            />
                            <Item
                                icon={<GoTrashcan />}
                                title="Trash"
                                active={content.value === 'Trash'}
                                onClick={() => content.set('Trash')}
                            />
                        </div>

                        <select
                            defaultValue={content.value}
                            onChange={(e) => content.set(e.target.value)}
                            className="block lg:hidden select select-[#ff3130] w-full mb-2"
                        >
                            <option>Personal Info</option>
                            <option>My Recipes</option>
                            <option>Saved Recipes</option>
                        </select>
                    </>
                )}
            </div>
        </LoadingWrapper>
    );
}

export default UserSidebar;
