import React, { useState, useEffect } from 'react';
import {
    Accessibility, Type, RotateCcw, X,
    Link as LinkIcon, Volume2, Moon, Eye, Sun
} from 'lucide-react';
import './AccessibilityWidget.css';

const AccessibilityWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('accessibility_settings');
        return saved ? JSON.parse(saved) : {
            percent: 100,
            grayscale: false,
            highContrast: false,
            darkMode: false,
            readableFont: false,
            underlineLinks: false,
            textToSpeech: false
        };
    });

    useEffect(() => {
        localStorage.setItem('accessibility_settings', JSON.stringify(settings));

        // Apply classes to body
        document.body.classList.toggle('grayscale-mode', settings.grayscale);
        document.body.classList.toggle('high-contrast-mode', settings.highContrast);
        document.body.classList.toggle('dark-mode-active', settings.darkMode);
        document.body.classList.toggle('readable-font-active', settings.readableFont);
        document.body.classList.toggle('underline-links-active', settings.underlineLinks);

        // Remove existing font classes from both body and html
        [80, 90, 110, 120, 130, 140, 150].forEach(p => {
            document.body.classList.remove(`font-${p}`);
            document.documentElement.classList.remove(`font-${p}`);
        });

        if (settings.percent !== 100) {
            document.documentElement.classList.add(`font-${settings.percent}`);
        }
    }, [settings]);

    // Text-to-Speech Logic
    useEffect(() => {
        const handleSpeech = (e) => {
            if (!settings.textToSpeech) return;

            // Avoid repeating if clicked inside setting panel
            if (e.target.closest('.accessibility-panel') || e.target.closest('.accessibility-toggle')) return;

            const text = e.target.innerText || e.target.alt || e.target.title;
            if (text && text.trim().length > 0 && text.length < 500) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'id-ID';
                utterance.rate = 0.85; // Tempo lebih tenang (mendekati wibawa Bapak Jokowi)
                utterance.pitch = 0.9;  // Nada sedikit lebih rendah
                window.speechSynthesis.speak(utterance);
            }
        };

        if (settings.textToSpeech) {
            document.addEventListener('click', handleSpeech);
        }

        return () => document.removeEventListener('click', handleSpeech);
    }, [settings.textToSpeech]);

    const changeSize = (dir) => {
        setSettings(prev => {
            let next = prev.percent + (dir * 10);
            if (next < 80) next = 80;
            if (next > 150) next = 150;
            return { ...prev, percent: next };
        });
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const resetSettings = () => {
        setSettings({
            percent: 100,
            grayscale: false,
            highContrast: false,
            darkMode: false,
            readableFont: false,
            underlineLinks: false,
            textToSpeech: false
        });
    };

    return (
        <div className="accessibility-widget">
            <button
                className="accessibility-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="Fitur Aksesibilitas"
            >
                {isOpen ? <X size={28} /> : <Accessibility size={32} />}
            </button>

            <div className={`accessibility-panel ${isOpen ? 'open' : ''}`}>
                <div className="panel-header">
                    <h3>Aksesibilitas</h3>
                    <button className="reset-link" onClick={resetSettings}>
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>

                <div className="text-size-control">
                    <span>Ukuran Teks</span>
                    <div className="size-stepper">
                        <button className="step-btn" onClick={() => changeSize(-1)}>A-</button>
                        <span className="current-percent">{settings.percent}%</span>
                        <button className="step-btn" onClick={() => changeSize(1)}>A+</button>
                    </div>
                </div>

                <div className="panel-grid">
                    <div
                        className={`accessibility-item ${settings.grayscale ? 'active' : ''}`}
                        onClick={() => toggleSetting('grayscale')}
                    >
                        <Eye className="item-icon" size={28} />
                        <span>Skala Abu-abu</span>
                    </div>

                    <div
                        className={`accessibility-item ${settings.highContrast ? 'active' : ''}`}
                        onClick={() => toggleSetting('highContrast')}
                    >
                        <Sun className="item-icon" size={28} />
                        <span>Kontras Tinggi</span>
                    </div>

                    <div
                        className={`accessibility-item ${settings.darkMode ? 'active' : ''}`}
                        onClick={() => toggleSetting('darkMode')}
                    >
                        <Moon className="item-icon" size={28} />
                        <span>Mode Gelap</span>
                    </div>

                    <div
                        className={`accessibility-item ${settings.readableFont ? 'active' : ''}`}
                        onClick={() => toggleSetting('readableFont')}
                    >
                        <Type className="item-icon" size={28} />
                        <span>Font Terbaca</span>
                    </div>

                    <div
                        className={`accessibility-item ${settings.underlineLinks ? 'active' : ''}`}
                        onClick={() => toggleSetting('underlineLinks')}
                    >
                        <LinkIcon className="item-icon" size={28} />
                        <span>Garis Bawah Link</span>
                    </div>

                    <div
                        className={`accessibility-item ${settings.textToSpeech ? 'active' : ''}`}
                        onClick={() => toggleSetting('textToSpeech')}
                    >
                        <Volume2 className="item-icon" size={28} />
                        <span>Suara Teks</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityWidget;
