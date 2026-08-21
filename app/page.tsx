import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { createAdminClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";
import type { Saree } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = createAdminClient();

  const { data: allSarees } = await supabase
    .from("sarees")
    .select("*")
    .order("created_at", { ascending: false });

  const sarees = (allSarees ?? []) as Saree[];
  const categories = Array.from(
    new Set(sarees.map((s) => s.category).filter((c): c is string => !!c))
  ).sort();

  const visible = category
    ? sarees.filter((s) => s.category === category)
    : sarees;

  const featured = sarees.find((s) => s.is_featured && s.image_urls[0]);

  return (
    <>
      <Header />

      <section className="mx-auto max-w-6xl px-5 pt-8">
        <div className="relative overflow-hidden rounded-sm bg-ink">
          {featured?.image_urls[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featured.image_urls[0]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
          )}
          <div className="relative flex min-h-[320px] flex-col items-start justify-center gap-4 px-8 py-16 sm:px-14">
            <h1 className="max-w-xl font-display text-4xl italic leading-tight text-ivory sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="max-w-md text-sm text-ivory/80">
              Browse the collection below, then message us on WhatsApp to check
              availability — no online payment needed.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-6">
          <CategoryFilter categories={categories} active={category} />
        </div>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-ink-soft">
            {sarees.length === 0
              ? "No sarees added yet. Add your first one from the admin page."
              : "No sarees in this category yet."}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((saree) => (
              <ProductCard key={saree.id} saree={saree} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
