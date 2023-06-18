import Link from 'next/link';
import { BiBook } from '@react-icons/all-files/bi/BiBook';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';

import { Button } from '@/components/common';
import { formatDate } from '@/instances';

function OverView({ data, isSaved, onSaveRecipe }) {
    return (
        <>
            <h1 className="font-bold text-[30px] md:text-[48px]">{data.title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex">
                    <AiFillStar size={20} color="#ff3130" className="mr-2" />
                    <p className="mr-1 border-b-[1px] border-primary">{data.rate}</p>
                    <p className="text-[#595959]">({data.total_rated})</p>

                    <div className="px-[10px] text-[#bababa]">|</div>

                    <p>
                        <span className="hidden md:inline-block">Recipe by</span>{' '}
                        <Link
                            href={`/user/${data.author._id}`}
                            className="font-bold border-b-[1px] border-primary hover:border-b-2"
                        >
                            {data.author.last_name} {data.author.first_name}
                        </Link>
                    </p>
                </div>

                <div className="hidden sm:inline-block px-[10px] text-[#848383]">|</div>

                <p>
                    <span className="hidden md:inline-block">Updated on</span> {formatDate(data.updatedAt)}
                </p>
            </div>

            {/* Recipe_description  */}
            <p className="mt-4 text-justify">{data.desc}</p>

            {/* Recipe_image */}
            <div className="relative w-full h-[400px]">
                <img alt={data.title} src={data.imgURL} className="mt-4 w-full h-full object-cover" />
                <span className="flex items-end p-7 w-full h-1/2 absolute left-0 bottom-0 bg-gradient-to-t from-black to-transparent">
                    <Button
                        typeBtn="primary"
                        className="flex items-center py-2 px-4 text-[18px] font-bold align-[text-bottom]"
                        onClick={onSaveRecipe}
                    >
                        {isSaved ? (
                            <>
                                <AiFillHeart size={22} className="mr-2" />
                                Saved
                            </>
                        ) : data.isUsersRecipe ? (
                            <>
                                <BiBook size={22} className="mr-2" />
                                Your recipe
                            </>
                        ) : (
                            <>
                                <AiOutlineHeart size={22} className="mr-2" />
                                Save
                            </>
                        )}
                    </Button>
                </span>
            </div>

            {/* Recipe_times */}
            <div className="mt-4 p-3 bg-secondary flex flex-col md:flex-row md:items-end md:justify-between">
                <p>
                    <span className="font-bold">Prep time:</span>{' '}
                    {`${data.times.prepTime.value} ${data.times.prepTime.measure}`}
                </p>
                <p>
                    <span className="font-bold">Cooking time:</span>{' '}
                    {`${data.times.cookingTime.value} ${data.times.cookingTime.measure}`}
                </p>
                <p>
                    <span className="font-bold">Total time:</span> {`${data.times.totalTime}`}
                </p>
            </div>
        </>
    );
}

export default OverView;
