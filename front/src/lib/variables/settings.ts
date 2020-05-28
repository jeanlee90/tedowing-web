export function isProd() {
  return process.env.NODE_ENV === "production";
}

// 실제 배포 시 사용할 코드
// export const baseUrl = isProd() ? "https://tedowing.jean-lee.com" : `http://${window.location.hostname}:4000`;

// 개발용 코드
export const baseUrl = `http://${window.location.hostname}:4000`;
