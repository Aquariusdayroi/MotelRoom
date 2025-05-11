import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./authToken";

const root = ReactDOM.createRoot(document.getElementById("root"));
const observerErr = window.console.error;
window.console.error = (...args) => {
    if (
        args[0]?.includes?.(
            "ResizeObserver loop completed with undelivered notifications"
        )
    ) {
        return;
    }
    observerErr(...args);
};
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
