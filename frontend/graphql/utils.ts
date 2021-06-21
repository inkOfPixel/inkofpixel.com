import { STRAPI_URL } from "@config/env";
import { fetchGraphql } from "react-tinacms-strapi";
import { Maybe } from "./generated";

export function filterListNullableItems<T>(list: Maybe<T>[]): T[] {
  return list.filter((val) => val != null) as T[];
}

export async function fetchGraphQL<Result, Variables = any>(
  document: string,
  variables?: Variables
): Promise<Result> {
  const response = await fetchGraphql(STRAPI_URL, document, variables);
  return response.data;
}
