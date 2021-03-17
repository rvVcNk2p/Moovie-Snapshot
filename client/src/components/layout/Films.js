import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FilmCards from "../film/FilmCards";
import SearchFilms from "./SearchFilms";
import { getFilms } from "../../actions/film";
// Material-UI Elements
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { getMyFilms } from "../../actions/myFilm";

const Films = ({
  film: { films, filteredFilms, searchingTerm },
  getFilms,
  getMyFilms,
  auth: { isAuthenticated, user },
}) => {
  useEffect(() => {
    getMyFilms();
    getFilms();
  }, [getMyFilms, getFilms]);

  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h1>Films</h1>
        <SearchFilms location="films" />
        {isAuthenticated && user && user.isAdmin && (
          <Link to="/create-film" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#43a047", color: "white" }}
              endIcon={<AddIcon />}
            >
              New film
            </Button>
          </Link>
        )}
      </Box>
      <FilmCards
        films={searchingTerm.length > 0 ? filteredFilms : films}
        typeOfList={"films"}
      />
    </Fragment>
  );
};

Films.propTypes = {
  getFilms: PropTypes.func.isRequired,
  filteredFilms: PropTypes.array,
  auth: PropTypes.object.isRequired,
  searchingTerm: PropTypes.string,
  getMyFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getFilms,
  getMyFilms,
})(Films);
