import { AiFillInfoCircle } from 'react-icons/ai';
import { FaHeart, FaUtensilSpoon } from 'react-icons/fa';

import Item from './Item';
import Preview from './Preview';

function UserSidebar({ onChangeContent, content }) {
    return (
        <div>
            <Preview />
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
    );
}

export default UserSidebar;
