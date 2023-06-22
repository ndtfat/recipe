import axios from 'axios';
import toast from 'react-hot-toast';

export default {
    async add(recipeForm, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.post(process.env.SERVER_URL + '/recipe/add', recipeForm, {
                headers: { token: 'Bearer ' + accessToken },
            });

            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            return err.response;
        }
    },

    async softFelete(ids, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.patch(
                process.env.SERVER_URL + '/recipe/delete-soft',
                { ids },
                { headers: { token: 'Bearer ' + accessToken } },
            );

            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async forceDelete(ids, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.delete(process.env.SERVER_URL + '/recipe/delete-force', {
                data: { ids },
                headers: { token: 'Bearer ' + accessToken },
            });

            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async restore(ids, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.patch(
                process.env.SERVER_URL + '/recipe/restore',
                { ids },
                { headers: { token: 'Bearer ' + accessToken } },
            );

            console.log(res.data);
            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getRecipes(userId, page, sortBy, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.get(
                process.env.SERVER_URL + `/recipe/mine/${userId}?page=${page}&sortBy=${sortBy}`,
                {
                    headers: { token: 'Bearer ' + accessToken },
                },
            );

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getRecipesDeleted(userId, page, sortBy, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.get(
                process.env.SERVER_URL + `/recipe/${userId}/deleted?page=${page}&sortBy=${sortBy}`,
                {
                    headers: { token: 'Bearer ' + accessToken },
                },
            );

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getSavedRecipes(page, sortBy, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT(process.env.SERVER_URL + `/recipe/saved?page=${page}&sortBy=${sortBy}`, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getRecipeDetail(id, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.get(process.env.SERVER_URL + `/recipe/detail/${id}`, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getRelativeRecipes(id, accessToken, axiosJWT) {
        try {
            const res = await axiosJWT.get(process.env.SERVER_URL + `/recipe/relative/${id}`, {
                headers: { token: 'Bearer ' + accessToken },
            });

            return res.data;
        } catch (err) {}
    },

    async getTop1Recipes() {
        try {
            const res = await axios.get(process.env.SERVER_URL + '/recipe/top1-each-type');
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getRecipesOfType(type, page, sortBy) {
        try {
            const res = await axios.get(process.env.SERVER_URL + `/recipe/${type}?page=${page}&sortBy=${sortBy}`);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async search(text, page, sortBy) {
        try {
            const res = await axios.get(
                process.env.SERVER_URL + `/recipe/search?text=${text}&page=${page}&sortBy=${sortBy}`,
            );
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
};
