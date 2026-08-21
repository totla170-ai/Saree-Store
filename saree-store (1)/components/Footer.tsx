import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gold-soft/40">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-ink-soft">
        <p className="font-display text-lg text-maroon">{siteConfig.businessName}</p>
        <p className="mt-1">{siteConfig.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-maroon"
          >
            WhatsApp
          </a>
          {siteConfig.instagramHandle && (
            <a
              href={`https://instagram.com/${siteConfig.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-maroon"
            >
              Instagram
            </a>
          )}
        </div>
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} {siteConfig.businessName}. All prices in INR.
        </p>
      </div>
    </footer>
  );
}
