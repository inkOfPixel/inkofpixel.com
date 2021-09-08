export const STRAPI_URL = checkEnv(
  "https://strapi.inkofpixel.com",
  "NEXT_PUBLIC_STRAPI_URL"
);

function checkEnv(env: string | null | undefined, envName: string): string {
  if (env == null) {
    throw new Error(`environment variable "${envName}" is not defined`);
  }
  return env;
}
