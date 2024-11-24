import { useEffect } from 'react';

const FaviconSwitcher = () => {
    useEffect(() => {
        const colors = ['Blue', 'Green', 'Purple', 'Yellow'];
        let currentIndex = 0;
        
        function changeFavicon() {
            const currentColor = colors[currentIndex];
            
            // Aggiorna favicon-16x16
            let link16 = document.head.querySelector("link[sizes='16x16']");
            if (!link16) {
                const newLink = document.createElement('link');
                newLink.setAttribute('rel', 'icon');
                newLink.setAttribute('sizes', '16x16');
                newLink.setAttribute('href', `/Favicons/${currentColor}/favicon-16x16.png`);
                document.head.appendChild(newLink);
            } else {
                (link16 as HTMLLinkElement).href = `/Favicons/${currentColor}/favicon-16x16.png`;
            }

            // Aggiorna favicon-32x32
            let link32 = document.head.querySelector("link[sizes='32x32']");
            if (!link32) {
                const newLink = document.createElement('link');
                newLink.setAttribute('rel', 'icon');
                newLink.setAttribute('sizes', '32x32');
                newLink.setAttribute('href', `/Favicons/${currentColor}/favicon-32x32.png`);
                document.head.appendChild(newLink);
            } else {
                (link32 as HTMLLinkElement).href = `/Favicons/${currentColor}/favicon-32x32.png`;
            }

            // Aggiorna apple-touch-icon
            let linkApple = document.head.querySelector("link[rel='apple-touch-icon']");
            if (!linkApple) {
                const newLink = document.createElement('link');
                newLink.setAttribute('rel', 'apple-touch-icon');
                newLink.setAttribute('href', `/Favicons/${currentColor}/apple-touch-icon.png`);
                document.head.appendChild(newLink);
            } else {
                (linkApple as HTMLLinkElement).href = `/Favicons/${currentColor}/apple-touch-icon.png`;
            }

            // Aggiorna manifest
            let manifest = document.head.querySelector("link[rel='manifest']");
            if (!manifest) {
                const newLink = document.createElement('link');
                newLink.setAttribute('rel', 'manifest');
                newLink.setAttribute('href', `/Favicons/${currentColor}/site.webmanifest`);
                document.head.appendChild(newLink);
            } else {
                (manifest as HTMLLinkElement).href = `/Favicons/${currentColor}/site.webmanifest`;
            }

            currentIndex = (currentIndex + 1) % colors.length;
        }
        
        const interval = setInterval(changeFavicon, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return null;
};

export default FaviconSwitcher;