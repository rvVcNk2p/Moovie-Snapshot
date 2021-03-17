import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FilmCards from "../film/FilmCards";
import SearchFilms from "./SearchFilms";
import { getMyFilms } from "../../actions/myFilm";

import Box from "@material-ui/core/Box";

const Watchlist = ({
  myFilm: { myFilms, filteredMyFilms, searchingTerm },
  getMyFilms,
}) => {
  useEffect(() => {
    getMyFilms();
  }, [getMyFilms]);

  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h1>Watchlist</h1>
        <SearchFilms location="watchlist" />
      </Box>

      <FilmCards
        films={searchingTerm.length > 0 ? filteredMyFilms : myFilms}
        typeOfList={"watchlist"}
      />
    </Fragment>
  );
};

Watchlist.propTypes = {
  myFilm: PropTypes.object.isRequired,
  getMyFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myFilm: state.myFilm,
});

export default connect(mapStateToProps, { getMyFilms })(Watchlist);
