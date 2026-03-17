import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Simulasikan waktu loading (1.2 detik)
        const timer = setTimeout(() => {
            setIsFadingOut(true);
            
            // Tunggu animasi fade out selesai (0.5 detik)
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }, 1200);

        // Kunci scroll saat loading
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto';
        };
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className={`loading-screen-simple ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="loading-content-simple">
                <div className="spinner-minimal"></div>
                <div className="loading-text-simple">Memuat</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
