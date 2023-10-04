import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./app/assets/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={Theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);
