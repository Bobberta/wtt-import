import React from "react";
import Store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Routes from "./Routes";

const { store, persistor } = Store();
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
