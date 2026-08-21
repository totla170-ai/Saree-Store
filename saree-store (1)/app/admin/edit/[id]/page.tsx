import { notFound } from "next/navigation";
import AdminNav from "@/components/AdminNav";
import SareeForm from "@/components/SareeForm";
import { createAdminClient } from "@/lib/supabase/server";
import { updateSaree } from "@/app/admin/actions";
import type { Saree } from "@/lib/types";

export default async function EditSareePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase.from("sarees").select("*").eq("id", id).single();

  if (!data) notFound();
  const saree = data as Saree;

  const action = updateSaree.bind(null, id);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <AdminNav />
      <h1 className="mb-6 font-display text-2xl text-ink">Edit saree</h1>
      <SareeForm action={action} saree={saree} submitLabel="Save changes" />
    </div>
  );
}
