const types = {
    1: {
        label: 'text-[16px] mb-[14px]',
        input: 'text-[20px] px-3 py-1 border-b-[1px] mt-[4px] border-primary focus:bg-[#edb2b273]',
    },
    2: {
        label: 'text-[16px] font-bold mb-[10px]',
        input: 'text-[16px] py-[8px] px-[16px] border-[1px] border-black',
    },
};

function Input({ textarea = false, typeInput = 1, label, mb = 20, disable, ...props }) {
    return (
        <div className={`mb-[${mb}px] w-full decoration-[#a41c1c]`}>
            {label && (
                <label htmlFor={label} className={types[typeInput].label}>
                    {label}
                </label>
            )}

            {textarea ? (
                <textarea
                    {...props}
                    id={label}
                    className={
                        `duration-300 cursor-text w-full outline-none bg-transparent min-h-[80px] select-none ${
                            !label && 'mt-2'
                        } ` + types[typeInput].input
                    }
                ></textarea>
            ) : (
                <input
                    {...props}
                    id={label}
                    className={
                        `duration-300 cursor-text w-full outline-none bg-transparent ${!label && 'mt-2'} ` +
                        types[typeInput].input
                    }
                ></input>
            )}
        </div>
    );
}

export default Input;
