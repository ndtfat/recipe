function Rating({ rate, onRate, readOnly, size = 'xs', ...props }) {
    return (
        <div className={`rating ${size === 'sm' ? 'rating-sm' : 'rating-lg'} flex`}>
            <input {...props} type="radio" checked={rate === '0'} className="rating-hidden hidden" readOnly />
            {['1', '2', '3', '4', '5'].map((item) => (
                <input
                    {...props}
                    key={item}
                    type="radio"
                    readOnly={readOnly}
                    checked={item === rate}
                    onClick={onRate ? () => onRate(item) : () => {}}
                    className="mask mask-star-2 bg-primary"
                />
            ))}
        </div>
    );
}

export default Rating;
