import { Button, Steps, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import React, { useState } from "react";

import TrackStep from "./components/TrackStep";
import { Line, Track } from "./types/types";

const { Step } = Steps;

const styles = {
  drag: {
    padding: 50,
    border: "2px solid blue",
  },
};

const App: React.FC = () => {
  const [csvLines, setCsvLines] = useState<Line[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const lines: Line[] = [];
  const goToNextLine = () => {
    setCurrentLine(currentLine + 1);
  };
  const goToPreviousLine = () => {
    setCurrentLine(currentLine - 1);
  };
  const onFileUpload = (file: File) => {
    if (file.type !== "text/csv") {
      return false;
    }
    const papaConfig = {
      step: (results: any, parser: any) => {
        const { data, errors } = results;
        const newLine: Line = {
          artist: data[1],
          title: data[2],
        };
        lines.push(newLine);
      },
      complete: (results: any, file: any) => {
        setCsvLines(lines);
      },
    };
    Papa.parse(file, papaConfig);
    return false;
  };
  const handleAddTrack = async (track: Track) => {
    setTracks([...tracks, track]);
    goToNextLine();
  };
  const startIntegration = () => {
    setCurrentStep(1);
  };
  const endIntegration = () => {
    console.log("it's the end!");
    setCurrentStep(2);
  };

  return (
    <>
      <div>
        <Steps current={currentStep}>
          <Step title="Import CSV" />
          <Step title="Intégration des morceaux" />
          <Step title="Validation" />
        </Steps>
      </div>
      <div>
        {currentStep === 0 && (
          <div>
            <div>
              <Upload.Dragger
                accept=".csv"
                beforeUpload={onFileUpload}
                name="file"
              >
                <InboxOutlined />
                <p>Glisser-déposer un fichier CSV pour commencer</p>
              </Upload.Dragger>
              {csvLines.length > 0 && (
                <Button type="primary" onClick={startIntegration}>
                  Commencer l'intégration
                </Button>
              )}
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <TrackStep
            csvLine={csvLines[currentLine]}
            index={currentLine}
            goToNextLine={goToNextLine}
            goToPreviousLine={goToPreviousLine}
            isLastLine={currentLine === csvLines.length - 1}
            endIntegration={endIntegration}
            addTrack={handleAddTrack}
          />
        )}
        {currentStep === 2 && <p>Bravo! L'intégration est terminée.</p>}
      </div>
    </>
  );
};

export default App;
