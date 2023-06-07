export default {
    async add(recipeForm, axiosJWT) {
        try {
            const res = await axiosJWT.post('http://localhost:5000/recipe/add', recipeForm, {
                withCredentials: true,
            });

            return res.data;
        } catch (err) {
            return err.response.data;
        }
    },
};
