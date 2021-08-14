import React from 'react';
import {ErrorComponentProps} from "./ErrorComponentProps";

declare type ErrorBoundaryState = { hasError: boolean, message: string };

export default class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    constructor(props: ErrorComponentProps) {
        super(props);
        this.state = {
            hasError: false,
            message: '',
        }
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error('Error rendering components:', error);
        this.setState({ message: error.message });
    }

    render() {
        if (this.state.hasError) {
            return (
                <section id={'error-handler'}>
                    <h2>Whoops! Crashed and burned...</h2>
                    <p>{this.state.message}</p>
                </section>
            );
        } else return this.props.children;
    }
}