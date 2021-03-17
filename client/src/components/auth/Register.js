import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
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

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords are do not match.", "error");
    } else {
      register({ name, email, password });
    }
  };

  const emailValidation = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) return true;
    else return false;
  };

  const isFieldsAreValid = () => {
    return (
      emailValidation() &&
      name.length > 0 &&
      password.length >= 6 &&
      password2.length >= 6
    );
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
          Sign up
        </Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name *"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
                autoFocus
                error={name.length === 0}
                helperText={name.length === 0 ? "Empty field!" : ""}
              />
            </Grid>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                id="password2"
                type="password"
                label="Password Again *"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
                error={password2.length < 6}
                helperText={
                  password2.length < 6
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
            Sign up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                to="/login"
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
