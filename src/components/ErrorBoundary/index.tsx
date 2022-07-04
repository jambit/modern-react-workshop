import React, {
    Component,
    ComponentType,
    PropsWithChildren,
    ErrorInfo,
} from 'react';
import { GenericError } from '../errors/GenericError';

export interface ErrorBoundaryFallbackProps {
    retry: () => void;
}

export interface RenderComponentProps {
    render: () => JSX.Element;
}

const RenderComponent = (props: RenderComponentProps) => props.render();

export interface ErrorBoundaryProps extends RenderComponentProps {
    fallback: (props: ErrorBoundaryFallbackProps) => JSX.Element;
}

export interface State {
    hasError: boolean;
}

/**
 * An error boundary. Use it to wrap parts of your components.
 * Consider using withErrorBoundary to wrap your entire component.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    static defaultProps: Partial<ErrorBoundaryProps> = {
        fallback: GenericError,
    };

    public constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error(`Error in component: ${info.componentStack}`, error);
    }

    render() {
        if (this.state.hasError) {
            const Fallback = this.props.fallback;
            return <Fallback retry={this.retry} />;
        }
        return <RenderComponent render={this.props.render} />;
    }

    retry = () => {
        this.setState({ hasError: false });
    };
}

/**
 * A Higher Order Component, which you can use to wrap your component in an error-boundary.
 *
 * @param Original The component to render
 * @param fallback The component to render if rendering the original failed.
 * @see TodoListEntry
 */
export function withErrorBoundary<T>(
    Original: ComponentType<T>,
    fallback?: (props: ErrorBoundaryFallbackProps) => JSX.Element
) {
    const Wrapped: React.FunctionComponent<T> = (props) => (
        <ErrorBoundary
            fallback={fallback}
            render={() => <Original {...props} />}
        />
    );

    const name = Original.displayName || Original.name;
    Wrapped.displayName = name
        ? `WithErrorBoundary(${name})`
        : 'WithErrorBoundary';

    return Wrapped;
}
