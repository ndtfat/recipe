'use client';
import { useState } from 'react';
import { redirect } from 'next/navigation';

import { UserContent, UserSidebar } from '@/components';
import { useSelector } from 'react-redux';

function UserPage() {
    const userData = useSelector((state) => state.auth.userData);
    if (userData === null) redirect('/auth/login');

    const [content, setContent] = useState('Personal Info');
    const handleChangeContent = (selectedContent) => {
        setContent(selectedContent);
    };

    return (
        <div className="flex px-[50px] py-8">
            <UserSidebar onChangeContent={handleChangeContent} content={content} />

            <UserContent title={content} />
        </div>
    );
}

export default UserPage;
