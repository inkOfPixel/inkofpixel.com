import { IPageLocale } from "types";

export interface PageShell {
  locale: string;
  defaultLocale: string;
  pageLocales: IPageLocale[];
  navigationLinks: Array<{ label: string; url: string }>;
  cookiePolicyPath?: string;
}
