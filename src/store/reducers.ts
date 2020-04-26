// import { ADD_TRACK, ActionTypes, RootState } from "./types";

import { Track, Line } from "../types/types";
import { Reducer } from "redux";

export const ADD_TRACK = "ADD_TRACK";
export const SET_CSV_LINES = "SET_CSV_LINES";

interface AddTrackAction {
  type: typeof ADD_TRACK;
  track: Track;
}

interface SetCsvLinesAction {
  type: typeof SET_CSV_LINES;
  newLines: Line[];
}

export interface RootState {
  tracks: Track[];
  csvLines: Line[];
}

export type ActionTypes = AddTrackAction | SetCsvLinesAction;

const initialState: RootState = {
  tracks: [],
  csvLines: [],
};

export const tracksReducer: Reducer<RootState, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, action.track],
      };
    case SET_CSV_LINES:
      return {
        ...state,
        csvLines: action.newLines,
      };
    default:
      return state;
  }
};
