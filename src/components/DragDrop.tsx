import React from "react";
import { FileDrop } from "react-file-drop";

interface DragDropProps {
  handleFile: (file: File) => void;
}

const DragDrop: React.FC<DragDropProps> = ({ handleFile }) => {
  const handleUpload = (file: File) => {
    handleFile(file);
  };
  return (
    <FileDrop onDrop={(file, event) => file && handleUpload(file[0])}>
      Importer une playlist
    </FileDrop>
  );
};

export default DragDrop;
