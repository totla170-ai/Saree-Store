import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { siteConfig } from "@/lib/site-config";

export default function AdminNav() {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-gold-soft/40 pb-4">
      <div>
        <p className="font-display text-xl text-maroon">
          {siteConfig.businessName} — Admin
        </p>
        <nav className="mt-1 flex gap-4 text-sm text-ink-soft">
          <Link href="/admin" className="hover:text-maroon">
            All sarees
          </Link>
          <Link href="/admin/new" className="hover:text-maroon">
            Add new saree
          </Link>
          <Link href="/" className="hover:text-maroon" target="_blank">
            View site
          </Link>
        </nav>
      </div>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-md border border-ink-soft/30 px-3 py-1.5 text-sm text-ink-soft hover:border-maroon hover:text-maroon"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
