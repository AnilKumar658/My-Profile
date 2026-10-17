import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Icon } from "./Icons";

export const LanguageSwitcher = ({ isMobile = false }) => {
  const { language, setLanguage, languages, currentLanguageMeta } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div
      className={`lang-switcher-wrap ${isMobile ? "mobile" : ""}`}
      ref={dropdownRef}
    >
      <button
        className="lang-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Change Language / Sprache wählen / 言語選択"
      >
        <span className="lang-flag">{currentLanguageMeta.flag}</span>
        <span className="lang-short">{currentLanguageMeta.short}</span>
        <Icon
          name="arrow-right"
          size={12}
          className={`lang-chevron ${isOpen ? "open" : ""}`}
          style={{
            transform: isOpen ? "rotate(-90deg)" : "rotate(90deg)",
            transition: "transform 0.2s ease"
          }}
        />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu" role="listbox">
          <div className="lang-dropdown-title">Select Language</div>
          {languages.map((l) => (
            <button
              key={l.code}
              className={`lang-option-btn ${language === l.code ? "active" : ""}`}
              onClick={() => handleSelect(l.code)}
              role="option"
              aria-selected={language === l.code}
            >
              <span className="lang-option-flag">{l.flag}</span>
              <div className="lang-option-text">
                <span className="lang-native-name">{l.nativeName}</span>
                <span className="lang-english-name">{l.name}</span>
              </div>
              {language === l.code && (
                <Icon name="check" size={14} className="lang-check-icon" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
