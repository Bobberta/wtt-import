import { Button, Row, Col, Space, List } from "antd";
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
} from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/store";
import { DeezerTrackListItem, SpotifyTrackListItem } from "./TrackListItem";
import { setCurrentLine } from "../store/actions";
import SelectedTrackCard from "./SelectedTrackCard";

interface TrackStepProps {
  lineAmount: number;
  index: number;
  isLastLine: boolean;
  endIntegration: () => void;
}

const TrackStep: React.FC<TrackStepProps> = ({
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
  const [selectedTrack, setSelectedTrack] = useState<Track | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSelectedTrack(undefined);
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
    const trackObject = getTrackFromDeezerTrackObject(track);
    setSelectedTrack(trackObject);
  };

  const handleEditSelectedTrack = () => {
    setIsModalOpen(true);
  };
  const goToNextLine = () => {
    dispatch(setCurrentLine(index + 1));
  };
  const goToPreviousLine = () => {
    dispatch(setCurrentLine(index - 1));
  };

  return (
    <Space direction="vertical" size="large">
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

      <SelectedTrackCard
        selectedTrack={selectedTrack}
        handleEdit={handleEditSelectedTrack}
        goToNextLine={goToNextLine}
      />
      <Row gutter={24}>
        <Col span={12}>
          <h3>Spotify Tracks</h3>
          <List
            dataSource={spotifyTracks}
            renderItem={(track: SpotifyApi.TrackObjectFull) => {
              return (
                <SpotifyTrackListItem
                  track={track}
                  play={play}
                  selectTrack={selectSpotifyTrack}
                />
              );
            }}
          />
        </Col>
        <Col span={12}>
          <h3>Deezer Tracks</h3>
          <List
            dataSource={deezerTracks}
            renderItem={(track: DeezerApi.TrackObject) => {
              return (
                <DeezerTrackListItem
                  track={track}
                  play={play}
                  selectTrack={selectDeezerTrack}
                />
              );
            }}
          />
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
    </Space>
  );
};

export default TrackStep;
