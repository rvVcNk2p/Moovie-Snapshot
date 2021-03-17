import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { getCategories } from "../../actions/category";
// Material-UI elements
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Material-UI Icons
import PublicIcon from "@material-ui/icons/Public";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import TheatersIcon from "@material-ui/icons/Theaters";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import CategoryIcon from "@material-ui/icons/Category";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  itemName: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const NavBar = ({
  auth: { loading, isAuthenticated, user },
  logout,
  getCategories,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const classes = useStyles();

  const authLinks = (
    <Fragment>
      <Link to="/library" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<MovieFilterIcon style={{ color: "white" }} />}
        >
          <span className={classes.itemName}>Library</span>
        </Button>
      </Link>
      <Link to="/watchlist" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<TheatersIcon style={{ color: "white" }} />}
        >
          <span className={classes.itemName}>Watchlist</span>
        </Button>
      </Link>
      <Link to="/films" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<PublicIcon style={{ color: "white" }} />}
        >
          <span className={classes.itemName}>Films</span>
        </Button>
      </Link>

      {user && user.isAdmin && (
        <Link to="/create-category" style={{ textDecoration: "none" }}>
          <Button
            style={{ color: "white" }}
            size="small"
            startIcon={<CategoryIcon style={{ color: "white" }} />}
          >
            <span className={classes.itemName}>Categories</span>
          </Button>
        </Link>
      )}

      <Link to="/films" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<ExitToAppIcon style={{ color: "white" }} />}
          onClick={logout}
        >
          <span className={classes.itemName}>Logout</span>
        </Button>
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/films" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<PublicIcon style={{ color: "white" }} />}
        >
          <span className={classes.itemName}>Films</span>
        </Button>
      </Link>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<AccountCircleOutlinedIcon style={{ color: "white" }} />}
        >
          <span className={classes.itemName}>Sign up</span>
        </Button>
      </Link>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<MeetingRoomIcon style={{ color: "white" }} />}
        >
          <span className={classes.itemName}>Sign in</span>
        </Button>
      </Link>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Moovie.io
          </Typography>
          {!loading && isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout, getCategories })(NavBar);
