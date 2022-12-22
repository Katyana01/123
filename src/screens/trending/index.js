import React, { useEffect, useState } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import Widgets from "../../components/widgets2";
import { useNavigate } from "react-router-dom";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playlists, setPlaylists] = useState(null);

  

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  useEffect(() => {
    APIKit.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/trending", { state: { id: id } });
  };

  return (
    <div className="screen-container flex">
      <div className="library-body">
        {playlists?.map((playlist) => (
          <div
            className="widgetcard-body"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)}
          >
            
           
       
          </div>
        ))}
      </div>
      <div className="left-player-body">
        
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className="right-player-body">
        
      </div>
    </div>
  );
}
