import i18n from "i18next";
import enLocale from "./en";
import esLocale from "./chiness";
import { initReactI18next } from "react-i18next";
// import { getLocalStorage as GetLocalStorage } from "../store/localStorage";

const resources = {
  en: {
    translation: {
      ...enLocale
    }
  },
  es: {
    translation: {
      ...esLocale
    }
  }
};

// const language = GetLocalStorage("language");

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  resources,
  interpolation: {
    escapeValue: false 
  },
});

export default i18n;
