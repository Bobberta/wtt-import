import { Button, Steps, Upload, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TrackStep from "./TrackStep";
import { Line } from "../types/types";
import { RootState } from "../store/reducers";
import { setCsvLines, setCurrentStep, cancelImport } from "../store/actions";
import ValidationStep from "./ValidationStep";
import ExportStep from "./ExportStep";

const { Step } = Steps;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const csvLines = useSelector((state: RootState) => state.csvLines);
  const currentLine = useSelector((state: RootState) => state.currentLine);
  const currentStep = useSelector((state: RootState) => state.currentStep);
  const [isParsing, setIsParsing] = useState(false);
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
        dispatch(setCsvLines(lines));
        setIsParsing(false);
      },
    };
    Papa.parse(file, papaConfig);
    return false;
  };
  const startIntegration = () => {
    dispatch(setCurrentStep(1));
  };
  const endIntegration = () => {
    dispatch(setCurrentStep(2));
  };
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Steps current={currentStep}>
        <Step title="Import CSV" />
        <Step title="Intégration des morceaux" />
        <Step title="Validation" />
        <Step title="Export" />
      </Steps>
      <Button onClick={() => dispatch(cancelImport())}>Annuler l'import</Button>
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
            isLastLine={currentLine === csvLines.length - 1}
            endIntegration={endIntegration}
          />
        )}
        {currentStep === 2 && <ValidationStep />}
        {currentStep === 3 && <ExportStep />}
      </div>
    </Space>
  );
};

export default Dashboard;
