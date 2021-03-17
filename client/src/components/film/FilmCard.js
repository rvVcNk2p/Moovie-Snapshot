import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FilmChip from "./FilmChip";
import { connect } from "react-redux";
import {
  watchFilm,
  unWatchFilm,
  addFilmToList,
  deleteMyFilm,
} from "../../actions/myFilm";
import { selectFilm } from "../../actions/film";
import { Link } from "react-router-dom";
// Material-UI Card Elements
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
// Material-UI Icons
import QueueIcon from "@material-ui/icons/Queue";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import UpdateIcon from "@material-ui/icons/Update";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  content: {
    paddingLeft: "10px",
    paddingTop: "10px",
  },
  media: {
    width: "100px",
    height: "150px",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
  },
  infoBar: {
    margin: "5px",
    color: "white",
    background: "#43a047",
    padding: "5px",
    borderRadius: "10px",
    textAlign: "center",
    width: "70%",
  },
});

const FilmCard = ({
  myFilm: {
    _id: myFilmId,
    filmId: { coverURI, name, categories, _id },
    note,
  },
  myFilms,
  typeOfList,
  simpleCard,
  // Functions
  addFilmToList,
  watchFilm,
  unWatchFilm,
  deleteMyFilm,
  selectFilm,
  auth: { isAuthenticated, user },
}) => {
  const classes = useStyles();

  const alreadyAdded = (_id) => {
    let founded = { isAlreadySeen: false, isNeedItToWatch: false };
    myFilms.forEach((myFilm) => {
      if (_id === myFilm.filmId._id) {
        founded.isAlreadySeen = myFilm.isAlreadySeen;
        founded.isNeedItToWatch = myFilm.isNeedItToWatch;
      }
    });
    if (founded.isAlreadySeen)
      return <p className={classes.infoBar}>IN LIBRARY</p>;
    else if (founded.isNeedItToWatch)
      return (
        <p className={classes.infoBar} style={{ backgroundColor: "#ef6c00" }}>
          IN WATCHLIST
        </p>
      );
    else
      return (
        <Fragment>
          <Tooltip title="Add to Library" placement="right">
            <IconButton
              aria-label="add-to-library"
              onClick={(e) => {
                if (isAuthenticated) addFilmToList(_id, "library");
              }}
            >
              <AddToQueueIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to Watchlist" placement="right">
            <IconButton
              aria-label="add-to-watchlist"
              onClick={(e) => {
                if (isAuthenticated) addFilmToList(_id, "watchlist");
              }}
            >
              <QueueIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      );
  };

  const libraryCardAcions = (
    <Fragment>
      <Box component="div">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Tooltip title="Move to Watchlist" placement="right">
          <IconButton
            aria-label="unwatch-film"
            onClick={() => unWatchFilm(myFilmId)}
          >
            <UpdateIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Tooltip title="Delete from Library" placement="right">
        <IconButton aria-label="delete" onClick={() => deleteMyFilm(myFilmId)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );

  const wachlistCardAcions = (
    <Fragment>
      <Box component="div">
        <Tooltip title="Move to Library" placement="right">
          <IconButton
            aria-label="watch-film"
            onClick={() => watchFilm(myFilmId)}
          >
            <AddToQueueIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Tooltip title="Delete from Watchlist" placement="right">
        <IconButton aria-label="delete" onClick={() => deleteMyFilm(myFilmId)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );

  const filmsCardAcions = (
    <Fragment>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
      >
        {isAuthenticated ? alreadyAdded(_id) : ""}
        {user && user.isAdmin && (
          <Link to={`/edit-film/${_id}`}>
            <IconButton aria-label="edit" onClick={(e) => selectFilm(_id)}>
              <EditIcon />
            </IconButton>
          </Link>
        )}
      </Box>
    </Fragment>
  );

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={_id}>
      <Card>
        <Box component="div" display="flex" flexDirection="row">
          <CardMedia
            component="img"
            className={classes.media}
            image={
              coverURI ||
              "https://cdn.domestika.org/raw/upload/assets/projects/project-default-cover-1248c9d991d3ef88af5464656840f5534df2ae815032af0fdf39562fee08f0a6.svg"
            }
            title={name.toLowerCase().split(" ").join("-")}
          />
          <CardContent className={classes.content}>
            <Typography className={classes.title} component="h4">
              {name || "Film name"}
            </Typography>
            <Box component="div">
              {categories.map((category) => {
                return (
                  <FilmChip
                    category={category}
                    typeOfList={typeOfList}
                    key={category._id + _id}
                  />
                );
              })}
            </Box>
            <Box component="div">{/* {note !== null && note} */}</Box>
          </CardContent>
        </Box>
        {isAuthenticated && (
          <CardActions disableSpacing className={classes.actions}>
            {typeOfList === "library" ? libraryCardAcions : ""}
            {typeOfList === "watchlist" ? wachlistCardAcions : ""}
            {typeOfList === "films" ? filmsCardAcions : ""}
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

FilmCard.propTypes = {
  myFilm: PropTypes.object.isRequired,
  watchFilm: PropTypes.func.isRequired,
  typeOfList: PropTypes.string.isRequired,
  unWatchFilm: PropTypes.func.isRequired,
  deleteMyFilm: PropTypes.func.isRequired,
  selectFilm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  myFilms: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  myFilms: state.myFilm.myFilms,
});

export default connect(mapStateToProps, {
  addFilmToList,
  watchFilm,
  unWatchFilm,
  deleteMyFilm,
  selectFilm,
})(FilmCard);
