import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, HelpCircle } from 'lucide-react';
import './TopBar.css';
import { useLanguage } from '../context/LanguageContext';

const TopBar = ({ scrolled }) => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className={`top-bar-aesthetic ${scrolled ? 'scrolled' : ''}`}>
            <div className="container top-bar-flex">
                <div className="top-bar-left">
                    <div className="lang-flags">
                        <button
                            className={`flag-btn ${language === 'id' ? 'active' : ''}`}
                            onClick={() => setLanguage('id')}
                            title={t('lang_id')}
                        >
                            <span className="flag-circle id-flag"></span>
                        </button>
                        <button
                            className={`flag-btn ${language === 'en' ? 'active' : ''}`}
                            onClick={() => setLanguage('en')}
                            title={t('lang_en')}
                        >
                            <span className="flag-circle en-flag">
                                <span className="en-flag-inner-h"></span>
                                <span className="en-flag-inner-v"></span>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="top-bar-right">
                    <nav className="top-util-nav">
                        <Link to="/faq" className="top-nav-link">
                            <HelpCircle size={14} strokeWidth={2.5} />
                            <span>FAQ</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
