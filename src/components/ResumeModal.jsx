import React, { useEffect, useState } from "react";
import { Icon } from "./Icons";
import { resumeData } from "../data/portfolioData";
import { useLanguage } from "../context/LanguageContext";

export const ResumeModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [resumeTab, setResumeTab] = useState("preview");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(resumeData.driveViewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <div className="resume-modal-title-wrap">
            <div className="resume-badge">
              <Icon name="sparkles" size={14} />
              <span>{t("modals.resumeModal.badge", "OFFICIAL RESUME")}</span>
            </div>
            <h3 className="resume-modal-title">{t("modals.resumeModal.title", "Anil Kumar Garlapati — Resume")}</h3>
            <span className="resume-modal-subtitle">{t("modals.resumeModal.subtitle", "Software Engineer • Full-Stack & Data Analyst")}</span>
          </div>

          <div className="resume-modal-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleCopyLink}
              title="Copy Google Drive share link"
            >
              <Icon name={copied ? "check" : "copy"} size={16} />
              <span>{copied ? t("resumeShowcase.copiedToast", "Link Copied!") : t("resumeShowcase.shareBtn", "Share Link")}</span>
            </button>

            <a
              href={resumeData.localPdf}
              download={resumeData.fileName}
              className="btn btn-primary btn-sm"
              title="Download Resume PDF"
            >
              <Icon name="arrow-right" size={16} style={{ transform: "rotate(90deg)" }} />
              <span>{t("resumeShowcase.downloadBtn", "Download PDF")}</span>
            </a>

            <a
              href={resumeData.driveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              title="Open in Google Drive"
            >
              <Icon name="external-link" size={16} />
              <span>{t("resumeShowcase.driveView", "Drive View")}</span>
            </a>

            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close resume preview"
            >
              <Icon name="close" size={20} />
            </button>
          </div>
        </div>

        {/* Resume Modal View Switcher Tabs */}
        <div className="resume-tabs-nav">
          <button
            className={`resume-tab-btn ${resumeTab === "preview" ? "active" : ""}`}
            onClick={() => setResumeTab("preview")}
          >
            <Icon name="sparkles" size={14} />
            <span>{t("modals.resumeModal.tabLivePreview", t("modals.resumeModal.tabPdf", "Live PDF Document Viewer"))}</span>
          </button>
          <button
            className={`resume-tab-btn ${resumeTab === "summary" ? "active" : ""}`}
            onClick={() => setResumeTab("summary")}
          >
            <Icon name="shield-check" size={14} />
            <span>{t("modals.resumeModal.tabHighlights", t("modals.resumeModal.tabOverview", "Fast Overview & Highlights"))}</span>
          </button>
        </div>

        {resumeTab === "preview" ? (
          <div className="resume-preview-container">
            <iframe
              src={resumeData.drivePreviewUrl}
              title="Anil Kumar Garlapati Resume Preview"
              className="resume-iframe"
              loading="lazy"
              allow="autoplay"
            />
          </div>
        ) : (
          <div className="resume-summary-container">
            <div className="resume-summary-grid">
              <div className="resume-summary-card">
                <span className="summary-card-tag">LATEST ROLE</span>
                <h4>Software Engineer @ Instaresz Business Services Pvt Ltd</h4>
                <p className="summary-card-sub">Aug 2025 – Present • Hyderabad, India</p>
                <p className="summary-card-desc">
                  Leading production development on the Jusbook web and mobile platform (React Native, TypeScript, Node.js, PostgreSQL, Redis, Docker). Built slot booking, real-time sync, and payment integrations.
                </p>
              </div>

              <div className="resume-summary-card">
                <span className="summary-card-tag">EDUCATION</span>
                <h4>B.Tech in Computer Science & Engineering (CSE)</h4>
                <p className="summary-card-sub">Vignana Bharathi Institute of Technology (VBIT) • 2021 – 2025</p>
                <p className="summary-card-desc">
                  Graduated with a CGPA of <strong>9.12 / 10</strong> (First Class with Distinction). Strong coursework in Data Structures, Algorithms, Cloud Computing, Database Systems, and AI/ML.
                </p>
              </div>

              <div className="resume-summary-card">
                <span className="summary-card-tag">CERTIFICATIONS</span>
                <h4>5 Industry-Recognized Credentials</h4>
                <p className="summary-card-sub">Salesforce • Wipro • AWS Academy • Zscaler • GUVI IITM</p>
                <p className="summary-card-desc">
                  Salesforce AI Associate (ID: 5221856), Wipro Full-Stack .NET, AWS Academy Cloud Data Engineering, Zero Trust Security Associate (ZTCA), and Generative AI.
                </p>
              </div>

              <div className="resume-summary-card highlight-card">
                <span className="summary-card-tag">DIRECT DOWNLOAD</span>
                <h4>Verified PDF Document (110 KB)</h4>
                <p className="summary-card-sub">Official Resume Document</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                  <a
                    href={resumeData.localPdf}
                    download={resumeData.fileName}
                    className="btn btn-primary btn-sm"
                  >
                    <Icon name="arrow-right" size={15} style={{ transform: "rotate(90deg)" }} />
                    <span>Download (.PDF)</span>
                  </a>
                  <a
                    href={resumeData.driveViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Icon name="external-link" size={15} />
                    <span>Open in Drive</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="resume-modal-footer">
          <div className="resume-footer-info">
            <Icon name="shield-check" size={16} style={{ color: "var(--emerald-accent)" }} />
            <span>Updated with Instaresz Pvt. Ltd. experience, VBIT (9.12 CGPA), and certifications</span>
          </div>
          <div className="resume-footer-btns">
            <a
              href={resumeData.localPdf}
              download={resumeData.fileName}
              className="btn btn-primary"
            >
              <Icon name="arrow-right" size={16} style={{ transform: "rotate(90deg)" }} />
              <span>Download Resume (.PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
