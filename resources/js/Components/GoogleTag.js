// GoogleTag.tsx
import { useEffect } from 'react';

const GoogleTag = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-QL6BPEQ6WQ';
    script.async = true;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-QL6BPEQ6WQ');

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return null;
};

export default GoogleTag;
