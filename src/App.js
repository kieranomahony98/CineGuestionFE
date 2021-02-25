import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, { useEffect, } from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Provider } from "react-redux"
import { store, persistor } from "./store";
import ViewCurations from "./pages/ViewCurations";
import MovieGeneration from "./pages/MovieGeneration";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { loadUser } from "actions/authActions";
import LandingPage from "pages/LandingPage";
import WeeklyPlaylist from "pages/weeklyPlaylists";
import { PersistGate } from "redux-persist/integration/react";
import { DiscussionPage } from "pages/DiscussionPage";
import { DiscussionLandingPage } from "pages/DiscussionLadingPage";
import CreateMovieAdvertisment from "pages/CreateMovieAdvertisment";
import ViewMovieAdvertisments from "pages/ViewMovieAdvertisments";
import ViewMovieAdvertismentsForUser from "pages/ViewMovieAdvertismentsForSIngleUser";
export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/Generate">
              <MovieGeneration />
            </Route>
            <Route exact path="/myGenerations">
              <ViewCurations />
            </Route>
            <Route exact path="/playlists/:type" >
              <WeeklyPlaylist />
            </Route>
            <Route exact path="/playlists/trending/now" >
              <WeeklyPlaylist />
            </Route>
            <Route exact path="/movies/discussions">
              <DiscussionLandingPage />
            </Route>
            <Route exact path="/movies/discussions/:movieId">
              <DiscussionPage />
            </Route>
            <Route exact path="/movies/indie/create">
              <CreateMovieAdvertisment />
            </Route>
            <Route exact path="/movies/indie/get/all">
              <ViewMovieAdvertisments />
            </Route>
            <Route exact path="/movies/indie/get/user/:userId">
              <ViewMovieAdvertismentsForUser />
            </Route>
            <Route exact path="/movies/indie/edit/user/:movieId">
              <CreateMovieAdvertisment />
            </Route>

          </Switch>

        </Router>
      </PersistGate>
    </Provider>

  );
}

