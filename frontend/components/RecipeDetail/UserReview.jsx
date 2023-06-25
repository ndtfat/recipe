import { RiDeleteBin6Line } from '@react-icons/all-files/ri/RiDeleteBin6Line';

import { formatDate } from '@/instances';
import { Rating } from '../common';
import Modal from '../common/Modal';

function UserReview({ review, onDelete }) {
    return (
        <div>
            <h3 className="group flex items-center text-[16px] font-bold underline underline-offset-2 decoration-primary">
                {review.author.last_name} {review.author.first_name}
                {onDelete && (
                    <Modal onConfirm={onDelete} text={'Are you sure about delete your review for this recipe?'}>
                        <RiDeleteBin6Line className="cursor-pointer ml-2 translate-y-1 hover:translate-y-0" />
                    </Modal>
                )}
            </h3>

            <div className="flex items-end mb-2">
                <Rating rate={`${Math.ceil(review.rate)}`} readOnly size="sm" />

                <p className="text-[#a8a8a8] text-[12px] ml-2 translate-y-[5px]">
                    {formatDate(review.updatedAt, true)}
                </p>
            </div>

            <p className="tex-justify">{review.content}</p>
        </div>
    );
}

export default UserReview;
