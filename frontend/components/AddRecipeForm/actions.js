const actions = {
    setTitle(payload) {
        return {
            type: 'SET_TITLE',
            payload,
        };
    },

    setDishType(payload) {
        return {
            type: 'SET_DISH_TYPE',
            payload,
        };
    },

    setDesc(payload) {
        return {
            type: 'SET_DESC',
            payload,
        };
    },

    setImgURL(payload) {
        return {
            type: 'SET_IMGURL',
            payload,
        };
    },

    setIngredients(payload) {
        return {
            type: 'SET_INGREDIENT',
            payload,
        };
    },

    setSteps(payload) {
        return {
            type: 'SET_STEPS',
            payload,
        };
    },

    setPrepTime(payload) {
        return {
            type: 'SET_PREPTIME',
            payload,
        };
    },

    setCookingTime(payload) {
        return {
            type: 'SET_COOKINGTIME',
            payload,
        };
    },

    setNote(payload) {
        return {
            type: 'SET_NOTE',
            payload,
        };
    },

    setIsPublic() {
        return {
            type: 'SET_ISPUBLIC',
        };
    },
};

export default actions;
