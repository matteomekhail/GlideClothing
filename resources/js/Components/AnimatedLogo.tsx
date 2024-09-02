import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logoColors = ['green', 'pink', 'yellow', 'blue'];

const AnimatedLogo = () => {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logoColors.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <a href='/'>
            <div className="flex items-center">
                <div className="relative w-8 h-8 mr-2">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.img
                            key={currentLogoIndex}
                            src={`/img/Icon${logoColors[currentLogoIndex]}.png`}
                            alt={`Glide Logo Icon ${logoColors[currentLogoIndex]}`}
                            className="w-full h-full absolute"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                </div>
                <img src="/img/TextGlide.png" alt="Glide" className="h-8" />
            </div>
        </a>
    );
};

export default AnimatedLogo;
