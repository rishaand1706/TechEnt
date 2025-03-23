import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Make sure this file exists
import StudyPlanner from "./StudyPlanner";

console.log("React is rendering...");

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <StudyPlanner />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
