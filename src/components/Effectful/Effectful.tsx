import React, { useEffect, useState } from 'react';
import { useToggle } from '../../hooks/useToggle';

export const Effectful = () => {
    const [originalTitle] = useState(document.title);
    const [value, toggleValue] = useToggle(false);

    useEffect(() => {
        const element = document.getElementById('effect');
        element.textContent = new Date().toISOString();
    }, [value]);

    useEffect(() => {
        document.title = 'Effectful React';
        return () => {
            document.title = originalTitle;
        };
    }, []);

    return (
        <span>
            <span id="effect">Some Effect</span>
            <button onClick={toggleValue}>{value ? 'Foo' : 'Bar'}</button>
        </span>
    );
};
