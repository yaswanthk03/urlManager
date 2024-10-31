import supabase, {supabaseUrl} from "./supabase";

export async function getUrls(user_id) {
  let {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function getUrl({id, user_id}) {
  const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }

  return data;
}

export async function getLongUrl(id) {
  if (id[0] == "@") {
    let { data: shortLinkData, error: shortLinkError } = await supabase
      .from("urls")
      .select("id, original_url")
      .eq("short_url", id.substring(0, 7))
      .single();
    if (shortLinkError && shortLinkError.code !== "PGRST116") {
      console.error("Error fetching short link:", shortLinkError);
      return;
    }
    return shortLinkData;
  }

  let { data: shortLinkData, error: shortLinkError } = await supabase
    .from("urls")
    .select("id, original_url")
    .eq("custom_url", id)
    .single();

  if (shortLinkError && shortLinkError.code !== "PGRST116") {
    console.error("Error fetching short link:", shortLinkError);
    return;
  }

  return shortLinkData;
}

export async function createUrl({ title, longUrl, customUrl, user_id }) {
  const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const short_url =
    "@" +
    Array.from({ length: 6 }, () => char[Math.floor(Math.random() * 62)]).join(
      ""
    );

  // iterate over customUrl and check if the charecters are in char
  if (customUrl) {
    for (let i = 0; i < customUrl.length; i++) {
      if (!char.includes(customUrl[i])) {
        throw new Error("Invalid custom URL");
      }
    }
    // check if the customUrl is already taken
    const { data: shortUrlData, error: shortUrlError } = await supabase
      .from("urls")
      .select("id")
      .eq("custom_url", customUrl);
    if (shortUrlData.length > 0) {
      throw new Error("Custom URL already taken");
    }
  }

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
      },
    ])
    .select();
  // if failed to insert delete the uploaded qr code
  if (error) {
    throw new Error("Failed to create URL");
  }

  return data;
}

export async function deleteUrl(id) {
  const { data: qrData, error: qrError } = await supabase
    .from("urls")
    .select("short_url")
    .eq("id", id);

  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete Url");
  }

  return data;
}
