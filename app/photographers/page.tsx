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
  const max = sp.max ? Number(sp.max) : 10000;
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
    <Shell lang={lang}>
      <Header lang={lang} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <Link
            key={p.id}
            href={`/photographers/${p.id}`}
            className="rounded-xl border hover:shadow-lg transition bg-white overflow-hidden"
          >
            {/* IMAGE */}
            <div className="aspect-[4/3] bg-gray-100">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* INFO */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                {p.verified && <Badge>Verified</Badge>}
              </div>

              <p className="text-sm text-gray-600">{p.specialty}</p>
              <p className="text-sm text-gray-500">{p.location}</p>

              <p className="mt-2 font-medium">
                {p.priceQAR} QAR / hour
              </p>

              <p className="text-sm text-gray-500 mt-1">
                ⭐ {p.rating}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
