import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import { createAdminClient } from "@/lib/supabase/server";
import { deleteSaree } from "@/app/admin/actions";
import { discountPercent, type Saree } from "@/lib/types";
import ConfirmDeleteButton from "@/components/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("sarees")
    .select("*")
    .order("created_at", { ascending: false });

  const sarees = (data ?? []) as Saree[];

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <AdminNav />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">
          All sarees ({sarees.length})
        </h1>
        <Link
          href="/admin/new"
          className="rounded-md bg-maroon px-4 py-2 text-sm font-semibold text-ivory hover:bg-maroon-deep"
        >
          + Add new saree
        </Link>
      </div>

      {sarees.length === 0 ? (
        <p className="text-ink-soft">
          Nothing here yet.{" "}
          <Link href="/admin/new" className="text-maroon underline">
            Add your first saree
          </Link>
          .
        </p>
      ) : (
        <div className="divide-y divide-ink-soft/15 border-y border-ink-soft/15">
          {sarees.map((saree) => {
            const percent = discountPercent(saree);
            return (
              <div key={saree.id} className="flex items-center gap-4 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={saree.image_urls[0] ?? ""}
                  alt=""
                  className="h-16 w-14 flex-shrink-0 rounded-sm bg-ivory-deep object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink">{saree.name}</p>
                  <p className="text-sm text-ink-soft">
                    ₹{saree.price.toLocaleString("en-IN")}
                    {percent > 0 && (
                      <span className="ml-2 text-maroon">{percent}% off</span>
                    )}
                    {saree.is_sold && (
                      <span className="ml-2 text-ink-soft">· Sold</span>
                    )}
                    {saree.is_featured && (
                      <span className="ml-2 text-bottle">· Featured</span>
                    )}
                  </p>
                </div>
                <Link
                  href={`/admin/edit/${saree.id}`}
                  className="text-sm text-maroon underline"
                >
                  Edit
                </Link>
                <form action={deleteSaree.bind(null, saree.id)}>
                  <ConfirmDeleteButton />
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
