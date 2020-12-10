import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, { useEffect, } from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Provider, useSelector } from 'react-redux'
import store from './store';
import ViewCurations from './pages/ViewCurations';
import SingleCurationPage from "./pages/SingleCurationPage";
import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import MovieGeneration from './pages/MovieGeneration';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { loadUser } from "actions/authActions";
import LandingPage from "pages/LandingPage";

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  const authentication = () => {
    if (store.getState().auth.isAuthenticated) {
      return true
    };
    return false;

  }
  // return <AnimationRevealPage disabled></AnimationRevealPage>;
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/Generate">
            <MovieGeneration />
          </Route>
          <Route path="/myGenerations">
            {(authentication) ? <ViewCurations /> : <Redirect to='/' />}
          </Route>
          <Route path="/previous/curations/specific">
            {(authentication) ? <SingleCurationPage /> : <Redirect to="/" />}

          </Route>
        </Switch>

      </Router>
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
