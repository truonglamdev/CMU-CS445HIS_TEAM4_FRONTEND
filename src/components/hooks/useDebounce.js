import { useEffect, useState } from 'react';

const Debounce = (value, delay = 500) => {
    const [debounceValue, setDebounce] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);
    return debounceValue;
};

export default Debounce;
