import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import { loadLecturersNameReducer } from "./reducers/loadPublicReducers";
import { openSearchReducer } from "./reducers/openSearchReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  lecturersInfo: loadLecturersNameReducer,
  searchModalVisible: openSearchReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
