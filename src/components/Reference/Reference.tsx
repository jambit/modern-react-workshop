import React, { useRef, useEffect } from 'react';

export const Reference = () => {
    const counter = useRef(0);
    const ref = useRef<HTMLDivElement>();
    useEffect(() => {
        ref.current.textContent = 'Gotcha';
    }, []);

    return (
        <div>
            Ref: <span ref={ref} />
            Counter: <span>{counter.current}</span>
            <button onClick={() => (counter.current += 1)}>Add</button>
            <button
                onClick={() =>
                    (ref.current.textContent = counter.current.toString())
                }
            >
                Set
            </button>
        </div>
    );
};
