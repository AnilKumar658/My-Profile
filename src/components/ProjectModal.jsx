import React, { useEffect, useState } from "react";
import { Icon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

export const ProjectModal = ({ project, onClose }) => {
  const { t } = useLanguage();
  const [modalTab, setModalTab] = useState("overview");

  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-badge">{project.badge || project.category}</span>
            <h3 className="modal-title">{project.title}</h3>
            <p className="modal-subtitle">{project.subtitle}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label={t("modals.close")}>
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="project-modal-tabs">
          <button
            className={`project-modal-tab ${modalTab === "overview" ? "active" : ""}`}
            onClick={() => setModalTab("overview")}
          >
            <Icon name="cpu" size={14} />
            <span>{t("modals.projectDeepDive.tabOverview")}</span>
          </button>
          <button
            className={`project-modal-tab ${modalTab === "features" ? "active" : ""}`}
            onClick={() => setModalTab("features")}
          >
            <Icon name="sparkles" size={14} />
            <span>{t("modals.projectDeepDive.tabFeatures")} ({project.keyFeatures?.length || 0})</span>
          </button>
          <button
            className={`project-modal-tab ${modalTab === "stack" ? "active" : ""}`}
            onClick={() => setModalTab("stack")}
          >
            <Icon name="code" size={14} />
            <span>{t("modals.projectDeepDive.tabStack")}</span>
          </button>
        </div>

        <div className="modal-body">
          {modalTab === "overview" && (
            <div className="modal-tab-pane animate-fade-in">
              {project.image && (
                <div className="modal-banner-wrap">
                  <img src={project.image} alt={project.title} className="modal-banner-img" />
                </div>
              )}

              <div className="modal-section" style={{ marginTop: "20px" }}>
                <h4 className="modal-section-title">
                  <Icon name="cpu" size={16} /> {t("modals.projectDeepDive.engineeringSummary")}
                </h4>
                <p className="modal-desc">{project.description}</p>
              </div>

              {project.stats && (
                <div className="modal-stats-grid" style={{ marginTop: "16px" }}>
                  {Object.entries(project.stats).map(([key, val], i) => (
                    <div key={i} className="modal-stat-box">
                      <span className="modal-stat-label">{key.toUpperCase()}</span>
                      <span className="modal-stat-val">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {modalTab === "features" && (
            <div className="modal-tab-pane animate-fade-in">
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <Icon name="sparkles" size={16} /> {t("modals.projectDeepDive.innovations")}
                </h4>
                <ul className="modal-features-list">
                  {project.keyFeatures?.map((feat, i) => (
                    <li key={i}>
                      <Icon name="check" size={16} className="feature-check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {modalTab === "stack" && (
            <div className="modal-tab-pane animate-fade-in">
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <Icon name="code" size={16} /> {t("modals.projectDeepDive.tooling")}
                </h4>
                <div className="modal-tech-tags">
                  {project.tags?.map((tTag, i) => (
                    <span key={i} className="tech-tag">
                      {tTag}
                    </span>
                  ))}
                </div>
              </div>

              {project.stats && (
                <div className="modal-section" style={{ marginTop: "20px" }}>
                  <h4 className="modal-section-title">
                    <Icon name="chart" size={16} /> {t("modals.projectDeepDive.benchmarks")}
                  </h4>
                  <div className="modal-stats-grid">
                    {Object.entries(project.stats).map(([key, val], i) => (
                      <div key={i} className="modal-stat-box">
                        <span className="modal-stat-label">{key.toUpperCase()}</span>
                        <span className="modal-stat-val">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>


        <div className="modal-footer">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Icon name="github" size={18} /> {t("modals.projectDeepDive.viewOnGithub")}
          </a>
          <button className="btn btn-ghost" onClick={onClose}>
            {t("modals.close")}
          </button>
        </div>
      </div>
    </div>
  );
};
