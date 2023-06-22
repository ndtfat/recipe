import toast from 'react-hot-toast';

export default {
    async add(body, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.post(process.env.SERVER_URL + '/review/add', body, {
                headers: { token: 'Bearer ' + accessToken },
            });

            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async delete(reviewId, recipeId, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.delete(process.env.SERVER_URL + `/review/delete/${reviewId}`, {
                headers: { token: 'Bearer ' + accessToken },
                data: { recipeId },
            });

            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async get(recipeId, accessToken, axiosJWT, sortBy = 'desc') {
        try {
            const res = await axiosJWT.get(process.env.SERVER_URL + `/review/get/${recipeId}?sortBy=${sortBy}`, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
};
