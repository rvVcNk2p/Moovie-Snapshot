import {
  GET_CATEGORIES,
  GET_CATEGORIES_ERROR,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/category");

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data.categories,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: GET_CATEGORIES_ERROR,
    });
  }
};

export const createCategory = (name, symbol, bgColor) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/category",
      { name, symbol, bgColor },
      config
    );

    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data.category,
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
      type: CREATE_CATEGORY_ERROR,
    });
  }
};

export const deleteCategory = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/category/${_id}`);

    dispatch({
      type: DELETE_CATEGORY,
      payload: _id,
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
      type: DELETE_CATEGORY_ERROR,
    });
  }
};

export const updateCategory = (_id, name, symbol, bgColor, fontColor) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `/api/category/${_id}`,
      { name, symbol, bgColor, fontColor },
      config
    );

    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data.category,
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
      type: UPDATE_CATEGORY_ERROR,
    });
  }
};
