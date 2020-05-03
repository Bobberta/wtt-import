import React from "react";
import { Track } from "../types/types";
import { Card, Avatar, message, Button } from "antd";
import { useDispatch } from "react-redux";

interface Props {
  selectedTrack: Track | undefined;
  handleEdit: (track: Track) => void;
  goToNextLine: () => void;
}

const SelectedTrackCard: React.FC<Props> = ({
  selectedTrack,
  handleEdit,
  goToNextLine,
}) => {
  const dispatch = useDispatch();
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

  if (selectedTrack) {
    return (
      <Card
        title="Morceau sélectionné"
        extra={
          <>
            <Button onClick={() => handleEdit(selectedTrack)}>Modifier</Button>
            <Button
              type="primary"
              onClick={() => {
                handleAddTrack(selectedTrack);
              }}
            >
              Ajouter à la playlist
            </Button>
          </>
        }
      >
        <Avatar shape="square" size="large" src={selectedTrack.coverImage} />
        Titre : {selectedTrack.title}
        Artiste(s) : {selectedTrack.artist}' Année de sortie :{" "}
        {selectedTrack.year || "?"}
      </Card>
    );
  }
  return (
    <Card title="Sélectionner un morceau">
      <Avatar shape="square" size="large">
        ?
      </Avatar>
    </Card>
  );
};

export default SelectedTrackCard;
