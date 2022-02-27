import i18n from "i18next";
import { initReactI18next } from "react-i18next";

//backend
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
import translationEN from './components/App/locales/en/translation.json';
import translationBG from './components/App/locales/bg/translation.json';

// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: translationEN
    },
    bg: {
        translation: translationBG
    }
};

i18n
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,
        //lng: "bg", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });
/*    .init({
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });
*/
export default i18n;