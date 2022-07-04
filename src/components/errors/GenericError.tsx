import React from 'react';
import type { ErrorBoundaryFallbackProps } from '../ErrorBoundary';

import './GenericError.scss';

export const GenericError = ({ retry }: ErrorBoundaryFallbackProps) => (
    <div className="generic-error">
        <p>Failed rendering this component</p>
        <button onClick={retry}>Retry</button>
    </div>
);
