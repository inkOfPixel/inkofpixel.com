export const STRAPI_URL = checkEnv(
  "http://localhost:1337",
  "NEXT_PUBLIC_STRAPI_URL"
);

function checkEnv(env: string | null | undefined, envName: string): string {
  if (env == null) {
    throw new Error(`environment variable "${envName}" is not defined`);
  }
  return env;
}
