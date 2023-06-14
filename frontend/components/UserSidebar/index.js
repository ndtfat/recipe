'use client';
import { AiFillInfoCircle } from '@react-icons/all-files/ai/AiFillInfoCircle';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaUtensilSpoon } from '@react-icons/all-files/fa/FaUtensilSpoon';
import { useSelector } from 'react-redux';
import LoaderSpin from '../common/LoaderSpin';

import Item from './Item';
import Preview from './Preview';

function UserSidebar({ info, onChangeContent, content, loading }) {
    const user = useSelector((state) => state.auth.userData);

    return loading ? (
        <LoaderSpin />
    ) : (
        <div className="">
            <Preview info={info} />

            {user?._id === info?._id && (
                <>
                    <div className="hidden lg:block">
                        <Item
                            icon={<AiFillInfoCircle />}
                            title="Personal Info"
                            active={content === 'Personal Info'}
                            onClick={() => onChangeContent('Personal Info')}
                        />
                        <Item
                            icon={<FaUtensilSpoon />}
                            title="My Recipes"
                            active={content === 'My Recipes'}
                            onClick={() => onChangeContent('My Recipes')}
                        />
                        <Item
                            icon={<FaHeart />}
                            title="Saved Recipes"
                            active={content === 'Saved Recipes'}
                            onClick={() => onChangeContent('Saved Recipes')}
                        />
                    </div>

                    <select
                        defaultValue={content}
                        onChange={(e) => onChangeContent(e.target.value)}
                        className="block lg:hidden select select-[#ff3130] w-full mb-2"
                    >
                        <option>Personal Info</option>
                        <option>My Recipes</option>
                        <option>Saved Recipes</option>
                    </select>
                </>
            )}
        </div>
    );
}

export default UserSidebar;
