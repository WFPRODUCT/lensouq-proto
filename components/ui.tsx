import Link from "next/link";
import { getT } from "@/lib/i18n";

export function Shell({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: "en" | "ar";
}) {
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-neutral-900"
    >
      {children}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-600">
          © {new Date().getFullYear()} Lensouq
        </div>
      </footer>
    </div>
  );
}

export function Header({ lang }: { lang: "en" | "ar" }) {
  const t = getT(lang);

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-3">
        <Link href={`/?lang=${lang}`} className="font-semibold tracking-tight text-lg">
          Lensouq
        </Link>

        <nav className="flex items-center gap-2">
          <Link className="px-3 py-2 rounded-md hover:bg-neutral-100 text-sm" href={`/photographers?lang=${lang}`}>
            {t.navPhotographers}
          </Link>
          <Link className="px-3 py-2 rounded-md hover:bg-neutral-100 text-sm" href={`/models?lang=${lang}`}>
            {t.navModels}
          </Link>
          <Link className="px-3 py-2 rounded-md hover:bg-neutral-100 text-sm" href={`/request?lang=${lang}`}>
            {t.ctaRequest}
          </Link>

          <Link
            className="px-3 py-2 rounded-md border border-neutral-200 hover:bg-neutral-50 text-sm"
            href={`/?lang=${lang === "en" ? "ar" : "en"}`}
            aria-label="Toggle language"
          >
            {lang === "en" ? "AR" : "EN"}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 hover:border-neutral-300">
      {children}
    </span>
  );
}
