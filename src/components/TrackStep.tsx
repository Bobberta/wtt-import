import { Button, Row, Col } from "antd";
import { SpotifyApi } from "../types/spotify";
import { DeezerApi } from "../types/deezer";
import React, { useEffect, useState } from "react";
import Player from "react-audio-player";

import { Line, Track } from "../types/types";
import { spSearchTrack } from "../api/spotify";
import { dzSearchTrack } from "../api/deezer";
import {
  getTrackFromDeezerTrackObject,
  getTrackFromSpotifyTrackObject,
  convertArtistsArrayToString,
} from "../utils";

interface TrackStepProps {
  csvLine: Line;
  goToPreviousLine: () => void;
  goToNextLine: () => void;
  index: number;
  isLastLine: boolean;
  endIntegration: () => void;
  addTrack: (track: Track) => void;
}

const TrackStep: React.FC<TrackStepProps> = ({
  csvLine,
  goToNextLine,
  goToPreviousLine,
  index,
  isLastLine,
  endIntegration,
  addTrack,
}) => {
  const [spotifyTracks, setSpotifyTracks] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);
  const [deezerTracks, setDeezerTracks] = useState([]);
  const [previewUrl, setPreviewUrl] = useState<any>();
  const [selectedTrack, setSelectedTrack] = useState<
    Track | null | undefined
  >();
  useEffect(() => {
    setSelectedTrack(null);
    const search = async () => {
      const query = csvLine.artist + " " + csvLine.title;
      const spotifySearchResults = await spSearchTrack(query);
      setSpotifyTracks(spotifySearchResults.tracks.items);
      const deezerSearchResults = await dzSearchTrack(query);
      setDeezerTracks(deezerSearchResults.data);
    };
    search();
  }, [csvLine]);
  const selectSpotifyTrack = (track: SpotifyApi.TrackObjectFull) => {
    const trackObject = getTrackFromSpotifyTrackObject(track);
    setSelectedTrack(trackObject);
  };
  const selectDeezerTrack = (track: DeezerApi.TrackObject) => {
    const trackObject = getTrackFromDeezerTrackObject(track);
    setSelectedTrack(trackObject);
  };
  return (
    <div>
      <Player src={previewUrl} autoPlay controls />
      <h2>
        {csvLine.title} — {csvLine.artist}
      </h2>
      <Button onClick={goToPreviousLine} disabled={index <= 1}>
        {"<- Précédent"}
      </Button>
      {!isLastLine ? (
        <Button onClick={goToNextLine}>{"-> Suivant"}</Button>
      ) : (
        <Button onClick={endIntegration}>Terminer l'intégration</Button>
      )}
      {selectedTrack && (
        <div>
          <h3>Selected Track</h3>
          <div>
            <p>
              {selectedTrack.artist} — {selectedTrack.title}
            </p>
            <Button onClick={() => addTrack(selectedTrack)}>
              Ajouter à la playlist
            </Button>
          </div>
        </div>
      )}
      <Row gutter={24}>
        <Col span={12}>
          <h3>Spotify Tracks</h3>
          {spotifyTracks.map((track: SpotifyApi.TrackObjectFull, index) => {
            return (
              <div key={index}>
                {!track.preview_url && <p>[No URL]</p>}
                {track.name} — {convertArtistsArrayToString(track.artists)}
                <Button onClick={() => setPreviewUrl(track.preview_url)}>
                  Play
                </Button>
                <Button onClick={() => selectSpotifyTrack(track)}>
                  Sélectionner
                </Button>
              </div>
            );
          })}
        </Col>
        <Col span={12}>
          <h3>Deezer Tracks</h3>

          {deezerTracks.map((track: DeezerApi.TrackObject, index) => {
            return (
              <div key={index}>
                {!track.preview && "[No URL]"}
                {track.title} — {track.artist.name}
                <Button onClick={() => setPreviewUrl(track.preview)}>
                  Play
                </Button>
                <Button onClick={() => selectDeezerTrack(track)}>
                  Sélectionner
                </Button>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default TrackStep;
