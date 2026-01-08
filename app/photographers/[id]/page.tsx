import Link from "next/link";
import { getT } from "@/lib/i18n";
import { photographers } from "@/lib/mock";
import { Badge, Header, Shell } from "@/components/ui";

export default async function PhotographerProfilePage({
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

  const p = photographers.find((x) => x.id === id);

  if (!p) {
    return (
      <Shell lang={lang}>
        <Header lang={lang} />
        <main className="mx-auto max-w-4xl px-4 py-10">
          <div className="text-sm text-neutral-600">{t.noResults}</div>
          <div className="mt-4">
            <Link className="text-sm underline" href={`/photographers?lang=${lang}`}>
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
        <Link className="text-sm text-neutral-600 hover:text-neutral-900" href={`/photographers?lang=${lang}`}>
          ← {t.back}
        </Link>

        <section className="mt-4 rounded-2xl border border-neutral-200 p-5 bg-white">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[16/10] w-full rounded-xl object-cover bg-neutral-100"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[16/10] w-full rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
                  {t.photoPlaceholder}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">{p.name}</h1>
                  <p className="mt-1 text-sm text-neutral-600">
                    {p.specialty} · {p.location}
                  </p>
                </div>
                {p.verified && <Badge>{t.verified}</Badge>}
              </div>

              <div className="mt-4 rounded-xl border border-neutral-200 p-4 bg-neutral-50">
                <div className="text-sm font-medium">{t.pricing}</div>
                <div className="mt-1 text-sm text-neutral-700">
                  ★ {p.rating.toFixed(1)} · {t.from}{" "}
                  <span className="font-semibold">{p.priceQAR} QAR</span> / {t.perHour}
                </div>
                <div className="mt-2 text-xs text-neutral-600">{t.pricingNote}</div>

                <Link
                  href={`/request?lang=${lang}`}
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800"
                >
                  {t.requestBooking}
                </Link>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium">{t.about}</div>
                <p className="mt-1 text-sm text-neutral-700">{p.bio}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-neutral-200 p-5 bg-white">
          <div className="text-sm font-medium">{t.reviews}</div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {p.reviews.map((r, idx) => (
              <div key={idx} className="rounded-xl border border-neutral-200 p-4">
                <div className="text-sm font-medium">{r.author}</div>
                <div className="text-sm text-neutral-700 mt-1">★ {r.stars.toFixed(1)}</div>
                <div className="text-sm text-neutral-600 mt-2">{r.text}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
