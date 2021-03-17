import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../actions/category";
import FilmChip from "../film/FilmChip";
// Material-UI elements
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CategoryIcon from "@material-ui/icons/Category";
import CancelScheduleSendIcon from "@material-ui/icons/CancelScheduleSend";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const Caregory = ({
  createdCategories,
  createCategory,
  updateCategory,
  deleteCategory,
}) => {
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    symbol: "",
    bgColor: "",
    fontColor: "#fff",
  });

  const [editOrCreate, setEditOrCreate] = useState("create");

  const { _id, name, symbol, bgColor, fontColor } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editOrCreate === "create") {
      createCategory(name, symbol, bgColor, fontColor);
      setFormData({
        _id: null,
        name: "",
        symbol: "",
        bgColor: "",
        fontColor: "#fff",
      });
    } else if (editOrCreate === "edit") {
      updateCategory(_id, name, symbol, bgColor, fontColor);
    }
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
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avater}>
          <CategoryIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {editOrCreate === "create" ? "Add new category" : "Edit category"}
        </Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="name"
                label="Category name *"
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
                type="text"
                label="Symbol"
                name="symbol"
                value={symbol}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Color"
                name="bgColor"
                value={bgColor}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Font color"
                name="fontColor"
                value={fontColor}
                onChange={(e) => onChange(e)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box
            component="div"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            {editOrCreate === "edit" && (
              <Button
                type="submit"
                variant="contained"
                color="default"
                className={classes.submit}
                // disabled={!isFieldsAreValid()}
                endIcon={<CancelScheduleSendIcon />}
                onClick={(e) => {
                  setEditOrCreate("create");
                  setFormData({
                    name: "",
                    symbol: "",
                    bgColor: "",
                    fontColor: "#fff",
                  });
                }}
              >
                Cancel update
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth={editOrCreate === "create"}
              className={classes.submit}
              disabled={name.length < 3}
              endIcon={<AddIcon />}
              onClick={(e) => onSubmit(e)}
            >
              {editOrCreate === "create"
                ? "Add new category"
                : "Update category"}
            </Button>
          </Box>
        </form>
        <Box compoenent="div">
          <Box component="h1" style={{ textAlign: "center" }}>
            PREVIEW
          </Box>
          <FilmChip
            typeOfList="preview"
            category={{ name, bgColor, fontColor, symbol }}
          />
        </Box>
        <Box component="div" style={{ marginBottom: "50px" }}>
          <Box component="h1" textAlign="center">
            {" "}
            CATEGORIES{" "}
          </Box>
          <Box component="div">
            {createdCategories
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((ctg) => (
                <Box
                  style={{ margin: 5 }}
                  key={ctg._id}
                  component="div"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  [
                  <DeleteForeverIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const confirm = window.confirm(
                        `Are you sure? This action will delete the selected category. FOREVER. This is not a joke. Selected category: ${ctg.symbol} ${ctg.name}`
                      );
                      if (confirm) deleteCategory(ctg._id);
                    }}
                  />
                  ] [
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setEditOrCreate("edit");
                      setFormData(ctg);
                    }}
                  />
                  <span style={{ marginRight: "10px" }}>] </span>
                  <FilmChip
                    typeOfList="preview"
                    category={{
                      _id: ctg._id,
                      name: ctg.name,
                      bgColor: ctg.bgColor,
                      fontColor: ctg.fontColor,
                      symbol: ctg.symbol,
                    }}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </div>
    </Container>
  );
};

Caregory.propTypes = {
  createdCategories: PropTypes.array.isRequired,
  createCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  createdCategories: state.category.categories,
});

export default connect(mapStateToProps, {
  createCategory,
  updateCategory,
  deleteCategory,
})(Caregory);
