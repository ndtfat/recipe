import { memo } from 'react';
import { Button } from '../common';
import actions from './actions';

function SubmitSection({ isPublic, dispatch }) {
    return (
        <div>
            <div className="flex items-center mb-[10px] mt-[20px]">
                <input
                    type="radio"
                    id="public"
                    className="radio checked:bg-primary mr-3"
                    checked={isPublic}
                    onChange={() => dispatch(actions.setIsPublic())}
                />
                <label htmlFor="public" className="font-bold">
                    Public <span className="font-normal">(everyone can see this recipe)</span>
                </label>
            </div>
            <div className="flex items-center">
                <input
                    type="radio"
                    id="private"
                    className="radio checked:bg-primary mr-3"
                    checked={!isPublic}
                    onChange={() => dispatch(actions.setIsPublic())}
                />
                <label htmlFor="private" className="font-bold">
                    Private <span className="font-normal">(only you can see this recipe)</span>
                </label>
            </div>

            <div className="w-full text-right mt-3">
                <Button type="submit" typeBtn="primary" className="text-[20px] px-5 py-3 font-bold mt-[10px]">
                    Submit Recipe
                </Button>
            </div>
        </div>
    );
}

export default memo(SubmitSection);
