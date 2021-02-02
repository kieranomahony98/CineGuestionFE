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

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  let isAuthenticated = () => {
    if (store.getState().auth.token) return true;
    return false;
  };

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
              {isAuthenticated() ? <ViewCurations /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/playlists/:type" >
              {isAuthenticated() ? <WeeklyPlaylist /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/movies/discussions">
              <DiscussionLandingPage />
            </Route>
            <Route exact path="/movies/discussions/:movieId">
              <DiscussionPage />
            </Route>
          </Switch>

        </Router>
      </PersistGate>
    </Provider>

  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
