function Item({ icon, title, active }) {
    return (
        <div
            className={`w-[300px] cursor-pointer flex items-center bg-white px-[14px] py-[10px] mb-[2px] hover:text-primary hover:font-bold border-primary ${
                active && 'border-l-4'
            } hover:border-l-4`}
        >
            {icon && <div className="mr-[10px]">{icon}</div>}
            {title && <div>{title}</div>}
        </div>
    );
}

export default Item;
