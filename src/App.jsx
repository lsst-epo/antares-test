import React, { Component } from 'react';
import reactn from 'reactn';
import { hot } from 'react-hot-loader/root';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import ScrollToTop from './components/site/ScrollToTop';
import SiteHeader from './components/site/SiteHeader';
import StyleGuide from './StyleGuide';
import Questions from './Questions';
import Example from './Example';
import Big from './Big';
import NoMatch from './components/site/NoMatch';

@reactn
class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <SiteHeader />
          <main className="container-main">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Example {...props} greeting="This is an example Homepage" />
                )}
              />
              <Route exact path="/styles" component={StyleGuide} />
              <Route exact path="/questions" component={Questions} />
              <Route exact path="/big" component={Big} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </ScrollToTop>
      </Router>
    );
  }
}

export default hot(App);
