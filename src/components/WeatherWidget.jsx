import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  Wind,
  Droplet,
  MapPin,
  Umbrella,
  MessageCircle,
} from "lucide-react";
import "./WeatherWidget.css";

const weatherData = {
  temp: "29",
  condition: "Sebagian Berawan",
  city: "Padang",
  humidity: 65,
  windSpeed: 12,
  rainChance: 10,
  soilMoisture: 65,
  advice: "Waktu Baik untuk Memupuk | Periksa Irigasi",
  time: "02:52 AM",
};

const getWeatherIcon = (condition) => {
  const iconSize = 28;
  const lower = condition.toLowerCase();
  if (lower.includes("hujan") || lower.includes("rain")) {
    return <Umbrella size={iconSize} className="weather-symbol weather-symbol-rain" />;
  }
  if (lower.includes("berawan") || lower.includes("cloud")) {
    return <Cloud size={iconSize} className="weather-symbol weather-symbol-cloud" />;
  }
  return <Sun size={iconSize} className="weather-symbol weather-symbol-sun" />;
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState({ ...weatherData, temp: "--" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWeather(weatherData);
      setLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="weather-board">
      {loading ? (
        <div className="weather-loading">Memuat cuaca...</div>
      ) : (
        <div className="weather-grid">
          <div className="weather-pills-column">
            <article className="weather-pill-card">
              <div className="weather-pill-icon weather-pill-icon--green">
                <Droplet size={20} />
              </div>
              <div className="weather-pill-copy">
                <h3>Tanah Lembab</h3>
                <p>{weather.soilMoisture}%</p>
              </div>
            </article>

            <article className="weather-pill-card">
              <div className="weather-pill-icon weather-pill-icon--blue">
                <Wind size={20} />
              </div>
              <div className="weather-pill-copy">
                <h3>Angin Ringan</h3>
                <p>{weather.windSpeed} km/j</p>
              </div>
            </article>

            <article className="weather-pill-card">
              <div className="weather-pill-icon weather-pill-icon--sky">
                <Umbrella size={20} />
              </div>
              <div className="weather-pill-copy">
                <h3>Probabilitas Hujan</h3>
                <p>{weather.rainChance}%</p>
              </div>
            </article>
          </div>

          <article className="weather-card weather-card--main">
            <div className="weather-main-header">
              <span className="weather-time">{weather.time}</span>
            </div>
            <div className="weather-main-top">
              <div className="weather-main-icon">{getWeatherIcon(weather.condition)}</div>
              <div className="weather-main-value">
                <span>{weather.temp}</span>
                <small>°C</small>
              </div>
            </div>
            <div className="weather-main-label">{weather.condition}</div>
            <div className="weather-main-footer">
              <MapPin size={16} />
              <span>{weather.city}</span>
            </div>
            <div className="weather-advice-box">
              <div className="weather-card-icon weather-card-icon--yellow">
                <MessageCircle size={18} />
              </div>
              <div className="weather-pill-copy">
                <h3>Saran Petani</h3>
                <p>{weather.advice}</p>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
