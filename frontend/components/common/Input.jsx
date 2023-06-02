function Input({ label, ...props }) {
    return (
        <div className="mb-[20px] md:mb-[40px] w-full px-1">
            <label htmlFor={label} className="text-[16px] text-white/80 mb-[14px]">
                {label}
            </label>
            <input
                {...props}
                id={label}
                required
                className="duration-300 w-full text-[20px] border-b-[1px] mt-[4px] border-white focus:border-white invalid:border-white/30 outline-none bg-transparent "
            ></input>
        </div>
    );
}

export default Input;
