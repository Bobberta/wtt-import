import { Track } from "../types/types.d.ts";

export const ADD_TRACK = "ADD_TRACK";

interface AddTrackAction {
  type: typeof ADD_TRACK;
  track: Track;
}

export interface RootState {
  tracks: Track[];
  csvLines: Line[];
}

export type ActionTypes = AddTrackAction;
