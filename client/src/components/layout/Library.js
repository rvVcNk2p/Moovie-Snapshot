import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FilmCards from "../film/FilmCards";
import SearchFilms from "./SearchFilms";
import { getMyFilms } from "../../actions/myFilm";

import Box from "@material-ui/core/Box";

const Library = ({
  myFilm: { myFilms, filteredMyFilms, searchingTerm, loading },
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
        <h1>My Library</h1>
        <SearchFilms location="library" />
      </Box>
      {!loading && (
        <FilmCards
          films={searchingTerm.length > 0 ? filteredMyFilms : myFilms}
          typeOfList={"library"}
        />
      )}
    </Fragment>
  );
};

Library.propTypes = {
  myFilm: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  myFilm: state.myFilm,
});

export default connect(mapStateToProps, {
  getMyFilms,
})(Library);
