import * as Location from "expo-location";

export async function getApproximateLocation() {
  // Request permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return null;
  }

  // Get coordinates (low accuracy = faster + battery friendly)
  const coords = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Low,
  });

  // Reverse geocode to get city/country
  const [place] = await Location.reverseGeocodeAsync({
    latitude: coords.coords.latitude,
    longitude: coords.coords.longitude,
  });

  return {
    city: place.city,
    country: place.country,
    countryCode: place.isoCountryCode,
    region: place.region,
  };
}
