import { authActions } from '@/redux/slices/authSlice';
import toast from 'react-hot-toast';

export default {
    async updateUserInfo(info, accessToken, dispatch, axiosJWT) {
        try {
            const res = await axiosJWT.put(process.env.SERVER_URL + '/user/update/info', info, {
                headers: { token: 'Bearer ' + accessToken },
            });
            const data = res.data;

            toast.success(data.message);
            dispatch(authActions.updateUserData(data.data));
            return data;
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    },

    async updatePassword(pw, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.put(process.env.SERVER_URL + '/user/update/password', pw, {
                headers: { token: 'Bearer ' + accessToken },
            });

            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    },

    async getUserInfo(userId, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.get(process.env.SERVER_URL + `/user/${userId}`, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async saveRecipes(ids, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.patch(
                process.env.SERVER_URL + `/user/save-recipe`,
                { ids },
                { headers: { token: 'Bearer ' + accessToken } },
            );

            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async unsaveRecipes(ids, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.patch(
                process.env.SERVER_URL + `/user/unsave-recipe`,
                { ids },
                { headers: { token: 'Bearer ' + accessToken } },
            );

            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
};
