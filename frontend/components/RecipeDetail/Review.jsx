'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReviewForm from './ReviewForm';
import UserReview from './UserReview';
import reviewRequest from '@/requests/reviewRequest';
import { createAxiosJWT } from '@/instances';
import { LoadingWrapper } from '../common';

function Review({ recipe }) {
    const user = useSelector((state) => state.auth.userData);
    const axiosJWT = createAxiosJWT(user, useDispatch(), useRouter());

    const [isLoading, setIsLoading] = useState(false);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [rate, setRate] = useState('0');
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState('');
    const [isReviewed, setIsReviewed] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const reviewsRes = await reviewRequest.get(recipe._id, user?.accessToken, axiosJWT);
            setIsReviewed(() => {
                const isReviewed = reviewsRes.isReviewed;
                return isReviewed ? reviewsRes.isReviewed[0] : isReviewed;
            });

            setReviews(reviewsRes.data);
            setIsLoading(false);
        })();
    }, [recipe, user, axiosJWT]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await reviewRequest.add(
            {
                author: user._id,
                rate,
                content: userReview,
                for_recipe: recipe._id,
            },
            user?.accessToken,
            axiosJWT,
        );

        setReviews(res.data);
        setIsReviewed(res.addedReview);
        setIsLoading(false);
    };

    const handleDeleteReview = async (e) => {
        setIsLoading(true);
        console.log(user.accessToken);
        const res = await reviewRequest.delete(isReviewed._id, recipe._id, user.accessToken, axiosJWT);
        setReviews(res.data);
        setIsReviewed(false);
        setIsLoading(false);
    };

    const handleSortReviews = async (e) => {
        setLoadingReviews(true);
        const sortBy = e.target.value === 'Latest' ? 'desc' : 'asc';
        const res = await reviewRequest.get(recipe._id, user?.accessToken, axiosJWT, sortBy);

        setReviews(res.data);
        setLoadingReviews(false);
    };

    return (
        <div className="border-t-[1px] border-[#b1b1b1]">
            <h1 className="text-[40px] font-bold mb-2">Reviews</h1>

            <LoadingWrapper loading={isLoading}>
                <div className="p-5 [&>*]:p-3 bg-secondary [&>*]:bg-white mb-2">
                    {isReviewed ? (
                        <UserReview review={isReviewed} onDelete={handleDeleteReview} />
                    ) : (
                        <ReviewForm
                            onSubmit={handleSubmitReview}
                            rate={rate}
                            review={userReview}
                            onRate={setRate}
                            onReview={setUserReview}
                        />
                    )}
                </div>

                {/* Other user's reviews  */}
                {reviews.length > 0 && (
                    <div className=" border-t-[1px] border-[#c3c3c3]">
                        <select defaultValue="Lastest" className="py-1 font-bold" onChange={handleSortReviews}>
                            <option>Latest</option>
                            <option>Earliest</option>
                        </select>

                        <LoadingWrapper loading={loadingReviews}>
                            <ul>
                                {reviews.map((review) => (
                                    <div key={review._id} className="py-4 border-t-[1px] border-[#c3c3c3]">
                                        <UserReview review={review} />
                                    </div>
                                ))}
                            </ul>
                        </LoadingWrapper>
                    </div>
                )}
            </LoadingWrapper>
        </div>
    );
}

export default Review;
