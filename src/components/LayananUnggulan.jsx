import { Coins, Map, Cpu, Globe, Mountain, ShoppingBag, Home, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './LayananUnggulan.css';

const LayananUnggulan = () => {
    const { t } = useLanguage();

    const programs = [
        {
            icon: <Coins size={32} />,
            title: t('program_1_title'),
            subtitle: t('program_1_sub'),
            desc: t('program_1_desc'),
            color: '#2e7d32'
        },
        {
            icon: <Map size={32} />,
            title: t('program_2_title'),
            subtitle: t('program_2_sub'),
            desc: t('program_2_desc'),
            color: '#1565c0'
        },
        {
            icon: <Cpu size={32} />,
            title: t('program_3_title'),
            subtitle: t('program_3_sub'),
            desc: t('program_3_desc'),
            color: '#ef6c00'
        },
        {
            icon: <Globe size={32} />,
            title: t('program_4_title'),
            subtitle: t('program_4_sub'),
            desc: t('program_4_desc'),
            color: '#6a1b9a'
        },
        {
            icon: <Mountain size={32} />,
            title: t('program_5_title'),
            subtitle: t('program_5_sub'),
            desc: t('program_5_desc'),
            color: '#4e342e'
        },
        {
            icon: <ShoppingBag size={32} />,
            title: t('program_6_title'),
            subtitle: t('program_6_sub'),
            desc: t('program_6_desc'),
            color: '#c62828'
        },
        {
            icon: <Home size={32} />,
            title: t('program_7_title'),
            subtitle: t('program_7_sub'),
            desc: t('program_7_desc'),
            color: '#00838f'
        },
        {
            icon: <Rocket size={32} />,
            title: t('program_8_title'),
            subtitle: t('program_8_sub'),
            desc: t('program_8_desc'),
            color: '#283593'
        }
    ];

    return (
        <section className="layanan-premium" id="layanan-pertanian">
            <div className="container">
                <div className="section-header">
                    <span className="badge">{t('program_badge')}</span>
                    <h2>{t('program_title')}</h2>
                    <p>{t('program_subtitle')}</p>
                </div>

                <div className="layanan-grid-modern">
                    {programs.map((item, index) => (
                        <div key={index} className="modern-program-card" style={{ '--accent': item.color }}>
                            <div className="card-bg-glow"></div>
                            <div className="card-content">
                                <div className="icon-wrapper">
                                    {item.icon}
                                </div>
                                <div className="text-content">
                                    <span className="subtitle">{item.subtitle}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LayananUnggulan;
