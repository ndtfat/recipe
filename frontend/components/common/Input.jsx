const types = {
    1: {
        label: 'text-[16px] text-white/80 mb-[14px]',
        input: 'text-[20px] border-b-[1px] mt-[4px] border-white focus:border-white invalid:border-white/30 ',
    },
    2: {
        label: 'text-[16px] font-bold mb-[10px]',
        input: 'text-[16px] py-[8px] px-[16px] border-[1px] border-black',
    },
};

function Input({ textarea = false, typeInput = 1, label, mb = 20, disable, ...props }) {
    return (
        <div className={`mb-[${mb}px] w-full`}>
            {label && (
                <label htmlFor={label} className={types[typeInput].label}>
                    {label}
                </label>
            )}

            {textarea ? (
                <textarea
                    {...props}
                    id={label}
                    required
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
                    required
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
