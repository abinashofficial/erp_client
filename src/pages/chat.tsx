import React, { useEffect } from "react";

const TawkToWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/67919088825083258e09924e/1ii89p60t";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      // Cleanup if necessary when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visible UI is rendered from this component
};

export default TawkToWidget;
