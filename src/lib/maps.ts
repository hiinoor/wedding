const mapsBase = "https://www.google.com/maps";

export function mapsSearchUrl(query: string) {
  const params = new URLSearchParams({ api: "1", query });
  return `${mapsBase}/search/?${params.toString()}`;
}

export function mapsDirectionsUrl(destination: string, origin?: string) {
  const params = new URLSearchParams({ api: "1", destination, travelmode: "driving" });
  if (origin) params.set("origin", origin);
  return `${mapsBase}/dir/?${params.toString()}`;
}
