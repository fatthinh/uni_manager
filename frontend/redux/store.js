import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import { loadLecturersNameReducer } from "./reducers/loadPublicReducers";
import { removeReducer, searchReducer } from "./reducers/modalReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  lecturersInfo: loadLecturersNameReducer,
  searchModal: searchReducer,
  removeModal: removeReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
