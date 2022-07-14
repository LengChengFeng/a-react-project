import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./mock";
import "normalize.css";
import "antd/dist/antd.min.css";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
