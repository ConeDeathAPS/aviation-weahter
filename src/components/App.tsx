import React from 'react';
import HomeComponent from "./Home/Home";
import HomeProps from "./Home/HomeProps";

export default class App extends React.Component<HomeProps> {
    render() {
        return <HomeComponent message={this.props.message}/>
    }
}