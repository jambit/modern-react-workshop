import 'redux-dynamic-modules-react';

// fix is not merged yet: https://github.com/microsoft/redux-dynamic-modules/pull/192
declare module 'redux-dynamic-modules-react' {
    export interface IDynamicModuleLoaderProps {
        /** Explicitly name children as a prop to work with @types/react@18 */
        children: React.ReactNode;
    }
}
