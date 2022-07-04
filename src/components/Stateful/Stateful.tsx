import React from 'react';

export const Stateful = () => {
    const name = 'Marry';
    const surname = 'Poppins';
    return (
        <div>
            <h2>Show block</h2>
            <div>
                <input value={name} />
                <input value={surname} />
            </div>
        </div>
    );
};
