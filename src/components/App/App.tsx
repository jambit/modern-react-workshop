import React from 'react';
import { Stateful } from '../Stateful/Stateful';
import { NotRedux } from '../NotRedux/NotRedux';
import { Contextual, MyContext } from '../Contextual/Contextual';
import { Memoization } from '../Memoization/Memoization';
import { Reference } from '../Reference/Reference';

export const App = () => (
    <div>
        <Stateful />
        <NotRedux />
        <MyContext.Provider value="someOtherValue">
            <Contextual />
        </MyContext.Provider>
        <Memoization />
        <Reference />
    </div>
);
