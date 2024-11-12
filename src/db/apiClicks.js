import {UAParser} from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id)
    .order("created_at", { ascending: false }); // Order by most recent
  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}
const parser = new UAParser();
export const storeClicks = async ({ id, originalUrl, short_url }) => {
  try {
    // Set the user agent for the parser and get device information
    parser.setUA(navigator.userAgent);
    const res = parser.getResult();
    const device = res.device?.type || "desktop"; // Default to "desktop" if undefined
    const vendor = res.device?.vendor || "Unknown";
    console.log(res);
    // Fetch location details
    const response = await fetch("https://ipapi.co/json");
    if (response.ok) {
      const { city = "Unknown", country_name: country = "Unknown" } =
        await response.json();

      //Record the click in the Supabase database
      await supabase.from("clicks").insert({
        url_id: id,
        city,
        country,
        extension: short_url.startsWith("@")
          ? short_url.substring(7)
          : "custom",
        device,
        vendor,
      });
    } else {
      console.error("Failed to fetch location data");
    }
  } catch (error) {
    console.error("Error recording click:", error);
  }
  window.location.href = originalUrl;
};
