let spotifyAuthToken: string | null = null;

const getSpotifyAuthToken = async () => {
  const res = await fetch("/spotifyToken");
  const body = await res.json();
  if (res.status !== 200) {
    console.log(`Error: ${body.error_description}`);
  }
  spotifyAuthToken = body.access_token;
};

getSpotifyAuthToken();

const spSearchTrack = async (query: string) => {
  if (!spotifyAuthToken) {
    await getSpotifyAuthToken();
  }
  const redirect: "follow" | "error" | "manual" | "undefined" = "follow";
  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${spotifyAuthToken}`,
    },
    redirect,
  };
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    requestOptions
  );
  const json = await res.json();
  return json;
};

export { spSearchTrack };
