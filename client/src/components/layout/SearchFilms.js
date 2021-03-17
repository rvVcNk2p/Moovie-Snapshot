import React, { useState, useEffect } from "react";
import { searchInFilms } from "../../actions/film";
import { searchInMyFilms } from "../../actions/myFilm";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
// Material-UI Elements
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import BackspaceIcon from "@material-ui/icons/Backspace";

const SearchFilms = ({
  location,
  searchInFilms,
  searchInMyFilms,
  myFilmSearchingTerm,
  filmSearchingTerm,
}) => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (location === "films") searchInFilms(inputText);
    else if (location === "watchlist" || location === "library")
      searchInMyFilms(inputText);
  }, [inputText]);
  useEffect(() => {
    setInputText(myFilmSearchingTerm);
  }, [myFilmSearchingTerm]);
  useEffect(() => {
    setInputText(filmSearchingTerm);
  }, [filmSearchingTerm]);

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      setInputText("");
      searchInFilms("");
      searchInMyFilms("");
    });
  }, [history]);

  const useStyles = makeStyles((theme) => ({
    searchInput: {
      width: 175,
      [theme.breakpoints.up("sm")]: {
        width: 300,
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.searchInput} style={{ position: "relative" }}>
      <TextField
        variant="outlined"
        placeholder="Search for anything"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        fullWidth
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {inputText.length > 0 ? (
        <span
          style={{
            position: "absolute",
            top: ".45rem",
            right: ".4rem",
            cursor: "pointer",
          }}
          onClick={(e) => {
            setInputText("");
          }}
        >
          <BackspaceIcon />
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  myFilmSearchingTerm: state.myFilm.searchingTerm,
  filmSearchingTerm: state.film.searchingTerm,
});

export default connect(mapStateToProps, { searchInFilms, searchInMyFilms })(
  SearchFilms
);
