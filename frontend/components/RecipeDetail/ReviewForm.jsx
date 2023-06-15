'use client';
import { useRef } from 'react';

import { Button, Rating } from '../common';

function ReviewForm({ onSubmit, onRate, rate, onReview, review }) {
    const rateLevel = useRef({
        1: "Couldn't eat it!",
        2: "Didn't like it",
        3: "It's was OK",
        4: 'Liked it',
        5: 'Loved it',
    });

    return (
        <form onSubmit={onSubmit}>
            <h4 className="font-bold">
                Your Rating <span className="font-normal text-[14px] text-[#595959]">(required)</span>
            </h4>
            <div className="flex items-center">
                <Rating size="lg" rate={rate} onRate={onRate} />

                <p className="h-[40px] leading-[40px] ml-4 pl-4 border-l-[1px] border-[#b1b1b1]">
                    {rateLevel.current[rate]}
                </p>
            </div>

            <>
                <label htmlFor="review" className="block font-bold mt-6">
                    Your Review <span className="font-normal text-[14px] text-[#595959]">(optional)</span>
                </label>
                <textarea
                    id="review"
                    value={review}
                    onChange={(e) => onReview(e.target.value)}
                    placeholder="What did you think about this recipe? Need any changes or notes?"
                    className="border-[#b2b2b2] border-[1px] mt-2 w-full h-24 resize-none p-4"
                />
            </>

            <div className="text-right">
                <Button type="submit" typeBtn="primary" className="py-2 px-4 mt-4 text-[20px] font-bold">
                    SUBMIT
                </Button>
            </div>
        </form>
    );
}

export default ReviewForm;
