import { Button, Typography } from "antd";
import React from "react";
import { SpotifyApi } from "../types/spotify";
import { DeezerApi } from "../types/deezer";
import { convertArtistsArrayToString, getSpotifyReleaseYear } from "../utils";

const { Text } = Typography;

interface SpotifyProps {
  key: number;
  track: SpotifyApi.TrackObjectFull;
  play: (preview: string) => void;
  selectTrack: (track: SpotifyApi.TrackObjectFull) => void;
}

interface DeezerProps {
  key: number;
  track: DeezerApi.TrackObject;
  play: (preview: string) => void;
  selectTrack: (track: DeezerApi.TrackObject) => void;
}

export const SpotifyTrackListItem: React.FC<SpotifyProps> = ({
  track,
  key,
  play,
  selectTrack,
}) => {
  const { preview_url, name, artists, album } = track;
  const displayArtist = convertArtistsArrayToString(artists);
  const displayReleaseYear = getSpotifyReleaseYear(album);
  return (
    <div key={key}>
      <Text strong>{name}</Text>
      <Text type="secondary">{displayArtist}</Text>
      <Text type="secondary">{displayReleaseYear}</Text>
      {preview_url && (
        <>
          <Button onClick={() => play(preview_url)}></Button>
          <Button onClick={() => selectTrack(track)}>Sélectionner</Button>
        </>
      )}
    </div>
  );
};

export const DeezerTrackListItem: React.FC<DeezerProps> = ({
  track,
  key,
  play,
  selectTrack,
}) => {
  const { preview, artist, title, album } = track;
  return (
    <div key={key}>
      <Text strong>{title}</Text>
      <Text type="secondary">{artist.name}</Text>
      <Text type="secondary">{album.release_date || "?"}</Text>
      {preview && (
        <>
          <Button onClick={() => play(preview)}>Play</Button>
          <Button onClick={() => selectTrack(track)}>Sélectionner</Button>
        </>
      )}
    </div>
  );
};
