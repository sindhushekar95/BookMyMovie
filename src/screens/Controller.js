import React from 'react';
import Home from './home/Home';
import Details from './details/Details';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Controller = () => {
    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/details/:id" component={Details} />
        </Router>
    )
}

export default Controller;