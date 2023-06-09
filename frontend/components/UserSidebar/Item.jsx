import Link from 'next/link';

function Item({ icon, title, active, ...props }) {
    return (
        <div
            {...props}
            className={`w-[350px] cursor-pointer flex items-center bg-white px-[14px] py-[10px] mb-[2px] hover:opacity-80 ${
                active ? 'text-primary font-bold border-primary border-l-4' : ''
            }`}
        >
            {icon && <div className="mr-[10px]">{icon}</div>}
            {title && <div>{title}</div>}
        </div>
    );
}

export default Item;
