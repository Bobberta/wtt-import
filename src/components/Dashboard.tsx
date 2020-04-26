import { Button, Steps, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TrackStep from "./TrackStep";
import { Line, Track } from "../types/types";
import { RootState } from "../store/reducers";

const { Step } = Steps;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  // const [csvLines, setCsvLines] = useState<Line[]>([]);
  const csvLines = useSelector((state: RootState) => state.csvLines);
  const setCsvLines = (newLines: Line[]) => {
    dispatch({ type: "SET_CSV_LINES", newLines });
  };
  //const tracks = useSelector((state:RootState) => state.tracks);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [isParsing, setIsParsing] = useState(false);
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
      skipEnmptyLines: true,
      fastMode: true,
      before: () => {
        setIsParsing(true);
      },
      complete: (results: any) => {
        if (results.data[0].length !== 3) {
          console.log("not the right format!");
          return;
        }
        const lines: Line[] = results.data.map((line: any) => {
          return { artist: line[1], title: line[2] };
        });
        setCsvLines(lines);
        setIsParsing(false);
      },
    };
    Papa.parse(file, papaConfig);
    return false;
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
              {csvLines.length <= 0 && (
                <Upload.Dragger
                  accept=".csv"
                  beforeUpload={onFileUpload}
                  name="file"
                  multiple={false}
                  showUploadList={false}
                >
                  <InboxOutlined />
                  <p>Glisser-déposer un fichier CSV pour commencer</p>
                </Upload.Dragger>
              )}
              {isParsing && "Loading..."}
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
            lineAmount={csvLines.length}
            index={currentLine}
            goToNextLine={goToNextLine}
            goToPreviousLine={goToPreviousLine}
            isLastLine={currentLine === csvLines.length - 1}
            endIntegration={endIntegration}
          />
        )}
        {currentStep === 2 && <p>Bravo! L'intégration est terminée.</p>}
      </div>
    </>
  );
};

export default Dashboard;
