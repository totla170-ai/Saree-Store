import Link from "next/link";

export default function CategoryFilter({
  categories,
  active,
}: {
  categories: string[];
  active?: string;
}) {
  if (categories.length === 0) return null;

  const pill = (label: string, href: string, isActive: boolean) => (
    <Link
      key={label}
      href={href}
      className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide transition ${
        isActive
          ? "border-bottle bg-bottle text-ivory"
          : "border-bottle/40 text-bottle hover:border-bottle"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex flex-wrap gap-2">
      {pill("All", "/", !active)}
      {categories.map((c) => pill(c, `/?category=${encodeURIComponent(c)}`, active === c))}
    </div>
  );
}
