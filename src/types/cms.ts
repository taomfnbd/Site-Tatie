// Types pour le CMS
export interface Section {
  id: string;
  type: string;
  content: Record<string, any>;
  order: number;
}

export interface PageData {
  pageKey: string;
  sections: Section[];
}
