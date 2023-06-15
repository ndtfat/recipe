import axios from 'axios';
import jwt_decode from 'jwt-decode';

import authRequest from '@/requests/authRequest';

export default (user, dispatch, router) => {
    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);

            if (decodedToken?.exp < date.getTime() / 1000) {
                const refreshRes = await authRequest.refreshToken(dispatch);

                if (!refreshRes) router.push('/auth/login');

                const newAccessToken = refreshRes.data.accessToken;
                config.headers['token'] = 'Bearer ' + newAccessToken;
            }
            return config;
        },
        (err) => Promise.reject(err),
    );

    return axiosJWT;
};
