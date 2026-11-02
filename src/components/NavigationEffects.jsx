import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
export default function NavigationEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const first = useRef(true);
  const positions = useRef(new Map());
  useEffect(() => {
    const key = location.key;
    if (!first.current) {
      const position =
        navigationType === "POP" ? positions.current.get(key) || 0 : 0;
      window.scrollTo({ top: position, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
    first.current = false;
    return () => {
      positions.current.set(key, window.scrollY);
    };
  }, [location.key, navigationType]);
  useEffect(() => {
    const original = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = original;
    };
  }, []);
  return null;
}
