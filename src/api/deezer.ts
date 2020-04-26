const dzSearchTrack = async (query: string) => {
  try {
    const normalizedQuery = query
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const res = await fetch(`/deezerTrack?q=${normalizedQuery}`);
    const json = await res.json();
    return json;
  } catch {
    console.log("error");
  }
};

export { dzSearchTrack };
