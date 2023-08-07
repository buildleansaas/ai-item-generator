export const BASE_ORIGIN =
  typeof window === "undefined"
    ? process.env.VERCEL_ENV === "production"
      ? "https://www.poetry.tips"
      : process.env.VERCEL_BRANCH_URL
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : "http://localhost:3000"
    : window.location.origin;

export const FREE_CREDITS = 3;
