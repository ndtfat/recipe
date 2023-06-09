'use client';
import { useEffect, useState } from 'react';

import InfoContent from './InfoContent';
import MyRecipeContent from './MyRecipeContent';
import SavedRecipeContent from './SavedRecipeContent';
import ContentLayout from './ContentLayout';

function UserContent({ title }) {
    const [contentSection, setContentSection] = useState(<InfoContent />);

    useEffect(() => {
        if (title === 'Personal Info') setContentSection(<InfoContent />);
        else if (title === 'My Recipes') setContentSection(<MyRecipeContent />);
        else if (title === 'Saved Recipes') setContentSection(<SavedRecipeContent />);
    }, [title]);

    return (
        <div className="w-full ml-8 bg-white px-7 py-5">
            <ContentLayout title={title}>{contentSection}</ContentLayout>
        </div>
    );
}

export default UserContent;
