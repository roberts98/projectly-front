import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./translation/en/translation.json";
import translationPL from "./translation/pl/translation.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pl",
    supportedLngs: ["en", "pl"],
    cleanCode: true,
    resources: {
      en: {
        translation: translationEN,
      },
      pl: {
        translation: translationPL,
      },
    },
  });
