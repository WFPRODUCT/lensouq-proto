import Link from "next/link";
import { getT } from "@/lib/i18n";
import { photographers } from "@/lib/mock";
import { Badge, Header, Shell } from "@/components/ui";

export default async function PhotographersPage({
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

  const list = photographers.filter((p) => {
    if (p.priceQAR < min || p.priceQAR > max) return false;
    if (onlyVerified && !p.verified) return false;
    if (
      q &&
      !p.name.toLowerCase().includes(q) &&
      !p.specialty.toLowerCase().includes(q)
    )
      return false;
    return true;
  });

  return (
    <Shell>
      <Header lang={lang} />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          {t.photographersTitle}
        </h1>
        <p className="text-neutral-600">
          {t.photographersSubtitle}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link
            key={p.id}
            href={`/photographers/${p.id}`}
            className="rounded-xl border p-4 hover:shadow transition"
          >
            {/* IMAGE */}
            <div className="aspect-[16/10] mb-3 overflow-hidden rounded-lg bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={(p as any).image}
                alt={p.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.name}</h3>
              {p.verified && <Badge>Verified</Badge>}
            </div>

            <p className="text-sm text-neutral-600">
              {p.specialty}
            </p>
            <p className="text-sm text-neutral-500">
              {p.location}
            </p>

            <p className="mt-2 font-medium">
              {p.priceQAR} QAR / hour
            </p>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
