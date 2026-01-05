export function captalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function addQueryParams(query: string, params: Record<string, string>) {
  let queryParams = "";
  for (const key in params) {
    if (params[key]) {
      queryParams += `${key}=${params[key]}&`;
    }
  }
  return query + "?" + queryParams;
}
export function escapeRegExp(searchvalue: string) {
  return searchvalue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export const normalize = (str: string) =>
  str
    ?.normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function createRegex(searchvalue: string) {
  const escaped = searchvalue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}`, "i");
}
