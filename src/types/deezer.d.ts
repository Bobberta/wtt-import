import { Url } from "url";

export declare namespace DeezerApi {
  interface Album {
    id: number;
    title: string;
    link: Url;
    cover: Url;
    cover_small: Url;
    cover_medium: Url;
    cover_big: Url;
    cover_xl: Url;
    release_date: string;
    tracklist: Url;
    type: string;
  }
  interface Artist {
    id: number;
    name: string;
    link: Url;
    share: Url;
    picture: Url;
    picture_small: Url;
    picture_medium: Url;
    picture_big: Url;
    picture_xl: Url;
    nb_album: number;
    nb_fan: number;
    radio: boolean;
    tracklist: Url;
    type: string;
  }
  interface TrackObject {
    id: number;
    readable: boolean;
    title: string;
    title_short: string;
    title_version: string;
    isrc?: string;
    link: Url;
    share?: Url;
    duration: number;
    track_position?: number;
    disk_number?: number;
    rank: number;
    release_date?: string;
    explicit_lyrics: false;
    explicit_content_lyrics: number;
    explicit_content_cover: number;
    preview: string;
    bpm?: number;
    gain?: number;
    available_countries?: string[];
    contributors?: Artist[];
    artist: Artist;
    album: Album;
    type: "track";
  }
}
