import React from "react";
import "./RunningText.css";
import { useLanguage } from "../context/LanguageContext";

const RunningText = () => {
  const { t, language } = useLanguage();

  // Calculate date once so it's identical in both halves for a perfect loop
  const formattedDate = new Date().toLocaleDateString(
    language === "id" ? "id-ID" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  const newsItems = [
    t("news_ticker_1"),
    t("news_ticker_2"),
    t("news_ticker_3"),
    t("news_ticker_4"),
    t("news_ticker_5"),
  ];

  // Functional component for a single set of items to ensure perfect duplication
  const MarqueeSet = () => (
    <>
      <span className="marquee-item date-item">{formattedDate}</span>
      <span className="separator">✦</span>
      {newsItems.map((item, index) => (
        <React.Fragment key={index}>
          <span className="marquee-item">{item}</span>
          <span className="separator">✦</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div className="running-text-container">
      <div className="running-text-wrapper">
        <div className="breaking-label">
          <span className="pulse-icon"></span>
          {language === "id" ? "INFOTANI" : "AGRI INFO"}
        </div>
        <div className="marquee-content">
          <div className="marquee-track">
            {/* Repeat 10 times to ensure no gaps on any screen size */}
            {[...Array(10)].map((_, i) => (
              <MarqueeSet key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningText;
