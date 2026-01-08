import Link from "next/link";
import { getT } from "@/lib/i18n";
import { models } from "@/lib/mock";
import { Badge, Header, Shell } from "@/components/ui";

export default async function ModelProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const lang = sp.lang === "ar" ? "ar" : "en";
  const t = getT(lang);

  const m = models.find((x) => x.id === id);

  if (!m) {
    return (
      <Shell lang={lang}>
        <Header lang={lang} />
        <main className="mx-auto max-w-4xl px-4 py-10">
          <div className="text-sm text-neutral-600">{t.noResults}</div>
          <div className="mt-4">
            <Link className="text-sm underline" href={`/models?lang=${lang}`}>
              {t.back}
            </Link>
          </div>
        </main>
      </Shell>
    );
  }

  return (
    <Shell lang={lang}>
      <Header lang={lang} />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link className="text-sm text-neutral-600 hover:text-neutral-900" href={`/models?lang=${lang}`}>
          ← {t.back}
        </Link>

        <section className="mt-4 rounded-2xl border border-neutral-200 p-5 bg-white">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <div className="aspect-[16/10] rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
                {t.photoPlaceholder}
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">{m.name}</h1>
                  <p className="mt-1 text-sm text-neutral-600">{m.category} · {m.location}</p>
                </div>
                {m.verified && <Badge>{t.verified}</Badge>}
              </div>

              <div className="mt-4 rounded-xl border border-neutral-200 p-4 bg-neutral-50">
                <div className="text-sm font-medium">{t.pricing}</div>
                <div className="mt-1 text-sm text-neutral-700">
                  ★ {m.rating.toFixed(1)} · {t.from} <span className="font-semibold">{m.priceQAR} QAR</span> / {t.perHour}
                </div>
                <div className="mt-2 text-xs text-neutral-600">{t.pricingNote}</div>

                <Link
                  href={`/request?lang=${lang}`}
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800"
                >
                  {t.requestBooking}
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-neutral-200 p-3">
                  <div className="text-xs text-neutral-600">{t.height}</div>
                  <div className="text-sm font-medium">{m.heightCm} cm</div>
                </div>
                <div className="rounded-xl border border-neutral-200 p-3">
                  <div className="text-xs text-neutral-600">{t.languages}</div>
                  <div className="text-sm font-medium">{m.languages.join(", ")}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium">{t.about}</div>
                <p className="mt-1 text-sm text-neutral-700">{m.bio}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
