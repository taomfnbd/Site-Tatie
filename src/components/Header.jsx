import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import SafeIcon from "../common/SafeIcon";
import EditableText from "./admin/EditableText";
import { useContent } from "../contexts/ContentContext";
import { bookingUrl } from "../utils/business";
export default function Header() {
  const { globalContent, updateGlobalContent } = useContent();
  const data = globalContent.header;
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const edit = (field, value) =>
    updateGlobalContent("header", { ...data, [field]: value });
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/95 backdrop-blur-lg">
      <nav
        aria-label="Navigation principale"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Alaïs Tavernier, accueil"
          >
            <img
              src="/images/libellule-3.png"
              alt=""
              width="40"
              height="40"
              className="w-9 h-9 sm:w-10 sm:h-10 brightness-50"
            />
            <span>
              <EditableText
                value={data.brand.name}
                element="span"
                className="block text-sm sm:text-base font-semibold text-stone-800"
                onChange={(name) => edit("brand", { ...data.brand, name })}
              />
              <EditableText
                value={data.brand.subtitle}
                element="span"
                className="block text-xs text-[#5e7056]"
                onChange={(subtitle) =>
                  edit("brand", { ...data.brand, subtitle })
                }
              />
            </span>
          </Link>
          <div className="hidden xl:flex items-center gap-1">
            {data.links.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                aria-current={
                  (location.pathname.replace(/\/+$/, "") || "/") === item.href
                    ? "page"
                    : undefined
                }
                className={`px-3 py-3 rounded-lg text-sm font-medium ${(location.pathname.replace(/\/+$/, "") || "/") === item.href ? "bg-stone-100 text-[#5e7056]" : "text-stone-700 hover:bg-stone-50"}`}
              >
                <EditableText
                  value={item.name}
                  element="span"
                  onChange={(name) =>
                    edit(
                      "links",
                      data.links.map((link, i) =>
                        i === index ? { ...link, name } : link,
                      ),
                    )
                  }
                />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center min-h-11 px-5 rounded-full bg-[#5e7056] text-white text-sm font-medium hover:bg-[#4e6048]"
            >
              {data.cta}
            </a>
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 xl:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-stone-100"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <SafeIcon icon={open ? FiX : FiMenu} className="text-xl" />
            </button>
          </div>
        </div>
        {open && (
          <div
            id="mobile-navigation"
            className="xl:hidden pb-5 border-t border-stone-100 max-h-[calc(100dvh-5rem)] overflow-y-auto"
          >
            <div className="pt-3 space-y-1">
              {data.links.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    (location.pathname.replace(/\/+$/, "") || "/") === item.href
                      ? "page"
                      : undefined
                  }
                  className={`block px-4 py-3 rounded-lg font-medium ${(location.pathname.replace(/\/+$/, "") || "/") === item.href ? "bg-stone-100 text-[#5e7056]" : "text-stone-700 hover:bg-stone-50"}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#5e7056] text-white rounded-xl px-4 py-3 mt-3"
            >
              Prendre rendez-vous
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
