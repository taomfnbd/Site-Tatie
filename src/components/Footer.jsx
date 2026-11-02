import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiPhone, FiCalendar } from "react-icons/fi";
import SafeIcon from "../common/SafeIcon";
import EditableText from "./admin/EditableText";
import { useContent } from "../contexts/ContentContext";
import { bookingUrl, phoneHref, instagramProfileUrl } from "../utils/business";
export default function Footer() {
  const { globalContent, updateGlobalContent } = useContent();
  const data = globalContent.footer;
  const update = (group, field, value) =>
    updateGlobalContent("footer", {
      ...data,
      [group]: { ...data[group], [field]: value },
    });
  return (
    <footer className="bg-stone-900 text-stone-100 px-4 sm:px-6 lg:px-8 pt-12 pb-7">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="font-semibold text-lg mb-2">
              <EditableText
                value={data.brand.name}
                element="span"
                onChange={(v) => update("brand", "name", v)}
              />
            </h2>
            <EditableText
              value={data.brand.role}
              element="p"
              className="text-stone-300 text-sm"
              onChange={(v) => update("brand", "role", v)}
            />
            <EditableText
              value={data.brand.description}
              element="p"
              className="text-stone-300 text-sm leading-relaxed mt-4"
              onChange={(v) => update("brand", "description", v)}
            />
          </div>
          <nav aria-label="Navigation de pied de page">
            <h2 className="font-semibold mb-3">Découvrir</h2>
            <ul>
              {globalContent.header.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-stone-300 hover:text-white underline-offset-4 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-semibold mb-3">Au cabinet</h2>
            <EditableText
              value={data.contact.address}
              allowHTML
              element="p"
              className="text-sm text-stone-300 leading-relaxed mb-3"
              onChange={(v) => update("contact", "address", v)}
            />
            <a
              href={phoneHref(data.contact.phone)}
              className="flex items-center gap-2 min-h-11 text-sm text-stone-200 hover:text-white"
            >
              <SafeIcon icon={FiPhone} />
              {data.contact.phone}
            </a>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 min-h-11 text-sm text-stone-200 hover:text-white"
            >
              <SafeIcon icon={FiCalendar} />
              {data.contact.bookingText}
            </a>
          </div>
          <div>
            <h2 className="font-semibold mb-3">Horaires</h2>
            {data.schedule ? (
              <>
                <ul>
                  {data.schedule
                    .filter((day) => day.hours !== "Fermé")
                    .map((day) => (
                      <li
                        key={day.day}
                        className="text-stone-300 text-sm leading-relaxed mb-2"
                      >
                        {day.day} : {day.hours}
                      </li>
                    ))}
                </ul>
                <p className="text-stone-300 text-sm mt-3">
                  Consultations sur rendez-vous
                </p>
              </>
            ) : (
              ["line1", "line2", "line3"].map((key) => (
                <EditableText
                  key={key}
                  value={data.hours[key]}
                  allowHTML
                  element="p"
                  className="text-stone-300 text-sm leading-relaxed mb-2"
                  onChange={(v) => update("hours", key, v)}
                />
              ))
            )}
            <a
              href={instagramProfileUrl(data.social.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-11 mt-2 text-sm text-stone-200 hover:text-white"
            >
              <SafeIcon icon={FiInstagram} />
              Instagram
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-stone-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-xs text-stone-300">
          <p>
            © {new Date().getFullYear()} {data.brand.name}. Tous droits
            réservés.
          </p>
          <nav
            aria-label="Informations légales"
            className="flex flex-wrap gap-x-5"
          >
            {[
              ["/mentions-legales", "Mentions légales"],
              ["/cgu", "CGU"],
              ["/confidentialite", "Confidentialité"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center min-h-11 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
