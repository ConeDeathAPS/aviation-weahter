import React from 'react';
import HomeProps from "./HomeProps";

export default class HomeComponent extends React.Component<HomeProps> {
    render() {
        return <h1>The component is here with a message: {this.props.message}!</h1>;
    }
}