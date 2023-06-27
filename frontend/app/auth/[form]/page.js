'use client';

import Link from 'next/link';
import { VscSignIn } from '@react-icons/all-files/vsc/VscSignIn';
import { IoMdCreate } from '@react-icons/all-files/io/IoMdCreate';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '@/components/common';
import { authActions } from '@/redux/slices/authSlice';
import authRequest from '@/requests/authRequest';

function Auth({ params }) {
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
        console.log(params.form);
        e.preventDefault();

        if (params.form === 'register') {
            await authRequest.register(inputs, router, dispatch);
        }

        if (params.form === 'login') {
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
            className="z-10 w-2/3 max-w-[450px] p-[40px] flex flex-col justify-center shadow-lg rounded-md bg-white"
        >
            <header>
                <h1 className="flex items-center text-[36px] md:text-[50px] font-medium mb-[40px]">
                    {params.form === 'login' ? <VscSignIn className="mr-2" /> : <IoMdCreate className="mr-2" />}
                    {params.form === 'login' ? 'Sign in' : 'Sign up'}
                </h1>
            </header>

            {params.form === 'register' && (
                <div className="flex justify-between mb-[20px]">
                    <div className="mr-3">
                        <Input
                            required
                            typeInput={1}
                            placeholder="First name"
                            value={inputs.last_name}
                            onChange={(e) =>
                                setInputs((prev) => {
                                    return { ...prev, last_name: e.target.value };
                                })
                            }
                        />
                    </div>
                    <Input
                        required
                        typeInput={1}
                        placeholder="Last name"
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
                required
                mb={40}
                typeInput={1}
                placeholder="Username"
                value={inputs.username}
                onChange={(e) =>
                    setInputs((prev) => {
                        return { ...prev, username: e.target.value };
                    })
                }
            />
            <Input
                required
                mb={40}
                typeInput={1}
                type="password"
                placeholder="Password"
                value={inputs.password}
                onChange={(e) =>
                    setInputs((prev) => {
                        return { ...prev, password: e.target.value };
                    })
                }
            />
            {params.form === 'register' && (
                <Input
                    required
                    mb={40}
                    typeInput={1}
                    placeholder="Email"
                    type="email"
                    value={inputs.email}
                    onChange={(e) =>
                        setInputs((prev) => {
                            return { ...prev, email: e.target.value };
                        })
                    }
                />
            )}

            <button
                type="submit"
                className="duration-300 text-[20px] font-medium bg-primary text-white py-[10px] rounded-full border-2 border-primary hover:bg-transparent hover:text-primary"
            >
                {params.form === 'login' ? 'Sign in' : 'Sign up'}
            </button>
            <Link
                onClick={() => dispatch(authActions.deleteMessage())}
                href={params.form === 'login' ? '/auth/register' : 'auth/login'}
                className="duration-300 text-center text-[14px] md:text-[16px] mt-[20px] underline cursor-pointer hover:text-black"
            >
                {params.form === 'login' ? "You don't have an account? Sign up" : 'You have an account? Sign in'}
            </Link>
        </form>
    );
}

export default Auth;
