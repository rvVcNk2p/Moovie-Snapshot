import {
  GET_MY_FILMS,
  GET_MY_FILMS_ERROR,
  CREATE_MY_FILM,
  CREATE_MY_FILM_ERROR,
  WATCH_FILM,
  WATCH_FILM_ERROR,
  UNWATCH_FILM,
  UNWATCH_FILM_ERROR,
  DELETE_MY_FILM,
  DELETE_MY_FILM_ERROR,
  SEARCH_MY_FILMS,
} from "../actions/types";

const initialState = {
  myFilms: [],
  filteredMyFilms: [],
  searchingTerm: "",
  loading: true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_FILMS:
      return {
        ...state,
        myFilms: [...payload],
        loading: false,
      };
    case CREATE_MY_FILM:
      return {
        ...state,
        myFilms: [...state.myFilms, payload],
        loading: false,
      };
    case WATCH_FILM:
    case UNWATCH_FILM:
      return {
        ...state,
        myFilms: state.myFilms.map((myfilm) => {
          if (myfilm._id === payload._id) {
            return payload;
          } else return myfilm;
        }),
        loading: false,
      };
    case DELETE_MY_FILM:
      return {
        ...state,
        myFilms: state.myFilms.filter((myfilm) => myfilm._id !== payload),
        loading: false,
      };
    case SEARCH_MY_FILMS:
      return {
        ...state,
        filteredMyFilms: state.myFilms.filter((myfilm) => {
          const isName = myfilm.filmId.name
            .toLowerCase()
            .includes(payload.toLowerCase());

          let isCategory = false;
          myfilm.filmId.categories.forEach((ctg) => {
            if (ctg.name.toLowerCase().includes(payload.toLowerCase()))
              isCategory = true;
          });
          if (isName || isCategory) return myfilm;
        }),
        searchingTerm: payload,
      };
    case GET_MY_FILMS_ERROR:
    case DELETE_MY_FILM_ERROR:
      return {
        ...state,
        myFilms: [],
        loading: false,
      };
    case CREATE_MY_FILM_ERROR:
    case WATCH_FILM_ERROR:
    case UNWATCH_FILM_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
