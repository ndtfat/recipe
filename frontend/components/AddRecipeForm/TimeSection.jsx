import { memo } from 'react';
import { useMemo } from 'react';

import actions from './actions';
import Selection from './Selection';

function TimeSection({ dispatch, times }) {
    const { prepTime, cookingTime } = times;

    const totalTime = useMemo(() => {
        const timeLevel = { mins: 0, hours: 1, days: 2 };

        if (timeLevel[prepTime.measure] === timeLevel[cookingTime.measure]) {
            return `${Number(prepTime.value) + Number(cookingTime.value)} ${prepTime.measure}`;
        } else if (timeLevel[prepTime.measure] > timeLevel[cookingTime.measure]) {
            return `${prepTime.value} ${prepTime.measure} and ${cookingTime.value} ${cookingTime.measure}`;
        } else {
            return `${cookingTime.value} ${cookingTime.measure} and ${prepTime.value} ${prepTime.measure}`;
        }
    });

    return (
        <div>
            <Selection label="Prep time" dispatch={dispatch} time={prepTime} onSetTime={actions.setPrepTime} />
            <Selection label="Cooking time" dispatch={dispatch} time={cookingTime} onSetTime={actions.setCookingTime} />

            <div className="flex mt-5 text-base">
                <span className="inline-block w-[200px] font-bold">Total time</span>
                <span>{totalTime}</span>
            </div>
        </div>
    );
}

export default memo(TimeSection);
