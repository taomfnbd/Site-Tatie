import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initialSiteContent } from "../data/siteContent";
import { useEditMode } from "./EditModeContext";
import { syncServicePrices } from "../utils/servicePrices";
import type { Section } from "../types/cms";
type PageContent = {
  pageKey: string;
  sections: Section[];
  hasChanges: boolean;
};
type PublishState = "idle" | "deploying" | "live" | "pending";
interface ContentContextType {
  pagesContent: Record<string, PageContent>;
  globalContent: Record<string, any>;
  updatePageSections: (key: string, sections: Section[]) => void;
  updateGlobalContent: (key: string, data: any) => void;
  saveAllChanges: () => Promise<void>;
  exportData: () => void;
  publishToGitHub: () => Promise<void>;
  getPageSections: (key: string) => Section[];
  getGlobalContent: (key: string) => any;
  hasUnsavedChanges: boolean;
  hasUnpublishedChanges: boolean;
  draftWarning: string;
  discardDraft: () => void;
  exportStoredDraft: () => void;
  publishState: PublishState;
}
const ContentContext = createContext<ContentContextType | undefined>(undefined);
const DRAFT_KEY = "tatie-cms-draft-v2";
const builtRevision =
  typeof __CONTENT_REVISION__ === "string" ? __CONTENT_REVISION__ : "";
const initialPages = () =>
  Object.fromEntries(
    Object.entries(initialSiteContent.pages).map(([key, sections]) => [
      key,
      { pageKey: key, sections: sections as Section[], hasChanges: false },
    ]),
  );
function download(data: unknown) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `site-content-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
export function ContentProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useEditMode();
  const [pagesContent, setPagesContent] =
    useState<Record<string, PageContent>>(initialPages);
  const [globalContent, setGlobalContent] = useState<Record<string, any>>({
    header: initialSiteContent.header,
    footer: initialSiteContent.footer,
  });
  const [globalHasChanges, setGlobalHasChanges] = useState(false);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [draftWarning, setDraftWarning] = useState("");
  const [revision, setRevision] = useState(builtRevision);
  const [publishState, setPublishState] = useState<PublishState>("idle");
  const [publishedRevision, setPublishedRevision] = useState("");
  const hasUnsavedChanges =
    globalHasChanges || Object.values(pagesContent).some((p) => p.hasChanges);
  const data = useMemo(
    () => ({
      ...globalContent,
      pages: Object.fromEntries(
        Object.entries(pagesContent).map(([key, page]) => [key, page.sections]),
      ),
    }),
    [globalContent, pagesContent],
  );
  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      if (!stored) {
        if (
          Object.keys(localStorage).some(
            (k) => k.startsWith("page_") || k === "cms_global_content",
          )
        )
          setDraftWarning(
            "Un ancien brouillon est disponible à l’export. Le contenu public reste à jour.",
          );
        return;
      }
      const draft = JSON.parse(stored);
      if (draft.revision !== builtRevision) {
        setDraftWarning(
          "Le site a changé depuis ce brouillon. Exportez-le pour conserver vos textes, puis repartez de la version en ligne.",
        );
        return;
      }
      if (!draft.data?.pages || !draft.data?.header || !draft.data?.footer)
        throw new Error("Invalid draft");
      setPagesContent(
        Object.fromEntries(
          Object.entries(initialSiteContent.pages).map(([key, sections]) => [
            key,
            {
              pageKey: key,
              sections: draft.data.pages[key] || sections,
              hasChanges: false,
            },
          ]),
        ),
      );
      setGlobalContent({
        header: draft.data.header,
        footer: draft.data.footer,
      });
      setHasUnpublishedChanges(true);
    } catch {
      setDraftWarning(
        "Le brouillon local n’a pas pu être restauré. La version en ligne est conservée.",
      );
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasUnsavedChanges]);
  useEffect(() => {
    if (!publishedRevision) return;
    let active = true;
    const started = Date.now();
    const check = async () => {
      try {
        const response = await fetch(`/version.json?t=${Date.now()}`, {
          cache: "no-store",
        });
        const version = await response.json();
        if (active && version.revision === publishedRevision) {
          setPublishState("live");
          setPublishedRevision("");
        }
      } catch {
        /* A deployment can briefly be unavailable; retain the pending status. */
      }
      if (active && Date.now() - started > 300000) {
        setPublishState("pending");
        setPublishedRevision("");
      }
    };
    const timer = window.setInterval(() => {
      void check();
    }, 7000);
    void check();
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [publishedRevision]);
  const updatePageSections = useCallback(
    (key: string, sections: Section[]) => {
      if (!isAuthenticated) return;
      setPagesContent((prev) => {
        const raw = Object.fromEntries(
          Object.entries(prev).map(([pageKey, page]) => [
            pageKey,
            pageKey === key ? sections : page.sections,
          ]),
        );
        const synced = syncServicePrices(raw, key, prev[key]?.sections || []);
        return Object.fromEntries(
          Object.entries(synced).map(([pageKey, value]) => [
            pageKey,
            {
              pageKey,
              sections: value as Section[],
              hasChanges:
                pageKey === key ||
                JSON.stringify(value) !==
                  JSON.stringify(prev[pageKey]?.sections) ||
                prev[pageKey]?.hasChanges,
            },
          ]),
        );
      });
      setHasUnpublishedChanges(true);
    },
    [isAuthenticated],
  );
  const updateGlobalContent = useCallback(
    (key: string, value: any) => {
      if (!isAuthenticated) return;
      setGlobalContent((prev) => ({ ...prev, [key]: value }));
      setGlobalHasChanges(true);
      setHasUnpublishedChanges(true);
    },
    [isAuthenticated],
  );
  const markSaved = () => {
    setPagesContent((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([key, page]) => [
          key,
          { ...page, hasChanges: false },
        ]),
      ),
    );
    setGlobalHasChanges(false);
  };
  const saveAllChanges = async () => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ revision, data, savedAt: new Date().toISOString() }),
    );
    markSaved();
  };
  const discardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    Object.keys(localStorage)
      .filter((k) => k.startsWith("page_") || k === "cms_global_content")
      .forEach((k) => localStorage.removeItem(k));
    setPagesContent(initialPages());
    setGlobalContent({
      header: initialSiteContent.header,
      footer: initialSiteContent.footer,
    });
    setGlobalHasChanges(false);
    setHasUnpublishedChanges(false);
    setDraftWarning("");
    setRevision(builtRevision);
  };
  const exportStoredDraft = () => {
    const legacy = Object.fromEntries(
      Object.keys(localStorage)
        .filter((k) => k.startsWith("page_") || k === "cms_global_content")
        .map((k) => [k, localStorage.getItem(k)]),
    );
    download({ currentDraft: localStorage.getItem(DRAFT_KEY), legacy });
  };
  const publishToGitHub = async () => {
    if (draftWarning)
      throw new Error(
        "Exportez puis abandonnez le brouillon périmé avant de publier.",
      );
    await saveAllChanges();
    const response = await fetch("/api/cms/content", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: data, revision }),
    });
    const result = await response.json();
    if (!response.ok)
      throw new Error(result.error || "Publication impossible.");
    setRevision(result.revision);
    markSaved();
    setHasUnpublishedChanges(false);
    localStorage.removeItem(DRAFT_KEY);
    setPublishState("deploying");
    setPublishedRevision(result.revision);
  };
  const getPageSections = useCallback(
    (key: string) => pagesContent[key]?.sections || [],
    [pagesContent],
  );
  const getGlobalContent = useCallback(
    (key: string) => globalContent[key],
    [globalContent],
  );
  return (
    <ContentContext.Provider
      value={{
        pagesContent,
        globalContent,
        updatePageSections,
        updateGlobalContent,
        saveAllChanges,
        exportData: () => download(data),
        publishToGitHub,
        getPageSections,
        getGlobalContent,
        hasUnsavedChanges,
        hasUnpublishedChanges,
        draftWarning,
        discardDraft,
        exportStoredDraft,
        publishState,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error("ContentProvider manquant");
  return context;
}
