import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./languages";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
