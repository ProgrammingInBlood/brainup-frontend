import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { authReducer } from "./reducers/Authentication";
import { userReducer } from "./reducers/User";

const persistConfig = {
  key: "root",
  storage: storage,
  rehydrate: true,
};

const rootReducer = combineReducers({
  authentication: persistReducer(persistConfig, authReducer),
  user: userReducer,
});

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
