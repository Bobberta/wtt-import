import { v4 as uuid } from "uuid";

import { SpotifyApi } from "./types/spotify";
import { Track } from "./types/types";
import { DeezerApi } from "./types/deezer";

export const convertArtistsArrayToString = (artists: any) => {
  const artistsName = artists.map((artist: any) => artist.name);
  return artistsName.join(", ");
};

/* ———— DEEZER UTILS ————— */

export const getTrackFromDeezerTrackObject = ({
  title,
  id,
  preview,
  artist,
  isrc,
  release_date,
  album,
}: DeezerApi.TrackObject) => {
  const track: Track = {
    audio: preview,
    artist: artist.name,
    deezerId: id.toString(),
    isrc,
    year: release_date ? parseInt(release_date, 10) : undefined,
    title,
    coverImage: album.cover_small,
    provider: "deezer",
    id: uuid(),
  };
  return track;
};

/* ———— SPOTIFY UTILS ————— */

export const getSpotifyReleaseYear = (
  album: SpotifyApi.AlbumObjectSimplified
) => {
  const precision = album.release_date_precision;
  const date = album.release_date;
  if (precision === "year") {
    return parseInt(date, 10);
  }
  return parseInt(date.substring(0, 4), 10);
};

export const getTrackFromSpotifyTrackObject = ({
  preview_url,
  name,
  artists,
  external_ids,
  id,
  popularity,
  album,
}: SpotifyApi.TrackObjectFull) => {
  if (preview_url) {
    const track: Track = {
      audio: preview_url,
      title: name,
      artist: convertArtistsArrayToString(artists),
      isrc: external_ids.isrc,
      spotifyId: id,
      popularity,
      year: getSpotifyReleaseYear(album),
      coverImage: album.images[0].url,
      provider: "spotify",
      id: uuid(),
    };
    return track;
  }
};
