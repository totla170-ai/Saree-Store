export type Saree = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  fabric: string | null;
  price: number;
  original_price: number | null;
  is_featured: boolean;
  is_sold: boolean;
  image_urls: string[];
  created_at: string;
};

export type SareeInput = Omit<Saree, "id" | "created_at">;

export function discountPercent(saree: Pick<Saree, "price" | "original_price">) {
  if (!saree.original_price || saree.original_price <= saree.price) return 0;
  return Math.round(
    ((saree.original_price - saree.price) / saree.original_price) * 100
  );
}
