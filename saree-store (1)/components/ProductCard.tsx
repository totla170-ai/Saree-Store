import Link from "next/link";
import PriceBadge from "@/components/PriceBadge";
import type { Saree } from "@/lib/types";

export default function ProductCard({ saree }: { saree: Saree }) {
  const image = saree.image_urls[0];

  return (
    <Link
      href={`/product/${saree.id}`}
      className="zari-frame group block"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-ivory-deep">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={saree.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-ink-soft">
            No photo yet
          </div>
        )}

        {saree.is_sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/50">
            <span className="rounded-full bg-ivory px-3 py-1 text-xs font-semibold tracking-wide text-ink">
              Sold
            </span>
          </div>
        )}

        {!saree.is_sold && (
          <div className="absolute left-2 top-2">
            <PriceBadge saree={saree} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="font-display text-xl leading-tight text-ink">
          {saree.name}
        </h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-body text-sm font-semibold text-maroon">
            ₹{saree.price.toLocaleString("en-IN")}
          </span>
          {saree.original_price && saree.original_price > saree.price && (
            <span className="text-xs text-ink-soft line-through">
              ₹{saree.original_price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
