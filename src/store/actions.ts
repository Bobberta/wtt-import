import { Track, Line } from "../types/types";
import {
  ADD_TRACK,
  SET_CSV_LINES,
  SET_CURRENT_LINE,
  SET_CURRENT_STEP,
  CANCEL_IMPORT,
  DELETE_TRACK,
  EDIT_TRACK,
} from "./reducers";

export const addTrack = (newTrack: Track) => {
  return {
    type: ADD_TRACK,
    track: newTrack,
  };
};

export const setCsvLines = (newLines: Line[]) => {
  return {
    type: SET_CSV_LINES,
    lines: newLines,
  };
};

export const setCurrentLine = (lineIndex: number) => {
  return {
    type: SET_CURRENT_LINE,
    lineIndex,
  };
};

export const setCurrentStep = (step: number) => {
  return {
    type: SET_CURRENT_STEP,
    step,
  };
};

export const cancelImport = () => {
  return {
    type: CANCEL_IMPORT,
  };
};

export const deleteTrack = (id: string) => {
  return {
    type: DELETE_TRACK,
    id,
  };
};

export const editTrack = (track: Track) => {
  return {
    type: EDIT_TRACK,
    track,
  };
};
