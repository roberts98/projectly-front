import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./style/index.css";
import "./style/satoshi.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(<App />);
