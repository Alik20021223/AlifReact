import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<<< HEAD:src/main.tsx
import "./index.css";
import App from "./App.js";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals.js";
import {store} from './store/index.ts'
========
import App from "./App";
import { Provider } from "react-redux";
>>>>>>>> 79e0692eb0b3b8bfb46d6361dd3d4e8fb1fc9ab5:src/index.tsx

import store from './store'
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

