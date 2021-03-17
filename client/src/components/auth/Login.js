import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";
// Material-UI elements
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

const Login = ({ setAlert, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const emailValidation = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) return true;
    else return false;
  };

  const isFieldsAreValid = () => {
    return emailValidation() && password.length >= 6;
  };

  // Material UI CSS
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/library" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avater}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                type="email"
                label="Email *"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
                error={emailValidation() ? false : true}
                helperText={!emailValidation() ? "Email is not valid!" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                type="password"
                label="Password *"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
                error={password.length < 6}
                helperText={
                  password.length < 6
                    ? "Min. password lenght is 6 character!"
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            disabled={!isFieldsAreValid()}
            endIcon={<Icon>send</Icon>}
            onClick={(e) => onSubmit(e)}
          >
            Sign in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                to="/register"
                className={"MuiTypography-colorPrimary"}
                style={{ textDecoration: "none" }}
              >
                Do you need an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link
            to="https://www.moovie.io/"
            target="_blank"
            className={"MuiTypography-colorInherit"}
            style={{ textDecoration: "none" }}
          >
            Moovie.io
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
