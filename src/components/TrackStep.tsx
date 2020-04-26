import { Button, Descriptions, Row, Col, message } from "antd";
import { SpotifyApi } from "../types/spotify";
import { DeezerApi } from "../types/deezer";
import React, { useEffect, useState } from "react";
import Player from "react-audio-player";

import EditTrackModal from "./EditTrackModal";
import { Track } from "../types/types";
import { spSearchTrack } from "../api/spotify";
import { dzSearchTrack } from "../api/deezer";
import {
  getTrackFromDeezerTrackObject,
  getTrackFromSpotifyTrackObject,
  convertArtistsArrayToString,
} from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/store";

interface TrackStepProps {
  lineAmount: number;
  goToPreviousLine: () => void;
  goToNextLine: () => void;
  index: number;
  isLastLine: boolean;
  endIntegration: () => void;
}

const TrackStep: React.FC<TrackStepProps> = ({
  goToNextLine,
  goToPreviousLine,
  index,
  isLastLine,
  endIntegration,
  lineAmount,
}) => {
  const currentCsvLine = useSelector(
    (state: RootState) => state.csvLines[index]
  );
  const dispatch = useDispatch();

  const [spotifyTracks, setSpotifyTracks] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);
  const [deezerTracks, setDeezerTracks] = useState([]);
  const [previewUrl, play] = useState<string | null | undefined>();
  const [selectedTrack, setSelectedTrack] = useState<
    Track | null | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSelectedTrack(null);
    setSpotifyTracks([]);
    setDeezerTracks([]);
    const search = async () => {
      const query = currentCsvLine.artist + " " + currentCsvLine.title;
      const spotifySearchResults = await spSearchTrack(query);
      setSpotifyTracks(spotifySearchResults.tracks.items);
      const deezerSearchResults = await dzSearchTrack(query);
      setDeezerTracks(deezerSearchResults.data);
    };
    search();
  }, [currentCsvLine]);

  const selectSpotifyTrack = (track: SpotifyApi.TrackObjectFull) => {
    const trackObject = getTrackFromSpotifyTrackObject(track);
    setSelectedTrack(trackObject);
  };

  const selectDeezerTrack = (track: DeezerApi.TrackObject) => {
    console.log(track);
    const trackObject = getTrackFromDeezerTrackObject(track);
    setSelectedTrack(trackObject);
  };

  const handleEditSelectedTrack = (track: Track) => {
    setIsModalOpen(true);
  };

  const handleAddTrack = (track: Track) => {
    if (!track.title) {
      message.error("Titre manquant");
      return;
    }
    if (!track.artist) {
      message.error("Artiste manquant");
      return;
    }
    if (!track.year) {
      message.error("Année de sortie manquante");
      return;
    }
    dispatch({ type: "ADD_TRACK", track });
    goToNextLine();
  };

  return (
    <div>
      <Player src={previewUrl ? previewUrl : ""} autoPlay controls />
      <Row gutter={24}>
        <Col span={6}>
          <Button onClick={goToPreviousLine} disabled={index < 1}>
            {"<- Précédent"}
          </Button>
        </Col>
        <Col span={12}>
          <h2>
            {currentCsvLine.title} — {currentCsvLine.artist}
          </h2>
          {index + 1}/{lineAmount}
        </Col>
        <Col span={6}>
          {!isLastLine ? (
            <Button onClick={goToNextLine}>{"-> Suivant"}</Button>
          ) : (
            <Button onClick={endIntegration}>Terminer l'intégration</Button>
          )}
        </Col>
      </Row>

      {selectedTrack && (
        <>
          <Descriptions title="Morceau sélectionné">
            <Descriptions.Item label="Titre">
              {selectedTrack.title}
            </Descriptions.Item>
            <Descriptions.Item label="Artiste(s)">
              {selectedTrack.artist}
            </Descriptions.Item>
            <Descriptions.Item label="Année de sortie">
              {selectedTrack.year || "?"}
            </Descriptions.Item>
          </Descriptions>
          <Button onClick={() => handleEditSelectedTrack(selectedTrack)}>
            Modifier
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleAddTrack(selectedTrack);
            }}
          >
            Ajouter à la playlist
          </Button>
        </>
      )}
      <Row gutter={24}>
        <Col span={12}>
          <h3>Spotify Tracks</h3>
          {spotifyTracks.map((track: SpotifyApi.TrackObjectFull, index) => {
            return (
              <div key={index}>
                {!track.preview_url && <p>[No URL]</p>}
                {`${track.name} — ${convertArtistsArrayToString(
                  track.artists
                )} (${track.album.release_date || "?"})`}
                {track.preview_url && (
                  <>
                    <Button onClick={() => play(track.preview_url)}>
                      Play
                    </Button>
                    <Button onClick={() => selectSpotifyTrack(track)}>
                      Sélectionner
                    </Button>
                  </>
                )}
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
                {`${track.title} — ${track.artist.name} (${
                  track.release_date || "?"
                })`}
                {track.preview && (
                  <>
                    <Button onClick={() => play(track.preview)}>Play</Button>
                    <Button onClick={() => selectDeezerTrack(track)}>
                      Sélectionner
                    </Button>
                  </>
                )}
              </div>
            );
          })}
        </Col>
      </Row>
      {selectedTrack && (
        <EditTrackModal
          track={selectedTrack}
          visible={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          editTrack={(track: Track) => setSelectedTrack(track)}
        />
      )}
    </div>
  );
};

export default TrackStep;
