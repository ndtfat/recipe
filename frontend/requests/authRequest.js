import axios from 'axios';
import { authActions } from '@/redux/slices/authSlice';

export default {
    async register(payload, router, dispatch) {
        dispatch(authActions.registerStart());
        try {
            const res = await axios.post(process.env.SERVER_URL + '/auth/register', payload);
            const data = res.data;

            if (data.status === 200) {
                dispatch(authActions.registerSuccess());
                router.push('/auth/login');
            } else if (data.status === 403);
        } catch (err) {
            dispatch(authActions.registerFailure(err.response.data.message));
        }
    },

    async login(payload, router, dispatch) {
        dispatch(authActions.loginStart());
        try {
            const res = await axios.post(process.env.SERVER_URL + '/auth/login', payload, {
                withCredentials: true,
            });
            const data = res.data;

            if (data.status === 200) {
                router.push('/');
                dispatch(authActions.loginSuccess(data.data));
            }
        } catch (err) {
            console.log(err);
            dispatch(authActions.loginFailure(err.response.data.message));
        }
    },

    async logout(accessToken, router, dispatch, axiosJWT) {
        dispatch(authActions.logoutStart());
        try {
            const res = await axiosJWT.post(
                process.env.SERVER_URL + '/auth/logout',
                {},
                { headers: { token: 'Bearer ' + accessToken } },
            );

            const data = res.data;

            if (data.status === 200) {
                router.push('/auth/login');
                dispatch(authActions.loginSuccess(data.data));
            }
        } catch (err) {
            console.log(err);
            // dispatch(authActions.logoutFailure(err.response.data.message));
        }
    },

    async refreshToken(dispatch) {
        dispatch(authActions.refreshStart());
        try {
            const res = await axios.post(
                'http://localhost:5000/auth/refresh-access-token',
                {},
                {
                    withCredentials: true,
                },
            );

            dispatch(authActions.refreshSuccess(res.data.data));
            return res.data;
        } catch (err) {
            console.log(err);
            dispatch(authActions.refreshFailure(err.response.data.message));
        }
    },
};
