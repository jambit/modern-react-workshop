import React, { useCallback, useMemo } from 'react';
import { useInput } from '../../hooks/useInput';

export const Memoization = () => {
    const [a, onChangeA] = useInput('0');
    const [b, onChangeB] = useInput('0');
    const sum = useMemo(() => parseFloat(a) + parseFloat(b), [a, b]);
    const onClick = useCallback(() => {
        alert(`Value: ${sum}`);
    }, [sum]);

    return (
        <div>
            <input onChange={onChangeA} value={a} />
            +
            <input onChange={onChangeB} value={b} />
            {`= ${sum}`}
            <button onClick={onClick}>Send</button>
        </div>
    );
};
