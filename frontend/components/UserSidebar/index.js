import { AiFillInfoCircle } from 'react-icons/ai';
import { FaHeart, FaUtensilSpoon } from 'react-icons/fa';

import Item from './Item';
import Preview from './Preview';

function UserSidebar() {
    return (
        <div>
            <Preview />
            <Item icon={<AiFillInfoCircle />} title="Personal info" />
            <Item icon={<FaUtensilSpoon />} title="My recipes" />
            <Item icon={<FaHeart />} title="Saved recipes" />
        </div>
    );
}

export default UserSidebar;
