import React, { useState } from "react";
import { Icon } from "./Icons";
import { personalInfo } from "../data/portfolioData";

export const ContactSection = () => {
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
        <span className="section-eyebrow">Get In Touch</span>
        <h2 className="section-title">Let's Build Something Exceptional</h2>
        <p className="section-desc">
          Interested in collaborating on AI systems, scalable data engineering pipelines, or full-stack engineering? Let's connect.
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
                <span className="direct-link-label">Direct Email</span>
                <span className="direct-link-value">{personalInfo.email}</span>
              </div>
              <button
                className="copy-badge-btn"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                <Icon name={copied ? "check" : "copy"} size={14} />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <div className="direct-link-item">
              <div className="direct-link-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                <Icon name="sparkles" size={18} />
              </div>
              <div className="direct-link-text">
                <span className="direct-link-label">Direct Phone / WhatsApp</span>
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
                <span className="direct-link-label">LinkedIn</span>
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
                <span className="direct-link-label">GitHub</span>
                <span className="direct-link-value">github.com/AnilKumar658</span>
              </div>
              <Icon name="external-link" size={16} className="external-chevron" />
            </a>
          </div>

          <div className="status-indicator-box">
            <span className="status-ping" />
            <span>Open to full-time roles, research collaborations & contract projects</span>
          </div>
        </div>

        <div className="contact-card form-card">
          <h3 className="form-title">Send a Direct Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Project inquiry / Full-time opportunity"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Hi AnilKumar, I came across your portfolio and wanted to discuss..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-submit">
              <Icon name={submitted ? "check" : "send"} size={18} />
              <span>{submitted ? "Message Sent via Email!" : "Send Message"}</span>
            </button>
          </form>

          {submitted && (
            <div className="toast-notification">
              <Icon name="check" size={18} />
              <span>Your message has been initiated in your mail client!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
