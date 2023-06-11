import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    title: '',
    dishType: '',
    desc: '',
    imgURL: '',
    ingredients: [
        { id: uuidv4(), value: '', placeholder: 'e.g. 1 cup of sugar' },
        { id: uuidv4(), value: '', placeholder: 'e.g. 2 cups of flour, sifted' },
    ],
    steps: [
        { id: uuidv4(), value: '', placeholder: 'e.g. Preheat oven to 250 degree F...' },
        { id: uuidv4(), value: '', placeholder: 'e.g. Combine all dry ingredients in a large bowl...' },
    ],
    times: {
        prepTime: { value: 0, measure: 'mins' },
        cookingTime: { value: 0, measure: 'mins' },
    },
    note: {
        title: '',
        content: '',
    },
    isPublic: true,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.payload,
            };
        case 'SET_DISH_TYPE':
            return {
                ...state,
                dishType: action.payload,
            };
        case 'SET_DESC':
            return {
                ...state,
                desc: action.payload,
            };
        case 'SET_IMGURL':
            return {
                ...state,
                imgURL: action.payload,
            };
        case 'SET_INGREDIENT':
            const ingredients = action.payload.map((ingredient) => {
                return {
                    id: ingredient.id,
                    value: ingredient.value,
                };
            });

            return {
                ...state,
                ingredients,
            };
        case 'SET_STEPS':
            const steps = action.payload.map((step) => {
                return {
                    id: step.id,
                    value: step.value,
                };
            });
            return {
                ...state,
                steps: action.payload,
            };
        case 'SET_PREPTIME':
            return {
                ...state,
                times: {
                    ...state.times,
                    prepTime: {
                        value: action.payload?.value || state.times.prepTime.value,
                        measure: action.payload?.measure || state.times.prepTime.measure,
                    },
                },
            };
        case 'SET_COOKINGTIME':
            return {
                ...state,
                times: {
                    ...state.times,
                    cookingTime: {
                        value: action.payload?.value || state.times.cookingTime.value,
                        measure: action.payload?.measure || state.times.cookingTime.measure,
                    },
                },
            };
        case 'SET_NOTE':
            return {
                ...state,
                note: {
                    title: action.payload?.title || state.note.title,
                    content: action.payload?.content || state.note.content,
                },
            };
        case 'SET_ISPUBLIC':
            return {
                ...state,
                isPublic: !state.isPublic,
            };
        default:
            throw new Error('Invalid action');
    }
};
