import Link from "next/link";
import { getT } from "@/lib/i18n";
import { models } from "@/lib/mock";
import { Badge, Header, Shell } from "@/components/ui";

export default async function ModelsPage({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
    min?: string;
    max?: string;
    verified?: string;
    q?: string;
  }>;
}) {
  const sp = await searchParams;
  const lang = sp.lang === "ar" ? "ar" : "en";
  const t = getT(lang);

  const min = sp.min ? Number(sp.min) : 0;
  const max = sp.max ? Number(sp.max) : 100000;
  const onlyVerified = sp.verified === "1";
  const q = (sp.q || "").toLowerCase().trim();

  const list = models.filter((m) => {
    if (m.priceQAR < min || m.priceQAR > max) return false;
    if (onlyVerified && !m.verified) return false;
    if (
      q &&
      !(
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      )
    )
      return false;
    return true;
  });

  return (
    <Shell lang={lang}>
      <Header lang={lang} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t.navModels}</h1>
            <p className="mt-1 text-sm text-neutral-600">{t.browseModels}</p>
          </div>
          <Link
            href={`/request?lang=${lang}`}
            className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800"
          >
            {t.ctaRequest}
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`/models?lang=${lang}`}><Badge>{t.filterAll}</Badge></Link>
          <Link href={`/models?lang=${lang}&verified=1`}><Badge>{t.filterVerified}</Badge></Link>
          <Link href={`/models?lang=${lang}&max=350`}><Badge>{t.filterUnder350}</Badge></Link>
          <Link href={`/models?lang=${lang}&q=fashion`}><Badge>{t.filterFashion}</Badge></Link>
          <Link href={`/models?lang=${lang}&q=commercial`}><Badge>{t.filterCommercial}</Badge></Link>
        </div>

        <div className="mt-4 rounded-2xl border border-neutral-200 p-3 bg-white">
          <form className="flex flex-col sm:flex-row gap-2" action="/models" method="get">
            <input type="hidden" name="lang" value={lang} />
            <input
              name="q"
              defaultValue={sp.q || ""}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
            />
            <button className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800">
              {t.search}
            </button>
          </form>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((m) => (
            <Link
              key={m.id}
              href={`/models/${m.id}?lang=${lang}`}
              className="rounded-2xl border border-neutral-200 p-4 hover:border-neutral-300 bg-white"
            >
              <div className="aspect-[16/10] rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
                {t.photoPlaceholder}
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-neutral-600">{m.category}</div>
                </div>
                {m.verified && (
                  <span className="text-xs rounded-full border border-neutral-300 px-2 py-1">
                    {t.verified}
                  </span>
                )}
              </div>
              <div className="mt-2 text-sm text-neutral-700">
                ★ {m.rating.toFixed(1)} · {t.from} {m.priceQAR}/h · {m.location}
              </div>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-8 text-sm text-neutral-600">{t.noResults}</div>
        )}
      </main>
    </Shell>
  );
}
