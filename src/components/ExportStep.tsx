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
        <Button type="primary" onClick={handleJSONDownload}>
          Télécharger au format JSON
        </Button>,
        <Button onClick={handleCSVDownload}>Télécharger au format CSV</Button>,
      ]}
    />
  );
};

export default ExportStep;
