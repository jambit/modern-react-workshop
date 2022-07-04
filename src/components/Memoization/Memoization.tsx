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
            <h1 role="heading">Calculator</h1>
            <input
                onChange={onChangeA}
                value={a}
                placeholder="First Operand"
            />{' '}
            +
            <input
                onChange={onChangeB}
                value={b}
                placeholder="Second Operand"
            />{' '}
            =<span data-testid="sum">{sum}</span>
            <button onClick={onClick}>Send</button>
        </div>
    );
};
