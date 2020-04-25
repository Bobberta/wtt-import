export interface Line {
  title: string;
  artist: string;
}

export interface Track {
  title: string;
  artist: string;
  isrc?: string;
  year: number;
  deezerId?: string;
  spotifyId?: string;
  popularity?: number;
  audio: string;
}
