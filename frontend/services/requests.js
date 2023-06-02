import axios from 'axios';
import { authActions } from '@/redux/slices/authSlice';

const requests = {
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
                dispatch(authActions.loginSuccess(data.data));
                router.push('/');
            }
        } catch (err) {
            console.log(err);
            dispatch(authActions.loginFailure({ message: err.response.data.message }));
        }
    },

    async logout(router, dispatch) {
        dispatch(authActions.logoutStart());
        try {
            const res = await axios.post(process.env.SERVER_URL + '/auth/logout', {
                withCredentials: true,
            });
            const data = res.data;

            dispatch(authActions.logoutSuccess());
            router.push('/auth/login');
        } catch (err) {
            console.log(err);
        }
    },
};

export default requests;
