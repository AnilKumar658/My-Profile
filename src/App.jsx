import React, { useState, useEffect } from "react";
import {
  personalInfo,
  specializations,
  skillsCategories,
  projects,
  experienceData,
  educationData,
  certificationsData,
  achievementsData,
  resumeData
} from "./data/portfolioData";
import { Icon } from "./components/Icons";
import { ParticleBackground } from "./components/ParticleBackground";
import { InteractiveTerminal } from "./components/InteractiveTerminal";
import { ArchitectureSpotlight } from "./components/ArchitectureSpotlight";
import { ContactSection } from "./components/ContactSection";
import { ProjectModal } from "./components/ProjectModal";
import { ResumeModal } from "./components/ResumeModal";

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeCopied, setResumeCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyResumeLink = () => {
    navigator.clipboard.writeText(resumeData.driveViewUrl);
    setResumeCopied(true);
    setTimeout(() => setResumeCopied(false), 2500);
  };


  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open & handle Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const [activeSkillFilter, setActiveSkillFilter] = useState("All");

  const projectCategories = [
    { id: "All", label: "All Projects", icon: "terminal", count: projects.length },
    { id: "Full-Stack & AI", label: "Full-Stack & Mobile", icon: "code", count: projects.filter((p) => p.category === "Full-Stack & AI").length },
    { id: "AI & Machine Learning", label: "AI & Deep Learning", icon: "brain", count: projects.filter((p) => p.category === "AI & Machine Learning").length },
    { id: "Data Engineering", label: "Data & Cloud Pipelines", icon: "database", count: projects.filter((p) => p.category === "Data Engineering").length }
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const filteredSkills =
    activeSkillFilter === "All"
      ? skillsCategories
      : skillsCategories.filter((c) => c.category === activeSkillFilter);

  return (
    <div className="app-container">
      {/* Scroll Progress Bar at very top */}

      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      <ParticleBackground />

      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#" className="brand-logo" title={`${personalInfo.name} - Home`}>
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="brand-avatar"
            />
            <div className="brand-text-wrap">
              <span className="brand-name">
                Anil Kumar <span className="brand-accent">Garlapati</span>
              </span>
              <span className="brand-title">Full-Stack AI & Data</span>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="btn-nav-resume"
              title="Preview, Download or Share Resume"
              id="nav-resume-btn"
            >
              <Icon name="sparkles" size={14} />
              <span>Resume</span>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-btn nav-social-btn"
              title="GitHub Profile (12+ Repositories)"
            >
              <Icon name="github" size={17} />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-btn nav-social-btn"
              title="LinkedIn Profile"
            >
              <Icon name="linkedin" size={17} />
            </a>

            <a href="#contact" className="btn btn-primary btn-hire-me">
              <span>Hire Me</span>
            </a>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <Icon name={mobileMenuOpen ? "close" : "terminal"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE & TABLET NAVIGATION DRAWER */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <div className="brand-logo">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="brand-avatar"
              />
              <div className="brand-text-wrap">
                <span className="brand-name">
                  Anil Kumar <span className="brand-accent">Garlapati</span>
                </span>
                <span className="brand-title">Full-Stack AI & Data</span>
              </div>
            </div>
            <button
              className="mobile-drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="mobile-drawer-body">
            <nav className="mobile-nav-links">
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                <Icon name="brain" size={18} />
                <span>About & Overview</span>
              </a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)}>
                <Icon name="code" size={18} />
                <span>Skills & Matrix</span>
              </a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)}>
                <Icon name="terminal" size={18} />
                <span>Featured Projects</span>
              </a>
              <a
                href="#resume"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="mobile-nav-resume-item"
              >
                <Icon name="sparkles" size={18} />
                <span>Official Resume & CV</span>
                <span className="mobile-pill-badge">Preview</span>
              </a>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)}>
                <Icon name="database" size={18} />
                <span>Work Experience</span>
              </a>
              <a href="#education" onClick={() => setMobileMenuOpen(false)}>
                <Icon name="shield-check" size={18} />
                <span>Education (9.12 CGPA)</span>
              </a>
              <a href="#certifications" onClick={() => setMobileMenuOpen(false)}>
                <Icon name="shield-check" size={18} />
                <span>Certifications (5)</span>
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Icon name="mail" size={18} />
                <span>Contact & Hire Me</span>
              </a>
            </nav>

            <div className="mobile-drawer-cta-wrap">
              <div className="mobile-resume-action-row">
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsResumeOpen(true);
                  }}
                >
                  <Icon name="sparkles" size={16} />
                  <span>Preview Resume</span>
                </button>
                <a
                  href={resumeData.localPdf}
                  download={resumeData.fileName}
                  className="btn btn-secondary"
                  style={{ width: "100%" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon name="arrow-right" size={16} style={{ transform: "rotate(90deg)" }} />
                  <span>Download PDF</span>
                </a>
              </div>

              <div className="mobile-social-row">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-btn"
                  title="GitHub Profile"
                >
                  <Icon name="github" size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-btn"
                  title="LinkedIn Profile"
                >
                  <Icon name="linkedin" size={18} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="mobile-social-btn"
                  title="Send Email"
                >
                  <Icon name="mail" size={18} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="status-pulse-dot" />
              <span>Available for High-Impact Roles & Projects</span>
            </div>

            <h1 className="hero-headline">
              Engineering <span className="gradient-text">Intelligent Systems</span> from Data Pipelines to Production AI.
            </h1>

            <p className="hero-tagline">
              Hi, I'm <strong>{personalInfo.name}</strong>. I bridge complex deep learning research, scalable cloud data engineering in Azure, and high-performance full-stack web applications.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>Explore Featured Work</span>
                <Icon name="arrow-right" size={18} />
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="btn btn-secondary"
                title="Preview, Download or Share Resume"
                id="hero-resume-btn"
              >
                <Icon name="sparkles" size={18} />
                <span>Resume / CV</span>
              </button>
              <a href="#contact" className="btn btn-ghost">
                <Icon name="mail" size={18} />
                <span>Get In Touch</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Icon name="github" size={18} />
                <span>GitHub (12+)</span>
              </a>
            </div>

            <div className="hero-stats-row">
              {personalInfo.stats.map((s, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-terminal-wrap">
            <InteractiveTerminal />
          </div>
        </div>
      </section>

      {/* ABOUT & SPECIALIZATIONS */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Core Expertise</span>
            <h2 className="section-title">Architecting Across the Stack</h2>
            <p className="section-desc">
              From raw telemetry and multi-decadal meteorological data to neural networks and interactive web platforms, I deliver robust end-to-end solutions.
            </p>
          </div>

          <div className="specs-grid">
            {specializations.map((spec) => (
              <div key={spec.id} className="spec-card">
                <div className="spec-icon-wrap">
                  <Icon name={spec.icon} size={24} />
                </div>
                <h3 className="spec-title">{spec.title}</h3>
                <p className="spec-desc">{spec.description}</p>
                <div className="spec-skills-wrap">
                  {spec.skills.map((s, i) => (
                    <span key={i} className="skill-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS MATRIX */}
      <section id="skills" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Technical Mastery</span>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-desc">
              A comprehensive toolkit honed across production projects, academic research, and cloud implementations.
            </p>
          </div>

          {/* Skills Filter Tabs */}
          <div className="skills-filter-bar">
            <button
              className={`filter-btn ${activeSkillFilter === "All" ? "active" : ""}`}
              onClick={() => setActiveSkillFilter("All")}
            >
              <Icon name="terminal" size={14} />
              <span>All Disciplines</span>
            </button>
            {skillsCategories.map((cat, idx) => (
              <button
                key={idx}
                className={`filter-btn ${activeSkillFilter === cat.category ? "active" : ""}`}
                onClick={() => setActiveSkillFilter(cat.category)}
              >
                <Icon
                  name={idx === 0 ? "brain" : idx === 1 ? "code" : "database"}
                  size={14}
                />
                <span>{cat.category.split("&")[0].trim()}</span>
              </button>
            ))}
          </div>

          <div className="skills-wrapper">
            {filteredSkills.map((cat, idx) => (
              <div key={idx} className="skill-category-block animate-fade-in">
                <h3 className="skill-cat-title">
                  <Icon
                    name={
                      cat.category.includes("AI")
                        ? "brain"
                        : cat.category.includes("Systems")
                        ? "code"
                        : "database"
                    }
                    size={20}
                  />
                  <span>{cat.category}</span>
                </h3>
                <div className="skills-grid-row">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-matrix-item">
                      <span className="skill-item-name">{skill.name}</span>
                      <span className="skill-item-badge">{skill.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SHOWCASE */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Selected Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-desc">
              Real-world systems demonstrating full-stack AI development, deep learning computer vision, Azure data engineering, and data analytics.
            </p>
          </div>

          {/* Interactive Project Category Tabs */}
          <div className="projects-filter-bar">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeFilter === cat.id ? "active" : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                <Icon name={cat.icon} size={15} />
                <span>{cat.label}</span>
                <span className="filter-count-badge">{cat.count}</span>
              </button>
            ))}
          </div>


          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`project-card ${project.featured ? "featured-card" : ""}`}
              >
                {/* Project Image Preview / Placeholder */}
                <div
                  className="project-img-container"
                  onClick={() => setSelectedProject(project)}
                  title="Click to view Architecture Deep Dive"
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="project-img-placeholder">
                      <Icon
                        name={
                          project.category.includes("AI")
                            ? "brain"
                            : project.category.includes("Data")
                            ? "database"
                            : "code"
                        }
                        size={36}
                      />
                      <span>{project.badge || project.category}</span>
                    </div>
                  )}
                  <div className="project-img-overlay" />
                </div>

                <div className="project-card-header">
                  <span className="project-badge">
                    {project.badge || project.category}
                  </span>
                  <div className="project-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-icon-link"
                      title="View GitHub Repository"
                    >
                      <Icon name="github" size={18} />
                    </a>
                  </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>

                {project.stats && (
                  <div className="project-stats-pill-row">
                    {Object.entries(project.stats).slice(0, 2).map(([k, v], i) => (
                      <div key={i}>
                        <span className="stat-pill-label">{k.toUpperCase()}</span>
                        <span className="stat-pill-val">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="project-tags">
                  {project.tags.slice(0, 6).map((t, i) => (
                    <span key={i} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <button
                    className="deep-dive-btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span>Architecture Deep Dive</span>
                    <Icon name="arrow-right" size={15} />
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE SPOTLIGHT */}
      <ArchitectureSpotlight />

      {/* RESUME / CV SHOWCASE BANNER */}
      <section id="resume" className="section-compact" style={{ padding: "10px 0 30px" }}>
        <div className="container">
          <div className="resume-showcase-bar">
            <div className="resume-showcase-left">
              <div className="resume-doc-icon">
                <Icon name="sparkles" size={26} />
              </div>
              <div>
                <div className="resume-badge">
                  <Icon name="shield-check" size={13} />
                  <span>CURRICULUM VITAE • {resumeData.updatedDate.toUpperCase()}</span>
                </div>
                <h3 className="resume-showcase-title">Official Resume & Experience Record</h3>
                <p className="resume-showcase-subtitle">
                  Software Engineer @ Instaresz • VBIT B.Tech CSE (9.12 CGPA) • Deep Learning & Azure Data Engineering
                </p>
              </div>
            </div>

            <div className="resume-showcase-buttons">
              <button
                onClick={() => setIsResumeOpen(true)}
                className="btn btn-primary"
                id="preview-resume-btn"
                title="Open interactive in-browser preview"
              >
                <Icon name="sparkles" size={16} />
                <span>Preview Resume</span>
              </button>

              <a
                href={resumeData.localPdf}
                download={resumeData.fileName}
                className="btn btn-secondary"
                id="download-resume-btn"
                title="Download PDF directly to your device"
              >
                <Icon name="arrow-right" size={16} style={{ transform: "rotate(90deg)" }} />
                <span>Download (.PDF)</span>
              </a>

              <button
                onClick={handleCopyResumeLink}
                className="btn btn-ghost"
                id="share-resume-btn"
                title="Copy Google Drive share link"
              >
                <Icon name={resumeCopied ? "check" : "copy"} size={16} />
                <span>{resumeCopied ? "Link Copied!" : "Share Link"}</span>
              </button>

              <a
                href={resumeData.driveViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                title="Open in Google Drive in new tab"
              >
                <Icon name="external-link" size={16} />
                <span>Drive View</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section id="experience" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Career & Roles</span>
            <h2 className="section-title">Work Experience</h2>
            <p className="section-desc">
              1.5+ years of engineering experience delivering production web & mobile platforms, data engineering pipelines, and cloud AI solutions.
            </p>
          </div>

          <div className="timeline-container">
            {experienceData.map((item, idx) => (
              <div key={idx} className="timeline-card">
                <span className="timeline-dot" />
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "3px" }}>
                      <span className="timeline-org">{item.organization}</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>• {item.location}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="timeline-period">{item.period}</span>
                    {item.type && (
                      <div style={{ fontSize: "0.75rem", color: "var(--text-highlight)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
                        {item.type}
                      </div>
                    )}
                  </div>
                </div>
                <p className="timeline-desc">{item.description}</p>
                <ul className="timeline-highlights">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx}>
                      <Icon name="check" size={14} className="bullet-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section" style={{ background: "rgba(255, 255, 255, 0.01)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Academic Background</span>
            <h2 className="section-title">Education Details</h2>
            <p className="section-desc">
              Formal foundations in Computer Science & Engineering with distinction and academic excellence.
            </p>
          </div>

          <div className="edu-grid">
            {educationData.map((edu, idx) => (
              <div key={idx} className="edu-card">
                <div className="edu-card-top">
                  <span className="edu-score-badge">{edu.score}</span>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--emerald-accent)" }}>
                    {edu.badge}
                  </span>
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <h4 className="edu-institution">{edu.institution}</h4>
                <div className="edu-meta-row">
                  <span>{edu.year}</span>
                  <span>•</span>
                  <span>{edu.location}</span>
                </div>
                <p className="edu-details">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Credentials</span>
            <h2 className="section-title">Professional Certifications</h2>
            <p className="section-desc">
              Industry-recognized credentials in Artificial Intelligence, Full-Stack .NET, AWS Data Engineering, and Zero Trust security.
            </p>
          </div>

          <div className="cert-grid">
            {certificationsData.map((cert, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-header">
                  <div className="cert-icon">
                    <Icon name="shield-check" size={20} />
                  </div>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                    {cert.date}
                  </span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-meta-row">
                  <span>ID: {cert.credentialId}</span>
                </div>
                <p className="cert-desc">{cert.description}</p>
                {cert.link && cert.link !== "#" && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                  >
                    <span>Verify Credential</span>
                    <Icon name="external-link" size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONORS & ACHIEVEMENTS */}
      <section className="section" style={{ background: "rgba(0, 0, 0, 0.2)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Accolades</span>
            <h2 className="section-title">Key Achievements</h2>
            <p className="section-desc">
              National competitive coding rankings, algorithmic performance badges, and industry recognitions.
            </p>
          </div>

          <div className="achieve-grid">
            {achievementsData.map((ach, idx) => (
              <div key={idx} className="achieve-card">
                <div className="achieve-icon">
                  <Icon name="sparkles" size={18} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <h3 className="achieve-title">{ach.title}</h3>
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--amber-accent)", background: "rgba(245, 158, 11, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                      {ach.tag}
                    </span>
                  </div>
                  <p className="achieve-desc">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <h4 className="footer-logo-text">{personalInfo.name}</h4>
              <p className="footer-desc">
                {personalInfo.tagline}
              </p>
            </div>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#certifications">Certifications</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
            <div className="footer-social-row">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                title="GitHub"
              >
                <Icon name="github" size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                title="LinkedIn"
              >
                <Icon name="linkedin" size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="footer-icon-btn"
                title="Email"
              >
                <Icon name="mail" size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* RESUME PREVIEW & DOWNLOAD MODAL */}
      {isResumeOpen && (
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      )}


      {/* FLOATING BACK TO TOP BUTTON */}
      <button
        className={`back-to-top-btn ${scrolled ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll back to top"
        title="Scroll to Top"
      >
        <Icon name="arrow-right" size={20} style={{ transform: "rotate(-90deg)" }} />
      </button>
    </div>
  );
}
