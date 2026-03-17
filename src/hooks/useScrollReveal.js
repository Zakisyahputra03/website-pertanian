import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollReveal = () => {
    const location = useLocation();

    useEffect(() => {
        const reveal = () => {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const revealPoint = 100;

                if (elementTop < windowHeight - revealPoint) {
                    reveals[i].classList.add('active');
                }
            }
        };

        window.addEventListener('scroll', reveal);
        // Initial check and a small timeout to ensure DOM is ready
        setTimeout(reveal, 100);

        return () => window.removeEventListener('scroll', reveal);
    }, [location]); // Re-run when route changes
};

export default useScrollReveal;
