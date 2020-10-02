import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { store, rrfProps } from "./store";

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import MigrateEpisode from "./components/episodes/MigrateEpisode";
import AddEpisode from "./components/episodes/AddEpisode";
import EditEpisode from "./components/episodes/EditEpisode";
import EpisodeDetails from "./components/episodes/EpisodeDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Settings from "./components/settings/Settings";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/episode/migrate"
                  component={UserIsAuthenticated(MigrateEpisode)}
                />
                <Route
                  exact
                  path="/episode/add"
                  component={UserIsAuthenticated(AddEpisode)}
                />
                <Route
                  exact
                  path="/episode/edit/:id"
                  component={UserIsAuthenticated(EditEpisode)}
                />
                <Route
                  exact
                  path="/episode/:id"
                  component={UserIsAuthenticated(EpisodeDetails)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
