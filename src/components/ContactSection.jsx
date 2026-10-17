import React, { useState } from "react";
import { Icon } from "./Icons";
import { personalInfo } from "../data/portfolioData";
import { useLanguage } from "../context/LanguageContext";

export const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${formData.subject || "Collaboration"}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank");

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-header">
        <span className="section-eyebrow">{t("contact.eyebrow")}</span>
        <h2 className="section-title">{t("contact.title")}</h2>
        <p className="section-desc">
          {t("contact.desc")}
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card info-card">
          <div className="author-card-header">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="author-avatar"
            />
            <div>
              <h3 className="author-name">{personalInfo.name}</h3>
              <p className="author-title">{personalInfo.title}</p>
              <div className="author-location">
                <Icon name="map-pin" size={14} />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          <p className="author-bio">{personalInfo.bio}</p>

          <div className="contact-direct-links">
            <div className="direct-link-item">
              <div className="direct-link-icon">
                <Icon name="mail" size={18} />
              </div>
              <div className="direct-link-text">
                <span className="direct-link-label">{t("contact.emailLabel")}</span>
                <span className="direct-link-value">{personalInfo.email}</span>
              </div>
              <button
                className="copy-badge-btn"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                <Icon name={copied ? "check" : "copy"} size={14} />
                <span>{copied ? t("contact.copiedText") : t("contact.copyBtn")}</span>
              </button>
            </div>

            <div className="direct-link-item">
              <div className="direct-link-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                <Icon name="sparkles" size={18} />
              </div>
              <div className="direct-link-text">
                <span className="direct-link-label">{t("contact.phoneLabel")}</span>
                <span className="direct-link-value">{personalInfo.phone}</span>
              </div>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="copy-badge-btn"
                style={{ textDecoration: "none" }}
              >
                Call
              </a>
            </div>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="direct-link-item link-action"
            >
              <div className="direct-link-icon linkedin-bg">
                <Icon name="linkedin" size={18} />
              </div>
              <div className="direct-link-text">
                <span className="direct-link-label">{t("contact.linkedinLabel")}</span>
                <span className="direct-link-value">Connect on LinkedIn</span>
              </div>
              <Icon name="external-link" size={16} className="external-chevron" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="direct-link-item link-action"
            >
              <div className="direct-link-icon github-bg">
                <Icon name="github" size={18} />
              </div>
              <div className="direct-link-text">
                <span className="direct-link-label">{t("contact.githubLabel")}</span>
                <span className="direct-link-value">github.com/AnilKumar658</span>
              </div>
              <Icon name="external-link" size={16} className="external-chevron" />
            </a>
          </div>

          <div className="status-indicator-box">
            <span className="status-ping" />
            <span>{t("contact.statusAvailable")}</span>
          </div>
        </div>

        <div className="contact-card form-card">
          <h3 className="form-title">{t("contact.formTitle")}</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t("contact.nameLabel")} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("contact.namePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t("contact.emailInputLabel")} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("contact.emailInputPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">{t("contact.subjectLabel")}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder={t("contact.subjectPlaceholder")}
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t("contact.messageLabel")} *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder={t("contact.messagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-submit">
              <Icon name={submitted ? "check" : "send"} size={18} />
              <span>{submitted ? t("contact.sendingBtn") : t("contact.submitBtn")}</span>
            </button>
          </form>

          {submitted && (
            <div className="toast-notification">
              <Icon name="check" size={18} />
              <span>{t("contact.successToast")}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
