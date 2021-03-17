import {
  GET_FILMS,
  CREATE_FILM,
  GET_FILMS_ERROR,
  CREATE_FILM_ERROR,
  UPDATE_FILM,
  UPDATE_FILM_ERROR,
  SELECT_FILM,
  DESELECT_FILM,
  SEARCH_FILMS,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getFilms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/films");

    dispatch({
      type: GET_FILMS,
      payload: res.data.films,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: GET_FILMS_ERROR,
    });
  }
};

export const addFilm = (name, coverURI, categories) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/films",
      { name, coverURI, categories },
      config
    );

    console.log(res.data);

    dispatch({
      type: CREATE_FILM,
      payload: res.data.newlyCreatedFilm,
    });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: CREATE_FILM_ERROR,
    });
  }
};

export const updateFilm = (_id, name, coverURI, categories) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/films/${_id}`,
      { name, coverURI, categories },
      config
    );

    dispatch({
      type: UPDATE_FILM,
      payload: res.data.film,
    });
    dispatch(setAlert(res.data.msg, "success"));
    dispatch({ type: DESELECT_FILM });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({ type: UPDATE_FILM_ERROR });
    dispatch({ type: DESELECT_FILM });
  }
};

export const selectFilm = (_id) => async (dispatch) => {
  dispatch({
    type: SELECT_FILM,
    payload: _id,
  });
};

export const searchInFilms = (inputText) => (dispatch) => {
  dispatch({
    type: SEARCH_FILMS,
    payload: inputText,
  });
};
