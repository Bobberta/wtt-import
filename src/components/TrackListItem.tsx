import { Avatar, Button, List, Typography } from "antd";
import React from "react";
import { SpotifyApi } from "../types/spotify";
import { DeezerApi } from "../types/deezer";
import { convertArtistsArrayToString, getSpotifyReleaseYear } from "../utils";
import { CaretRightOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface SpotifyProps {
  track: SpotifyApi.TrackObjectFull;
  play: (preview: string) => void;
  selectTrack: (track: SpotifyApi.TrackObjectFull) => void;
}

interface DeezerProps {
  track: DeezerApi.TrackObject;
  play: (preview: string) => void;
  selectTrack: (track: DeezerApi.TrackObject) => void;
}

export const SpotifyTrackListItem: React.FC<SpotifyProps> = ({
  track,
  play,
  selectTrack,
}) => {
  const { preview_url, name, artists, album } = track;
  const displayArtist = convertArtistsArrayToString(artists);
  const displayReleaseYear = getSpotifyReleaseYear(album);
  return (
    <List.Item
      actions={
        preview_url
          ? [
              <Button
                icon={<CaretRightOutlined />}
                onClick={() => play(preview_url)}
              />,
              <Button onClick={() => selectTrack(track)}>Sélectionner</Button>,
            ]
          : []
      }
    >
      <List.Item.Meta
        avatar={<Avatar shape="square" src={album.images[0].url} />}
        title={name}
        description={displayArtist}
      />
      <Text type="secondary">{displayReleaseYear || "?"}</Text>
    </List.Item>
  );
};

export const DeezerTrackListItem: React.FC<DeezerProps> = ({
  track,
  play,
  selectTrack,
}) => {
  const { preview, artist, title, album } = track;
  return (
    <List.Item
      actions={
        preview
          ? [
              <Button
                icon={<CaretRightOutlined />}
                onClick={() => play(preview)}
              />,
              <Button onClick={() => selectTrack(track)}>Sélectionner</Button>,
            ]
          : []
      }
    >
      <List.Item.Meta
        avatar={<Avatar shape="square" src={album.cover} />}
        title={title}
        description={artist.name}
      />
      <Text type="secondary">{album.release_date || "?"}</Text>
    </List.Item>
  );
};
