import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { store, rrfProps } from "./store";

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/episodes/AddEpisode";
import EditClient from "./components/episodes/EditEpisode";
import ClientDetails from "./components/episodes/EpisodeDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Settings from "./components/settings/Settings";
import "./App.css";

function App() {
  const selItem = {
    Title: "Truth and Bone",
    Doctor: "None",
    Series: "Paternoster Gang ",
    id: "paternoster3-3",
    Featuring: "Vastra, Strax",
    Number: "3.3",
    Released: "2020-05-05T05:00:00.000Z",
    SPath:
      "Audio Dramas/Doctor Who - Big Finish/Paternoster Gang/303 Truth and Bone",
    Chapters: [
      "01 - Truth and Bone 01.mp3",
      "02 - Truth and Bone 02.mp3",
      "03 - Truth and Bone 03.mp3",
      "04 - Truth and Bone 04.mp3",
      "05 - Truth and Bone 05.mp3",
      "06 - Truth and Bone 06.mp3",
      "07 - Truth and Bone 07.mp3",
      "08 - Truth and Bone 08.mp3",
      "09 - Truth and Bone 09.mp3",
      "10 - Truth and Bone Credits.mp3",
    ],
    Image: "https://www.bigfinish.com/image/release/1985/medium.jpg",
    bfUrl:
      "https://www.bigfinish.com/releases/v/the-paternoster-gang-heritage-3-1985",
  };
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
                  path="/episode/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/episode/edit/:id"
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path="/episode/:id"
                  component={UserIsAuthenticated(ClientDetails)}
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
