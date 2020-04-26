import { Track, Line } from "../types/types";
import { ADD_TRACK } from "../types/store";
import { SET_CSV_LINES } from "./reducers";

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
