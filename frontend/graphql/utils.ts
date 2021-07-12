import { STRAPI_URL } from "@config/env";
import { fetchGraphql } from "react-tinacms-strapi";

export async function fetchGraphQL<Result, Variables = any>(
  document: string,
  variables?: Variables
): Promise<Result> {
  const response = await fetchGraphql(STRAPI_URL, document, variables);
  return response.data;
}
