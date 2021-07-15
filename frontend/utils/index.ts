import { Maybe } from "@graphql/generated";

export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + JSON.stringify(x, null, " "));
}

export function filterListNullableItems<T>(list: Maybe<T>[]): T[] {
  return list.filter((val) => val != null) as T[];
}
