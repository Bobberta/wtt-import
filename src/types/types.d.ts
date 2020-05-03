export interface Line {
  title: string;
  artist: string;
}

export type TrackProvider = "deezer" | "spotify";

export interface Track {
  title: string;
  artist: string;
  isrc?: string;
  year?: number;
  deezerId?: string;
  spotifyId?: string;
  popularity?: number;
  audio: string;
  coverImage: string;
  provider: TrackProvider;
  id: string;
}
