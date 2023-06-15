'use client';
import { RiDeleteBin6Line } from '@react-icons/all-files/ri/RiDeleteBin6Line';

import { formatDate } from '@/instances';
import { Rating } from '../common';

function UserReview({ review, onDelete }) {
    return (
        <div>
            <h3 className="group flex items-center text-[16px] font-bold underline underline-offset-2 decoration-primary">
                {review.author.last_name} {review.author.first_name}
                {onDelete && (
                    <>
                        <button
                            className="hidden group-hover:block ml-2 p-1"
                            onClick={() => window.my_modal_1.showModal()}
                        >
                            <RiDeleteBin6Line />
                        </button>
                        <dialog id="my_modal_1" className="modal">
                            <form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg">Confirmation</h3>
                                <p className="py-4">Are you sure about delete your review for this recipe?</p>
                                <div className="modal-action">
                                    <button className="btn">Cancel</button>
                                    <button onClick={onDelete} className="btn bg-primary text-white hover:text-black">
                                        Yes
                                    </button>
                                </div>
                            </form>
                        </dialog>
                    </>
                )}
            </h3>

            <div className="flex items-end mb-2">
                <Rating rate={review.rate} readOnly />

                <p className="text-[#a8a8a8] text-[12px] ml-2 translate-y-[5px]">
                    {formatDate(review.updatedAt, true)}
                </p>
            </div>

            <p className="tex-justify">{review.content}</p>
        </div>
    );
}

export default UserReview;
