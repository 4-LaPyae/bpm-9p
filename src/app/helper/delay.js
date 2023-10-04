import {useEffect, useRef} from 'react';

export const useDebounceCallback = (
    delay = 2000,
    cleaning = true
) => {
    // or: delayed debounce callback
    const ref = useRef();
    useEffect(() => {
        if (cleaning) {
            // cleaning uncalled delayed callback with component destroying
            return () => {
                if (ref.current) clearTimeout(ref.current);
            };
        }
    }, []);
    return (callback) => {
        if (ref.current) clearTimeout(ref.current);
        ref.current = setTimeout(callback, delay);
    };
};
