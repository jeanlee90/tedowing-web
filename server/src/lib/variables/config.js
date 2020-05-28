const BASE_URL = process.env.NODE_ENV === "production" ? "https://tedowing.jean-lee.com" : "http://localhost:4000";
const config = {
  BASE_URL,
  PORT: 4000,
  // MYSQL
  MYSQL_URL: "localhost",
  MYSQL_USER: "hjlee",
  MYSQL_PASS: "dlguswls",
  MYSQL_PORT: 3306,
  MYSQL_DATABASE: "tedowing",
  // GOOGLE
  GOOGLE_API_KEY: "AIzaSyDN_4wXfzghCOXHFn-OLHSX91qO27Dxggk",
  GOOGLE_CLIENT_ID: "843902618877-dento56hlk67skcfpt12m25td7gbv3m6.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: "rHBJWe9HsXruIVgqdMPD58_k",
  GOOGLE_CALLBACK_URL: `${BASE_URL}/api/auth/google/callback`,
  GOOGLE_SCOPE: [
    "https://www.googleapis.com/auth/plus.login",
    "https://www.googleapis.com/auth/plus.me",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
  // CRAWLING
  TED_URL: "https://www.ted.com/talks",
  TED_URL_REGEX: /https?:\/\/(www\.)?ted.com\/talks/,
  TED_VIDEO_PREFIX: "https://download.ted.com/talks",
  // PAGINATION
  PAGINATION_PER_PAGE: 18,
};

export default config;
