"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getT, Lang } from "@/lib/i18n";

export default function RequestPage({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const lang: Lang = searchParams?.lang === "ar" ? "ar" : "en";
  const t = useMemo(() => getT(lang), [lang]);

  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    type: "both",
    date: "",
    hours: "2",
    location: "Doha",
    budget: "800",
    notes: "",
    name: "",
    phone: "",
    email: "",
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-white text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between gap-3">
          <Link href={`/?lang=${lang}`} className="font-semibold tracking-tight text-lg">
            Lensouq
          </Link>
          <Link
            className="px-3 py-2 rounded-md border border-neutral-200 hover:bg-neutral-50 text-sm"
            href={`/request?lang=${lang === "en" ? "ar" : "en"}`}
          >
            {lang === "en" ? "AR" : "EN"}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link className="text-sm text-neutral-600 hover:text-neutral-900" href={`/?lang=${lang}`}>
          ← {t.backHome}
        </Link>

        {!sent ? (
          <>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight">{t.requestTitle}</h1>
            <p className="mt-1 text-sm text-neutral-600">{t.requestSubtitle}</p>

            <div className="mt-4 rounded-2xl border border-neutral-200 p-4 bg-neutral-50 text-sm text-neutral-700">
              {t.prototypeNote}
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <div className="text-sm font-medium">{t.requestType}</div>
                  <select
                    name="type"
                    value={form.type}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                  >
                    <option value="photographer">{t.typePhotographer}</option>
                    <option value="model">{t.typeModel}</option>
                    <option value="both">{t.typeBoth}</option>
                  </select>
                </label>

                <label className="block">
                  <div className="text-sm font-medium">{t.date}</div>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                    required
                  />
                </label>

                <label className="block">
                  <div className="text-sm font-medium">{t.hours}</div>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    name="hours"
                    value={form.hours}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                  />
                </label>

                <label className="block">
                  <div className="text-sm font-medium">{t.location}</div>
                  <input
                    name="location"
                    value={form.location}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                  />
                </label>

                <label className="block">
                  <div className="text-sm font-medium">{t.budget} (QAR)</div>
                  <input
                    type="number"
                    min={0}
                    name="budget"
                    value={form.budget}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                  />
                </label>

                <label className="block md:col-span-2">
                  <div className="text-sm font-medium">{t.notes}</div>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    placeholder={t.notesPlaceholder}
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                  />
                </label>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-4 bg-white">
                <div className="text-sm font-medium">Contact</div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <div className="text-sm font-medium">{t.name}</div>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                      required
                    />
                  </label>

                  <label className="block">
                    <div className="text-sm font-medium">{t.phone}</div>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <div className="text-sm font-medium">{t.email}</div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-xl bg-neutral-900 text-white px-4 py-3 text-sm hover:bg-neutral-800"
                >
                  {t.sendRequest}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="mt-6 rounded-2xl border border-neutral-200 p-6 bg-white">
            <h1 className="text-2xl font-semibold tracking-tight">{t.thankYou}</h1>
            <p className="mt-2 text-sm text-neutral-600">{t.sentNote}</p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/?lang=${lang}`}
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-5 py-3 text-sm hover:bg-neutral-800"
              >
                {t.backHome}
              </Link>
              <button
                onClick={() => setSent(false)}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm hover:bg-neutral-50"
              >
                {t.createAnother}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
