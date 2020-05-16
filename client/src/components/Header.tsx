import { Layout as AntLayout, Menu } from "antd";
import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const AntHeader = AntLayout.Header;

const Header: React.FC = () => {
  return (
    <AntHeader
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong>[WTT import]</strong>
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="1">
          <NavLink to="/import">
            <PlusCircleOutlined /> Nouvelle playlist
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/playlists">Playlists</NavLink>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
