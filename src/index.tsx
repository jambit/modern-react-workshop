import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'typeface-open-sans';

// Using default export:
const DynamicApp = React.lazy(() => import('./components/App/App'));
// Using named export:
// const DynamicApp = React.lazy(() =>
//     import('./components/App/App').then(({ App }) => ({ default: App }))
// );

ReactDOM.render(
    <Suspense fallback={<div>loading..</div>}>
        <DynamicApp />
    </Suspense>,
    document.getElementById('app')
);
