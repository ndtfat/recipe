import Image from 'next/image';

import categories from '@/public/category';

function Category({ params }) {
    const category = categories.filter((category) => category.param === params.category)[0];
    return (
        <>
            <Image
                alt="category"
                src={category.background}
                className="w-full h-[350px] object-cover backdrop-brightness-50"
            />
        </>
    );
}

export default Category;
