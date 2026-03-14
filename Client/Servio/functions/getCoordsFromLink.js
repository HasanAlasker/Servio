export const getLatLngFromGoogleMapsLink = async (shortLink) => {
  try {
    // Step 1: Resolve the short URL
    const res = await fetch(shortLink, { redirect: "follow" });
    const fullUrl = res.url;

    // Step 2: Try @lat,lng format
    const atMatch = fullUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
      return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
    }

    // Step 3: Try !3d<lat>!4d<lng> format
    const dMatch = fullUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (dMatch) {
      return { lat: parseFloat(dMatch[1]), lng: parseFloat(dMatch[2]) };
    }

    // Step 4: No coords in URL — fetch the HTML page and scrape them
    const pageRes = await fetch(fullUrl);
    const html = await pageRes.text();

    // Google embeds coords in a meta tag or script
    const metaMatch = html.match(/center=(-?\d+\.\d+)%2C(-?\d+\.\d+)/);
    if (metaMatch) {
      return { lat: parseFloat(metaMatch[1]), lng: parseFloat(metaMatch[2]) };
    }

    const scriptMatch = html.match(/"(-?\d{1,3}\.\d{7,})","(-?\d{1,3}\.\d{7,})"/);
    if (scriptMatch) {
      return { lat: parseFloat(scriptMatch[1]), lng: parseFloat(scriptMatch[2]) };
    }

    console.warn("Could not extract coordinates from:", fullUrl);
    return null;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};