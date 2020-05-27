export function isProd() {
  return process.env.NODE_ENV === "production";
}

export const baseUrl = isProd() ? "https://tedowing.jean-lee.com" : `http://${window.location.hostname}:4000`;
