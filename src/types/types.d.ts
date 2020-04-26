export interface Line {
  title: string;
  artist: string;
}

export interface Track {
  title: string;
  artist: string;
  isrc?: string;
  year?: LoDashImplicitNumberArrayWrapper;
  deezerId?: string;
  spotifyId?: string;
  popularity?: number;
  audio: string;
}

export type TrackProvider = "deezer" | "spotify";
