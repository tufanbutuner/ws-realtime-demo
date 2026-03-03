import { SaltProviderNext } from "@salt-ds/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SaltProviderNext accent="teal" corner="rounded">
      <App />
    </SaltProviderNext>
  </StrictMode>,
);
