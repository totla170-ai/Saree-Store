import type { Saree } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-md border border-ink-soft/30 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-maroon";
const labelClass = "text-sm font-medium text-ink";

export default function SareeForm({
  action,
  saree,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  saree?: Saree;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div>
        <label className={labelClass}>
          Saree name
          <input
            name="name"
            required
            defaultValue={saree?.name}
            placeholder="e.g. Kanjivaram Silk — Deep Maroon"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className={labelClass}>
          Category
          <input
            name="category"
            defaultValue={saree?.category ?? ""}
            placeholder="e.g. Silk, Cotton, Wedding"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Fabric
          <input
            name="fabric"
            defaultValue={saree?.fabric ?? ""}
            placeholder="e.g. Kanjivaram Silk"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className={labelClass}>
          Current price (₹)
          <input
            name="price"
            type="number"
            min="1"
            step="1"
            required
            defaultValue={saree?.price}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Original price (₹) — optional
          <input
            name="original_price"
            type="number"
            min="1"
            step="1"
            defaultValue={saree?.original_price ?? ""}
            placeholder="Leave blank if no price drop"
            className={inputClass}
          />
        </label>
      </div>
      <p className="-mt-4 text-xs text-ink-soft">
        If original price is higher than current price, a &quot;% OFF&quot; badge
        shows automatically on the site. No other steps needed.
      </p>

      <label className={labelClass}>
        Description
        <textarea
          name="description"
          rows={4}
          defaultValue={saree?.description ?? ""}
          placeholder="Blouse piece included, work details, occasion, etc."
          className={inputClass}
        />
      </label>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={saree?.is_featured}
          />
          Feature on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="is_sold" defaultChecked={saree?.is_sold} />
          Mark as sold
        </label>
      </div>

      {saree && saree.image_urls.length > 0 && (
        <div>
          <p className={labelClass}>Current photos</p>
          <div className="mt-2 grid grid-cols-4 gap-3">
            {saree.image_urls.map((url) => (
              <label key={url} className="relative block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="aspect-square w-full rounded-md object-cover"
                />
                <span className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                  <input
                    type="checkbox"
                    name="keep_image"
                    value={url}
                    defaultChecked
                  />
                  Keep
                </span>
              </label>
            ))}
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            Uncheck &quot;Keep&quot; to remove a photo when you save.
          </p>
        </div>
      )}

      <label className={labelClass}>
        {saree ? "Add more photos" : "Photos"}
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className={`${inputClass} py-1.5`}
        />
      </label>

      <button
        type="submit"
        className="rounded-md bg-maroon px-6 py-3 text-sm font-semibold text-ivory hover:bg-maroon-deep"
      >
        {submitLabel}
      </button>
    </form>
  );
}
