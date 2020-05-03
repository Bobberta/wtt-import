import React from "react";
import Store from "./store";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = Store();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Dashboard />
      </PersistGate>
    </Provider>
  );
};

export default App;
