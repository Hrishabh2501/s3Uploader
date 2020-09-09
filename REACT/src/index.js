import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();