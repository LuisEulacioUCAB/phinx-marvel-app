import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { CharactersPage } from '../CharactersPage';
import { ComicDetailsPage } from '../ComicDetailsPage';
import { MarvelFavoritePage} from '../MarvelFavoritePage';
import { history } from '../shared/history';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={CharactersPage} />
            <Route exact path="/comic/:id" component={ComicDetailsPage} />
            <Route exact path="/favorite" component={MarvelFavoritePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

/**
 * @param state
 */
function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
