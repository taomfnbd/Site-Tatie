import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import { updatePageSEO, getStructuredData, getPageSEO } from "../utils/seo";
export default function SEOHead() {
  const path = useLocation().pathname.replace(/\/+$/, "") || "/";
  const { globalContent, pagesContent } = useContent();
  useEffect(() => {
    const content = {
      ...globalContent,
      pages: Object.fromEntries(
        Object.entries(pagesContent).map(([key, page]) => [key, page.sections]),
      ),
    };
    updatePageSEO(getPageSEO(path, content));
    let script = document.getElementById("structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(getStructuredData(path, content));
  }, [path, globalContent, pagesContent]);
  return null;
}
