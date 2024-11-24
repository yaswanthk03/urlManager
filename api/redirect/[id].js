import supabase from "../../src/db/supabase";
import { UAParser } from "ua-parser-js";

export default async function handler(req, res) {
  const { id } = req.query;

  // Fetch the original URL from Supabase
  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("short_id", id)
    .single();

  if (error || !data) {
    return res.status(404).send("URL not found");
  }

  // Process analytics data (asynchronously)
  const userAgent = req.headers["user-agent"];
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();

  const { data: locationData } = await fetch(`https://ipapi.co/${ip}/json`);
  const { city = "Unknown", country_name: country = "Unknown" } =
    locationData.json();
  const analyticsData = {
    url_id: id,
    city,
    country,

    device: device.type || "Unknown",

    vendor: device.vendor || "Unknown",
    timestamp: new Date(),
  };

  // Insert analytics into Supabase asynchronously
  supabase.from("clicks").insert(analyticsData).catch(console.error);

  // Redirect the user
  res.redirect(data.original_url);
}
