import { discountPercent } from "@/lib/types";
import type { Saree } from "@/lib/types";

export default function PriceBadge({
  saree,
}: {
  saree: Pick<Saree, "price" | "original_price">;
}) {
  const percent = discountPercent(saree);
  if (percent <= 0) return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-maroon px-2.5 py-1 text-xs font-semibold tracking-wide text-ivory">
      {percent}% OFF
    </span>
  );
}
