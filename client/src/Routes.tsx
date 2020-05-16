import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import React from "react";
import Dashboard from "./components/Dashboard";
import Playlists from "./components/Playlists";
import Home from "./components/Home";
import Header from "./components/Header";

const { Content } = AntLayout;

const Routes: React.FC = () => {
  return (
    <AntLayout style={{ height: "100vh" }}>
      <Router>
        <Header />
        <Content style={{ height: "100%" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              margin: "40px",
            }}
          >
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/playlists" component={Playlists} />
              <Route path="/import" component={Dashboard} />
            </Switch>
          </div>
        </Content>
      </Router>
    </AntLayout>
  );
};

export default Routes;
