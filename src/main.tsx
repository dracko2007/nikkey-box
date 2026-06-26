import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { migrateLocalStorage } from "./utils/migrate";
import { isChunkLoadError, recoverFromChunkError } from "./utils/recoverFromChunkError";

migrateLocalStorage();

window.addEventListener("unhandledrejection", (event) => {
  const msg = event.reason?.message || String(event.reason || "");
  if (isChunkLoadError(msg)) {
    event.preventDefault();
    void recoverFromChunkError();
  }
});

window.addEventListener("error", (event) => {
  const msg = event.message || String((event as ErrorEvent).error || "");
  if (isChunkLoadError(msg)) {
    void recoverFromChunkError();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
