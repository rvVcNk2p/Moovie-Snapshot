import {
  GET_CATEGORIES,
  GET_CATEGORIES_ERROR,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
} from "../actions/types";

const initialState = {
  categories: [],
  loading: true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...payload],
        loading: false,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((ctg) => {
          if (ctg._id === payload._id) return payload;
          else return ctg;
        }),
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((ctg) => ctg._id !== payload),
        loading: false,
      };
    case GET_CATEGORIES_ERROR:
    case CREATE_CATEGORY_ERROR:
    case DELETE_CATEGORY_ERROR:
    case UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
