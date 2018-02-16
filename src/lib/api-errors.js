// Because Fetch doesn't recognize errors responses
// as actual errors since technically the response completed...
export function handleApiErrors (response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}
