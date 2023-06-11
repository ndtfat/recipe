export default {
    async add(recipeForm, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.post(process.env.SERVER_URL + '/recipe/add', recipeForm, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {
            return err.response;
        }
    },

    async getRecipes(userId, page, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.get(process.env.SERVER_URL + `/recipe/${userId}?page=${page}`, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getSavedRecipes(page, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT(process.env.SERVER_URL + `/recipe/saved?page=${page}}`, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
};
