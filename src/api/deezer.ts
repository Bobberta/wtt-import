const dzSearchTrack = async (query: string) => {
  const res = await fetch(`/deezerTrack?q=${query}`);
  const json = await res.json();
  return json;
};

export { dzSearchTrack };
