import React from 'react';
import Home from './home/Home';
import Details from './details/Details';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookShow from './bookshow/BookShow';
import Confirmation from './confirmation/Confirmation';

const Controller = () => {
    const baseUrl = "http://localhost:8085/api/v1/";
    return (
        <Router>
            <Route exact path="/" render={props => (
                <Home {...props} baseUrl={baseUrl} />
            )} />
            <Route path="/details/:id" render={props => (
                <Details {...props} baseUrl={baseUrl} />
            )} />
            <Route path="/bookshow/:id" render={props => (
                <BookShow {...props} baseUrl={baseUrl} />
            )} />
            <Route path="/confirm/:id" render={props => (
                <Confirmation {...props} baseUrl={baseUrl} />
            )} />
        </Router>
    )
}

export default Controller;