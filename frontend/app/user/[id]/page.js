'use client';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { UserContent, UserSidebar } from '@/components';
import { UserContext } from '@/contexts/UserContext';
import { userRequests } from '@/requests';

function UserPage({ params }) {
    const { user, axiosJWT, loadingInfo, searchedUser } = useContext(UserContext);

    useEffect(() => {
        // if not login
        if (!user) {
            redirect('/auth/login');
        }

        const fetch = async () => {
            loadingInfo.set(true);
            const res = await userRequests.getUserInfo(params.id, user.accessToken, axiosJWT);
            searchedUser.current = res.data;
            loadingInfo.set(false);
        };

        fetch();
    }, [params.id, user, axiosJWT, loadingInfo, searchedUser]);

    return (
        <>
            <UserSidebar />
            <UserContent isUser={user?._id === params.id} paramId={params.id} />
        </>
    );
}

export default UserPage;
