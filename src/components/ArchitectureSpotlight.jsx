import React, { useState } from "react";
import { Icon } from "./Icons";

export const ArchitectureSpotlight = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Data Ingestion & Cloud Sourcing",
      icon: "cloud",
      tagline: "High-Throughput Global Ingestion",
      details:
        "Asynchronous fetching of multi-decadal historical climate data (ERA5 0.25° grid) via HTTPX with exponential backoff, coupled with Azure Data Factory orchestration pipelines streaming hotel and business records directly into Azure Data Lake Storage Gen2.",
      techs: ["Open-Meteo ERA5", "Azure Data Factory", "Async HTTPX", "Data Lake Gen2"]
    },
    {
      title: "2. Hybrid Caching & Medallion Storage",
      icon: "database",
      tagline: "Sub-50ms Response Acceleration",
      details:
        "Two-tier failover caching combining MongoDB Atlas with automated 7-day TTL index expiry and seamless disk-backed local fallback. In cloud analytics, Bronze (raw), Silver (cleansed), and Gold (star schema) medallion layers ensure pristine analytical readiness.",
      techs: ["MongoDB Atlas (Motor)", "DiskCache", "TTL Indexing", "Delta Lake", "Star Schema"]
    },
    {
      title: "3. Statistical Inference & Deep Learning",
      icon: "brain",
      tagline: "Mathematical Rigor & Neural Networks",
      details:
        "Vectorized run-length encoding for WMO TX95p heatwave runs, Mann-Kendall non-parametric monotonic trend calculation, Sen's slope estimation, and Hybrid CNN-Transformer computer vision models for clinical MRI tumor classification.",
      techs: ["PyMannKendall", "SciPy Stats", "NumPy", "TensorFlow", "CNN + ViT"]
    },
    {
      title: "4. Visualization & Dynamic Reporting",
      icon: "chart",
      tagline: "Interactive Canvas & Executive Insights",
      details:
        "React 19 canvas visualizations with dual-axis Chart.js, Leaflet geospatial mapping, and automated server-side report generation producing styled ReportLab PDFs, CSV archives, and interactive Power BI executive dashboards.",
      techs: ["React 19", "Chart.js 4", "React-Leaflet", "ReportLab PDF", "Power BI"]
    }
  ];

  return (
    <section id="architecture" className="section architecture-section">
      <div className="section-header">
        <span className="section-eyebrow">Engineering Methodology</span>
        <h2 className="section-title">System Architecture Blueprint</h2>
        <p className="section-desc">
          How I architect end-to-end intelligent applications: from raw cloud ingestion and distributed caching to statistical modeling and interactive interfaces.
        </p>
      </div>

      <div className="arch-stepper-nav">
        {steps.map((step, idx) => (
          <button
            key={idx}
            className={`arch-step-btn ${activeStep === idx ? "active" : ""}`}
            onClick={() => setActiveStep(idx)}
            aria-label={`Jump to Stage 0${idx + 1}: ${step.tagline}`}
          >
            <div className="arch-step-icon">
              <Icon name={step.icon} size={18} />
            </div>
            <div className="arch-step-text">
              <span className="step-num">STAGE 0{idx + 1}</span>
              <span className="step-label">{step.tagline}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="arch-display-card">
        {/* Stage Progress Bar */}
        <div className="arch-progress-track">
          <div
            className="arch-progress-fill"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="arch-display-header">
          <div className="arch-badge-row">
            <span className="arch-stage-pill">STAGE 0{activeStep + 1} OF 0{steps.length}</span>
            <span className="arch-step-title">{steps[activeStep].title}</span>
          </div>
          <span className="arch-tagline">{steps[activeStep].tagline}</span>
        </div>

        <p className="arch-details-text">{steps[activeStep].details}</p>

        <div className="arch-tech-stack">
          <span className="arch-tech-title">Technologies Involved:</span>
          <div className="arch-tech-chips">
            {steps[activeStep].techs.map((t, i) => (
              <span key={i} className="arch-chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Visual clickable pipeline representation */}
        <div className="arch-diagram-flow">
          {steps.map((s, idx) => (
            <button
              key={idx}
              className={`flow-node ${activeStep === idx ? "current-node" : ""} ${
                activeStep > idx ? "completed-node" : ""
              }`}
              onClick={() => setActiveStep(idx)}
              title={`Switch to ${s.title}`}
            >
              <div className="flow-node-circle">
                <Icon name={s.icon} size={16} />
              </div>
              <span className="flow-node-name">{s.title.split(". ")[1]}</span>
            </button>
          ))}
        </div>

        {/* Stepper Navigation Footer */}
        <div className="arch-stepper-controls">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            style={{ opacity: activeStep === 0 ? 0.45 : 1 }}
          >
            <Icon name="arrow-right" size={15} style={{ transform: "rotate(180deg)" }} />
            <span>Previous Stage</span>
          </button>

          <div className="arch-step-dots">
            {steps.map((_, i) => (
              <button
                key={i}
                className={`arch-dot ${activeStep === i ? "active" : ""}`}
                onClick={() => setActiveStep(i)}
                aria-label={`Go to Stage 0${i + 1}`}
              />
            ))}
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={activeStep === steps.length - 1}
            style={{ opacity: activeStep === steps.length - 1 ? 0.45 : 1 }}
          >
            <span>Next Stage</span>
            <Icon name="arrow-right" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

