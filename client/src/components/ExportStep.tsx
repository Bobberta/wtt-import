import React from "react";
import { Result, Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const ExportStep = () => {
  const tracks = useSelector((state: RootState) => state.tracks);

  const JSONtracks = `text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(tracks)
  )}`;

  return (
    <Result
      status="success"
      title="L'import est terminé !"
      subTitle="Tu peux maintenant télécharger le fichier final au format de ton choix."
      extra={[
        <Button
          key="1"
          type="primary"
          href={`data:'${JSONtracks}'`}
          download="wtt-playlist.json"
        >
          Télécharger au format JSON
        </Button>,
      ]}
    />
  );
};

export default ExportStep;
