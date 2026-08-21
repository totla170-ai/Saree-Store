import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceBadge from "@/components/PriceBadge";
import WhatsAppButton from "@/components/WhatsAppButton";
import { createAdminClient } from "@/lib/supabase/server";
import type { Saree } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("sarees")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const saree = data as Saree;

  return (
    <>
      <Header />

      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="space-y-3">
            {saree.image_urls.length === 0 ? (
              <div className="flex aspect-[3/4] items-center justify-center bg-ivory-deep text-ink-soft">
                No photos yet
              </div>
            ) : (
              saree.image_urls.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={url}
                  src={url}
                  alt={`${saree.name} — photo ${i + 1}`}
                  className="w-full rounded-sm object-cover"
                />
              ))
            )}
          </div>

          <div>
            {saree.category && (
              <p className="text-xs uppercase tracking-[0.15em] text-bottle">
                {saree.category}
              </p>
            )}
            <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
              {saree.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="font-display text-2xl text-maroon">
                ₹{saree.price.toLocaleString("en-IN")}
              </span>
              {saree.original_price && saree.original_price > saree.price && (
                <span className="text-base text-ink-soft line-through">
                  ₹{saree.original_price.toLocaleString("en-IN")}
                </span>
              )}
              <PriceBadge saree={saree} />
            </div>

            {saree.is_sold && (
              <p className="mt-3 inline-block rounded-full bg-ink px-3 py-1 text-xs font-semibold text-ivory">
                This piece is sold
              </p>
            )}

            {saree.fabric && (
              <p className="mt-4 text-sm text-ink-soft">
                <span className="font-medium text-ink">Fabric: </span>
                {saree.fabric}
              </p>
            )}

            {saree.description && (
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
                {saree.description}
              </p>
            )}

            <div className="mt-8">
              {!saree.is_sold && (
                <WhatsAppButton productName={saree.name} price={saree.price} full />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
