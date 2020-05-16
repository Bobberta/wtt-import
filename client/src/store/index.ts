import { createStore, compose } from "redux";
import { tracksReducer, RootState } from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, tracksReducer);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  let store = createStore<RootState & PersistPartial, any, any, any>(
    persistedReducer,
    composeEnhancers()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
