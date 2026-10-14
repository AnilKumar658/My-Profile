import React, { useState } from "react";
import { Icon } from "./Icons";
import { terminalLogs } from "../data/portfolioData";

export const InteractiveTerminal = () => {
  const [activeTab, setActiveTab] = useState("runtime");
  const [copied, setCopied] = useState(false);

  const tabsConfig = [
    { id: "runtime", label: "runtime.sh", icon: "terminal", lang: "Shell" },
    { id: "jusbook", label: "jusbook_app.ts", icon: "code", lang: "TypeScript" },
    { id: "inference", label: "inference.py", icon: "brain", lang: "Python / PyTorch" },
    { id: "azure", label: "azure_pipeline.sql", icon: "cloud", lang: "Synapse SQL" }
  ];

  const snippets = {
    runtime: terminalLogs,
    jusbook: [
      { text: "// Production Jusbook Platform — Instaresz Business Services", type: "comment" },
      { text: "import { createStackNavigator } from '@react-navigation/stack';", type: "cmd" },
      { text: "import { useBookingState, RazorpayCheckout } from '@/services/jusbook';", type: "cmd" },
      { text: "", type: "plain" },
      { text: "export const BookingEngine: React.FC<EngineProps> = ({ session }) => {", type: "info" },
      { text: "  const { slots, confirmBooking } = useBookingState(session.venueId);", type: "plain" },
      { text: "  // Redis cached slot verification (sub-30ms latency)", type: "comment" },
      { text: "  const isAvailable = await redisClient.get(`slot:${session.slotId}`);", type: "cmd" },
      { text: "  >> Status: Real-time Slot Locked | Syncing with Postgres DB", type: "success" },
      { text: "  >> Razorpay Webhook Verified: Signature 256 validated", type: "highlight" },
      { text: "};", type: "plain" }
    ],
    inference: [
      { text: "# Hybrid CNN + Vision Transformer Pipeline", type: "comment" },
      { text: "import tensorflow as tf", type: "cmd" },
      { text: "from cv_models import HybridVisionTransformer", type: "cmd" },
      { text: "", type: "plain" },
      { text: "model = HybridVisionTransformer.load_weights('models/brain_tumor_v2.h5')", type: "info" },
      { text: "mri_tensor = preprocess_scan('patient_mri_t1_ce.dcm', target_size=(224, 224))", type: "plain" },
      { text: "prediction = model.predict(mri_tensor, return_attention_maps=True)", type: "cmd" },
      { text: ">> Diagnosis: Glioma Detected (Confidence: 98.4%)", type: "success" },
      { text: ">> Saliency Heatmap generated & streamed to frontend", type: "highlight" }
    ],
    azure: [
      { text: "-- Azure Data Factory Medallion Pipeline Status", type: "comment" },
      { text: "ADF_PIPELINE: pl_hotel_booking_ingest_v2", type: "info" },
      { text: "[1] Bronze Layer: Ingesting raw booking payloads -> ADLS Gen2", type: "plain" },
      { text: "[2] Silver Layer: PySpark cleaning, schema validation, deduplication", type: "plain" },
      { text: "[3] Gold Layer: Star Schema Dim_Date, Dim_Customer, Fact_Bookings", type: "success" },
      { text: "SYNAPSE_SQL: Analytical view updated in 1.4s", type: "highlight" },
      { text: "POWER_BI: Dataset refresh succeeded (0 errors)", type: "success" }
    ]
  };

  const currentSnippet = snippets[activeTab];

  const handleCopy = () => {
    const textToCopy = currentSnippet.map((line) => line.text).join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTabMeta = tabsConfig.find((t) => t.id === activeTab) || tabsConfig[0];

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-tabs">
          {tabsConfig.map((tab) => (
            <button
              key={tab.id}
              className={`terminal-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              title={`Switch to ${tab.label}`}
            >
              <Icon name={tab.icon} size={13} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <button
          className="terminal-copy-btn"
          onClick={handleCopy}
          title="Copy snippet to clipboard"
        >
          <Icon name={copied ? "check" : "copy"} size={13} />
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="terminal-body">
        {currentSnippet.map((log, idx) => (
          <div key={idx} className={`terminal-line line-${log.type}`}>
            <span className="line-num">{idx + 1}</span>
            <span className="line-content">{log.text}</span>
          </div>
        ))}
      </div>

      <div className="terminal-status-bar">
        <div className="terminal-status-left">
          <span className="terminal-status-dot" />
          <span>{activeTabMeta.lang}</span>
          <span>• UTF-8</span>
          <span>• Git: main</span>
        </div>
        <div className="terminal-status-right">
          <span>{currentSnippet.length} lines</span>
          <span>Ln {currentSnippet.length}, Col 1</span>
        </div>
      </div>
    </div>
  );
};

