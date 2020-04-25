import Papa from "papaparse";
import React, { useState } from "react";

import DragDrop from "./components/DragDrop";
import TrackStep from "./components/TrackStep";
import { Line, Track } from "./types/types";

const App: React.FC = () => {
  const [csvLines, setCsvLines] = useState<Line[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "import" | "integration" | "end"
  >("import");
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
      return;
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
  };
  const handleAddTrack = async (track: Track) => {
    setTracks([...tracks, track]);
    goToNextLine();
  };
  const startIntegration = () => {
    setCurrentStep("integration");
  };
  const endIntegration = () => {
    console.log("it's the end!");
    setCurrentStep("end");
  };

  if (currentStep === "import") {
    return (
      <div className="App">
        <div>
          <DragDrop handleFile={onFileUpload} />
          {csvLines.length > 0 && (
            <button onClick={startIntegration}>Commencer l'intégration</button>
          )}
        </div>
      </div>
    );
  }
  if (currentStep === "integration") {
    console.log("currentLine: " + currentLine);
    console.log("csvLines.length: " + csvLines.length);
    return (
      <TrackStep
        csvLine={csvLines[currentLine]}
        index={currentLine}
        goToNextLine={goToNextLine}
        goToPreviousLine={goToPreviousLine}
        isLastLine={currentLine === csvLines.length - 1}
        endIntegration={endIntegration}
        addTrack={handleAddTrack}
      />
    );
  }
  if (currentStep === "end") {
    return <p>Bravo! L'intégration est terminée.</p>;
  }
  return <p>Nothing to see here</p>;
};

export default App;
