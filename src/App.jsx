import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import {CharactersPage} from "./CharactersPage";
import {ComicDetailsPage} from "./ComicDetailsPage";

class App extends React.Component{

  render() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/' component={CharactersPage}/>
                    <Route exact path='/comic/:id' component={ComicDetailsPage}/>
                </Switch>
            </Router>

        </div>
    );
  }
}


function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
