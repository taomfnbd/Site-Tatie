import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEditMode } from "../contexts/EditModeContext";
import {
  getChoice,
  saveChoice,
  sourceCategory,
  linkEvent,
  preferenceKey,
} from "../analytics/events";
const paths = new Set([
  "/",
  "/about",
  "/prestations",
  "/naturopathie",
  "/reflexologie",
  "/massage-assis",
  "/contact",
  "/mentions-legales",
  "/cgu",
  "/confidentialite",
]);
export default function Audience() {
  const location = useLocation();
  const { isAuthenticated } = useEditMode();
  const [choice, setChoice] = useState(null);
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState(false);
  const lastView = useRef(null);
  const source = useRef("direct");
  const admin =
    isAuthenticated || new URLSearchParams(location.search).has("admin");
  useEffect(() => {
    setChoice(getChoice());
    source.current = sourceCategory(document.referrer);
    setReady(true);
  }, []);
  useEffect(() => {
    const update = (event) => {
      if (event.key !== preferenceKey) return;
      setChoice(getChoice());
      lastView.current = null;
    };
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);
  useEffect(() => {
    if (
      !ready ||
      choice !== "accepted" ||
      admin ||
      __IS_PREVIEW__ ||
      !paths.has(location.pathname)
    )
      return;
    const send = (event) => {
      void fetch("/api/audience/event", {
        method: "POST",
        credentials: "same-origin",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consent: true,
          event,
          path: location.pathname,
          source: source.current,
          device: window.matchMedia("(max-width: 767px)").matches
            ? "mobile"
            : "desktop",
        }),
      }).catch(() => {});
    };
    const view = location.key + location.pathname;
    if (lastView.current !== view) {
      lastView.current = view;
      send("pageview");
    }
    const click = (event) => {
      const anchor =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (!anchor) return;
      const name = linkEvent(anchor.href);
      if (name) send(name);
    };
    document.addEventListener("click", click, true);
    document.addEventListener("auxclick", click, true);
    return () => {
      document.removeEventListener("click", click, true);
      document.removeEventListener("auxclick", click, true);
    };
  }, [ready, choice, admin, location.pathname, location.key]);
  const choose = (value) => {
    saveChoice(value);
    setChoice(value);
    setSettings(false);
    lastView.current = null;
  };
  if (!ready || admin) return null;
  return (
    <>
      <div className="bg-stone-100 px-5 py-3 text-center text-sm">
        <button
          className="underline p-2 text-stone-700"
          onClick={() => setSettings((v) => !v)}
        >
          Préférences de mesure d’audience
        </button>
      </div>
      {(!choice || settings) && (
        <section
          aria-label="Choix de mesure d’audience"
          className="fixed bottom-3 inset-x-3 sm:left-auto sm:right-5 sm:max-w-md z-[100] rounded-xl bg-white border border-stone-300 shadow-xl p-5 text-stone-800"
        >
          <p className="font-semibold">Nous aider à améliorer le site</p>
          <p className="text-sm mt-2">
            Avec votre accord, nous comptons les pages vues et les clics vers
            Resalib, le téléphone et l’email. Aucun nom ni contenu de message
            n’est enregistré. Votre choix est modifiable à tout moment.
          </p>
          <Link
            className="underline text-sm inline-block py-2"
            to="/confidentialite"
          >
            En savoir plus
          </Link>
          <div className="flex gap-3 mt-2">
            <button
              className="flex-1 border border-stone-500 rounded-lg px-3 py-3"
              onClick={() => choose("refused")}
            >
              Refuser
            </button>
            <button
              className="flex-1 border border-stone-500 rounded-lg px-3 py-3"
              onClick={() => choose("accepted")}
            >
              Accepter
            </button>
          </div>
          {choice && (
            <button
              className="underline text-sm mt-3 p-1"
              onClick={() => setSettings(false)}
            >
              Fermer sans modifier
            </button>
          )}
        </section>
      )}
    </>
  );
}
