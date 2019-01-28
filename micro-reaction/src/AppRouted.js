import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import { About } from './pages';


class AppRouted extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/about" component={About}/>
            </div>
        );
    }
}

export default AppRouted;