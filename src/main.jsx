import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
// Keep previously shared /#/page links, including ?admin, usable.
let migrated = false;
if (/^#\/(?!\/)/.test(window.location.hash)) {
  const legacy = new URL(window.location.hash.slice(1), window.location.origin);
  if (legacy.origin === window.location.origin) {
    const query = new URLSearchParams(window.location.search);
    legacy.searchParams.forEach((value, key) => query.set(key, value));
    history.replaceState(
      null,
      "",
      legacy.pathname + (query.size ? `?${query}` : "") + legacy.hash,
    );
    migrated = true;
  }
}
const root = document.getElementById("root");
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
if (root.hasChildNodes() && !migrated) hydrateRoot(root, app);
else createRoot(root).render(app);
