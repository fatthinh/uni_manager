import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import {
  loadCouncilsNameReducer,
  loadLecturersNameReducer,
  loadStudentsNameReducer,
} from "./reducers/loadPublicReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  studentsInfo: loadStudentsNameReducer,
  lecturersInfo: loadLecturersNameReducer,
  councilsInfo: loadCouncilsNameReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
