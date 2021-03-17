import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import AlertLayout from "./components/layout/AlertLayout";
import Films from "./components/layout/Films";
import Library from "./components/layout/Library";
import Watchlist from "./components/layout/Watchlist";
import CreateFilm from "./components/layout/CreateFilm";
import EditFilm from "./components/layout/EditFilm";
import Category from "./components/layout/Category";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// Material-UI elements
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Container className="App">
          <CssBaseline />
          <section className="container">
            <AlertLayout />
            <Switch>
              <Route exact path="/" component={Films} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/films" component={Films} />
              // TODO - Make it Private Route
              <Route exact path="/library" component={Library} />
              <Route exact path="/watchlist" component={Watchlist} />
              <Route exact path="/create-film" component={CreateFilm} />
              <Route exact path="/edit-film/:id" component={EditFilm} />
              <Route exact path="/create-category" component={Category} />
            </Switch>
          </section>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
