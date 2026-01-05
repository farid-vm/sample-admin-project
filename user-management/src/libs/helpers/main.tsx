export function captalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function addQueryParams(query: string, params: Record<string, string>){
  let queryParams = '';
  for(const key in params) {
    if(params[key]) {
      queryParams += `${key}=${params[key]}&`;
    }
  }
  return query + '?' + queryParams;
}