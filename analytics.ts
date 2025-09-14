export const GA_ID = "G-4QX5721LLV";
export function pageview(path: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_ID, { page_path: path });
  }
}
