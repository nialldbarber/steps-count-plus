import i18n from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
//import * as RNLocalize from "react-native-localize";
import en from "@/translations/en.json";
import es from "@/translations/es.json";
import lv from "@/translations/lv.json";

//const currentLocale = RNLocalize.getLocales()[0].languageCode;

const resources = {
  en: { translation: en },
  es: { translation: es },
  lv: { translation: lv },
};

i18n
  .use(initReactI18next)
  .use(ChainedBackend)
  .init({
    debug: false,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      backends: [HttpBackend, resourcesToBackend(resources)],
    },
  });
