import { AiOutlineLock } from 'react-icons/ai';

function ContentLayout({ title, children }) {
    return (
        <div>
            <h1 className="inline-block font-bold text-3xl text-black border-b-4 border-primary">{title}</h1>

            {title === 'Personal Info' && (
                <p className="flex items-end text-gray-500 mt-3">
                    <AiOutlineLock className="mr-[6px] text-2xl" />
                    Only you can see the information on this page. It will not be displayed for other users to see.
                </p>
            )}

            <span className="block h-[1px] bg-gray-300 mt-7 mb-5"></span>

            {children}
        </div>
    );
}

export default ContentLayout;
