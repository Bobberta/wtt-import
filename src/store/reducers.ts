// import { ADD_TRACK, ActionTypes, RootState } from "./types";
import { remove } from "lodash";

import { Track, Line } from "../types/types";
import { Reducer } from "redux";

export const ADD_TRACK = "ADD_TRACK";
export const SET_CSV_LINES = "SET_CSV_LINES";
export const SET_CURRENT_LINE = "SET_CURRENT_LINE";
export const SET_CURRENT_STEP = "SET_CURRENT_STEP";
export const CANCEL_IMPORT = "CANCEL_IMPORT";
export const DELETE_TRACK = "DELETE_TRACK";
export const EDIT_TRACK = "EDIT_TRACK";

interface AddTrackAction {
  type: typeof ADD_TRACK;
  track: Track;
}

interface SetCsvLinesAction {
  type: typeof SET_CSV_LINES;
  lines: Line[];
}

interface SetCurrentLineAction {
  type: typeof SET_CURRENT_LINE;
  lineIndex: number;
}

interface SetCurrentStep {
  type: typeof SET_CURRENT_STEP;
  step: number;
}

interface CancelImport {
  type: typeof CANCEL_IMPORT;
}

interface DeleteTrack {
  type: typeof DELETE_TRACK;
  id: string;
}

interface EditTrack {
  type: typeof EDIT_TRACK;
  track: Track;
}

export interface RootState {
  tracks: Track[];
  csvLines: Line[];
  currentStep: number;
  currentLine: number;
}

export type ActionTypes =
  | AddTrackAction
  | SetCsvLinesAction
  | SetCurrentLineAction
  | SetCurrentStep
  | CancelImport
  | DeleteTrack
  | EditTrack;

const initialState: RootState = {
  tracks: [],
  csvLines: [],
  currentStep: 0,
  currentLine: 0,
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
        csvLines: action.lines,
      };
    case SET_CURRENT_LINE:
      return {
        ...state,
        currentLine: action.lineIndex,
      };
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.step,
      };
    case CANCEL_IMPORT:
      return {
        tracks: [],
        csvLines: [],
        currentStep: 0,
        currentLine: 0,
      };
    case DELETE_TRACK:
      const newTracks = remove(state.tracks, (track) => {
        return track.id !== action.id;
      });
      return {
        ...state,
        tracks: newTracks,
      };
    case EDIT_TRACK:
      const newData = [...state.tracks];
      const index = newData.findIndex((track) => track.id === action.track.id);
      if (index > -1) {
        // const item = newData[index];
        newData.splice(index, 1, { ...action.track });
        return {
          ...state,
          tracks: newData,
        };
      }
      newData.push(action.track);
      return {
        ...state,
        tracks: newData,
      };
    default:
      return state;
  }
};
