'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { Input } from '@/components/common';
import { authActions } from '@/redux/slices/authSlice';
import authRequest from '@/requests/authRequest';

function Auth({ params }) {
    const form = params.form;
    const authState = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form === 'register') {
            await authRequest.register(inputs, router, dispatch);
        }

        if (form === 'login') {
            await authRequest.login(
                {
                    username: inputs.username,
                    password: inputs.password,
                },
                router,
                dispatch,
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="z-10 w-2/3 max-w-[450px] p-[40px] bg-white/30 backdrop-blur-md flex flex-col justify-center rounded-md text-white"
        >
            <header>
                <h1 className="inline-block text-[36px] md:text-[50px] font-medium mb-[40px] border-b-4 border-white">
                    {form === 'login' ? 'Sign in' : 'Sign up'}
                </h1>
            </header>

            {form === 'register' && (
                <div className="flex justify-between mb-[20px]">
                    <div className="mr-3">
                        <Input
                            typeInput={1}
                            label={'First name'}
                            value={inputs.last_name}
                            onChange={(e) =>
                                setInputs((prev) => {
                                    return { ...prev, last_name: e.target.value };
                                })
                            }
                        />
                    </div>
                    <Input
                        typeInput={1}
                        label={'Last name'}
                        value={inputs.first_name}
                        onChange={(e) =>
                            setInputs((prev) => {
                                return { ...prev, first_name: e.target.value };
                            })
                        }
                    />
                </div>
            )}

            <Input
                mb={40}
                typeInput={1}
                label={'Username'}
                value={inputs.username}
                onChange={(e) =>
                    setInputs((prev) => {
                        return { ...prev, username: e.target.value };
                    })
                }
            />
            <Input
                mb={40}
                typeInput={1}
                label={'Password'}
                type="password"
                value={inputs.password}
                onChange={(e) =>
                    setInputs((prev) => {
                        return { ...prev, password: e.target.value };
                    })
                }
            />
            {form === 'register' && (
                <Input
                    mb={40}
                    typeInput={1}
                    label={'Email'}
                    type="email"
                    value={inputs.email}
                    onChange={(e) =>
                        setInputs((prev) => {
                            return { ...prev, email: e.target.value };
                        })
                    }
                />
            )}

            {authState.error && (
                <span className="text-center mt-[-10px] mb-[20px] bg-red-600">{authState.message}</span>
            )}

            <button
                type="submit"
                className="duration-300 text-[20px] font-medium bg-[#1a1a1a] py-[10px] rounded-full border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a]"
            >
                {form === 'login' ? 'Sign in' : 'Sign up'}
            </button>
            <Link
                onClick={() => dispatch(authActions.deleteMessage())}
                href={form === 'login' ? '/auth/register' : 'auth/login'}
                className="duration-300 text-center text-[14px] md:text-[16px] mt-[20px] underline cursor-pointer hover:text-[#1a1a1a]"
            >
                {form === 'login' ? 'Do not have account? Sign up' : 'Have account? Sign in'}
            </Link>
        </form>
    );
}

export default Auth;
