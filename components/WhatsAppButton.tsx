import { whatsappLink } from "@/lib/site-config";

export default function WhatsAppButton({
  productName,
  price,
  full,
}: {
  productName: string;
  price?: number;
  full?: boolean;
}) {
  return (
    <a
      href={whatsappLink(productName, price)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 ${
        full ? "w-full" : ""
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.87 9.87 0 0 0 4.62 1.14h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.79 14.03c-.24.68-1.4 1.31-1.93 1.36-.5.05-1.02.24-3.43-.83-2.9-1.28-4.77-4.25-4.92-4.45-.14-.2-1.17-1.56-1.17-2.97s.73-2.1 1-2.39c.24-.26.53-.32.71-.32.18 0 .35 0 .5.01.16.01.38-.06.6.45.24.57.82 1.98.89 2.12.07.14.12.31.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.5-.15.14-.3.3-.13.6.17.3.75 1.24 1.62 2 1.11.99 2.05 1.3 2.35 1.44.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.66-.14.27.09 1.7.8 1.99.95.3.14.49.21.56.33.08.13.08.72-.16 1.4Z" />
      </svg>
      Ask on WhatsApp
    </a>
  );
}
