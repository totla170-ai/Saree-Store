import { login } from "@/app/admin/actions";
import { siteConfig } from "@/lib/site-config";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <p className="font-display text-2xl italic text-maroon">
        {siteConfig.businessName}
      </p>
      <h1 className="mt-1 text-lg text-ink">Admin login</h1>

      <form action={login} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-ink">
          Password
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="mt-1 w-full rounded-md border border-ink-soft/30 bg-white px-3 py-2 text-sm outline-none focus:border-maroon"
          />
        </label>

        {error && (
          <p className="text-sm text-maroon">Wrong password. Try again.</p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-maroon px-4 py-2.5 text-sm font-semibold text-ivory hover:bg-maroon-deep"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
