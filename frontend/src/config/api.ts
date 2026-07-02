const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const API_URL = rawUrl.replace(/\/+$/, "");

export const getMediaUrl = (url?: string | null): string => {
  if (!url) return "";
  if (url.startsWith("data:") || url.startsWith("blob:")) return url;

  if (url.includes("localhost:") || url.includes("127.0.0.1:")) {
    return url.replace(/^http:\/\/(localhost|127\.0\.0\.1):[0-9]+[\/\\]*/i, `${API_URL}/`);
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("uploads/") || url.startsWith("/uploads/") || url.startsWith("uploads\\") || url.startsWith("\\uploads\\")) {
    const cleanPath = url.replace(/^[\/\\]+/, "").replace(/\\/g, "/");
    return `${API_URL}/${cleanPath}`;
  }

  return url;
};
