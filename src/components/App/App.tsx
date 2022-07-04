import React from 'react';
import './App.scss';
import data from '../../data.yml';
import kitten from '../../kitten.jpg';

const typedData: { list: string[] } = data;

export const App = () => (
    <div className="app-container">
        <h1>Hello World</h1>
        <ul>
            {typedData.list.map((s) => (
                <li key={s}>{s}</li>
            ))}
        </ul>
        <img src={kitten} alt="Sooo Cute!" />
    </div>
);

// We need a default export for React.lazy.
// For an alternative without default export, see src/index.tsx
export default App;
