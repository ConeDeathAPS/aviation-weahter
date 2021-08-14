import React from 'react';
import HomeComponent from "./Home/Home";
import HomeProps from "./Home/HomeProps";
import ErrorBoundary from "./Error/Error";

export default class App extends React.Component<HomeProps> {
    render() {
        return (
            <ErrorBoundary>
                <HomeComponent message={this.props.message}/>
            </ErrorBoundary>
        );
    }
}