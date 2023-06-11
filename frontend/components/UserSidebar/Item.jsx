import Link from 'next/link';

function Item({ icon, title, active, ...props }) {
    return (
        <div
            {...props}
            className={`lg:w-[350px] cursor-pointer font-bold flex items-center bg-white px-[14px] py-[10px] lg:mb-[2px] hover:opacity-80 border-l-4 ${
                active ? 'text-primary border-primary' : 'border-transparent'
            }`}
        >
            {icon && <div className="mr-[10px]">{icon}</div>}
            {title && <div>{title}</div>}
        </div>
    );
}

export default Item;
