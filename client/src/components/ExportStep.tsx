import React from "react";
import { Result, Button } from "antd";

const ExportStep = () => {
  const handleJSONDownload = () => {};

  const handleCSVDownload = () => {};

  return (
    <Result
      status="success"
      title="L'import est terminé !"
      subTitle="Tu peux maintenant télécharger le fichier final au format de ton choix."
      extra={[
        <Button key="1" type="primary" onClick={handleJSONDownload}>
          Télécharger au format JSON
        </Button>,
        <Button key="2" onClick={handleCSVDownload}>
          Télécharger au format CSV
        </Button>,
      ]}
    />
  );
};

export default ExportStep;
