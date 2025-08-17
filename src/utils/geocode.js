export async function getAddressFromCoords(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();

    if (data && data.address) {
      const { suburb, neighbourhood, city, town, village, state, country } =
        data.address;
      return (
        suburb ||
        neighbourhood ||
        city ||
        town ||
        village ||
        state ||
        country ||
        "Unknown location"
      );
    }
    return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
  } catch (error) {
    console.error("Reverse geocode failed:", error);
    return "Unknown location";
  }
}
