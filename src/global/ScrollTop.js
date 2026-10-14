import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// On every route change: jump to the top, or - if the URL has a #hash
// (e.g. /affiliates#join) - glide to that section once the page has rendered.
function ScrollTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(timer);
      } else if (tries > 20) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [pathname, hash]);

  return null;
}

export default ScrollTop;
