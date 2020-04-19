import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { spSearchTrack } from "./api/spotify";
import { dzSearchTrack } from "./api/deezer";

interface Track {
  name?: string;
  title?: string;
}

const App: React.FC = () => {
  const [tracks, setTracks] = useState([]);
  const searchTrack = async () => {
    const results = await spSearchTrack("test");
    setTracks(results.tracks.items);
  };
  const searchTrackDeezer = async () => {
    const results = await dzSearchTrack("kate bush");
    setTracks(results.data);
  };
  return (
    <div className="App">
      <button onClick={searchTrack}>Search Track</button>
      <button onClick={searchTrackDeezer}>Search Track Deezer</button>
      Spotify Tracks :
      {tracks.map((track: Track, index) => {
        return <div key={index}>{track.name || track.title}</div>;
      })}
      Deezer Tracks :
    </div>
  );
};

export default App;
