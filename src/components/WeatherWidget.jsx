import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning } from 'lucide-react';
import './WeatherWidget.css';

const WeatherWidget = () => {
    const [weather, setWeather] = useState({
        temp: '--',
        condition: 'Clear',
        city: 'Padang'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulasi loading API
                setTimeout(() => {
                    setWeather({
                        temp: '29',
                        condition: 'Berawan',
                        city: 'Padang'
                    });
                    setLoading(false);
                }, 1500);
            } catch (error) {
                console.error("Error fetching weather:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getWeatherIcon = (condition) => {
        const size = 20;
        switch (condition) {
            case 'Clear':
                return <Sun size={size} className="weather-icon-inner weather-icon-sun" />;
            case 'Berawan':
            case 'Cloudy':
                return <Cloud size={size} className="weather-icon-inner weather-icon-cloud" />;
            case 'Rain':
                return <CloudRain size={size} className="weather-icon-inner weather-icon-rain" />;
            case 'Storm':
                return <CloudLightning size={size} className="weather-icon-inner weather-icon-storm" />;
            default:
                return <Cloud size={size} className="weather-icon-inner" />;
        }
    };

    return (
        <div className="weather-widget-premium">
            <div className="weather-content">
                <div className="weather-main">
                    {loading ? (
                        <div className="weather-loader"></div>
                    ) : (
                        <>
                            <div className="weather-icon-container">
                                {getWeatherIcon(weather.condition)}
                            </div>

                            <div className="weather-data">
                                <div className="weather-temp-main">
                                    {weather.temp}<span className="temp-unit">°C</span>
                                </div>
                                <div className="weather-loc-box">
                                    <div className="location-dot"></div>
                                    <span className="weather-city-name">{weather.city}</span>
                                </div>
                            </div>

                            <div className="weather-status-pill">
                                <div className="pulse-indicator"></div>
                                <span className="status-text">{weather.condition}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
