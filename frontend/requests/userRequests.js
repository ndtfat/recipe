import { authActions } from '@/redux/slices/authSlice';

export default {
    async updateUserInfo(info, accessToken, dispatch, axiosJWT) {
        try {
            const res = await axiosJWT.put(process.env.SERVER_URL + '/user/update/info', info, {
                headers: { token: 'Bearer ' + accessToken },
            });
            console.log(res.data);
            dispatch(authActions.updateUserData(res.data.data));
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async updatePassword(pw, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.put(process.env.SERVER_URL + '/user/update/password', pw, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getUserInfo(userId, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.get(process.env.SERVER_URL + `/user/${userId}`, {
                headers: { token: 'Bearer ' + accessToken },
            });
            console.log(res);

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
};
