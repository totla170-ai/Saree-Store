import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  return (
    <header>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Link href="/" className="font-display text-2xl italic text-maroon">
          {siteConfig.businessName}
        </Link>
        <p className="hidden font-body text-xs uppercase tracking-[0.15em] text-ink-soft sm:block">
          {siteConfig.city}
        </p>
      </div>
      <div className="zari-rule" />
    </header>
  );
}
