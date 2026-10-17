import React, { createContext, useContext, useState, useEffect } from "react";
import { availableLanguages, translations, defaultLanguage } from "../locales";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang");
      if (saved && translations[saved]) return saved;
      // Auto-detect browser language if available
      const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
      if (browserLang && translations[browserLang]) return browserLang;
    } catch {
      // LocalStorage access may fail in restricted iframes
    }
    return defaultLanguage;
  });

  const applyGoogleTranslation = (targetLang) => {
    try {
      // 1. Set Google Translate cookie
      const cookieVal = targetLang === "en" ? "/en/en" : `/en/${targetLang}`;
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      const hostname = window.location.hostname;
      if (hostname && hostname !== "localhost") {
        document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
        document.cookie = `googtrans=${cookieVal}; path=/; domain=.${hostname};`;
      }

      // 2. Dispatch change event to Google Translate combo selector
      const triggerCombo = () => {
        const combo = document.querySelector(".goog-te-combo");
        if (combo) {
          combo.value = targetLang;
          combo.dispatchEvent(new Event("change"));
          return true;
        }
        return false;
      };

      if (!triggerCombo()) {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (triggerCombo() || attempts > 20) {
            clearInterval(interval);
          }
        }, 150);
      }
    } catch (e) {
      console.warn("Auto-translate trigger exception:", e);
    }
  };

  const setLanguage = (langCode) => {
    const isValid = availableLanguages.some((l) => l.code === langCode);
    if (!isValid) return;

    setLanguageState(langCode);
    try {
      localStorage.setItem("portfolio_lang", langCode);
    } catch {
      // ignore
    }
    // Update HTML lang attribute
    document.documentElement.lang = langCode;

    // Trigger full-page DOM translation automatically
    applyGoogleTranslation(langCode);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language !== "en") {
      applyGoogleTranslation(language);
    }
  }, [language]);

  /**
   * Helper function to get translation by key path (e.g. 'nav.about')
   * Automatically falls back to English if the key is missing in the current language.
   */
  const t = (path, fallback = "") => {
    const getVal = (obj, p) => {
      if (!obj) return undefined;
      const keys = p.split(".");
      let cur = obj;
      for (const k of keys) {
        if (cur && typeof cur === "object" && k in cur) {
          cur = cur[k];
        } else {
          return undefined;
        }
      }
      return cur;
    };

    const currentDict = translations[language] || translations[defaultLanguage];
    const val = getVal(currentDict, path);
    if (val !== undefined) return val;

    // Fallback to default language (English)
    const fallbackDict = translations[defaultLanguage];
    const fallbackVal = getVal(fallbackDict, path);
    if (fallbackVal !== undefined) return fallbackVal;

    return fallback || path;
  };

  const currentLanguageMeta =
    availableLanguages.find((l) => l.code === language) || availableLanguages[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: availableLanguages,
        currentLanguageMeta
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
