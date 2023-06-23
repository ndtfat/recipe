'use client';

import { useReducer } from 'react';
import { AiFillPlusSquare } from '@react-icons/all-files/ai/AiFillPlusSquare';
import { useRouter } from 'next/navigation';

import { initialState, reducer } from './reducer';
import actions from './actions';
import DragList from './DragList';
import FormSection from './FormSection';
import InfoSection from './InfoSection';
import NoteSection from './NoteSection';
import SubmitSection from './SubmitSection';
import TimeSection from './TimeSection';
import recipeRequest from '@/requests/recipeRequest';
import { useDispatch, useSelector } from 'react-redux';
import { createAxiosJWT } from '@/instances';

function AddRecipeForm() {
    const router = useRouter();
    const user = useSelector((state) => state.auth.userData);
    const [state, dispatch] = useReducer(reducer, initialState);
    const axiosJWT = createAxiosJWT(user, useDispatch(), router);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user) {
            const res = await recipeRequest.add({ author: user._id, ...state }, user.accessToken, axiosJWT);
            console.log(res);
            if (res.status === 200) router.push(`/user/${user._id}?content=My Recipes`);
        } else {
            console.log('login please');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-[10px] lg:mx-auto translate-y-[-100px] lg:w-[800px] p-5 bg-white shadow-[0_0_10px_-1px_rgba(0,0,0,0.4)]"
        >
            <h1 className="flex items-center text-black text-[30px] font-black">
                <AiFillPlusSquare size={54} className="mr-[10px] text-primary" />
                <span className="border-b-4 border-primary">Add a Recipe</span>
            </h1>

            <p className="text-gray-500 mt-3 pb-4 border-b-[1px] text-justify">
                Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the
                Allrecipes community.
            </p>

            <FormSection>
                <InfoSection
                    dispatch={dispatch}
                    info={{ title: state.title, dishType: state.dishType, desc: state.desc, imgURL: state.imgURL }}
                />
            </FormSection>

            {/* Ingredients Section */}
            <FormSection
                title="Ingredients"
                subTitle="Enter one ingredient per line. Include the quantity and any special preparation. Use optional headers to organize the different parts of the recipe."
            >
                <DragList
                    dispatch={dispatch}
                    list={state.ingredients}
                    onSetList={actions.setIngredients}
                    placeholder="ingredient"
                />
            </FormSection>

            {/* Steps Section */}
            <FormSection
                title="Steps"
                subTitle="Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate)."
            >
                <DragList
                    textarea
                    dispatch={dispatch}
                    list={state.steps}
                    onSetList={actions.setSteps}
                    placeholder="step"
                />
            </FormSection>

            {/* Time Section */}
            <FormSection>
                <TimeSection dispatch={dispatch} times={state.times} />
            </FormSection>

            {/* Note Section */}
            <FormSection
                title="Notes (Optional)"
                subTitle="Add any helpful tips about ingredient substitutions, serving, or storage here."
            >
                <NoteSection note={state.note} dispatch={dispatch} />
            </FormSection>

            {/* Submit Section */}
            <FormSection title="Make this recipe public ?">
                <SubmitSection isPublic={state.isPublic} dispatch={dispatch} />
            </FormSection>
        </form>
    );
}

export default AddRecipeForm;
