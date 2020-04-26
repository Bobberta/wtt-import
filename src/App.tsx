import React from "react";
import store from "./store";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;
