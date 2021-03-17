import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { searchInFilms } from "../../actions/film";
import { searchInMyFilms } from "../../actions/myFilm";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import "./FilmChip.css";

const FilmChip = ({
  category: { _id, symbol, name, bgColor, fontColor },
  typeOfList,
  searchInFilms,
  searchInMyFilms,
}) => {
  const setSearchField = (name) => {
    if (typeOfList === "films") searchInFilms(name);
    else if (typeOfList === "watchlist" || typeOfList === "library")
      searchInMyFilms(name);
  };
  return (
    <>
      <Chip
        avatar={
          <Avatar
            style={{
              paddingLeft: "4px",
              fontSize: typeOfList === "preview" ? "0.75rem" : "1rem",
              height: 24,
              backgroundColor: bgColor,
            }}
          >
            {symbol}
          </Avatar>
        }
        style={{
          backgroundColor: bgColor,
          color: fontColor,
          height: 24,
          fontSize: typeOfList === "preview" ? "" : ".6rem",
          marginRight: 4,
          marginBottom: 4,
        }}
        label={name || "Category name"}
        clickable
        onClick={(e) => setSearchField(name)}
      />
    </>
  );
};

FilmChip.propTypes = {
  category: PropTypes.object.isRequired,
  typeOfList: PropTypes.string,
  searchInMyFilms: PropTypes.func.isRequired,
  searchInFilms: PropTypes.func.isRequired,
};

export default connect(null, { searchInFilms, searchInMyFilms })(FilmChip);
