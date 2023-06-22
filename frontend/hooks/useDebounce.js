const { useState, useEffect } = require('react');

const useDebounce = (value, delay) => {
    const [debounce, setDebounce] = useState();

    useEffect(() => {
        const id = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => {
            clearTimeout(id);
        };
    }, [value, delay]);

    return debounce;
};

export default useDebounce;
