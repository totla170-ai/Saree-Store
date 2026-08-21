import AdminNav from "@/components/AdminNav";
import SareeForm from "@/components/SareeForm";
import { createSaree } from "@/app/admin/actions";

export default function NewSareePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <AdminNav />
      <h1 className="mb-6 font-display text-2xl text-ink">Add a new saree</h1>
      <SareeForm action={createSaree} submitLabel="Add saree" />
    </div>
  );
}
