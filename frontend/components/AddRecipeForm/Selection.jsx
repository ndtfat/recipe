function Selection({ label, time, onSetTime, dispatch }) {
    return (
        <div className="mb-[10px]">
            <label htmlFor={label} className="inline-block text-base w-1/3 font-bold">
                {label}
            </label>

            <input
                id={label}
                type="number"
                value={time.value}
                onChange={(e) => dispatch(onSetTime({ value: e.target.value }))}
                className="max-w-[100px] w-1/3 outline-none border-[1px] border-black px-3 py-2 mr-5"
            />

            <select
                defaultValue="mins"
                onChange={(e) => dispatch(onSetTime({ measure: e.target.value }))}
                className="w-1/3 border-[1px] px-3 py-[9px] border-black outline-none"
            >
                <option>mins</option>
                <option>hours</option>
                <option>days</option>
            </select>
        </div>
    );
}

export default Selection;
