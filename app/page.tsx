import Link from "next/link";
import { getT } from "@/lib/i18n";
import { photographers, models } from "@/lib/mock";
import { Header, Shell } from "@/components/ui";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const sp = await searchParams;
  const lang = sp.lang === "ar" ? "ar" : "en";
  const t = getT(lang);

  return (
    <Shell lang={lang}>
      <Header lang={lang} />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-2xl border border-neutral-200 p-6 md:p-10 bg-neutral-50">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-3 text-neutral-600">{t.heroSubtitle}</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/photographers?lang=${lang}`}
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-5 py-3 text-sm hover:bg-neutral-800"
              >
                {t.ctaFindPhotographer}
              </Link>
              <Link
                href={`/models?lang=${lang}`}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm hover:bg-neutral-50"
              >
                {t.ctaFindModel}
              </Link>
              <Link
                href={`/request?lang=${lang}`}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm hover:bg-neutral-50"
              >
                {t.ctaRequest}
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-lg font-semibold">{t.featuredPhotographers}</h2>
            <Link
              className="text-sm text-neutral-600 hover:text-neutral-900"
              href={`/photographers?lang=${lang}`}
            >
              {t.viewAll}
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photographers.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                href={`/photographers/${p.id}?lang=${lang}`}
                className="rounded-2xl border border-neutral-200 hover:border-neutral-300 bg-white overflow-hidden flex flex-col"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-56 w-full object-cover bg-neutral-100"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-56 w-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
                    {t.photoPlaceholder}
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{p.name}</div>
                      <div className="text-sm text-neutral-600 truncate">
                        {p.specialty}
                      </div>
                      <div className="text-sm text-neutral-600 truncate">
                        {p.location}
                      </div>
                      <div className="mt-2 text-sm text-neutral-700">
                        ★ {p.rating.toFixed(1)} · {t.from} {p.priceQAR} QAR /{" "}
                        {t.perHour}
                      </div>
                    </div>

                    {p.verified && (
                      <span className="text-xs rounded-full border border-neutral-300 px-2 py-1 h-fit shrink-0">
                        {t.verified}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-lg font-semibold">{t.featuredModels}</h2>
            <Link
              className="text-sm text-neutral-600 hover:text-neutral-900"
              href={`/models?lang=${lang}`}
            >
              {t.viewAll}
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.slice(0, 6).map((m) => (
              <Link
                key={m.id}
                href={`/models/${m.id}?lang=${lang}`}
                className="rounded-2xl border border-neutral-200 hover:border-neutral-300 bg-white overflow-hidden flex flex-col"
              >
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-56 w-full object-cover bg-neutral-100"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-56 w-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
                    {t.photoPlaceholder}
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{m.name}</div>
                      <div className="text-sm text-neutral-600 truncate">
                        {m.specialty}
                      </div>
                      <div className="text-sm text-neutral-600 truncate">
                        {m.location}
                      </div>
                      <div className="mt-2 text-sm text-neutral-700">
                        ★ {m.rating.toFixed(1)} · {t.from} {m.priceQAR} QAR /{" "}
                        {t.perHour}
                      </div>
                    </div>

                    {m.verified && (
                      <span className="text-xs rounded-full border border-neutral-300 px-2 py-1 h-fit shrink-0">
                        {t.verified}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
