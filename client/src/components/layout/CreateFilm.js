import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addFilm } from "../../actions/film";
import FilmCard from "../film/FilmCard";
// Material-UI elements
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const CreateFilm = ({ createdCategories, addFilm }) => {
  const [formData, setFormData] = useState({
    name: "",
    coverURI: "",
    categories: [],
  });

  const { name, coverURI, categories } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addFilm(name, coverURI, categories);
  };

  const getCategoryById = (_id) => {
    return createdCategories.filter((ctg) => ctg._id === _id);
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 385,
    },
    chips: {
      display: "flex",
      whiteSpace: "none",
    },
    chip: {
      margin: 2,
    },
  }));

  const MenuProps = {
    PaperProps: {
      style: {
        width: 385,
      },
    },
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avater}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add new film
        </Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                type="name"
                label="Film name *"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
                error={name.length < 3}
                helperText={
                  name.length < 3 ? "Min. name lenght is 3 character!" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="coverURI"
                type="text"
                label="Cover URL *"
                name="coverURI"
                value={coverURI}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categories"
                  multiple
                  value={categories}
                  onChange={onChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip
                          className={classes.chip}
                          key={getCategoryById(value)[0]._id}
                          label={
                            getCategoryById(value)[0].symbol +
                            getCategoryById(value)[0].name
                          }
                          style={{
                            backgroundColor: getCategoryById(value)[0].bgColor,
                            color: getCategoryById(value)[0].fontColor,
                          }}
                        />
                      ))}
                    </div>
                  )}
                >
                  {createdCategories.map((ctg) => (
                    <MenuItem key={ctg._id} value={ctg._id}>
                      {ctg.symbol + ctg.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            // disabled={!isFieldsAreValid()}
            endIcon={<AddIcon />}
            onClick={(e) => onSubmit(e)}
          >
            Add new film
          </Button>
        </form>
      </div>
    </Container>
  );
};

CreateFilm.propTypes = {
  createdCategories: PropTypes.array.isRequired,
  addFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  createdCategories: state.category.categories,
});

export default connect(mapStateToProps, { addFilm })(CreateFilm);
