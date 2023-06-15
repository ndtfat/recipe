'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Input } from '../common';
import { createAxiosJWT } from '@/instances';
import userRequests from '@/requests/userRequests';

function InfoContent() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData);
    const axiosJWT = createAxiosJWT(user, dispatch, useRouter());

    const [userInfo, setUserInfo] = useState(user);
    const [isChangeInfo, setIsChangeInfo] = useState(false);
    const [wantCHangePassword, setWantChangePassword] = useState(false);
    const [pw, setPw] = useState({ current: '', new: '' });
    const [resMsg, setResMsg] = useState({ isSuccess: false, msg: '' });

    const handleChangeInfo = (e, info) => {
        setUserInfo((prev) => {
            return { ...prev, [info]: e.target.value.trim() };
        });
    };

    const handleWantChangePw = () => {
        setWantChangePassword((prev) => !prev);
    };

    const handleChangePw = (e, pw) => {
        setPw((prev) => {
            return { ...prev, [pw]: e.target.value.trim() };
        });
    };

    useEffect(() => {
        if (
            user?.first_name !== userInfo?.first_name ||
            user?.last_name !== userInfo?.last_name ||
            user?.email !== userInfo?.email ||
            wantCHangePassword
        ) {
            setIsChangeInfo(true);
        } else {
            setIsChangeInfo(false);
        }
    }, [wantCHangePassword, userInfo]);

    const handleSaveChange = async (e) => {
        e.preventDefault();

        let res = await userRequests.updateUserInfo(userInfo, user?.accessToken, dispatch, axiosJWT);
        if (wantCHangePassword) await userRequests.updatePassword(pw, user?.accessToken, axiosJWT);

        if (res?.status === 200) {
            setResMsg({ isSuccess: true, msg: 'Update success' });
            setPw({ current: '', new: '' });
        }
    };

    return (
        <div className="px-[10px] lg:px-[100px]">
            <form onSubmit={handleSaveChange}>
                <div className="flex">
                    <Input
                        required
                        typeInput={2}
                        label={'First name'}
                        value={userInfo?.first_name}
                        onChange={(e) => handleChangeInfo(e, 'first_name')}
                    />
                    <span className="inline-block w-8"></span>
                    <Input
                        required
                        typeInput={2}
                        label={'Last name'}
                        value={userInfo?.last_name}
                        onChange={(e) => handleChangeInfo(e, 'last_name')}
                    />
                </div>

                <Input
                    required
                    typeInput={2}
                    label="email"
                    value={userInfo?.email}
                    onChange={(e) => handleChangeInfo(e, 'email')}
                />

                <span onClick={handleWantChangePw} className="cursor-pointer underline hover:text-primary mb-2">
                    {wantCHangePassword ? 'Cancel' : 'Change password ?'}
                </span>

                {wantCHangePassword && (
                    <div>
                        <Input
                            required
                            type="password"
                            typeInput={2}
                            label="Current password"
                            mb={10}
                            value={pw.current}
                            onChange={(e) => handleChangePw(e, 'current')}
                        />
                        <Input
                            required
                            type="password"
                            typeInput={2}
                            label="New password"
                            value={pw.new}
                            onChange={(e) => handleChangePw(e, 'new')}
                        />
                    </div>
                )}

                <div className="text-right">
                    <Button
                        typeBtn="primary"
                        type="submit"
                        disable={!isChangeInfo}
                        className="font-bold text-xl px-5 py-3 mt-5"
                    >
                        Save Change
                    </Button>
                </div>
            </form>

            {resMsg && (
                <span
                    className={`block text-center mt-3 text-white ${resMsg.isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
                >
                    {resMsg.msg}
                </span>
            )}
        </div>
    );
}

export default InfoContent;
